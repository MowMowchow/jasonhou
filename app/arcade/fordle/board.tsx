"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrBoard,
  getCurrBoardSize,
  getCurrVis,
  getCurrWord,
  getCurrWordLen,
  getCurrWordsFound,
  getFetchingBoard,
  getPlayState,
} from "../../redux/reducers/fordle";
import { AppDispatch } from "../../redux/store";
import { trie } from "./config";
import FordleSquare from "./square";
import { getBoard, isWordDfs } from "./utils";

export default function FordleBoard() {
  // Redux Setup
  const dispatch: AppDispatch = useDispatch();
  const {
    playState,
    fetchingBoard,
    currBoard,
    currWord,
    currWordLen,
    currWordsFound,
    currVis,
    currBoardSize,
  } = useSelector((state: any) => {
    return {
      playState: getPlayState(state),
      fetchingBoard: getFetchingBoard(state),
      currBoard: getCurrBoard(state),
      currWord: getCurrWord(state),
      currWordLen: getCurrWordLen(state),
      currWordsFound: getCurrWordsFound(state),
      currVis: getCurrVis(state),
      currBoardSize: getCurrBoardSize(state),
    };
  });

  const [coors, setCoors]: any[] = useState([]);
  const [currLetter, setCurrLetter] = useState("");
  const [isCurrWord, setIsCurrWord] = useState(false);
  const [currX, setCurrX] = useState(Number);
  const [currY, setCurrY] = useState(Number);
  const [isSelecting, setIsSelecting] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  // Dispatches
  function dispatchResetCurrWord() {
    const tempVis = new Array(currBoardSize)
      .fill(0)
      .map(() => new Array(currBoardSize).fill(0));
    dispatch({
      type: "fordle/resetCurrWord",
    });
    dispatch({
      type: "fordle/resetCurrWordLen",
    });
    dispatch({
      type: "fordle/resetCurrVis",
      payload: tempVis,
    });
  }

  async function fetchBoardDispatch() {
    dispatchResetCurrWord();
    const tempBoard = await getBoard(currBoardSize);
    dispatch({
      type: "fordle/setFetchingBoard",
      payload: true,
    });
    dispatch({
      type: "fordle/setCurrBoard",
      payload: tempBoard,
    });
    dispatch({
      type: "fordle/setFetchingBoard",
      payload: false,
    });
  }

  // Check Curr Word Validity
  function isWord() {
    const wordIndex = isWordDfs(trie, currWord, 0);
    if (wordIndex !== -1) {
      const tempMap = new Map<string, number>(currWordsFound);
      tempMap.set(currWord, wordIndex);
      dispatch({
        type: "fordle/addCurrWordsFound",
        payload: tempMap,
      });
      dispatch({
        type: "fordle/addToCurrPoints",
        payload: currWord.length,
      });
    }
  }

  // THINGS TO DO UPON KEY DOWN
  function updateCurrWord() {
    if (
      currVis?.[currY]?.[currX] !== undefined &&
      currVis[currY][currX] === 0
    ) {
      dispatch({
        type: "fordle/addToCurrWord",
        payload: currLetter,
      });
      dispatch({
        type: "fordle/addToCurrWordLen",
      });
    }
  }

  function updateCurrWordInfo() {
    const tempVis = new Array(currBoardSize)
      .fill(0)
      .map(() => new Array(currBoardSize).fill(0));
    currVis.forEach((row, y) => {
      row.forEach((val, x) => {
        tempVis[y][x] = val;
      });
    });
    tempVis[currY][currX] = currWordLen;
    dispatch({
      type: "fordle/setCurrVis",
      payload: tempVis,
    });

    const wordIndex = isWordDfs(trie, currWord, 0);
    if (wordIndex !== -1) {
      setIsCurrWord(true);
      dispatch({
        type: "fordle/setIsCurrWord",
        payload: true,
      });
    } else {
      setIsCurrWord(false);
      dispatch({
        type: "fordle/setIsCurrWord",
        payload: false,
      });
    }
  }

  // Requesting a new board after a game
  useEffect(() => {
    if (playState === 0) {
      fetchBoardDispatch();
    }
  }, [playState]);

  // SET COORDINATES FOR BOARD
  useEffect(() => {
    let tempCoors: any[] = [];
    for (let y = 0; y < currBoardSize; y++) {
      for (let x = 0; x < currBoardSize; x++) {
        tempCoors.push([x, y]);
      }
    }
    setCoors(tempCoors);
  }, [currBoard?.Board]);

  // CHECK TO SEE IF READY TO RENDER
  useEffect(() => {
    if (
      currBoard.Board &&
      currVis &&
      currWord !== undefined &&
      !fetchingBoard
    ) {
      setReadyToRender(true);
    } else {
      setReadyToRender(false);
    }
  }, [currBoard.Board, currVis, currWord, fetchingBoard]);

  // SELECT ACTION TRIGGER
  useEffect(() => {
    if (isSelecting && currLetter !== "") {
      updateCurrWord();
    }
  }, [isSelecting, currX, currY]);
  useEffect(() => {
    if (isSelecting && currLetter !== "") {
      updateCurrWordInfo();
    }
  }, [currWord, currWordLen]);

  // RESET WHEN LETTING GO
  useEffect(() => {
    if (!isSelecting) {
      isWord();
      dispatchResetCurrWord();
    }
  }, [isSelecting]);

  // ??? Don't know if i still need this to initialize
  useEffect(() => {
    dispatchResetCurrWord();
  }, []);

  return readyToRender ? (
    <>
      <div
        className="bg-stone-600 w-96 h-96 text-red shadow-xl rounded-md"
        onMouseDown={() => setIsSelecting(true)}
        onMouseUp={() => setIsSelecting(false)}
        onMouseLeave={() => setIsSelecting(false)}
      >
        <div className="grid grid-cols-4 h-full w-full relative items-center">
          {coors.map((coor: any, ind: number) => (
            <FordleSquare
              key={ind}
              x={coor[0]}
              y={coor[1]}
              letter={
                currBoard?.Board?.[coor[1]]?.[coor[0]] !== undefined
                  ? currBoard.Board[coor[1]][coor[0]]
                  : ""
              }
              setCurrLetter={setCurrLetter}
              setCurrX={setCurrX}
              setCurrY={setCurrY}
            />
          ))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
