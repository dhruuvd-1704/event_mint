// CustomCarousel.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css'; // Import the CSS file

const CustomCarousel = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Display three slides at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    function PrevArrow(props) {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev" onClick={onClick}>
                &lt;
            </div>
        );
    }

    function NextArrow(props) {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-next" onClick={onClick}>
                &gt;
            </div>
        );
    }

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((imageUrl, index) => (
                    <div key={index} className="carousel-image">
                        <img src={imageUrl} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CustomCarousel;
