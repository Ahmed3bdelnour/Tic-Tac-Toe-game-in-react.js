import { Player, Winner } from "../types";


export const getWinner = (
  board: string[][],
  boardWidth: number,
  nextPlayer: Player,
  firstPlayer: Player,
  secondPlayer: Player
): Winner => {
  let winner: Winner;

  if (
    isAnyRowOrColumnCompleted(board, boardWidth, firstPlayer, secondPlayer) ||
    isAnyDiagonalCompleted(board, boardWidth, firstPlayer, secondPlayer)
  ) {
    winner = nextPlayer as Winner;
  } else {
    winner = "None";
  }

  return winner;
};

const isAnyRowOrColumnCompleted = (
  board: string[][],
  boardWidth: number,
  firstPlayer: Player,
  secondPlayer: Player
): boolean => {
  for (let x = 0; x < boardWidth; x++) {
    const { rowCells, columnCells } = getCellsValuesForRowAndColumnByIndex(
      x,
      board,
      boardWidth
    );

    const isRowCompleted = isCompleted(
      rowCells,
      boardWidth,
      firstPlayer,
      secondPlayer
    );

    if (isRowCompleted) return isRowCompleted;

    const isColumnCompleted = isCompleted(
      columnCells,
      boardWidth,
      firstPlayer,
      secondPlayer
    );

    if (isColumnCompleted) return isColumnCompleted;
  }

  return false;
};

const isAnyDiagonalCompleted = (
  board: string[][],
  boardWidth: number,
  firstPlayer: Player,
  secondPlayer: Player
): boolean => {
  const { firstDiagonalCells, secondDiagonalCells } =
    getCellsValuesForDiagonals(board, boardWidth);

  const isFirstDiagonalCompleted = isCompleted(
    firstDiagonalCells,
    boardWidth,
    firstPlayer,
    secondPlayer
  );

  if (isFirstDiagonalCompleted) return isFirstDiagonalCompleted;

  const isSecondDiagonalCompleted = isCompleted(
    secondDiagonalCells,
    boardWidth,
    firstPlayer,
    secondPlayer
  );

  return isSecondDiagonalCompleted;
};

const getCellsValuesForDiagonals = (
  board: string[][],
  boardWidth: number
): {
  firstDiagonalCells: Player[];
  secondDiagonalCells: Player[];
} => {
  const firstDiagonalCells: Player[] = [];
  const secondDiagonalCells: Player[] = [];

  for (let x = 0, y = boardWidth - 1; x < boardWidth; x++, y--) {
    firstDiagonalCells.push(board[x][x] as Player);
    secondDiagonalCells.push(board[x][y] as Player);
  }

  return {
    firstDiagonalCells,
    secondDiagonalCells,
  };
};

const isCompleted = (
  cells: string[],
  boardWidth: number,
  firstPlayer: Player,
  secondPlayer: Player
): boolean => {
  const CellsConcatenation = concatCells(cells);

  const completeEntryForFirstPlayer = firstPlayer.repeat(boardWidth);
  const completeEntryForSecondPlayer = secondPlayer.repeat(boardWidth);

  return (
    CellsConcatenation === completeEntryForFirstPlayer ||
    CellsConcatenation === completeEntryForSecondPlayer
  );
};

const concatCells = (cells: string[]): string => {
  return cells.reduce((acc, current) => {
    acc = acc + current;
    return acc;
  });
};

const getCellsValuesForRowAndColumnByIndex = (
  index: number,
  board: string[][],
  boardWidth: number
): { rowCells: Player[]; columnCells: Player[] } => {
  const rowCells: Player[] = [];
  const columnCells: Player[] = [];

  for (let y = 0; y < boardWidth; y++) {
    rowCells.push(board[index][y] as Player);
    columnCells.push(board[y][index] as Player);
  }

  return {
    rowCells,
    columnCells,
  };
};
