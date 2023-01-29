import {
  Board,
  FordleTrie,
  FordleTrieChild,
} from "../../../internal/models/fordle";
import { GET_BOARD_URL, trie } from "./config";

export async function getBoard(boardSize: number): Promise<Board> {
  const boardResponse = await fetch(`${GET_BOARD_URL}/${boardSize}`);
  const board: Board = await boardResponse.json();
  board.Words = board.Words[0].split(" ");
  if (board.Words[board.Words.length - 1] === "") {
    board.Words.pop();
  }

  buildTrie(trie, board.Words);

  return board;
}

export function buildTrie(trie: FordleTrie, wordList: string[]) {
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
}

export function isWordDfs(trie: FordleTrie, word: string, ind: number): number {
  if (word.length === ind && trie.IsWord) {
    return trie?.WordIndex ? trie.WordIndex : -1;
  } else if (ind < word.length) {
    if (trie?.Children[word[ind]]) {
      return isWordDfs(trie.Children[word[ind]], word, ind + 1);
    }
  }
  return -1;
}
