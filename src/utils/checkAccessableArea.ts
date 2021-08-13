import { Area } from './loadMap';

const checkAccessableArea = (areas: Area[], x: number, y: number) => areas.some((area) => {
  const accessableMaxXCoord = area.width + area.x;
  const accessableMaxYCoord = area.height + area.y;

  if (x <= accessableMaxXCoord && x >= area.x && y <= accessableMaxYCoord && y >= area.y) {
    return true;
  }

  return false;
});

export default checkAccessableArea;
