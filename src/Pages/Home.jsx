import React from 'react';
import HeroSection from './HeroSection';
import { useLoaderData } from 'react-router';
import FeaturedReviews from './FeaturedReviews';
import LoadingSpinner from './LoadingSpinner';
import TopStreetFoods from './TopStreetFoods';

const Home = () => {

    return (
        <div>
            <HeroSection ></HeroSection>
            <FeaturedReviews></FeaturedReviews>
            <TopStreetFoods></TopStreetFoods>
        </div>
    );
};

export default Home;