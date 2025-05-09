import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
// import './Watchlist.css';

const API_KEY = "3aec63790d50f3b9fc2efb4c15a8cf99";

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(storedWatchlist);
    }, []);

    useEffect(() => {
        async function fetchMovies() {
            const movieDetails = await Promise.all(
                watchlist.map(async (item) => {
                    try {
                        const res = await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${API_KEY}&language=en-US`);
                        return await res.json();
                    } catch (error) {
                        console.error('Failed to fetch movie:', error);
                        return null;
                    }
                })
            );
            setMovies(movieDetails.filter(Boolean));
        }
        if (watchlist.length > 0) {
            fetchMovies();
        } else {
            setMovies([]);
        }
    }, [watchlist]);

    const removeFromWatchlist = (id) => {
        const updatedWatchlist = watchlist.filter(item => item.id !== id);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
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
        <>
            <Navbar />
            <main>
                <div className="watch-list-table-container">
                    <div className="watch-list-table">
                        <div className="table-heading">
                            <div className="row">
                                <div className="cell">ID</div>
                                <div className="cell">Title</div>
                                <div className="cell">Year</div>
                                <div className="cell">Rating</div>
                                <div className="cell">Genre</div>
                                <div className="cell">Remove</div>
                            </div>
                        </div>
                        <div className="table-body">
                            {movies.length === 0 && <div className="row"><div className="cell no-movies">No movies in watchlist.</div></div>}
                            {movies.map(movie => (
                                <div className="row" key={movie.id}>
                                    <div className="bg-effect"></div>
                                    <div className="cell id">{movie.id}</div>
                                    <div className="cell">{movie.title}</div>
                                    <div className="cell">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</div>
                                    <div className="cell rating">{getStarRating(movie.vote_average)}</div>
                                    <div className="cell genre">
                                        {movie.genres.map(genre => (
                                            <div className="item" key={genre.id}>{genre.name}</div>
                                        ))}
                                    </div>
                                    <div className="cell">
                                        <button className="remove-btn" onClick={() => removeFromWatchlist(movie.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Watchlist;
