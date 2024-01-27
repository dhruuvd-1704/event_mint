// Card.js

import React from 'react';
import './Card.css';

const Card = ({ title, content }) => {
    return (
        <div className="card-container">
            <div className="card-content">
                <p>{content}</p>
            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default Card;
