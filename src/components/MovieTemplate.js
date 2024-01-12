// MovieTemplate.js

import React from 'react';
import { Link } from 'react-router-dom';

const MovieTemplate = ({ id, title, overview, posterPath }) => {
    return (
        <div className="movie-template">
            <Link to={`/movie/${id}`}>
                <img src={posterPath} alt={title} />
            </Link>
            <div className="movie-details">
                <h2>{title}</h2>
                <p>{overview}</p>
            </div>
        </div>
    );
};

export default MovieTemplate;
