'use client'
import React from 'react';

const ArrowAnimation: React.FC = () => {
  return (
    <div className="arrow">
      <span></span>
      <span></span>
      <span></span>

      <style jsx>{`
        body {
          background-color: #322b2b;
        }

        .arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(310deg); /* Rotate to make arrow point downward */
          cursor: pointer;
        }

        .arrow span {
          display: block;
          width: 1.5vw;
          height: 1.5vw;
          border-bottom: 5px solid black;
          border-right: 5px solid black;
          transform: rotate(90deg);
          margin: -10px;
          animation: animate 2s infinite;
        }

        .arrow span:nth-child(2) {
          animation-delay: -0.2s;
        }

        .arrow span:nth-child(3) {
          animation-delay: -0.4s;
        }

        @keyframes animate {
          0% {
            opacity: 0;
            transform: rotate(180deg) translate(-20px, 20px); /* Change to move downward */
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(90deg) translate(20px, -20px); /* Move downward instead of left-right */
          }
        }
      `}</style>
    </div>
  );
};

export default ArrowAnimation;
