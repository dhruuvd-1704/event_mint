

import React from "react";
import Sliderss from "./data";
import "./navbar.css";

const EventsPage = ({ featuredSlides, upcomingSlides }) => {
    return (
        <main className="bg-transparent text-white min-h-screen">
            <div className="container mx-auto py-20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Featured Events</h2>
                    <div className="border-b border-white w-24 mx-auto mb-8"></div>
                </div>
                <div className="flex justify-center mb-12">
                    <Sliderss slides={featuredSlides} />
                </div>
            </div>
            <div className="bg-transparent py-20 m-2">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Coming Soon</h2>
                        <div className="border-b border-white w-24 mx-auto mb-8 m-4"></div>
                    </div>
                    <div className=" pt-4 box-border m-auto w-[90%] flex space-x-8">
                        <Sliderss slides={upcomingSlides} />
                        <Sliderss slides={upcomingSlides} />
                        <Sliderss slides={upcomingSlides} />

                    </div>
                </div>
            </div>
        </main>
    );
};

export default EventsPage;
