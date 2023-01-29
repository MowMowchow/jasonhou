"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrBoardSize,
  getCurrVis,
  getCurrWord,
  getCurrWordsFound,
  getIsCurrWord,
  getPlayState,
} from "../../redux/reducers/fordle";
import { AppDispatch } from "../../redux/store";

type FordleSquareProps = {
  x: number;
  y: number;
  letter: string;
  setCurrLetter: Dispatch<SetStateAction<string>>;
  setCurrX: Dispatch<SetStateAction<number>>;
  setCurrY: Dispatch<SetStateAction<number>>;
};

export default function FordleSquare({
  x,
  y,
  letter,
  setCurrLetter,
  setCurrX,
  setCurrY,
}: FordleSquareProps) {
  // Redux Setup
  const dispatch: AppDispatch = useDispatch();
  const {
    isCurrWord,
    currWord,
    currWordsFound,
    currVis,
    playState,
    currBoardSize,
  } = useSelector((state: any) => {
    return {
      playState: getPlayState(state),
      currWord: getCurrWord(state),
      isCurrWord: getIsCurrWord(state),
      currWordsFound: getCurrWordsFound(state),
      currVis: getCurrVis(state),
      currBoardSize: getCurrBoardSize(state),
    };
  });

  const [currLetter, setCurrLet] = useState(String);
  const [squareStateColor, setSquareStatecolor] = useState(String);
  const [wordLines, setWordLines] = useState<any[]>([]);
  const squareStateColors = {
    Idle: "h-5/6 w-5/6 bg-white flex justify-center rounded-lg shadow-md",
    Used: "h-5/6 w-5/6 bg-yellow-500 flex justify-center rounded-lg shadow-xl text-white",
    Valid:
      "h-5/6 w-5/6 bg-green-500 flex justify-center rounded-lg shadow-xl text-white",
    Invalid:
      "h-5/6 w-5/6 bg-red-500 flex justify-center rounded-lg shadow-xl text-white",
  };

  const lines = [
    [
      "absolute w-[85%] h-1/6 bg-zinc-300 opacity-80 rounded-xl left-[-20%] top-[15%] rotate-45",
      "absolute w-1/6 h-[60%] bg-zinc-300 opacity-80 rounded-b-xl bottom-[40%] left-[41.6%]",
      "absolute w-1/6 h-[85%] bg-zinc-300 opacity-80 rounded-xl right-[15%] bottom-[35%] rotate-45",
    ], // (-1, -1), (0, -1), (1, -1)
    [
      "absolute w-[60%] h-1/6 bg-zinc-300 opacity-80 rounded-r-xl right-[40%] top-[41.6%]",
      "",
      "absolute w-[60%] h-1/6 bg-zinc-300 opacity-80 rounded-l-xl left-[40%] top-[41.6%]",
    ], // (-1, 0), (0, 0), (1, 0)
    [
      "absolute w-1/6 h-[85%] bg-zinc-300 opacity-80 rounded-xl left-[15%] top-[35%] rotate-45",
      "absolute w-1/6 h-[60%] bg-zinc-300 opacity-80 rounded-t-xl top-[40%] right-[41.6%]",
      "absolute w-[85%] h-1/6 bg-zinc-300 opacity-80 rounded-xl left-[30%] top-[65%] rotate-45",
    ], // (-1, 1), (0, 1), (1, 1)
  ];

  const moves = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 0],
    [0, -1],
    [1, -1],
    [-1, 1],
  ];

  // cursor detection
  const handleOnMouseEnter = () => {
    setCurrLetter(currLetter);
    setCurrX(x);
    setCurrY(y);
  };

  const handleOnMouseLeave = () => {};

  // highlighting
  useEffect(() => {
    if (currVis[y][x] >= 1) {
      // square is in selected path
      if (currWordsFound.has(currWord)) {
        // curr word has been found already
        setSquareStatecolor(squareStateColors.Used);
      } else if (isCurrWord) {
        // new valid word
        setSquareStatecolor(squareStateColors.Valid);
      } else {
        // Invalid Word
        setSquareStatecolor(squareStateColors.Invalid);
      }
    } else {
      // idle square
      setSquareStatecolor(squareStateColors.Idle);
    }

    const tempLines = moves.map(([mx, my]) =>
      0 <= x + mx &&
      x + mx < currBoardSize &&
      0 <= y + my &&
      y + my < currBoardSize ? (
        currVis[y + my][x + mx] > 0 &&
        currVis[y][x] > 0 &&
        (currVis[y + my][x + mx] === currVis[y][x] + 1 ||
          currVis[y + my][x + mx] === currVis[y][x] - 1) ? (
          <span key={`${mx} ${my}`} className={lines[1 + my][1 + mx]}></span>
        ) : null
      ) : null
    );
    setWordLines(tempLines);
  }, [currWord, isCurrWord, currVis]);

  // hide letters unless playing
  useEffect(() => {
    if (playState !== 0) {
      setCurrLet(letter);
    } else {
      setCurrLet("");
    }
  }, [playState]);

  return (
    <>
      <div className="w-full h-full relative">
        <div className="h-full w-full absolute z-10">{wordLines}</div>
        <div className="grid h-full w-full place-items-center absolute">
          <div className={squareStateColor}>
            <div
              className="fordle-square h-full w-full grid place-items-center z-20"
              onMouseEnter={() => {
                handleOnMouseEnter();
              }}
              onMouseLeave={() => {
                handleOnMouseLeave();
              }}
            >
              <h1 className="text-4xl select-none">{`${currLetter}`}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
