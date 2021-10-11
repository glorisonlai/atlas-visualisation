import { useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { mapText } from "components/constants";
import vegaEmbedModule from "vega-embed";
import { removeVegaEls } from "./graphs";

type MapActions = {
  changeYear?: (year: string) => void;
};

type Year = `Y${string}`;

const WorldMap = (props: React.HTMLAttributes<HTMLElement>) => {
  const [showYear, setShowYear] = useState<Year>("Y1961");
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [stepSize, setStepSize] = useState<number>(5);
  const [actions, setActions] = useState<MapActions>({});
  // const actions = useRef<MapActions>({});

  const scrollRef: any = useRef(null);
  const stepIntervalRef: any = useRef(null);

  const parseYear = (yearStr: Year): number => parseInt(yearStr.substring(1));

  const createYearString = (year: number): Year => `Y${year.toString()}`;

  useEffect(() => {
    vegaEmbedModule("#chloropleth", require("./vgjson/chloropleth.json"))
      .then(function (res: any) {
        removeVegaEls();
        console.log("Cloropleth", res);

        setActions((actions) => ({
          ...actions,
          changeYear: res.view._bind[0].state.update as (year: string) => void,
        }));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    !!actions.changeYear && actions.changeYear(showYear);
    !!scrollRef.current &&
      scrollRef.current.scrollTo((parseYear(showYear) - 1968) * 54.5 + 15, 0);
  }, [showYear, actions]);

  useEffect(() => {
    clearInterval(stepIntervalRef.current);
    if (autoPlay) {
      stepIntervalRef.current = setInterval(
        () =>
          setShowYear((year) =>
            createYearString(Math.min(2019, parseYear(year) + stepSize))
          ),
        5000
      );
    }
  }, [autoPlay, stepSize]);

  return (
    <div
      className={`${
        props.className && props.className
      } flex flex-col justify-center w-chart`}
    >
      <div className="flex justify-center group-hover:justify-center text-2xl pb-1">
        Year
      </div>
      <div className={"flex flex-evenly flex-nowrap gap-x-1"}>
        <button
          className={`${
            showYear !== "Y1961"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-500"
          } text-white font-bold py-2 rounded mx-1 px-1`}
          disabled={showYear === "1961" ? true : false}
          onClick={() => {
            if (showYear !== "2019") {
              setShowYear((year) => createYearString(parseInt(year) + 1));
              setAutoPlay(false);
            }
          }}
        >
          &lt;
        </button>
        <ScrollContainer
          className="scroll-container flex flex-nowrap gap-3 px-4 drop-shadow-xl shadow-xl rounded bg-gray-200"
          innerRef={scrollRef}
        >
          {Array.from({ length: 2019 - 1961 + 1 }, (_, i) => i + 1961).map(
            (e) => (
              <button
                key={`Y${e}`}
                className={`${
                  e === parseYear(showYear)
                    ? "bg-blue-500 text-white bold text-xl px-2"
                    : ""
                } rounded p-1`}
                onClick={() => {
                  if (e !== parseYear(showYear)) {
                    setShowYear(createYearString(e));
                    setAutoPlay(false);
                  }
                }}
              >
                {e}
              </button>
            )
          )}
        </ScrollContainer>

        <button
          className={`${
            showYear !== "Y2019"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-500"
          } text-white font-bold py-2 rounded mx-1 px-1`}
          disabled={showYear === "2019" ? true : false}
          onClick={() => {
            if (showYear !== "2019") {
              setShowYear((year) => createYearString(parseInt(year) + 1));
              setAutoPlay(false);
            }
          }}
        >
          &gt;
        </button>
      </div>
      <div className={"flex justify-start gap-x-5 p-y-2 py-2"}>
        <div>
          <input
            type="checkbox"
            id="AutoScroll"
            name="AutoScroll"
            onChange={() => setAutoPlay((checked) => !checked)}
            checked={autoPlay}
          />
          <label className={"px-2"} htmlFor="AutoScroll">
            Auto-Scroll
          </label>
        </div>

        <div>
          <input
            type="number"
            id="StepSize"
            name="StepSize"
            onChange={(e) => setStepSize(parseInt(e.target.value))}
            value={stepSize}
            min={1}
            max={2019 - 1961}
          />
          <label className={"px-2"} htmlFor="StepSize">
            Step size
          </label>
        </div>

        <span className={"ml-auto"}>Drag to scroll through years</span>
      </div>
      <div className={"my-2 relative w-map"}>
        <div id="chloropleth" className={"relative"}>
          <svg
            className="animate-spin h-5 w-5 mr-3 bg-gray-400 absolute top-1/2 left-1/2"
            viewBox="0 0 24 24"
          ></svg>
        </div>
        <span className={` break-words absolute top-150 px-10 text-lg`}>
          {
            mapText[
              Math.min(
                mapText.length - 1,
                Math.max(0, Math.floor((parseYear(showYear) - 1961) / 10))
              )
            ]
          }
        </span>
      </div>
    </div>
  );
};

export default WorldMap;
