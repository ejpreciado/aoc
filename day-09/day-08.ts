import * as fs from 'fs';

const checkAdjacent = (data: number[][], row: number, column: number): boolean => {
  const current = data[row][column];
  const lower: boolean[] = [];
  if (row - 1 >= 0) {
    const val = data[row-1][column] > current;
    lower.push(val);
  }
  if (row + 1 < data.length) {
   const val = data[row + 1][column] > current;
    lower.push(val);
  }
  if (column - 1 >= 0) {
    const val =  data[row][column-1] > current;
    lower.push(val);
  }
  if (column + 1 < data[0].length) {
    const val = data[row][column+1] > current;
    lower.push(val);
  }
  return lower.every((boo) => !!boo);
}

const getLowPoints = (data: number[][]): number => {
  const lowPoints: number[] = [];
  for (let x = 0; x < data.length; ++x) {
    for (let y = 0; y < data[0].length; ++y) {
      const isLow = checkAdjacent(data, x, y);
      if (isLow) {
        lowPoints.push(data[x][y]);
        console.log({ x, y});
      }
    }
  }
  const sum = lowPoints.reduce((partial_sum, a) => partial_sum + a, 0) + lowPoints.length;
  return sum;
};

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((row) => row.split('').map((n) => +n));
console.log(getLowPoints(data));
