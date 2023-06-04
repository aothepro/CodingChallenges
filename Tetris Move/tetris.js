const input = ["L", "3", "4", "4", "5", "6", "2", "0", "6", "5", "3", "6", "6"];

const MAX_COLUMN = 12;
const PIECES = {
  I: [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],
  J: [
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
  ],
  L: [
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],

  // Add your other shapes here
};

const fillBoard = (input) => {
  const board = [];
  const boardPeak = Math.max(...input);

  for (let row = 0; row < boardPeak; row++) {
    const rowArray = [];
    for (let col = 0; col < MAX_COLUMN; col++) {
      rowArray.push(input[col] > row ? 1 : 0);
    }
    board.push(rowArray);
  }
  while (board.length < 10) {
    board.push(Array(MAX_COLUMN).fill(0));
  }
  return board;
};

const calculateRowsFilled = (board) =>
  board.reduce((acc, rows) => acc + (rows.some((row) => row === 0) ? 0 : 1), 0);

function ArrayChallenge(strArr) {

  // code goes here

  const pieceLetter = strArr[0];
  const board = fillBoard(strArr.slice(1).map(Number));

  let maxCompletedRows = 0;

  // Loop through all the piece rotation shape
  for (let i = 0; i < PIECES[pieceLetter].length; i++) {
    const shape = PIECES[pieceLetter][i];

    // // Loop thorugh the entire columns
    for (let col = 0; col < MAX_COLUMN; col++) {
      let loweredShapeBoard = [];

      for (let row = 0; row < board.length; row++) {
        const newBoard = placeShapeOnBoard(shape, board, row, col);
        if (!newBoard) {
          break;
        }
        loweredShapeBoard = newBoard;
      }
      // console.log(loweredShapeBoard);
      // console.log(calculateRowsFilled(loweredShapeBoard));
      // printBoard(loweredShapeBoard);
      maxCompletedRows = Math.max(
        maxCompletedRows,
        calculateRowsFilled(loweredShapeBoard)
      );
    }
  }

  return maxCompletedRows;
}

const placeShapeOnBoard = (shape, board, y, x) => {
  const newBoard = JSON.parse(JSON.stringify(board));

  // Handle limits
  if (x + shape[0].length > MAX_COLUMN) {
    return null;
  }
  if (y > newBoard.length) {
    return null;
  }

  for (
    let row = newBoard.length - 1; row >= newBoard.length - shape.length; row--
  ) {
    for (let col = 0; col < shape[0].length; col++) {
      if (!shape[newBoard.length - row - 1]) return null;
      if (!newBoard[row - y]) return null;
      if (shape[newBoard.length - row - 1][col] === 1) {
        if (newBoard[row - y][col + x] === 1) {
          return null;
        }
        newBoard[row - y][col + x] = 1;
      }
    }
  }
  return newBoard;
};


const printBoard = (board, piece, index) => {
  if (!board) {
    console.log("NO BOARD TO PRINT");
    return;
  }
  let boardToPrint = JSON.parse(JSON.stringify(board));

  boardToPrint = boardToPrint.reverse();
  let rowStr = "";
  for (let i = 0; i < boardToPrint.length; i++) {
    for (let j = 0; j < MAX_COLUMN; j++) {
      rowStr += boardToPrint[i][j] ? boardToPrint[i][j] : 0;
    }
    rowStr += "\n";
  }
  console.log(rowStr);
};

console.log(JSON.stringify(ArrayChallenge(input5), null, 0));
