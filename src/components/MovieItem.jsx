import { useState, useEffect } from 'react';

function MovieItem({ movie, onWatchlistChange }) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setIsInWatchlist(watchlist.some(item => item.id === movie.id));
    }, [movie.id]);

    const toggleWatchlist = (e) => {
        e.stopPropagation();
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        const exists = watchlist.find(item => item.id === movie.id);
        let updatedWatchlist;
        if (exists) {
            updatedWatchlist = watchlist.filter(item => item.id !== movie.id);
            setIsInWatchlist(false);
        } else {
            updatedWatchlist = [...watchlist, { id: movie.id }];
            setIsInWatchlist(true);
        }
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        if (onWatchlistChange) onWatchlistChange(updatedWatchlist);
    };

    const handleClick = () => {
        window.location.href = `/movie/${movie.id}`;
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
        <div className="item" onClick={handleClick} data-id={movie.id}>
            <div className="content-effect">
                <button className={`add-to-watchlist ${isInWatchlist ? 'active' : ''}`} onClick={toggleWatchlist}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                    </svg>
                    <div className="after-effect">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                    </div>
                </button>
            </div>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className="content">
                <div className="title">{movie.title}</div>
                <div className="footer">
                    <div className="year">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</div>
                    <div className="rating">{getStarRating(movie.vote_average)}</div>
                </div>
            </div>
        </div>
    );
}

export default MovieItem;
