import { useEffect, useState } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

export const MovingBg = () => {
  const [ circles, setCircles ] = useState([]);
  const [ count, setCount ] = useState(30)
  const [ radiusRange, setRadiusRange ] = useState([10, 500]);
  const [ adjustSpeed, setAdjustSpeed ] = useState(0.9); 

  const blurValue = 60;
  const colors = [
    ['#303438', '#210c0d'], 
    ['#1c1b24', '#131e29'], 
    ['#1f1216', '#000000'], 
  ];

  const updateCountBasedOnScreenSize = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setCount(50); // More circles for smaller screens
      setRadiusRange([5, 100])
      setAdjustSpeed(1.6)
    } else {
      setCount(30); // Default or fewer circles for larger screens
      setRadiusRange([10, 500])
      setAdjustSpeed(0.9)
    }
  };

  useEffect(() => {
    // Set initial circle count based on screen size
    updateCountBasedOnScreenSize();

    // Add event listener for screen size changes
    window.addEventListener('resize', updateCountBasedOnScreenSize);

    return () => {
      window.removeEventListener('resize', updateCountBasedOnScreenSize);
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
        blur: blurValue, // Set a constant blur value
        colorOne,
        colorTwo,
        initialXDirection: Math.round(rand(-99, 99) / 100),
        initialYDirection: Math.round(rand(-99, 99) / 100),
      });
    }

    setCircles(generatedCircles);
  }, []); // Initial circle generation

  useEffect(() => {
    

    const moveCircles = () => {
      setCircles((prevCircles) => {
        return prevCircles.map((circle) => {
          let { x, y, radius, initialXDirection, initialYDirection, colorOne, colorTwo } = circle;

          if (x + (initialXDirection * adjustSpeed) >= window.innerWidth && initialXDirection !== 0 || x + (initialXDirection * adjustSpeed) <= 0 && initialXDirection !== 0) {
            initialXDirection = -initialXDirection;
          }
          if (y + (initialYDirection * adjustSpeed) >= window.innerHeight && initialYDirection !== 0 || y + (initialYDirection * adjustSpeed) <= 0 && initialYDirection !== 0) {
            initialYDirection = -initialYDirection;
          }

          x += (initialXDirection * adjustSpeed);
          y += (initialYDirection * adjustSpeed);

          return {
            ...circle,
            x,
            y,
            initialXDirection,
            initialYDirection,
            radius,
            colorOne,
            colorTwo
          };
        });
      });
    };

    const animationFrame = window.requestAnimationFrame(moveCircles);
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [circles]); // Movement and animation


  return (
    <div className="absolute z-0 w-full h-screen overflow-hidden animate-fadeIn">
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
            filter: `blur(${circle.blur}px)`, // Apply constant blur
            animation: `move 5s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
};