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

const formatDataIntoWindows = (depths: number[]): number[] => {
  let windows: number[] = [];
  for(let idx = 0; idx < depths.length - 2; ++idx) {
    const windowValue = depths[idx] + depths[idx+1] + depths[idx+2];
    windows.push(windowValue);
  }
  return windows;
}

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((num) => +num);
console.log(calculateIncreasing(data));

console.log(calculateIncreasing(formatDataIntoWindows(data)));
