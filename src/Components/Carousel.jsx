import React, { useState } from 'react';

const Carousel = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
      const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(nextIndex);
    };
  
    const handleNextClick = () => {
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    };
  
    const transformValue = `translateX(-${currentIndex * 100}%)`;
  return (
    <div className="carousel-container ">
    <div className="carousel-items" style={{ transform: transformValue }}>
      {images.map((image, index) => (
        <div className="carousel-item" key={index}>
          <img src={image} alt={`Img ${index}`} />
        </div>
      ))}
    </div>
    <div className="carousel-buttons">
      <button className="carousel-button prev-button" onClick={handlePrevClick}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-lime-600  dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
      </button>
      <button className="carousel-button next-button" onClick={handleNextClick}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-lime-600 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  </div>
  )
}

export default Carousel