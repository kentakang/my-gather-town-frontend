import {
  useEffect, useState,
  useCallback,
} from 'react';
import {
  AnimatedSprite, useApp, Container,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { Map } from '../../../utils/loadMap';
import checkAccessableArea from '../../../utils/checkAccessableArea';

const characterSpritesheet = './assets/characters/default.json';
const MOVE_DISTANCE = 10;

const Character = ({ map }:{ map: Map }) => {
  const pixiApp = useApp();
  const [frames, setFrames] = useState<PIXI.Texture<PIXI.Resource>[]>([]);
  const [xPos, setXPos] = useState(50);
  const [yPos, setYPos] = useState(50);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [initialFrame, setInitialFrame] = useState(0);

  const keydownEvent = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        setXPos((currentPos) => (
          checkAccessableArea(
            map.areas, currentPos - MOVE_DISTANCE, yPos,
          ) ? currentPos - MOVE_DISTANCE : currentPos));
        setAnimationPlayed(true);
        setInitialFrame(12);
        break;
      case 'ArrowRight':
        setXPos((currentPos) => (
          checkAccessableArea(
            map.areas, currentPos + MOVE_DISTANCE, yPos,
          ) ? currentPos + MOVE_DISTANCE : currentPos));
        setAnimationPlayed(true);
        setInitialFrame(8);
        break;
      case 'ArrowUp':
        setYPos((currentPos) => (
          checkAccessableArea(
            map.areas, xPos, currentPos - MOVE_DISTANCE,
          ) ? currentPos - MOVE_DISTANCE : currentPos));
        setAnimationPlayed(true);
        setInitialFrame(4);
        break;
      case 'ArrowDown':
        setYPos((currentPos) => (
          checkAccessableArea(
            map.areas, xPos, currentPos + MOVE_DISTANCE,
          ) ? currentPos + MOVE_DISTANCE : currentPos));
        setAnimationPlayed(true);
        setInitialFrame(0);
        break;
      default:
        break;
    }
  }, [xPos, yPos]);

  useEffect(() => {
    pixiApp.loader.add(characterSpritesheet).load((_, resource) => {
      setFrames(
        Object.keys(resource[characterSpritesheet].data.frames)
          .map((frame) => PIXI.Texture.from(frame)),
      );
    });

    return () => {
      pixiApp.loader.destroy();
    };
  }, []);

  useEffect(() => {
    if (animationPlayed) {
      setTimeout(() => {
        setAnimationPlayed(false);
      }, 500);
    }
  }, [animationPlayed]);

  useEffect(() => {
    window.addEventListener('keydown', keydownEvent);

    return () => window.removeEventListener('keydown', keydownEvent);
  }, [keydownEvent]);

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container x={xPos} y={yPos}>
      <AnimatedSprite
        isPlaying={animationPlayed}
        animationSpeed={0.1}
        textures={frames}
        width={20}
        height={20}
        initialFrame={initialFrame}
      />
    </Container>
  );
};

export default Character;
