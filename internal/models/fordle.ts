export interface Board {
  Board: string[];
  Words: string[];
}

export interface FordleTrieChild {
  [letter: string]: FordleTrie;
}

export interface FordleTrie {
  Children: FordleTrieChild;
  IsWord: boolean;
  Word?: string;
  WordIndex?: number;
}
