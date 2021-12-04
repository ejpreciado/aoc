import * as fs from 'fs';

const formatBoards = (data: string[]): string[][][] => {
  let boards: string[][][] = [];
  let tempBoard: string[][] = []
  for(let idx = 2; idx < data.length; ++idx) {
    if (data[idx] == '') {
      boards.push(tempBoard);
      tempBoard = [];
    } else {
      const numRow = data[idx].split(' ').filter((r) => !!r);
      tempBoard.push(numRow);
    }
  }
  return boards;
}

const processMove = (boards: string[][][], value: string): string[][][] => {
  let boardCopies: string[][][] = [];
  boards.forEach((board) => {
    let boardCopy: string[][] = [];
    board.forEach((row) => {
      const inRow = row.includes(value);
      let rowCopy = row;
      if (inRow) {
        rowCopy = row.map((r) => r == value ? 'x' : r);
      }
      boardCopy.push(rowCopy);
    });
    if (isBoardWinner(boardCopy)) {
      console.log('WINNER');
      console.log({ value });
      console.log({ board });
    } else {
      boardCopies.push(boardCopy);
    }
  });
  return boardCopies;
}
const isBoardWinner = (board: string[][]): boolean => {
  let isWinner = false;
  const rowWinner = board.some((r) => r.every((val) => val == 'x'));
  if (rowWinner) {
    isWinner = true;
  }
  for(let idx = 0; idx < board[0].length; ++idx) {
    if (board[idx][0] == 'x' && board[idx][1] == 'x' && board[idx][2] == 'x' && board[idx][3] == 'x' && board[idx][4] == 'x') {
      isWinner = true;
    }
  }
  return isWinner;
}
const checkWinner = (boards: string[][][]): Record<string, boolean | string[][]> => {
  let isWinner = false;
  let boardWinner: string[][] = [];
  boards.forEach((board) => {
    const rowWinner = board.some((r) => r.every((val) => val == 'x'));
    if (rowWinner) {
      isWinner = true;
      boardWinner = board;
      return;
    }
    for(let idx = 0; idx < board[0].length; ++idx) {
      if (board[idx][0] == 'x' && board[idx][1] == 'x' && board[idx][2] == 'x' && board[idx][3] == 'x' && board[idx][4] == 'x') {
        isWinner = true;
        boardWinner = board;
        return;
      }
    }
  });
  return { isWinner, boardWinner };
}

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const numberDraw = data[0].split(',');
let boards = formatBoards(data);
numberDraw.forEach((numb) => {
  boards = processMove(boards, numb);
  const { isWinner, boardWinner } = checkWinner(boards);
  if (isWinner) {
    console.log({ numb });
    console.log({ boardWinner });
  }
});