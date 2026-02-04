import React, { useEffect, useRef, useState } from 'react';
import { BannerData } from '../../Data/Banner';
import Placeholder from '../../assets/placeholder.webp';

const Banner = () => {
  const activeBanners = BannerData.filter(b => b.status === 'active');
  const total = activeBanners.length;

  const carouselBanners = [
    activeBanners[total - 1],
    ...activeBanners,
    activeBanners[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const bannerRef = useRef();
  const startX = useRef(null);
  const endX = useRef(null);
  const isDragging = useRef(false);

  // Loop jump logic
  useEffect(() => {
    if (!transitioning) return;

    const handleTransitionEnd = () => {
      if (currentIndex === total + 1) {
        setTransitioning(false);
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        setTransitioning(false);
        setCurrentIndex(total);
      }
    };

    const node = bannerRef.current;
    node.addEventListener('transitionend', handleTransitionEnd);
    return () => node.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, total, transitioning]);

  // Automatic scrolling every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Handle drag/touch start
  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  };

  // Handle drag/touch move
  const handleMove = (e) => {
    if (!isDragging.current) return;
    endX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    e.preventDefault();
  };

  // Handle drag/touch end
  const handleEnd = () => {
    if (!isDragging.current || startX.current === null || endX.current === null) return;


    const deltaX = startX.current - endX.current;

    if (Math.abs(deltaX) > 10) { // Minimum drag distance
      setTransitioning(true);
      if (deltaX > 0) {
        // Drag left (next)
        setCurrentIndex(prev => prev + 1);
      } else {
        // Drag right (prev)
        setCurrentIndex(prev => prev - 1);
      }
    }

    isDragging.current = false;
    startX.current = null;
    endX.current = null;
  };

  // Slide styles
  const slideStyle = {
    transform: `translateX(-${currentIndex * (100 / 3)}%)`,
    width: `${carouselBanners.length * (100 / 3)}%`,
    transition: transitioning ? 'transform 0.5s ease-in-out' : 'none',
  };

  return (
    <div className="w-full overflow-hidden py-4 relative rounded-t-md">
      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl px-4">
          {/* Banners container */}
          <div
            ref={bannerRef}
            className="flex"
            style={{ ...slideStyle, touchAction: 'pan-y' }}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd} // Stop dragging if mouse leaves the container
          >
            {carouselBanners.map((banner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/3 px-1"
                style={{
                  transform: index === currentIndex ? 'scale(1)' : 'scale(1)',
                  transition: 'transform 0.5s',
                }}
              >
                <img
                  src={banner.image || Placeholder}
                  onError={(e) => (e.target.src = Placeholder)}
                  alt={banner.name}
                  className="rounded-lg shadow-md w-full h-72 md:h-130 object-cover ml-12 md:ml-18 lg:ml-25"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-2">
            {activeBanners.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index + 1 === currentIndex ? 'bg-white' : 'bg-white/55'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;