import React, { useState } from 'react';
import StarAnimation from './StarAnimation';
import InfoButton from './InfoButton';

/*firstObject && (
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
    */

export default function ButtonAnimation({
  position,
  setModal,
  startAnimation,
  text,
  objectStart,
  obj,
  widthHeight = 50,
  delay = 2,
  imgWidth = 100,
}) {
  const [thisPosition] = useState(position);
  return (
    <>
      {startAnimation && thisPosition && (
        <StarAnimation
          widthHeight={widthHeight}
          centeredPosition={thisPosition}
          delay={1}
        />
      )}
      {objectStart && (
        <InfoButton
          position={thisPosition}
          text={text}
          handleClick={() => setModal(obj)}
        />
      )}
    </>
  );
}
