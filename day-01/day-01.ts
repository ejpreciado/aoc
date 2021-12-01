import * as fs from 'fs';

const calculateIncreasing = (depths: number[]): number => {
  let increasingValues = 0;
  for(let idx = 1; idx < depths.length; ++idx) {
    const prevValue = depths[idx-1];
    const currValue = depths[idx];
    if (currValue - prevValue > 0) increasingValues++;
  }
  return increasingValues;
}

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((num) => +num);
console.log(calculateIncreasing(data));