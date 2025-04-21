import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const API_KEY = process.env.REACT_APP_API_KEY;

const genres = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "99": "Documentary",
  "18": "Drama",
  "10751": "Family",
  "14": "Fantasy",
  "36": "History",
  "27": "Horror",
  "10402": "Music",
  "9648": "Mystery",
  "10749": "Romance",
  "878": "Science Fiction",
  "10770": "TV Movie",
  "53": "Thriller",
  "10752": "War",
  "37": "Western"
};

function Navbar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`, { signal })
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    const sorted = data.results.sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);
                    setResults(sorted);
                } else {
                    setResults([]);
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error('Failed to fetch search results:', err);
                }
            });

        return () => {
            controller.abort();
        };
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (id) => {
        setQuery('');
        setResults([]);
        setShowSuggestions(false);
        navigate(`/movie/${id}`);
    };

    const handleFocus = () => {
        if (results.length > 0) {
            setShowSuggestions(true);
        }
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(document.activeElement) &&
                searchInputRef.current !== document.activeElement
            ) {
                setShowSuggestions(false);
            }
        }, 100);
    };

    const getStarRating = (vote) => {
        const ratingOutOf5 = vote / 2;
        const filledStars = Math.floor(ratingOutOf5);
        const halfFilledStars = ratingOutOf5 % 1 > 0.5 ? 1 : 0;
        const emptyStars = 5 - filledStars - halfFilledStars;
        
    
        const stars = [];

        for (let i = 0; i < filledStars; i++) {
            stars.push(
                <svg key={`filled-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            );
        }
        for (let i = 0; i < halfFilledStars; i++) {
            stars.push(
                <svg key={`half-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
                </svg>
            );
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                </svg>
            );
        }
    
        return stars;
    };

    return (
        <nav>
            <div className="navbar">
                <Link to="/" className="logo">
                    <img src={logo} alt="Watch Wise Logo" />
                </Link>
                <div className="nav-links">
                    <Link to="/">
                        <div className="item">Home</div>
                    </Link>
                    <Link to="/movies">
                        <div className="item">Movies</div>
                    </Link>
                    <Link to="/tv-shows">
                        <div className="item">TV Shows</div>
                    </Link>
                    <Link to="/watchlist">
                        <div className="item">Watchlist</div>
                    </Link>
                </div>
                <div className="search-bar-wrapper">
                    <div className="search-bar">
                        <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search-input"
                            className="search-input"
                            placeholder="Search movie..."
                            autoComplete="off"
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            ref={searchInputRef}
                        />
                    </div>
                </div>
            </div>

            {showSuggestions && (
                <div className="search-suggestions" id="search-suggestions" ref={suggestionsRef} tabIndex={-1}>
                    {results.length === 0 ? (
                        <div className="no-results">No results found</div>
                    ) : (
                        results.map((movie) => (
                            <div
                                key={movie.id}
                                className="item"
                                onMouseDown={() => handleSuggestionClick(movie.id)}
                                tabIndex={0}
                            >
                                <div className="image-wrapper">
                                    {movie.poster_path ? (
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                    ) : (
                                        <div className="no-image">No Image</div>
                                    )}
                                </div>
                                <div className="content">
                                    <div className="title">{movie.title}</div>
                                    <div className="genre">
                                        {movie.genre_ids.map(genreId => (
                                            <span key={genreId}>{genres[genreId]}</span>
                                        ))}
                                    </div>
                                    <div className="footer">
                                        <div className="rating">{getStarRating(movie.vote_average.toFixed(1))}</div>
                                        <div className="year">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <div className="overlay-effect"></div>
        </nav>
    );
}

export default Navbar;
