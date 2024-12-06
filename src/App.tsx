import { useState, useRef } from "react";
import { ArcPrizeLogo } from "./assets/arc-prize-logo";
import { DotGrid1 } from "./assets/svg-grids";
import "./index.css";

const colorDict: { [key: string]: string } = {
  blue: "rgb(96, 165, 250)",
  violet: "rgb(109, 40, 217)",
  pink: "rgb(244, 114, 182)",
  red: "rgb(220, 38, 38)",
  green: "rgb(74, 222, 128)",
  yellow: "rgb(253, 224, 71)",
  lime: "rgb(54, 83, 20)",
  black: "rgb(0, 0, 0)",
  white: "rgb(255, 255, 255)",
};

const fullBlack = [
  ["black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black"],
  ["black", "black", "black", "black", "black", "black", "black"],
];

const allZeros = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const defaultMapSquares = [
  [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0],
  ],
];

const defaultMapColors = [
  [
    ["black", "black", "black", "black", "white", "black", "black"],
    ["black", "black", "black", "black", "white", "white", "black"],
    ["black", "black", "white", "black", "black", "black", "black"],
    ["black", "black", "white", "white", "black", "black", "black"],
    ["black", "black", "black", "black", "black", "white", "white"],
    ["black", "black", "black", "black", "black", "black", "white"],
    ["black", "black", "black", "black", "black", "black", "black"],
  ],
];

const GridContainer = ({
  squareMap,
  setSquareMap,
  colorMap,
  setColorMap,
  currentColor,
  gridSize,
}: {
  squareMap: number[][];
  setSquareMap: (arg: number[][]) => void;
  colorMap: string[][];
  setColorMap: (arg: string[][]) => void;
  currentColor: string;
  gridSize: number;
}) => {

  return (
    <>
      <div className="w-full flex justify-between">
        <p>Output</p>
        <p className="text-zinc-500">
          ({gridSize}x{gridSize})
        </p>
      </div>

      <div
        className="size-36 grid gap-[1px] select-none"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {squareMap.map((row: number[], rowIndex: number) => (
          <>
            {row.map((_square: number, squareIndex: number) => (
              <div
                key={`square-row${rowIndex}-square${squareIndex}`}
                className="border-zinc-600 hover:border-[1px] cursor-pointer transition-colors duration-[200]"
                style={{
                  backgroundColor: colorDict[colorMap[rowIndex][squareIndex]],
                }}
                onClick={() => {
                  const currentSquare = squareMap[rowIndex][squareIndex];
                  const currentPrevColor = colorMap[rowIndex][squareIndex];

                  if (currentPrevColor == currentColor && currentSquare == 1) {
                    colorMap[rowIndex][squareIndex] = "black";
                    squareMap[rowIndex][squareIndex] = 0;
                  } else {
                    colorMap[rowIndex][squareIndex] = currentColor;
                    squareMap[rowIndex][squareIndex] = 1;
                  }

                  setSquareMap([...squareMap]);
                  setColorMap([...colorMap]);
                }}
              />
            ))}
          </>
        ))}
      </div>
    </>
  );
};

function App() {
  const [drawColor, setDrawColor] = useState("blue");
  const [squareMap, setSquareMap] = useState(allZeros);
  const [colorMap, setColorMap] = useState(fullBlack);
  const pleaseComply = useRef(null);
  const defaultMapSize = 7;

  return (
    <div className="h-screen flex items-center justify-center bg-black text-gray-400 font-mono text-xs">
      <div className="flex gap-3 relative">
      <div className="bg-zinc-950 p-3 border-[1px] border-zinc-900 flex items-center z-10">
          <p
            className="text-zinc-700 font-martian tracking-[0.2em] font-bold italic"
            ref={pleaseComply}
            style={{
              writingMode: "vertical-lr",
              rotate: "180deg",
            }}
          >
            AGI CAPTCHA IN PROGRESS. PLEASE COMPLY<span className="animate-blink">.</span>
          </p>
        </div>
        <div className="absolute -top-1/3 -left-2/3 opacity-10 scale-125">
          <div
            className="absolute *:size-[500px]"
            style={{
              maskImage: "url(radial-mask.svg)",
              maskPosition: "center",
            }}
          >
            <DotGrid1 />
          </div>
        </div>

        <div className="absolute bottom-1/2 right-2/3 opacity-10 scale-[2]">
          <div
            className="absolute *:size-[500px]"
            style={{
              maskImage: "url(radial-mask.svg)",
              maskPosition: "center",
            }}
          >
            <DotGrid1 />
          </div>
        </div>

        <div className="flex flex-col gap-3 z-10">
          <div className="flex flex-col h-fit items-center gap-2 bg-zinc-950 p-3 border-[1px] border-zinc-900">
            <div className="w-full flex justify-between">
              <p>Input</p>
              <p className="text-zinc-500">
                ({defaultMapSize}x{defaultMapSize})
              </p>
            </div>

            <div className="size-36 grid grid-cols-7 grid-rows-7 gap-[1px] select-none">
              {Array.from({ length: 49 }).map((_, index) => (
                <div
                  key={`square-one-${index}`}
                  style={{
                    backgroundColor:
                      defaultMapColors[0][Math.floor(index / defaultMapSize)][
                        index % defaultMapSize
                      ]
                  }}
                  className=""
                />
              ))}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="size-6 stroke-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>

            <GridContainer
              squareMap={squareMap}
              setSquareMap={setSquareMap}
              colorMap={colorMap}
              setColorMap={setColorMap}
              currentColor={drawColor}
              gridSize={defaultMapSize}
            />
          </div>

          <div className="h-full w-full flex items-center justify-center bg-zinc-950 p-3 border-[1px] border-zinc-900 *:h-5 *:w-fit">
            <ArcPrizeLogo />
          </div>
        </div>

        <div className="h-full w-80 flex gap-3 align-top flex-col z-10">
          <div className="flex flex-col gap-3 bg-zinc-950 p-3 border-[1px] border-zinc-900">
            <p>1. Configure your output grid:</p>

            <div className="flex gap-2">
              <button
                className="p-1 px-2 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
                onClick={() => {
                  setSquareMap(defaultMapSquares[0]);
                }}
              >
                Copy from input
              </button>
              <button
                className="p-1 px-2 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
                onClick={() => {
                  setColorMap(fullBlack);
                  setSquareMap(allZeros);
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-zinc-950 p-3 border-[1px] border-zinc-900">
            <p>2. Click to select a colour:</p>

            <div className="flex gap-2 *:size-6 *:border-[1px] *:border-zinc-500 *:cursor-pointer">
              <div
                className="bg-blue-400"
                onClick={() => {
                  if (drawColor == "blue") {
                    setDrawColor("");
                  } else {
                    setDrawColor("blue");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "blue" ? "4px" : "0.5px",
                  borderColor: drawColor == "blue" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-violet-700"
                onClick={() => {
                  if (drawColor == "violet") {
                    setDrawColor("");
                  } else {
                    setDrawColor("violet");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "violet" ? "4px" : "0.5px",
                  borderColor: drawColor == "violet" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-pink-400"
                onClick={() => {
                  if (drawColor == "pink") {
                    setDrawColor("");
                  } else {
                    setDrawColor("pink");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "pink" ? "4px" : "0.5px",
                  borderColor: drawColor == "pink" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-red-600"
                onClick={() => {
                  if (drawColor == "red") {
                    setDrawColor("");
                  } else {
                    setDrawColor("red");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "red" ? "4px" : "0.5px",
                  borderColor: drawColor == "red" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-green-400"
                onClick={() => {
                  if (drawColor == "green") {
                    setDrawColor("");
                  } else {
                    setDrawColor("green");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "green" ? "4px" : "0.5px",
                  borderColor: drawColor == "green" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-yellow-300"
                onClick={() => {
                  if (drawColor == "yellow") {
                    setDrawColor("");
                  } else {
                    setDrawColor("yellow");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "yellow" ? "4px" : "0.5px",
                  borderColor: drawColor == "yellow" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-lime-900"
                onClick={() => {
                  if (drawColor == "lime") {
                    setDrawColor("");
                  } else {
                    setDrawColor("lime");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "lime" ? "4px" : "0.5px",
                  borderColor: drawColor == "lime" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-black"
                onClick={() => {
                  if (drawColor == "black") {
                    setDrawColor("");
                  } else {
                    setDrawColor("black");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "black" ? "4px" : "0.5px",
                  borderColor: drawColor == "black" ? "rgb(255 255 255)" : "",
                }}
              />
              <div
                className="bg-white"
                onClick={() => {
                  if (drawColor == "white") {
                    setDrawColor("");
                  } else {
                    setDrawColor("white");
                  }
                }}
                style={{
                  borderBottomWidth: drawColor == "white" ? "4px" : "0.5px",
                  borderColor: drawColor == "white" ? "rgb(0 0 0 0.5)" : "",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-zinc-950 p-3 border-[1px] border-zinc-900">
            <p>3. Complete captcha:</p>

            <button className="p-1 px-2 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300">
              Submit solution
            </button>
          </div>

          <div className="flex flex-col gap-3 bg-zinc-950 p-3 border-[1px] border-zinc-900 z-10">
            <p className="text-blue-400 font-martian tracking-widest font-bold">
              //<span className="px-[2px] font-light">·</span>What
              <span className="px-[2px] font-light">·</span>is
              <span className="px-[2px] font-light">·</span>this?
            </p>
            <p>
              Most AI benchmarks measure skill. But skill is <u>not</u>{" "}
              intelligence. General intelligence is the ability to efficiently
              acquire new skills. <br />
              <br /> Chollet's unbeaten 2019 Abstraction and Reasoning Corpus
              for Artificial General Intelligence (ARC-AGI) is the only formal
              benchmark of AGI. <br />
              <br /> It's easy for humans, but hard for AI.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default App;
