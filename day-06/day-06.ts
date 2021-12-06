import * as fs from 'fs';

const calculateFishCount = (fish: number[]): number[] => {
  const newData = new Array(9).fill(0);
  for (let idx = 9; idx >= 0; --idx) {
    const newIdx = idx - 1;
    if (newIdx < 0) {
      newData[8] = fish[idx];
      newData[6] += fish[idx];
    }
    else newData[newIdx] = fish[idx];
  }
  return newData;
}

const buildData = (data: number[]): number[] => {
  let newData = new Array(9).fill(0);
  for (let i = 0; i < data.length; ++i) {
    const dataIdx = data[i];
    newData[dataIdx]++;
  }
  return newData;
}

const simulateFish = (data: number[], days: number): number[] => {
  let builtData = buildData(data);
  for(let d = 0; d < days; ++d) {
    const afterDay = calculateFishCount(builtData)
    builtData = afterDay;
  }
  return builtData;
}
const data: number[] = fs.readFileSync('./input.txt', 'utf-8').split(',').map((n) => +n);
console.log(simulateFish(data, 256).reduce((a, b) => a + b, 0));
