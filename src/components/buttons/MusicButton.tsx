'use client'

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface MusicButtonProps {
  children: React.ReactNode
}


const MusicButton: React.FC<MusicButtonProps> = ({ children }) => {
  return (
    <StyledWrapper>
      <Link href="/info">
      <button className="button button-item">
        <span className="button-bg">
          <span className="button-bg-layers">
            <span className="button-bg-layer button-bg-layer-1 -purple" />
            <span className="button-bg-layer button-bg-layer-2 -turquoise" />
            <span className="button-bg-layer button-bg-layer-3 -yellow" />
          </span>
        </span>
        <span className="button-inner">
          <span className="button-inner-static">INFO</span>
          <span className="button-inner-hover">INFO</span>
        </span>
      </button>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    all: unset;
  }

  .button {
    position: relative;
    display: inline-flex;
    height: 2rem;
    align-items: center;
    border-radius: 9999px;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    font-family: Helvetica Neue;
    font-size: 1.4rem;
    font-weight: 550;
    color: #fafaf6;
    letter-spacing: -0.01em;
  }

  .button-item {
    background-color: transparent;
    color: #1d1d1f;
  }

  .button-item .button-bg {
    border-color: rgba(255, 208, 116);
    background-color: rgba(220, 38, 38);
  }

  .button-inner,
  .button-inner-hover,
  .button-inner-static {
    pointer-events: none;
    display: block;
  }

  .button-inner {
    position: relative;
  }

  .button-inner-hover {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(70%);
  }

  .button-bg {
    overflow: hidden;
    border-radius: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 1.8s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button-bg,
  .button-bg-layer,
  .button-bg-layers {
    display: block;
  }

  .button-bg-layers {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: -60%;
    aspect-ratio: 1 / 1;
    width: max(200%, 10rem);
  }

  .button-bg-layer {
    border-radius: 9999px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
  }

  .button-bg-layer.-purple {
    background-color: rgba(248, 113, 113);
  }

  .button-bg-layer.-turquoise {
    background-color: rgba(254, 202, 202);
  }

  .button-bg-layer.-yellow {
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  }

  .button:hover .button-inner-static {
    opacity: 0;
    transform: translateY(-70%);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-inner-hover {
    opacity: 1;
    transform: translateY(0);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button:hover .button-bg-layer {
    transition:
      transform 1.3s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-bg-layer-1 {
    transform: scale(1);
  }

  .button:hover .button-bg-layer-2 {
    transition-delay: 0.1s;
    transform: scale(1);
  }

  .button:hover .button-bg-layer-3 {
    transition-delay: 0.2s;
    transform: scale(1);
  }`;

export default MusicButton;
