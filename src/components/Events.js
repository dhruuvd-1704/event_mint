
import React from "react";
import Sliderss from "./data";
import "./navbar.css"





const EventsPage = () => {
    let slides = ["https://autowithsid.in/wp-content/uploads/2023/06/Animal-Upcoming-Ranbir-Kapoor-Movie-2023.jpg",
        'https://bingeddata.s3.amazonaws.com/uploads/2022/05/Salaar-Poster-Teases-Prabhas-Kicking-Some-High-Octane-Action.jpg',
        'https://i.ytimg.com/vi/Kwmid4Ud1ao/maxresdefault.jpg'
    ]
    let sports = [
        'https://img00.deviantart.net/9bf0/i/2016/337/d/3/fc_barcelona_vs_real_madrid_wallpaper_2016_17__by_chakib_design-daqdy5f.png'
        , 'https://www.indiantvinfo.com/media/2022/08/India-Vs-Pakistan-Live-Asia-Cup-2022.jpg',
        'https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https://media.insider.in/image/upload/c_crop%2Cg_custom/v1582015199/chi9bblu4ejximkw8xhi.jpg'

    ]
    let concerts = [
        'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/12/30232004/arijit-singh.jpeg',
        'https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Music-Concert-Event-Ticket-Design-1536x864.jpg',
        'https://s1.ticketm.net/dam/a/7d5/97b67038-f926-4676-be88-ebf94cb5c7d5_1802151_TABLET_LANDSCAPE_LARGE_16_9.jpg'
    ]

    return (<main className='bg-[url("F:\web dev practice\styles\EventMint\public\bg.jpg")]  h-https://images.yourstory.com/cs/1/eb1786d0-a7a9-11e9-b510-6f7c0abb0d14/audience-band-celebration-22634361567750376859.jpg?fm=png&auto=format    h-max '>


        <div className=" bg-white bg-opacity-5 ">
            <div className=" pt-20 pl-52  ">
                <b className="text-center pl-4 pr-4 pt-4 pb-4 rounded-full font-bold text-white bg-black border-white border-solid border-2 ">Featured Events</b>
            </div>
            <div className="pt-16 box-border m-auto  w-[70%]  size h-auto rounded-md   flex space-x-4">
                {/* <Sliderss slides={slides}></Sliderss>
                <Sliderss slides={sports}></Sliderss> */}
                <Sliderss slides={concerts}></Sliderss>
            </div>


        </div>

        <div className=" bg-white bg-opacity-5 h-screen">
            <div className=" pt-24  pl-52   ">
                <b className="text-center  pl-4 pr-8 pt-4 pb-4 rounded-full font-bold text-white bg-black border-white border-solid border-2 ">Coming Soon</b>
            </div>
            <div className="pt-16 box-border m-auto w-[90%] flex space-x-4">
                <Sliderss slides={slides}></Sliderss>
                <Sliderss slides={slides}></Sliderss>
                <Sliderss slides={slides}></Sliderss>
            </div>


        </div>




    </main>


    )
}

export default EventsPage;

