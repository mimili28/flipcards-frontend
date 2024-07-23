import React, { useState } from 'react';
import { CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [flipDirection, setFlipDirection] = useState('');

    const handleCardClick = (event: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = event;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const clickX = clientX - left;
        const clickY = clientY - top;
        const centerX = width / 2;
        const centerY = height / 2;

        let direction = '';

        if (clickX < centerX && clickY < centerY) {
            direction = 'flip-up-left'; // Top-left diagonal
        } else if (clickX >= centerX && clickY < centerY) {
            direction = 'flip-up-right'; // Top-right diagonal
        } else if (clickX < centerX && clickY >= centerY) {
            direction = 'flip-down-left'; // Bottom-left diagonal
        } else if (clickX >= centerX && clickY >= centerY) {
            direction = 'flip-down-right'; // Bottom-right diagonal
        } else if (clickX < centerX) {
            direction = 'flip-left'; // Left
        } else if (clickX >= centerX) {
            direction = 'flip-right'; // Right
        } else if (clickY < centerY) {
            direction = 'flip-up'; // Up
        } else if (clickY >= centerY) {
            direction = 'flip-down'; // Down
        }

        setFlipDirection(direction);
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`relative aspect-w-3 aspect-h-4 perspective ${flipDirection}`}
            onClick={handleCardClick}
        >
    <div className={`card ${isFlipped ? `flipped ${flipDirection}` : flipDirection}`}>
                <div className="card-front">
                    <img src={card.image} alt={card.id} className="object-cover w-full h-full rounded-sm" />
                </div>
                <div className="card-back absolute inset-0 flex items-center justify-center bg-orange-200 border-2 border-orange-300 p-4">
                    <p className='text-center text-xl font-bold text-white'>{card.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;