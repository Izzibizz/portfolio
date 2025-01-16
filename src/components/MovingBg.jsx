import { useEffect, useState } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

export const MovingBg = () => {
  const [circles, setCircles] = useState([]);
  const [count] = useState(30); // Fixed number of circles
  const [radiusRange] = useState([10, 500]); // Fixed size range
  const [adjustSpeed] = useState(0.9); // Fixed speed

  const [isMobile, setIsMobile] = useState(false); // State for detecting mobile
  const blurValue = 60;
  const colors = [
    ['#303438', '#210c0d'],
    ['#1c1b24', '#131e29'],
    ['#1f1216', '#000000'],
  ];

  useEffect(() => {
    // Detect the screen size to decide if it's mobile or desktop
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); // Set the initial screen size
    window.addEventListener('resize', handleResize); // Update on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  useEffect(() => {
    const generatedCircles = [];
    for (let i = 0; i < count; i++) {
      const radius = rand(radiusRange[0], radiusRange[1]);
      const x = rand(-100, window.innerWidth + 100);
      const y = rand(-100, window.innerHeight + 100);
      const colorIndex = Math.floor(rand(0, 299) / 100);
      const colorOne = colors[colorIndex][0];
      const colorTwo = colors[colorIndex][1];

      generatedCircles.push({
        x,
        y,
        radius,
        blur: blurValue,
        colorOne,
        colorTwo,
        initialXDirection: Math.round(rand(-99, 99) / 100),
        initialYDirection: Math.round(rand(-99, 99) / 100),
      });
    }

    setCircles(generatedCircles);
  }, [count, radiusRange]); // Initial circle generation

  useEffect(() => {
    if (isMobile) return; // Skip animation on mobile

    let animationFrameId;

    const moveCircles = () => {
      setCircles((prevCircles) => {
        return prevCircles.map((circle) => {
          let { x, y, initialXDirection, initialYDirection } = circle;

          // Boundary conditions
          if (x + (initialXDirection * adjustSpeed) >= window.innerWidth || x + (initialXDirection * adjustSpeed) <= 0) {
            initialXDirection = -initialXDirection;
          }
          if (y + (initialYDirection * adjustSpeed) >= window.innerHeight || y + (initialYDirection * adjustSpeed) <= 0) {
            initialYDirection = -initialYDirection;
          }

          // Update position
          x += (initialXDirection * adjustSpeed);
          y += (initialYDirection * adjustSpeed);

          return {
            ...circle,
            x,
            y,
            initialXDirection,
            initialYDirection,
          };
        });
      });

      // Schedule the next frame
      animationFrameId = window.requestAnimationFrame(moveCircles);
    };

    moveCircles();

    // Cleanup function to cancel the animation
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [adjustSpeed, isMobile]); // Only run on desktop

  return (
    <div className="z-0 w-full max-h-full h-full relative">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.radius * 2}px`,
            height: `${circle.radius * 2}px`,
            background: `linear-gradient(to right, ${circle.colorOne}, ${circle.colorTwo})`,
            borderRadius: '50%',
            filter: `blur(${circle.blur}px)`,
          }}
        />
      ))}
    </div>
  );
};