import { useEffect, useState } from 'react';
import { Sprite, Stage } from '@inlet/react-pixi';

import useWindowSize from '../../hooks/useWindowSize';

const World = () => {
  const windowSize = useWindowSize();
  const [stageWidth, setStageWidth] = useState<number | undefined>(0);
  const [stageHeight, setStageHeight] = useState<number | undefined>(0);

  useEffect(() => {
    setStageWidth(windowSize.width);
    setStageHeight(windowSize.height);
  }, [windowSize]);

  return (
    <>
      <Stage width={stageWidth} height={stageHeight}>
        <Sprite image="./assets/bg/default.png" x={0} y={0} />
      </Stage>
    </>
  );
};

export default World;
