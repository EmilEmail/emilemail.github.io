import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  z-index: 2;
  padding: 1rem 2rem;
  border-radius: 50%;
  background: url('/img/splash.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  padding: 4rem;
  color: #fae0e0;
  text-shadow: 0 0 10px black;
  position: absolute;
  font-weight: 900;
  font-size: 1rem;
  border: none;
  top: ${({ position }) => position.top && position.top}px;
  left: ${({ position }) => position.left && position.left}px;
  &:hover {
    background: url('/img/splash-over.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
  }
`;

export default function InfoButton({ text, position, handleClick }) {
  console.log(position);
  return (
    <Button position={position} onClick={handleClick}>
      {text}
    </Button>
  );
}
