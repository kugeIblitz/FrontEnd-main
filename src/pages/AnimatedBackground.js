import {React,useEffect,useRef} from 'react';
// import { useSpring } from 'react-spring';
import "./AnimatedBackground.css";


const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDot = () => {
      const dot = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1, // Random dot size between 1 and 5
        color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`, // Random RGB color
        speedX: Math.random() - 0.5, // Random horizontal speed
        speedY: Math.random() - 0.5, // Random vertical speed
      };
      dots.push(dot);
    };

    const updateDots = () => {
      dots.forEach((dot) => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        if (dot.x < 0 || dot.x > canvas.width) {
          dot.speedX *= -1;
        }

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.speedY *= -1;
        }
      });
    };

    const drawDots = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false);
        context.fillStyle = dot.color;
        context.fill();
      });
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      updateDots();
      drawDots();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial dots
    for (let i = 0; i < 50; i++) {
      createDot();
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;

