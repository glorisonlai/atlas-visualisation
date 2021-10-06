import { useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { ChartProp } from "types/graphProps";

const WorldMap = (props: ChartProp<HTMLElement>) => {
  const [showYear, setShowYear] = useState<string>("1961");
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [stepSize, setStepSize] = useState<number>(5);
  const changeYear = props.actions.get("ChangeYear");
  const scrollRef: any = useRef(null);
  const stepIntervalRef: any = useRef(null);

  useEffect(() => {
    !!changeYear && changeYear(showYear);
    !!scrollRef.current &&
      scrollRef.current.scrollTo((parseInt(showYear) - 1968) * 54.5 + 15, 0);
  }, [showYear, changeYear]);

  useEffect(() => {
    clearInterval(stepIntervalRef.current);
    if (autoPlay) {
      stepIntervalRef.current = setInterval(
        () =>
          setShowYear((year) =>
            Math.min(2019, parseInt(year) + stepSize).toString()
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
      <div className={"flex flex-evenly flex-nowrap gap-x-1"}>
        <button
          className={`${
            showYear !== "1961"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-500"
          } text-white font-bold py-2 rounded mx-1 px-1`}
          disabled={showYear === "1961" ? true : false}
          onClick={() => {
            if (showYear !== "2019") {
              setShowYear((year) => (parseInt(year) + 1).toString());
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
                  e.toString() === showYear
                    ? "bg-blue-500 text-white bold text-xl px-2"
                    : ""
                } rounded p-1`}
                onClick={() => {
                  if (e.toString() !== showYear) {
                    setShowYear(e.toString());
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
            showYear !== "2019"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-500"
          } text-white font-bold py-2 rounded mx-1 px-1`}
          disabled={showYear === "2019" ? true : false}
          onClick={() => {
            if (showYear !== "2019") {
              setShowYear((year) => (parseInt(year) + 1).toString());
              setAutoPlay(false);
            }
          }}
        >
          &gt;
        </button>
      </div>
      <div
        className={
          "flex flex-center flex-nowrap gap-x-5 p-y-2 items-center py-2"
        }
      >
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
      </div>
      <div className={"my-2"}>
        <div id="chloropleth" />
      </div>
      <br />
      <span></span>
      <button
        id="eh"
        onClick={() => console.log(props.actions.get("ChangeYear")!("2000"))}
      />
    </div>
  );
};

export default WorldMap;
