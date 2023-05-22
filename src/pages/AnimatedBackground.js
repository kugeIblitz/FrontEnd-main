import React from 'react';
import { useSpring } from 'react-spring';
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  const styles = useSpring({
    from: { backgroundColor: 'red' },
    to: { backgroundColor: 'blue' },
    config: { duration: 1000 },
    loop: true,
  });

  return (
    <div className="animated-background" style={styles}></div>
  );
};

export default AnimatedBackground;
