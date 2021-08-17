/* eslint-disable no-restricted-syntax */
import { Area } from './loadMap';

const checkAccessableArea = (areas: Area[], x: number, y: number) => {
  let accessableCount = 0;

  for (const area of areas) {
    const accessableMaxXCoord = area.width + area.x;
    const accessableMaxYCoord = area.height + area.y;

    if (x <= accessableMaxXCoord && x >= area.x && y <= accessableMaxYCoord && y >= area.y) {
      accessableCount += 1;

      if (area.accessable === false) {
        return false;
      }
    }
  }

  return accessableCount !== 0;
};

export default checkAccessableArea;
