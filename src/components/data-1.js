
import React from "react"
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";



const Sliderss = ({ slides }) => {
    let [current, setCurrent] = useState(0)

    const previousSlide = () => {
        if (current === 0) {
            setCurrent(slides.length - 1)
        }
        else {
            setCurrent(current - 1)
        }
    }
    const nextSlide = () => {
        if (current === slides.length - 1) {
            setCurrent(0)
        }
        else {
            setCurrent(current + 1)
        }
    }
    return (<div className="overflow-hidden relative">
        <div className="flex transition ease-out duration-500 "
            style={{ transform: `translateX(-${current * 100}%)`, }}
        >
            {slides.map((s) => {
                return (<img className="rounded-md" src={s}></img>)
            })}</div>
        <div className="absolute top-0 h-full w-full justify-between items-center flex text-3xl text-white px-10 opacity-45">
            <button onClick={previousSlide}>
                <FaArrowCircleLeft></FaArrowCircleLeft>
            </button>
            <button onClick={nextSlide}>
                <FaArrowCircleRight></FaArrowCircleRight>
            </button>
        </div>

        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full  ">
            {slides.map((s, i) => {
                return (
                    <div key={"circle" + i} className={`rounded-full w-5 h-5 ${i == current ? "bg-white" : "bg-gray-400"}
       
    `}></div>
                )
            })}
        </div>


    </div>)

}
export default Sliderss;