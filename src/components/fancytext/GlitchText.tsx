'use client'


import React from 'react';
import styled, { keyframes } from 'styled-components';


// Keyframes for glitch effect
const glitch = keyframes`
  1% { transform: rotateX(10deg) skewX(90deg); }
  2% { transform: rotateX(0deg) skewX(0deg); }
`;

const noise1 = keyframes`
  0% { clip-path: inset(0 0 50% 0); }
  50% { clip-path: inset(20% 0 30% 0); }
  100% { clip-path: inset(0 0 50% 0); }
`;

const noise2 = keyframes`
  0% { clip-path: inset(50% 0 0 0); }
  50% { clip-path: inset(30% 0 20% 0); }
  100% { clip-path: inset(50% 0 0 0); }
`;

// Glitch component styled
const StyledGlitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto; // Center if needed
  z-index: -1; // Z INDEX
`;

const GlitchText = styled.div`
  color: rgb(0, 0, 0);
  font-family: "Oswald", sans-serif;
  font-style: italic;
  font-size: 9vw;
  position: relative;
  animation: ${glitch} 5s infinite;

  &::before, &::after {
    content: attr(data-text);
    position: absolute;
    
    top: 0;
    overflow: hidden;
    animation: ${glitch} 5s infinite;
  }

  &::before {
    left: -2px;
    text-shadow: -5px 0 rgb(250, 204, 21);
    animation: ${noise1} 3s linear infinite;
  }

  &::after {
    left: 2px;
    text-shadow: -5px 0 yellow;
    animation: ${noise2} 3s linear infinite;
  }
`;

const GlowText = styled(GlitchText)`
  color: transparent;
  text-shadow: 0 0 1000px rgb(223, 153, 77);
  position: absolute;
`;

const Subtitle = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  font-size: 1vw;
  color: black;
  text-transform: uppercase;
  letter-spacing: 1em;
  animation: ${glitch} 5s infinite;
`;

// Main Component
const GlitchComponent = () => {
  return (
    
    <StyledGlitchContainer>
      <GlitchText data-text="MusAI">MusAI</GlitchText>
      <GlowText data-text="MusAI">MusAI</GlowText>
      
    </StyledGlitchContainer>
  );
};

export default GlitchComponent;
