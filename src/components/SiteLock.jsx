import React, { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Lock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  img {
    height: 100px;
  }
  animation: GetIn 4s ease-in forwards 4s;

  @keyframes GetIn {
    0% {
      opacity: 0;
      gap: 0;
    }
    100% {
      opacity: 1;
      gap: 10rem;
    }
  }
`;

const Heading2 = styled.h2`
  z-index: 1;
  justify-self: center;
  align-self: center;
  justify-self: center;
  animation: blink 1s infinite;
  color: white;
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default function SiteLock({ setIsLocked }) {
  const dragObjRef = useRef();
  const dragEnterObj = useRef();

  const onDragStart = (e) => {
    dragObjRef.current = e.target.id;
  };
  const onDragEnter = (e) => {
    dragEnterObj.current = e.target.alt;
  };
  const onDragEnd = (e) => {
    const key = e.target.alt;
    if (dragEnterObj.current === 'padlock' && key === 'key') {
      setIsLocked(false);
    }
  };

  return (
    <Wrapper>
      <Heading2>Open the lock to continue</Heading2>
      <Lock>
        <img
          onDragEnter={onDragEnter}
          src="/img/padlock.png"
          alt="padlock"
        />
        <img
          onTouchStart={(e) => onDragStart(e)}
          onDragStart={(e) => onDragStart(e)}
          onDragEnd={onDragEnd}
          onTouchEnd={onDragEnd}
          src="/img/key.png"
          draggable
          alt="key"
        />
      </Lock>
    </Wrapper>
  );
}
