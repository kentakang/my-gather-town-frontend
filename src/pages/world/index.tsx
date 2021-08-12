import { useEffect, useState } from 'react';
import { Stage } from '@inlet/react-pixi';

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
      <Stage width={stageWidth} height={stageHeight} />
    </>
  );
};

export default World;
