import * as fs from 'fs';
import { difference, intersection } from 'lodash';
                      // 0 .  1 .  2 .  3 . 4 .  5 .  6
const DEFAULT_VALUES = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const NUMBER_MAPPING = {
  0: [0, 1, 2, 4, 5, 6], // 6
  1: [2, 5], // 2
  2: [0, 2, 3, 4, 6], // 5
  3: [0, 2, 3, 5, 6], // 5
  4: [1, 2, 3, 5], // 4
  5: [0, 1, 3, 5, 6], // 5
  6: [0, 1, 3, 4, 5, 6], // 6
  7: [0, 2, 5], // 3
  8: [0, 1, 2, 3, 4, 5, 6], // 7
  9: [0, 1, 2, 3, 5, 6], // 6
}

const processInputToArrays = (data: string[]): string[][][] => {
  return data.map((row) => {
    return row.split(' | ').map((r) => r.split(' '));
  });
}

const countUniqueNumbers = (data: string[][][]): number => {
  let count = 0;
  data.forEach((vals) => {
    const [signalPatterns, output] = vals;
    output.forEach((otpt) => {
      if ([2, 4, 3, 7].includes(otpt.length)) count++;
    });
  });
  return count;
}

const configureMapping = (row: string[]): string[] => {
  let mapping: string[] = [];
  row.forEach((value) => {
    const vLen = value.length;
    switch (vLen) {
      case 2:
        mapping[2] = mapping[5] = value;
        break;
      case 3:
        if (mapping[2] || mapping[5]) {
          mapping[0] = difference(value.split(''), mapping[2].split(''))[0];
        }
        break;
      case 4:
        if (mapping[2] || mapping[5]) {
          mapping[1] = mapping[3] = difference(value.split(''), mapping[2].split('')).join('');
        }
        break;
      case 5: 
        if (mapping[6]) {
          mapping[6] = [...new Set(...intersection(...mapping[6], value.split('')))].join('');
        } else {
          mapping[6] = value;
        }
      default:
        if (mapping[0] && mapping[1] && mapping[2] && mapping[3] && mapping[5]) {
          const totalLetters = new Set(`${mapping[0]}${mapping[1]}${mapping[2]}${mapping[3]}${mapping[5]}`.split(''))
          mapping[4] = mapping[6] = difference('abcdefg'.split(''), [...totalLetters]).join('');
        }
        break;
    }
  });
  return mapping;
}

const processDataRow = (data: string[][][]): number => {
  let output = 0;
  data.forEach((row) => {
    const [input, output] = row;
    let outputNumber: string[] = [];
    output.forEach((v, idx) => {
      if ([2, 4, 3, 7].includes(v.length)){
        if (v.length === 2) outputNumber[idx] = '1';
        else if (v.length === 3) outputNumber[idx] = '7';
        else if (v.length === 4) outputNumber[idx] = '4';
        else outputNumber[idx] = '8'
      }
    })
    console.log(outputNumber);
  });
  return output;
}

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(processDataRow(processInputToArrays(data)));
