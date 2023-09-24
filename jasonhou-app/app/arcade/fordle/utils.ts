import {
  Board,
  FordleTrie,
  FordleTrieChild,
} from "../../../internal/models/fordle";
import { GET_BOARD_URL, trie } from "./config";

export const getBoard = async (boardSize: number): Promise<Board> => {
  const boardResponse = await fetch(`${GET_BOARD_URL}/${boardSize}`);
  const board: Board = await boardResponse.json();
  board.Words = board.Words[0].split(" ");
  if (board.Words[board.Words.length - 1] === "") {
    board.Words.pop();
  }

  buildTrie(trie, board.Words);

  return board;
};

export const buildTrie = (trie: FordleTrie, wordList: string[]) => {
  function tDfs(word: string, wordIndex: number, ind: number, t: FordleTrie) {
    if (ind === word.length) {
      return;
    }
    if (!t.Children?.[word[ind]]) {
      let tempChild: FordleTrie = {
        Children: {} as FordleTrieChild,
        IsWord: false,
      };
      t.Children[word[ind]] = tempChild;
    }
    if (ind === word.length - 1) {
      t.Children[word[ind]].IsWord = true;
      t.Children[word[ind]].Word = word;
      t.Children[word[ind]].WordIndex = wordIndex;
    }
    tDfs(word, wordIndex, ind + 1, t.Children[word[ind]]);
  }
  wordList.forEach((word, index) => {
    tDfs(word, index, 0, trie);
  });
};

export const isWordDfs = (
  trie: FordleTrie,
  word: string,
  ind: number
): number => {
  if (word.length === ind && trie.IsWord) {
    return trie?.WordIndex ? trie.WordIndex : -1;
  } else if (ind < word.length) {
    if (trie?.Children[word[ind]]) {
      return isWordDfs(trie.Children[word[ind]], word, ind + 1);
    }
  }
  return -1;
};

export const findWord = (
  word: string,
  board: string[],
  vis: number[][]
): number[][] => {
  if (word.length < 1) return vis;
  const R = board.length;
  const C = board[0].length;
  const moves: number[][] = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  const wordHere = (
    cx: number,
    cy: number,
    cLet: number,
    currVis: number[][]
  ): boolean => {
    if (cLet === word.length) return true;

    for (const [mx, my] of moves) {
      if (0 <= cx + mx && cx + mx < C && 0 <= cy + my && cy + my < R) {
        if (
          board[cy + my][cx + mx] === word[cLet] &&
          currVis[cy + my][cx + mx] === 0
        ) {
          currVis[cy + my][cx + mx] = cLet + 1;
          if (wordHere(cx + mx, cy + my, cLet + 1, currVis)) return true;
          currVis[cy + my][cx + mx] = 0;
        }
      }
    }
    return false;
  };

  for (let row = 0; row < R; row++) {
    for (let col = 0; col < C; col++) {
      if (board[row][col] === word[0]) {
        const tempVis = new Array(R).fill(0).map(() => new Array(C).fill(0));
        tempVis[row][col] = 1;
        if (wordHere(col, row, 1, tempVis)) {
          vis = tempVis;
          return vis;
        }
      }
    }
  }
  return vis;
};
