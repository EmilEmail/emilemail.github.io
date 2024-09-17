import React from 'react';
import styled from 'styled-components';

export const MOCK_INFO = {
  heading: 'Testar',
  imgSrc: '/img/padlock.png',
  smallDesc:
    'Detta är en liten testvariant för att se om det fungerar bra.',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel officiis necessitatibus incidunt cupiditate cum consequuntur, vero perspiciatis delectus. Voluptates quisquam delectus excepturi dolore aut doloremque iste earum numquam nulla veritatis.',
};

export const Wrapper = styled.section`
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #0000006a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
export const InfoBoxStyle = styled.div`
  background-color: antiquewhite;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  border-radius: 2rem;
  border: 8px solid #96836b;
  padding: 4rem;
  animation: testing 3s forwards ease-in;
  @keyframes testing {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  text-align: center;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: 300ms;
  &:hover {
    background-color: #6b1a1a62;
    cursor: pointer;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;
const Img = styled.img`
  width: 200px;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;
const SmallDesc = styled.p`
  font-style: italic;
  background-color: ;
`;
const Desc = styled.p`
  margin-top: 2rem;
  padding: 2rem;
  width: 75%;
  background-color: #c0ad95;
  border-radius: 0.5rem;
  &::first-letter {
    font-size: xx-large;
  }
`;

export default function InfoBox({ info, handleClick }) {
  if (!info) {
    info = MOCK_INFO;
  }
  return (
    <Wrapper>
      <InfoBoxStyle>
        <CloseButton onClick={handleClick}>X</CloseButton>
        <Heading>{info.heading}</Heading>
        <Img src={info.imgSrc} alt={info.imgAlt} />
        <SmallDesc
          dangerouslySetInnerHTML={{ __html: info.smallDesc }}
        />
        <Desc dangerouslySetInnerHTML={{ __html: info.desc }} />
      </InfoBoxStyle>
    </Wrapper>
  );
}
