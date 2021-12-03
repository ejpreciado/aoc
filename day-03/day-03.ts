import * as fs from 'fs';

const calculateGammaEpsilon = (data: string[]): Record<number, Record<string, number>> => {
  const bitMap: Record<number, Record<string, number>> = {};
  data.forEach((value) => {
    for(let idx = 0; idx < value.length; ++idx) {
      if(value[idx] == '0') {
        if(bitMap[idx] && bitMap[idx]['0']) bitMap[idx]['0']++
        else {
          if(bitMap[idx]) bitMap[idx]['0'] = 1;
          else bitMap[idx] = {'0': 1 }
        }
      } else {
        if(bitMap[idx] && bitMap[idx]['1']) bitMap[idx]['1']++
        else {
          if(bitMap[idx]) bitMap[idx]['1'] = 1;
          else bitMap[idx] = {'1': 1 }
        }
      }
    }
  });
  return bitMap;
}

const calculateO2CO2 = (data: string[]): Record<string, string> => {
  let o2: string[] = data, co2: string[] = data;
  let dataMapO2 = calculateGammaEpsilon(o2);
  let dataMapCO2 = calculateGammaEpsilon(co2);
  for (let idx = 0; dataMapO2[idx]; ++idx) {
    const o2idx: string = dataMapO2[idx]['0'] > dataMapO2[idx]['1'] ? '0' : '1';
    if (o2.length > 1) {
      o2 = o2.filter((val) => val.charAt(idx) == o2idx)
      dataMapO2 = calculateGammaEpsilon(o2);
    }
  }
  for (let idx = 0; dataMapCO2[idx]; ++idx) {
    const co2idx: string = dataMapCO2[idx]['1'] < dataMapCO2[idx]['0'] ? '1' : '0';
    if (co2.length > 1) {
      co2 = co2.filter((val) => val.charAt(idx) == co2idx)
      dataMapCO2 = calculateGammaEpsilon(co2);
    }
  }
  return { 'o2': o2[0], 'co2': co2[0]};
}

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log(calculateO2CO2(data));