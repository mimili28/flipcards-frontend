import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { fetchCardsData } from '../../services/api';
import { Card as CardType } from '../../types/Card';
import { Circles } from 'react-loader-spinner'


const Gallery: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getCards = async () => {
            try {
                const data = await fetchCardsData();
                const updatedCards = data.map(card => ({
                    ...card,
                    image: `${process.env.PUBLIC_URL}/images/${card.image.split('/').pop()}` 
                }));
                setCards(updatedCards);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        getCards();
    }, []);

    if (loading) return <Circles
        height="100"
        width="100"
        color="#007bff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="justify-center mt-12"
        visible={true}
    />;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map(card => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
};

export default Gallery;