'use client'
import React from 'react';

const ZigZagArrow: React.FC = () => {
  return (
    <div className="zigzag-arrow-container">
      <style jsx>{`
        .zigzag-arrow-container {
          width: 40px;
          height: 40px;
          position: relative;
          margin: 40px auto;
        }

        .zigzag-arrow-container::before,
        .zigzag-arrow-container::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 15px;
          background-color: black;
        }

        .zigzag-arrow-container::before {
          top: 0;
          transform: rotate(45deg);
        }

        .zigzag-arrow-container::after {
          bottom: 0;
          transform: rotate(-45deg);
        }
      `}</style>

      <div className="zigzag-arrow-container"></div>
    </div>
  );
}

export default ZigZagArrow;
