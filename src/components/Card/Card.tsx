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
        const centerX = width / 3;
        const centerY = height / 3;

        let direction = '';

        if (clickX < centerX && clickY < centerY) {
            direction = 'flip-up-left'; // Top-left square
        } else if (clickX >= centerX && clickX < 2 * centerX && clickY < centerY) {
            direction = 'flip-up'; // Top-middle square
        } else if (clickX >= 2 * centerX && clickY < centerY) {
            direction = 'flip-up-right'; // Top-right square
        } else if (clickX < centerX && clickY >= centerY && clickY < 2 * centerY) {
            direction = 'flip-left'; // Middle-left square
        } else if (clickX >= centerX && clickX < 2 * centerX && clickY >= centerY && clickY < 2 * centerY) {
            direction = 'flip'; // Middle square
        } else if (clickX >= 2 * centerX && clickY >= centerY && clickY < 2 * centerY) {
            direction = 'flip-right'; // Middle-right square
        } else if (clickX < centerX && clickY >= 2 * centerY) {
            direction = 'flip-down-left'; // Bottom-left square
        } else if (clickX >= centerX && clickX < 2 * centerX && clickY >= 2 * centerY) {
            direction = 'flip-down'; // Bottom-middle square
        } else if (clickX >= 2 * centerX && clickY >= 2 * centerY) {
            direction = 'flip-down-right'; // Bottom-right square
        }

        setFlipDirection(direction);
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`relative aspect-w-3 aspect-h-4 perspective ${flipDirection} hover:scale-105 transition-transform  hover:cursor-pointer`}
            onClick={handleCardClick}
        >
            <div className={`card ${isFlipped ? `flipped ${flipDirection}` : flipDirection} shadow-lg`}>
                <div className="card-front">
                    <img src={card.image} alt={card.id} className="object-cover w-full h-full rounded" />
                </div>
                <div className="card-back absolute inset-0 flex items-center justify-center bg-orange-200 border-2 border-orange-300 p-4 rounded">
                    <p className='text-center text-xl font-bold text-white'>{card.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;