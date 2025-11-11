import React from 'react';
import HeroSection from './HeroSection';
import { useLoaderData } from 'react-router';
import FeaturedReviews from './FeaturedReviews';
import LoadingSpinner from './LoadingSpinner';

const Home = () => {
    const { sliders, reviews } = useLoaderData();
    if (!sliders || !reviews) {
        return <LoadingSpinner></LoadingSpinner>
    }
  console.log(sliders, reviews);
    return (
        <div>
            <HeroSection sliders={sliders}></HeroSection>
            <FeaturedReviews reviews={reviews}></FeaturedReviews>
        </div>
    );
};

export default Home;