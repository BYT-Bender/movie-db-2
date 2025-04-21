import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const API_KEY = "3aec63790d50f3b9fc2efb4c15a8cf99";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
            }
        }
        async function fetchCredits() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
                const data = await res.json();
                setCredits(data);
            } catch (error) {
                console.error('Failed to fetch movie credits:', error);
            }
        }
        fetchMovie();
        fetchCredits();
    }, [id]);

    if (!movie || !credits) {
        return <div>Loading...</div>;
    }

    const getPeopleByJob = (job) => {
        return credits.crew.filter(person => person.job === job);
    };

    return (
        <>
            <Navbar />
            <main className="movie-page">
                <div className="movie-card-wrapper">
                    <div className="movie-card">
                        <div className="bg-effect" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}></div>
                        <header>
                            <div className="row">
                                <div className="title">{movie.title}</div>
                                <div className="rating"><span className="highlight">{movie.vote_average}</span> / 10</div>
                            </div>
                            <div className="row">
                                <div className="genre">
                                    {movie.genres.map(genre => (
                                        <span key={genre.id}>{genre.name}</span>
                                    ))}
                                </div>
                            </div>
                        </header>
                        <div className="movie-info-wrapper">
                            <div className="image-wrapper">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className="movie-info">
                                <section>
                                    <header>About the Movie</header>
                                    <p>{movie.overview}</p>
                                </section>
                                <div className="movie-additional-info">
                                    <div className="col">
                                        <section>
                                            <header>Actors</header>
                                            <ul>
                                                {credits.cast.slice(0, 10).map(actor => (
                                                    <li key={actor.cast_id}>{actor.name}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>
                                    <div className="col">
                                        <section>
                                            <header>Director</header>
                                            <ul>
                                                {getPeopleByJob('Director').map(person => (
                                                    <li key={person.credit_id}>{person.name}</li>
                                                ))}
                                            </ul>
                                        </section>
                                        <section>
                                            <header>Screenwriter</header>
                                            <ul>
                                                {getPeopleByJob('Screenplay').map(person => (
                                                    <li key={person.credit_id}>{person.name}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>
                                    <div className="col">
                                        <section>
                                            <header>Producer</header>
                                            <ul>
                                                {getPeopleByJob('Producer').map(person => (
                                                    <li key={person.credit_id}>{person.name}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MovieDetail;
