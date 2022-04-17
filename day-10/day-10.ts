import * as fs from 'fs';

const SCORES = Object.freeze({
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
});

// const validChunk = (chunk: string): string {
//   let isValid = '';
// }
// const solveRow = (data: string[]): string[] => {
//   const chars: string[] = [];
//   data.forEach((row) => {
//     const valid = validChunk
//   })
// }
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
