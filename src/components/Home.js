import React from "react";
import Carousel from "./Carousel";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import '../css/App.css'
import image1 from '../img/insta-post1.jpg'
import image3 from '../img/insta-post3.jpg'
import image4 from '../img/insta-post4.jpg'
import image6 from '../img/insta-post6.jpg'

function Home() {

    const images1 = [
        { id: 1, src: image1 },
        { id: 3, src: image3 },
    ];
    const images2 = [
        { id: 1, src: image4 },
        { id: 3, src: image6 },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const handleImageChange = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images1.length); 
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images1.length);
            setCurrentImage((prevIndex) => (prevIndex + 1) % images1.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [images1.length]);
    return (
        <div style={{background: '#24243e'}}>
            <Nav />
            <div className="w-full">
                <Carousel />
            </div>
            <div className="m-0 p-0" style={{fontFamily: 'Jost, sans-serif'}}>
                <div class="parallax1"></div>

                <div class="content2 md:block hidden">
                    <h1 className="text-white lg:font-bold lg:text-4xl md:text-2xl px-5">Upload your content and get paid for every view</h1>
                    <div className="relative lg:m-[50px] w-[500px] h-[300px]">
                        {images1.map((image, index) => (
                            <img key={index} onClick={handleImageChange} src={image.src} alt={`Img${index + 1}`} className={`absolute top-1/2 left-1/${2 * index} z-${30 - index} transform -translate-x-1/${2 * index} -translate-y-1/${2 * index} ${index === currentIndex ? '' : 'opacity-10'} rounded-lg lg:w-[250px] lg:h-[350px] md:w-[150px] md:h-[250px] w-[75px] h-[125px]`} />
                        ))}
                    </div>
                </div>

                <div class="md:hidden mt-[50px] ">
                    <h1 className="text-white lg:font-bold lg:text-4xl md:text-2xl px-5 w-[50%] ">Upload your content and get paid for every view</h1>
                    <div className="relative mt-[75px]">
                        {images1.map((image, index) => (
                            <img key={index} onClick={handleImageChange} src={image.src} alt={`Img${index + 1}`} className={`absolute top-1/2 left-1/${2 * index} z-${30 - index} transform -translate-x-1/${2 * index} -translate-y-1/${2 * index} ${index === currentIndex ? '' : 'opacity-10'} rounded-lg lg:w-[250px] lg:h-[350px] md:w-[150px] md:h-[250px] w-[75px] h-[125px]`} />
                        ))}
                    </div>
                </div>
                <div class="parallax2 md:mt-[-520px] mt-[-200px] md:h-[620px] h-[350px]"></div>

                <div class="parallax3 md:h-[500px] h-[350px] "></div>

                <div className="content3 lg:mb-[250px] hidden md:block">
                    <h1 className="text-white lg:text-4xl lg:font-bold md:text-2xl py-[50px]">Enjoy content of other users too</h1>
                    <div className="relative p-2 h-[400px]">
                        {images2.map((image, index) => (
                            <img
                                key={index} src={image.src} alt={`Img${index + 1}`} className={`absolute top-1/2 left-1/${2 * index} z-${30 - index} transform -translate-x-1/${2 * index} -translate-y-1/${2 * index} ${index === currentImage ? '' : 'opacity-10'} rounded-lg lg:w-[250px] lg:h-[450px] md:w-[150px] md:h-[250px]`} />
                        ))}
                    </div>
                </div>
                <div className="md:hidden block mt-[-350px] w-[50%]" style={{float:'right'}}>
                    <h1 className="text-white px-5">Enjoy content of other users too</h1>
                    <div className="relative h-[200px] ml-3">
                        {images2.map((image, index) => (
                            <img
                                key={index} src={image.src} alt={`Img${index + 1}`} className={`absolute top-1/2 left-1/${2 * index} z-${30 - index} transform -translate-x-1/${2 * index} -translate-y-1/${2 * index} ${index === currentImage ? '' : 'opacity-10'} rounded-lg lg:w-[250px] lg:h-[450px] md:w-[150px] md:h-[250px] w-[75px] h-[150px]`} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home