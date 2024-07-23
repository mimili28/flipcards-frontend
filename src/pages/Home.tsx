import React from 'react';
import Gallery from '../components/Gallery/Gallery';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 mt-4 text-center">Card Gallery</h1>
            <Gallery />
        </div>
    );
};

export default Home;