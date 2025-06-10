import { useEffect, useState } from "react";

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));

export const MovingBg = () => {
  const [circles, setCircles] = useState([]);

  const count = 30;
  const radiusRange = [10, 500];
  const adjustSpeed = 0.9;
  const blurValue = 60;

  const colors = [
    ["#303438", "#210c0d"],
    ["#1c1b24", "#131e29"],
    ["#1f1216", "#000000"],
  ];

  useEffect(() => {
    const generatedCircles = Array.from({ length: count }, () => {
      const radius = rand(...radiusRange);
      const x = rand(-100, window.innerWidth + 100);
      const y = rand(-100, window.innerHeight + 100);
      const [colorOne, colorTwo] = colors[randInt(0, colors.length)];

      return {
        x,
        y,
        radius,
        blur: blurValue,
        colorOne,
        colorTwo,
        initialXDirection: randInt(0, 2) === 0 ? -1 : 1,
        initialYDirection: randInt(0, 2) === 0 ? -1 : 1,
      };
    });

    setCircles(generatedCircles);
  }, [count]);

  // Animation (endast desktop)
  useEffect(() => {
    let animationFrameId;

    const moveCircles = () => {
      setCircles((prev) =>
        prev.map((circle) => {
          let { x, y, initialXDirection, initialYDirection } = circle;

          if (
            x + initialXDirection * adjustSpeed >= window.innerWidth ||
            x <= 0
          ) {
            initialXDirection *= -1;
          }
          if (
            y + initialYDirection * adjustSpeed >= window.innerHeight ||
            y <= 0
          ) {
            initialYDirection *= -1;
          }

          return {
            ...circle,
            x: x + initialXDirection * adjustSpeed,
            y: y + initialYDirection * adjustSpeed,
            initialXDirection,
            initialYDirection,
          };
        })
      );

      animationFrameId = requestAnimationFrame(moveCircles);
    };

    moveCircles();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="z-0 w-full h-full relative">
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
            borderRadius: "50%",
            filter: `blur(${circle.blur}px)`,
          }}
        />
      ))}
    </div>
  );
};
