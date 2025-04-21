import { useState, useEffect, useRef } from 'react';
import MovieItem from '../components/MovieItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_KEY = "3aec63790d50f3b9fc2efb4c15a8cf99";

function MovieList() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const fetchMovies = async (endpoint, setter) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await res.json();
            setter(data.results);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies('movie/now_playing', setNowPlaying);
        fetchMovies('movie/popular', setPopular);
        fetchMovies('movie/top_rated', setTopRated);
        fetchMovies('movie/upcoming', setUpcoming);
    }, []);

    const cardWidth = 15.5 * 16;
    const scrollWidth = 5 * cardWidth;

    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -scrollWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: scrollWidth, behavior: 'smooth' });
        }
    };

    const MovieRow = ({ title, movies }) => {
        const listRef = useRef(null);

        return (
            <div className="row">
                <div className="overlay-effect left"></div>
                <div className="overlay-effect right active"></div>
                <header>
                    <span>{title}</span>
                    <div className="controls">
                        <button className="prev-btn" onClick={() => scrollLeft(listRef)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </button>
                        <button className="next-btn" onClick={() => scrollRight(listRef)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>
                </header>
                <div className="list" ref={listRef}>
                    {movies.map(movie => (
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
                {/* <Carousel /> */}
                <div className="movie-list">
                    <MovieRow title="Now Playing" movies={nowPlaying} />
                    <MovieRow title="Popular" movies={popular} />
                    <MovieRow title="Top Rated" movies={topRated} />
                    <MovieRow title="Upcoming" movies={upcoming} />
                </div>
            <Footer />
        </>
    );
}

export default MovieList;
