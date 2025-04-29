import React, { useEffect, useRef } from 'react';

const CheckmarkThinCircle = (props) => {
  const circleRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    const animateStroke = (element, duration = 600) => {
      const length = element.getTotalLength();
      element.style.strokeDasharray = length;
      element.style.strokeDashoffset = length;
      element.getBoundingClientRect(); // Force reflow
      element.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
      element.style.strokeDashoffset = '0';
    };

    animateStroke(circleRef.current, 800);
    animateStroke(checkRef.current, 700);
  }, []);

  return (
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      {...props}
    >
      {/* Animated Circle */}
      <circle ref={circleRef} cx="25" cy="25" r="22" />
      {/* Animated Checkmark */}
      <path ref={checkRef} d="M15 26l7 7 14-14" />
    </svg>
  );
};

export default CheckmarkThinCircle;
