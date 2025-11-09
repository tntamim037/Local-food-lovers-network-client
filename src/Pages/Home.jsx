import React from 'react';
import HeroSection from './HeroSection';
import { useLoaderData } from 'react-router';
import FeaturedReviews from './FeaturedReviews';

const Home = () => {
    const { sliders, reviews } = useLoaderData();
  console.log(sliders, reviews);
    return (
        <div>
            <HeroSection sliders={sliders}></HeroSection>
            <FeaturedReviews reviews={reviews}></FeaturedReviews>
        </div>
    );
};

export default Home;