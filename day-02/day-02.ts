import * as fs from 'fs';

const calculateDistance = (data: string[]): Record<string, number> => {
  let horizontal = 0, depth = 0;
  data.forEach((row) => {
    const [direction, distance] = row.split(' ');
    if (direction == 'forward') horizontal += +distance;
    else {
      depth += (direction == 'up' ? -1 : 1) * +distance;
    }
  });
  return { horizontal, depth };
};

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(calculateDistance(data));