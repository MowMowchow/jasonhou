import { FordleTrie, FordleTrieChild } from "../../../internal/models/fordle";

export const GET_BOARD_URL =
  process.env?.NEXT_PUBLIC_GET_BOARD_URL !== undefined
    ? process.env.NEXT_PUBLIC_GET_BOARD_URL
    : "";

export const Points = [
  0, // len 0
  0, // len 1
  0, // len 2
  100, // len 3
  400, // len 4
  800, // len 5
  1400, // len 6
  1800, // len 7
  2200, // len 8
  2600, // len 9
  3000, // len 10
  3400, // len 11
  3800, // len 12
  4200, // len 13
  4800, // len 14
  5200, // len 15
  5600, // len 16
  6000, // len 17
];

export let trie: FordleTrie = {
  Children: {} as FordleTrieChild,
  IsWord: false,
};
