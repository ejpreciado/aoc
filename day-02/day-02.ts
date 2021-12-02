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

const calculateAimDistance = (data: string[]): Record<string, number> => {
  let horizontal = 0, depth = 0, aim = 0;
  data.forEach((row) => {
    const [direction, distance] = row.split(' ');
    if (direction == 'forward') {
      horizontal += +distance;
      depth += (aim * +distance);
    }
    else {
      aim += (direction == 'up' ? -1 : 1) * +distance;
    }
  });
  return { horizontal, depth, aim };
};
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(calculateDistance(data));
console.log(calculateAimDistance(data));