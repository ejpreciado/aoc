import * as fs from 'fs';

const summation = (val: number): number => {
  let total = 0;
  for (let idx = 1; idx <= val; ++idx) {
    total += idx;
  }
  return total;
}

const findLeastGas = (data: number[]): number => {
  const maxValue = Math.max(...data);
  let distanceArray = new Array(maxValue + 1).fill(0);
  for (let idx = 0; idx < distanceArray.length; ++idx) {
      data.forEach((val) => {
          const distance = Math.abs(val - idx);
          const gas = summation(distance);
          distanceArray[idx] += gas;
      });
  }
  const minGas = Math.min(...distanceArray);
  return minGas;
}

const data = fs.readFileSync('./input.txt', 'utf-8').split(',').map((n) => +n);
const sample = [16,1,2,0,4,2,7,1,2,14];
console.log(findLeastGas(data));