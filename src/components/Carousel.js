import React, { useState, useEffect, useRef } from 'react';
import image1 from '../img/Carousel1.webp'
import image2 from '../img/Carousel2.webp'
import image3 from '../img/Carousel3.png'
const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const touchStartX = useRef(null);
  const images = [image1, image2, image3]

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  }

  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX.current;
      if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? handlePrev() : handleNext();
      }
      touchStartX.current = null;
    }
  };

  return (
    <div className="relative w-full" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className='overflow-hidden'>
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 drop-shadow-lg shadow-black">
              <img src={image} className={`w-full h-full object-cover`} alt='' />
            </div>
          ))}
        </div>
        <button onClick={handlePrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 border-none bg-white w-10 text-black p-2 rounded-full opacity-75 hover:opacity-100 bg-white hidden md:block">
          &lt;
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 border-none bg-white w-10 text-black p-2 rounded-full opacity-75 hover:opacity-100 bg-white hidden md:block">
          &gt;
        </button>
      </div>

    </div>
  );
}

export default Carousel;