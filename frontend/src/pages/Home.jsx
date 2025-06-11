import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";

const Home = () => {
    return(
        <div className="min-h-screen bg-green-800">
            <Header/>
            <HeroSection/>
            <FeaturesSection/>
            <Footer/>
        </div>
    );
};

export default Home;