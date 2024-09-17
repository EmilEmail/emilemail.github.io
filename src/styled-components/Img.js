import styled from 'styled-components';

export const PopUpImg = styled.img`
  width: 30vw;
  animation: goInGoOut 4s ease-in-out forwards;
  @keyframes goInGoOut {
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
