// import React from 'react'
// import card1 from '../images/paymentcard1.svg'
// import card2 from '../images/paymentcard2.svg'
// import card3 from '../images/paymentcard3.svg'
// import card4 from '../images/paymentcard4.svg'

// const PaymentCard = () => {
//     return (
//         <div className='flex flex-row w-[1390px] h-[231px] bg-red-300'>

//             <img src={card2} />
//             <img src={card2} />
//             <img src={card3} />
//             <img src={card4} />

//         </div>
//     )
// }

// export default PaymentCard
import React, { useState, useEffect } from 'react';

function App() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5001/api/images')
            .then((response) => response.json())
            .then((data) => setImages(data))
            .catch((error) => console.error('Error fetching images:', error));
    }, []);

    // Handle the slider navigation
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5001); // 5 seconds auto slide
        return () => clearInterval(interval); // Clear the interval on component unmount
    }, [images]);

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            <div className="relative">
                <div className="overflow-hidden rounded-lg">
                    {images.length > 0 && (
                        <img
                            src={`http://localhost:5001${images[currentIndex].src}`}
                            alt={`Slide ${currentIndex}`}
                            className="w-full h-auto object-cover"
                        />
                    )}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75"
                >
                    &#10094;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75"
                >
                    &#10095;
                </button>
            </div>
            <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default App;
