import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sliderss = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className="relative">
            <FaChevronLeft onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer" />
            <FaChevronRight onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer" />
            {slides.map((slide, index) => (
                <div key={index} className={index === current ? 'opacity-100' : 'opacity-0'}>
                    {index === current && (
                        <img src={slide} alt="Event" className="w-full h-auto" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sliderss;
