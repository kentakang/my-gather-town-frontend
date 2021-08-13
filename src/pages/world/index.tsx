import {
  useEffect, useState,
} from 'react';
import {
  Sprite, Stage,
} from '@inlet/react-pixi';

import useWindowSize from '../../hooks/useWindowSize';
import Character from './components/Character';
import loadMap, { Map } from '../../utils/loadMap';

const World = () => {
  const windowSize = useWindowSize();
  const [map, setMap] = useState<Map | null>(null);
  const [stageWidth, setStageWidth] = useState<number | undefined>(0);
  const [stageHeight, setStageHeight] = useState<number | undefined>(0);

  useEffect(() => {
    setStageWidth(windowSize.width);
    setStageHeight(windowSize.height);
  }, [windowSize]);

  useEffect(() => {
    loadMap('./assets/bg/default.json').then((loadedMap) => {
      setMap(loadedMap);
    });
  }, []);

  if (map === null) {
    return null;
  }

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Sprite image={map.info.image} x={0} y={0} />
      <Character />
    </Stage>
  );
};

export default World;
