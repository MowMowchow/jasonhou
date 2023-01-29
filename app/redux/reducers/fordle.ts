import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { Set } from "typescript";
import { Board } from "../../../internal/models/fordle";
import { RootState } from "../store";
import { enableMapSet } from "immer";
import { Points } from "../../arcade/fordle/config";

enableMapSet();

export const initialFordleState = {
  fetchingBoard: true,
  playState: 0,
  currPoints: 0,
  currWord: "",
  currWordLen: 0,
  isCurrWord: false,
  currVis: [[]],
  currWordsFound: new Map<string, number>(),
  currBoard: {} as Board,
  currBoardSize: 4,
};

const setFetchingBoard = createAction<boolean>("fordle/setFetchingBoard");
const setPlayState = createAction<number>("fordle/setPlayState");
const resetCurrPoints = createAction<string>("fordle/resetCurrPoints");
const addToCurrPoints = createAction<number>("fordle/addToCurrPoints");
const resetCurrWord = createAction<string>("fordle/resetCurrWord");
const addToCurrWord = createAction<string>("fordle/addToCurrWord");
const setIsCurrWord = createAction<boolean>("fordle/setIsCurrWord");
const resetCurrWordLen = createAction<number>("fordle/resetCurrWordLen");
const addToCurrWordLen = createAction<number>("fordle/addToCurrWordLen");
const setCurrVis = createAction<[]>("fordle/setCurrVis");
const resetCurrVis = createAction<[]>("fordle/resetCurrVis");
const resetCurrWordsFound = createAction<{}>("fordle/resetCurrWordsFound");
const addCurrWordsFound = createAction<Map<string, number>>(
  "fordle/addCurrWordsFound"
);
const setCurrBoard = createAction<Board>("fordle/setCurrBoard");
const setCurrBoardSize = createAction<number>("fordle/setCurrBoardSize");

export const fordleReducer = createReducer(initialFordleState, (builder) => {
  builder
    .addCase(setFetchingBoard, (state, action) => {
      state.fetchingBoard = action.payload;
    })
    .addCase(setPlayState, (state, action) => {
      state.playState = action.payload;
    })
    .addCase(resetCurrPoints, (state, action) => {
      state.currPoints = 0;
    })
    .addCase(addToCurrPoints, (state, action) => {
      state.currPoints += Points?.[action.payload] ? Points[action.payload] : 0;
    })
    .addCase(resetCurrWord, (state, action) => {
      state.currWord = "";
    })
    .addCase(addToCurrWord, (state, action) => {
      state.currWord += action.payload;
    })
    .addCase(setIsCurrWord, (state, action) => {
      state.isCurrWord = action.payload;
    })
    .addCase(resetCurrWordLen, (state, action) => {
      state.currWordLen = 0;
    })
    .addCase(addToCurrWordLen, (state, action) => {
      state.currWordLen += 1;
    })
    .addCase(setCurrVis, (state, action) => {
      if (action.payload) {
        state.currVis = action.payload;
      }
    })
    .addCase(resetCurrVis, (state, action) => {
      state.currVis = action.payload;
    })
    .addCase(resetCurrWordsFound, (state, action) => {
      state.currWordsFound = new Map<string, number>();
    })
    .addCase(addCurrWordsFound, (state, action) => {
      state.currWordsFound = action.payload;
    })
    .addCase(setCurrBoard, (state, action) => {
      state.currBoard = action.payload;
    })
    .addCase(setCurrBoardSize, (state, action) => {
      state.currBoardSize = action.payload;
    });
});

export const getFetchingBoard = (state: RootState) => {
  return state.fordleReducer.fetchingBoard;
};
export const getPlayState = (state: RootState) => {
  return state.fordleReducer.playState;
};
export const getCurrWordsFound = (state: RootState) => {
  return state.fordleReducer.currWordsFound;
};
export const getCurrPoints = (state: RootState) => {
  return state.fordleReducer.currPoints;
};
export const getCurrWord = (state: RootState) => {
  return state.fordleReducer.currWord;
};
export const getCurrWordLen = (state: RootState) => {
  return state.fordleReducer.currWordLen;
};
export const getIsCurrWord = (state: RootState) => {
  return state.fordleReducer.isCurrWord;
};
export const getCurrVis = (state: RootState) => {
  return state.fordleReducer.currVis;
};
export const getCurrBoard = (state: RootState) => {
  return state.fordleReducer.currBoard;
};
export const getCurrBoardSize = (state: RootState) => {
  return state.fordleReducer.currBoardSize;
};
