import React from 'react';

import styled, { css } from 'styled-components';

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Star = styled.div`
  position: absolute;
  animation: starTop 1s ease-in backwards;
  animation-delay: ${({ delay }) => delay && delay}s;
  background-color: #ab5757;
  border-radius: 50%;
  @keyframes starTop {
    0% {
      top: ${({ startTop }) => startTop}px;
      left: ${({ startLeft }) => startLeft}px;
      width: 0px;
      height: 0px;
    }
    100% {
      box-shadow: 0px 0px 100px yellow;
      top: ${({ centeredPosition }) =>
        centeredPosition && `${centeredPosition.top + 50}px`};
      left: ${({ centeredPosition }) =>
        centeredPosition && `${centeredPosition.left + 50}px`};
      ${({ widthHeight }) =>
        widthHeight &&
        css`
          width: ${widthHeight}px;
          height: ${widthHeight}px;
        `}
    }
  }
`;

export default function StarAnimation({
  centeredPosition,
  widthHeight,
  delay,
}) {
  const startTop = window.innerHeight / 2;
  const startLeft = window.innerWidth / 2;

  return (
    <StarWrapper>
      <Star
        startTop={startTop}
        startLeft={startLeft}
        centeredPosition={centeredPosition}
        widthHeight={widthHeight}
        delay={delay}
      />
    </StarWrapper>
  );
}
