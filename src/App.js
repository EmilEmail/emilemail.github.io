import { useState, useEffect } from 'react';
import { AppWrapper } from './styled-components/AppWrapper';
import { PopUpImg } from './styled-components/Img';
import SiteLock from './components/SiteLock';
import InfoBox from './components/InfoBox';
import { Heading1 } from './styled-components/Heading1';
import { about } from './info/about';
import { ibinder } from './info/ibinder';
import { zunnyPeople } from './info/zunnyPeople';
import { handelsbanken } from './info/handelsbanken';
import ButtonAnimation from './components/ButtonAnimation';
import StarAnimation from './components/StarAnimation';
import InfoButton from './components/InfoButton';

function App() {
  const [modal, setModal] = useState(null);

  const [isLocked, setisLocked] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);

  const [firstObject, setFirstObjUp] = useState(false);
  const [firstObjectPosition, setFirstObjectPosition] = useState();

  const [secondObjectStart, setSecondObjectStart] = useState(false);
  const [secondObjectPosition, setSecondObjectPosition] = useState();

  const [thirdObjectStart, setThirdObjectStart] = useState(false);
  const [thirdObjectPosition, setThirdObjectPosition] = useState();

  const [forthObjectStart, setForthObjectStart] = useState(false);
  const [forthObjectPosition, setForthObjectPosition] = useState();

  useEffect(() => {
    if (isLocked) {
      setStartAnimation(false);
    } else {
      setStartAnimation(true);
    }
  }, [isLocked]);

  useEffect(() => {
    const getRandomPosition = () => {
      const top = getRandom(0, window.innerHeight - 200);
      const left = getRandom(0, window.innerWidth);
      return { top, left };
    };
    if (startAnimation) {
      setFirstObjectPosition(getRandomPosition());
      setTimeout(() => {
        setFirstObjUp(true);
        setSecondObjectPosition(getRandomPosition());
        setTimeout(() => {
          setSecondObjectStart(true);
          setThirdObjectPosition(getRandomPosition());
          setTimeout(() => {
            setThirdObjectStart(true);
            setForthObjectPosition(getRandomPosition());
            setTimeout(() => {
              setForthObjectStart(true);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 1000);
    }
  }, [startAnimation]);

  const getRandom = (min, max) => {
    max -= 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className="App">
      <AppWrapper>
        {!isLocked && <Heading1>Emil Edberg</Heading1>}
        {isLocked && <PopUpImg src="/logo512.svg" alt="logo" />}
        {isLocked && <SiteLock setIsLocked={setisLocked} />}

        {startAnimation && firstObjectPosition && (
          <StarAnimation
            widthHeight={50}
            centeredPosition={firstObjectPosition}
          />
        )}
        {firstObject && (
          <InfoButton
            position={firstObjectPosition}
            text={'Om mig'}
            handleClick={() => setModal(about)}
          />
        )}

        {startAnimation && secondObjectPosition && (
          <StarAnimation
            widthHeight={50}
            centeredPosition={secondObjectPosition}
            delay={1}
          />
        )}
        {secondObjectStart && (
          <InfoButton
            position={secondObjectPosition}
            text={
              <img
                width="100px"
                src={zunnyPeople.imgSrc}
                alt={zunnyPeople.imgAlt}
              />
            }
            handleClick={() => setModal(zunnyPeople)}
          />
        )}

        {startAnimation && thirdObjectPosition && (
          <StarAnimation
            widthHeight={50}
            centeredPosition={thirdObjectPosition}
            delay={1}
          />
        )}
        {thirdObjectStart && (
          <InfoButton
            position={thirdObjectPosition}
            text={
              <img
                width="150px"
                src={handelsbanken.imgSrc}
                alt={handelsbanken.imgAlt}
              />
            }
            handleClick={() => setModal(handelsbanken)}
          />
        )}

        {startAnimation && forthObjectPosition && (
          <StarAnimation
            widthHeight={50}
            centeredPosition={forthObjectPosition}
            delay={1}
          />
        )}
        {forthObjectStart && (
          <InfoButton
            position={forthObjectPosition}
            text={
              <img
                width="100px"
                src={ibinder.imgSrc}
                alt={ibinder.imgAlt}
              />
            }
            handleClick={() => setModal(ibinder)}
          />
        )}

        {modal && (
          <InfoBox info={modal} handleClick={() => setModal(null)} />
        )}
        {isLocked && (
          <button
            style={{
              position: 'fixed',
              top: 8,
              right: 8,
              border: 'none',
              color: 'white',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => setisLocked(false)}
          >
            Skip
          </button>
        )}
      </AppWrapper>
    </div>
  );
}

export default App;
