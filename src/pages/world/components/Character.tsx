import {
  useEffect, useState,
} from 'react';
import {
  AnimatedSprite, useApp, Container,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

const characterSpritesheet = './assets/characters/default.json';
const MOVE_DISTANCE = 10;

const Character = () => {
  const pixiApp = useApp();
  const [frames, setFrames] = useState<PIXI.Texture<PIXI.Resource>[]>([]);
  const [xPos, setXPos] = useState(50);
  const [yPos, setYPos] = useState(50);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [initialFrame, setInitialFrame] = useState(0);

  useEffect(() => {
    pixiApp.loader.add(characterSpritesheet).load((_, resource) => {
      setFrames(
        Object.keys(resource[characterSpritesheet].data.frames)
          .map((frame) => PIXI.Texture.from(frame)),
      );

      document.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'ArrowLeft':
            setXPos((currentPos) => currentPos - MOVE_DISTANCE);
            setAnimationPlayed(true);
            setInitialFrame(12);
            break;
          case 'ArrowRight':
            setXPos((currentPos) => currentPos + MOVE_DISTANCE);
            setAnimationPlayed(true);
            setInitialFrame(8);
            break;
          case 'ArrowUp':
            setYPos((currentPos) => currentPos - MOVE_DISTANCE);
            setAnimationPlayed(true);
            setInitialFrame(4);
            break;
          case 'ArrowDown':
            setYPos((currentPos) => currentPos + MOVE_DISTANCE);
            setAnimationPlayed(true);
            setInitialFrame(0);
            break;
          default:
            break;
        }
      });
    });

    return () => pixiApp.loader.destroy();
  }, []);

  useEffect(() => {
    if (animationPlayed) {
      setTimeout(() => {
        setAnimationPlayed(false);
      }, 500);
    }
  }, [animationPlayed]);

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
