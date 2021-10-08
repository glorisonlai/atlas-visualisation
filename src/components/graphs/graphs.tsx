import React, { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
import Barchart from "./barChart";
import Trendline from "./trendLine";
import WorldMap from "./worldMap";

type VgChart = {
  element: React.ReactElement<any, any>;
  btnDesc: string;
};

export const removeVegaEls = () => {
  const vegaEls = [
    ...Array.from(document.getElementsByClassName("vega-bindings")),
    ...Array.from(document.getElementsByTagName("details")),
  ];
  vegaEls.map((el) => el.remove());
};

const Graphs = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [screenId, setScreenId] = useState(0);

  useEffect(() => {
    vegaEmbedModule("#bar-chart", require("./vgjson/bar_chart.json"))
      .then(function (res) {
        removeVegaEls();
        console.log("Bar Chart", res);
      })
      .catch(console.error);
  }, []);

  const vgGraphs: VgChart[] = [
    {
      element: <WorldMap />,
      btnDesc: "World Map",
    },
    {
      element: <Barchart />,
      btnDesc: "Bar chart",
    },
    {
      element: <Trendline />,
      btnDesc: "Trends",
    },
  ];

  return (
    <div
      className={`${
        props.className && props.className
      } w-full overflow-x-hidden`}
    >
      <div className={`flex justify-evenly align-top gap-x-2`}>
        {vgGraphs.map(({ btnDesc }, i) => (
          <button
            key={`switch-graph-${i}`}
            className={`${
              screenId === i ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded flex-1`}
            onClick={() => setScreenId(i)}
          >
            {btnDesc}
          </button>
        ))}
      </div>
      <br />
      {vgGraphs.map(({ element }, i) => (
        <div key={`screen-${i}`} className={`${screenId !== i && "hidden"}`}>
          {element}
        </div>
      ))}
    </div>
  );
};

export default Graphs;
