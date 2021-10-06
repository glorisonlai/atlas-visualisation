import { useEffect, useState } from "react";
import { ChartProp } from "types/graphProps";

const WorldMap = (props: ChartProp<HTMLElement>) => {
  const [showYear, setShowYear] = useState<string>("1961");
  const changeYear = props.actions.get("ChangeYear");

  useEffect(() => {
    !!changeYear && changeYear(showYear);
  }, [showYear, changeYear]);

  return (
    <div
      className={`${
        props.className && props.className
      } flex flex-col justify-center w-4/5`}
    >
      <div className={"flex flex-evenly flex-nowrap gap-x-1"}>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded mx-1 px-1`}
          disabled={showYear === "1961" ? true : false}
          onClick={() =>
            showYear !== "1961" &&
            setShowYear((year) => (parseInt(year) - 1).toString())
          }
        >
          &lt;
        </button>
        <div
          className={
            "flex cursor-move overflow-x-auto flex-nowrap gap-x-1 text-lg"
          }
        >
          {Array.from({ length: 2019 - 1961 }, (_, i) => i + 1961).map((e) => (
            <button
              key={`Y${e}`}
              className={`${
                e.toString() === showYear ? "bg-blue-500 text-white" : ""
              } rounded p-1`}
              onClick={() =>
                e.toString() !== showYear && setShowYear(e.toString())
              }
            >
              {e}
            </button>
          ))}
        </div>

        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded mx-1 px-1`}
          disabled={showYear === "2019" ? true : false}
          onClick={() =>
            showYear !== "2019" &&
            setShowYear((year) => (parseInt(year) + 1).toString())
          }
        >
          &gt;
        </button>
      </div>
      <div className={"flex justify-center my-2"}>
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
