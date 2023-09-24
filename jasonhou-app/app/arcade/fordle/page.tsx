"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findWord } from "./utils";
import {
  getCurrBoard,
  getCurrPoints,
  getCurrWord,
  getCurrWordLen,
  getCurrWordsFound,
  getPlayState,
} from "../../redux/reducers/fordle";
import { AppDispatch } from "../../redux/store";
import FordleBoard from "./board";
import { Points } from "./config";

export default function Page() {
  // Redux Setup
  const dispatch: AppDispatch = useDispatch();
  const {
    currWord,
    currWordLen,
    currWordsFound,
    currPoints,
    playState,
    currBoard,
  } = useSelector((state: any) => ({
    currWord: getCurrWord(state),
    currWordLen: getCurrWordLen(state),
    currWordsFound: getCurrWordsFound(state),
    currPoints: getCurrPoints(state),
    playState: getPlayState(state),
    currBoard: getCurrBoard(state),
  }));

  const buttonColors = {
    PLAY: "transition ease-in-out bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 text-lg hover:scale-110 rounded-lg shadow-md hover:shadow-lg duration-200",
    FINSIH:
      "transition ease-in-out bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 text-lg hover:scale-110 rounded-lg shadow-md hover:shadow-lg duration-200",
    PLAY_AGAIN:
      "transition ease-in-out bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 text-lg hover:scale-110 rounded-lg shadow-md hover:shadow-lg duration-200",
  };

  const [buttonColor, setButtonColor] = useState(buttonColors.PLAY);
  const [wordsNotFound, setWordsNotFound] = useState<string[]>([]);

  const showFoundWord = (word: string) => {
    const tempVis = new Array(currBoard.Board.length)
      .fill(0)
      .map(() => new Array(currBoard.Board.length).fill(0));
    const newVis = findWord(word, currBoard.Board, tempVis);
    newVis.forEach((row, y) => {
      row.forEach((val, x) => {
        tempVis[y][x] = val;
      });
    });
    dispatch({
      type: "fordle/setCurrVis",
      payload: newVis,
    });
    dispatch({
      type: "fordle/setPlayState",
      payload: 3,
    });
  };

  const showMissedWord = (word: string) => {
    const tempVis = new Array(currBoard.Board.length)
      .fill(0)
      .map(() => new Array(currBoard.Board.length).fill(0));
    const newVis = findWord(word, currBoard.Board, tempVis);
    newVis.forEach((row, y) => {
      row.forEach((val, x) => {
        tempVis[y][x] = val;
      });
    });
    dispatch({
      type: "fordle/setCurrVis",
      payload: newVis,
    });
    dispatch({
      type: "fordle/setPlayState",
      payload: 4,
    });
  };

  const hideWord = () => {
    const tempVis = new Array(currBoard.Board.length)
      .fill(0)
      .map(() => new Array(currBoard.Board.length).fill(0));
    dispatch({
      type: "fordle/setCurrVis",
      payload: tempVis,
    });
    dispatch({
      type: "fordle/setPlayState",
      payload: 2,
    });
  };

  const dispatchReset = () => {
    dispatch({
      type: "fordle/setPlayState",
      payload: 0,
    });
    dispatch({
      type: "fordle/resetCurrPoints",
      payload: 0,
    });
    dispatch({
      type: "fordle/resetCurrWord",
      payload: 0,
    });
    dispatch({
      type: "fordle/resetCurrWordLen",
      payload: 0,
    });
    dispatch({
      type: "fordle/resetCurrWordsFound",
      payload: 0,
    });
    dispatch({
      type: "fordle/resetCurrWord",
      payload: 0,
    });
  };

  const handlePlayButton = () => {
    if (playState === 0) {
      // IDLE
      dispatch({
        type: "fordle/setPlayState",
        payload: 1,
      });
    } else if (playState === 1) {
      setWordsNotFound(
        currBoard?.Words
          ? currBoard.Words.filter((word) => !currWordsFound.has(word)).sort(
              (word1, word2) => (word1.length < word2.length ? 1 : 0)
            )
          : []
      );
      // PLAYING
      dispatch({
        type: "fordle/setPlayState",
        payload: 2,
      });
    } else if (playState === 2 || playState === 3 || playState === 4) {
      dispatchReset();
      // FINISH
      dispatch({
        type: "fordle/setPlayState",
        payload: 0,
      });
    }
  };

  // reset page
  useEffect(() => {
    dispatchReset();
  }, []);

  // set button color base on play state
  useEffect(() => {
    if (playState === 0) {
      setButtonColor(buttonColors.PLAY);
    } else if (playState === 1) {
      setButtonColor(buttonColors.FINSIH);
    } else if (playState === 2 || playState === 3 || playState === 4) {
      setButtonColor(buttonColors.PLAY_AGAIN);
    }
  }, [playState]);

  return (
    <div className="mb-20 flex flex-row justify-center">
      <div className="flex flex-col">
        <div className="mt-20 mb-4 w-full flex flex-row justify-center">
          <h1 className="text-6xl">Fordle</h1>
        </div>
        <div className="mt-4 mb-12 w-full flex flex-row justify-center">
          <h1 className="text-4xl">{`${currPoints}`}</h1>
        </div>
        <div className="mt-0 mb-12 w-full h-10 flex flex-row justify-center">
          {currWord ? (
            <div className="flex flex-row justify-center space-x-2">
              <div className="h-full w-fit flex flex-col justify-center">
                <h1 className="text-4xl w-fit">{`${currWord}`}</h1>
              </div>
              <div className="h-full w-fit flex flex-col justify-center">
                <h1 className="text-3xl w-fit">
                  {`+ (${Points?.[currWordLen] ? Points[currWordLen] : 0})`}
                </h1>
              </div>
            </div>
          ) : (
            <h1 className="text-4xl">{"~"}</h1>
          )}
        </div>
        <div className="mb-2 mt-2 w-full flex flex-row justify-center">
          <h1 className="text-md">{`(press s or hold down) and drag`}</h1>
        </div>
        <div className="flex flex-row justify-center">
          <FordleBoard />
        </div>
        <div className="flex flex-row justify-center mt-10 mb-12">
          <button className={buttonColor} onClick={() => handlePlayButton()}>
            {playState === 0
              ? "PLAY"
              : playState === 1
              ? "FINISH"
              : "PLAY AGAIN"}
          </button>
        </div>
        <div className="flex flex-row justify-center">
          <div
            className={
              playState !== 2 && playState !== 3 && playState !== 4
                ? "flex flex-row justify-center w-full"
                : "flex flex-row justify-center w-5/12"
            }
          >
            <div className="flex flex-col">
              <h1>{`${currWordsFound.size} Words Found (Scroll):`}</h1>
              <div className="flex flex-row justify-start">
                <div className="flex flex-col h-48 overflow-y-scroll scrollbar-hide">
                  {Array.from(currWordsFound.keys())
                    .reverse()
                    .map((word) => (
                      <h3
                        key={word}
                        className="m-0"
                        onMouseEnter={() => {
                          showFoundWord(word);
                        }}
                        onMouseLeave={() => {
                          hideWord();
                        }}
                      >{`- ${word}`}</h3>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {playState === 2 || playState === 3 || playState === 4 ? (
            <div className="w-1/12 flex flex-row justify-center">
              <div className="h-11/12 w-3 my-2 bg-emerald-500 opacity-50 rounded-xl shadow-md" />
            </div>
          ) : null}
          {playState === 2 || playState === 3 || playState === 4 ? (
            <div className="ml-2 w-5/12 flex flex-row justify-center">
              <div className="flex flex-col">
                <h1>{`${wordsNotFound.length} Words Not Found (Scroll):`}</h1>
                <div className="flex flex-row justify-start">
                  <div className="flex flex-col h-48 overflow-y-scroll scrollbar-hide">
                    {wordsNotFound.map((word) => (
                      <h3
                        key={word}
                        className="m-0"
                        onMouseEnter={() => {
                          showMissedWord(word);
                        }}
                        onMouseLeave={() => {
                          hideWord();
                        }}
                      >{`- ${word}`}</h3>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
