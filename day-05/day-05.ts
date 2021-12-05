import * as fs from 'fs';

const getGridMap = (data: string[]): Record<string, number> => {
  const gridMap: Record<string, number> = {};
  data.forEach((row) => {
    const points = row.split(' -> ').map((r) => r.split(',').map((n) => +n));
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    if (x1 !== x2 && y1 !== y2) {
      const deltaY = y2 - y1;
      const deltaX = x2 - x1;
      for(let idx = 0; idx <= Math.abs(deltaY); idx++ ) {
        const multY = Math.sign(deltaY) >= 0 ? 1 : -1;
        const multX = Math.sign(deltaX) >= 0 ? 1 : -1;
        const newX = x1 + (multX * idx); 
        const newY = y1 + (multY * idx); 
        const key = `${newX},${newY}`;
        if (gridMap[key]) gridMap[key]++;
        else gridMap[key] = 1;
      }
    } else {
      const isVertical = x1 === x2;
      const start = isVertical ? Math.min(y1, y2) : Math.min(x1, x2);
      const end = isVertical ? Math.max(y1, y2) : Math.max(x1, x2);
      for(let idx = start; idx <= end; ++idx) {
        const key = isVertical ? `${x1},${idx}` : `${idx},${y1}`;
        if (gridMap[key]) gridMap[key]++;
        else gridMap[key] = 1;
      }
    }
  });
  return gridMap;
}

const multiPointCount = (points: Record<string, number>): number => {
  let multiCount = 0;
  for(let point in points) {
    const count = points[point];
    if (count > 1) multiCount++;
  }
  return multiCount;
}

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(multiPointCount(getGridMap(data)));