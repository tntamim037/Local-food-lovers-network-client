import React from 'react';
import HeroSection from './HeroSection';
import { useLoaderData } from 'react-router';
import FeaturedReviews from './FeaturedReviews';
import LoadingSpinner from './LoadingSpinner';

const Home = () => {

    return (
        <div>
            <HeroSection ></HeroSection>
            <FeaturedReviews></FeaturedReviews>
        </div>
    );
};

export default Home;