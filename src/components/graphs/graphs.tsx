import React, { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
import Barchart from "./barChart";
import Trendline from "./trendLine";
import WorldMap from "./worldMap";

type VgChart = {
  element: React.ReactElement<any, any>;
  btnDesc: string;
};

const removeVegaEls = () => {
  const vegaEls = [
    ...Array.from(document.getElementsByClassName("vega-bindings")),
    ...Array.from(document.getElementsByTagName("details")),
  ];
  vegaEls.map((el) => el.remove());
};

const Graphs = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [screenId, setScreenId] = useState(0);
  var blah: any;

  useEffect(() => {
    vegaEmbedModule("#line-chart", require("./vgjson/line_chart.json"))
      .then(function (res) {
        removeVegaEls();
        console.log(res);
      })
      .catch(console.error);

    vegaEmbedModule("#bar-chart", require("./vgjson/bar_chart.json"))
      .then(function (res) {
        removeVegaEls();
        console.log(res);
      })
      .catch(console.error);

    vegaEmbedModule("#chloropleth", require("./vgjson/chloropleth.json"))
      .then(function (res: any) {
        removeVegaEls();
        console.log(res);
        vgGraphActions.set(
          "ChangeYear",
          res.view._bind[0].state.update as VoidFunction
        );
      })
      .catch(console.error);
  }, []);

  const vgGraphActions: Map<string, VoidFunction> = new Map();

  const vgGraphs: VgChart[] = [
    {
      element: (
        <WorldMap
          key="graph-1"
          className={`${screenId !== 0 && "hidden"}`}
          actions={vgGraphActions}
        />
      ),
      btnDesc: "World Map",
    },
    {
      element: (
        <Barchart
          key="graph-2"
          className={`${screenId !== 1 && "hidden"}`}
          actions={vgGraphActions}
        />
      ),
      btnDesc: "Bar chart",
    },
    {
      element: (
        <Trendline
          key="graph-3"
          className={`${screenId !== 2 && "hidden"}`}
          actions={vgGraphActions}
        />
      ),
      btnDesc: "Trends",
    },
  ];

  return (
    <div className={`${props.className && props.className} w-full`}>
      <div className={`flex justify-evenly align-top gap-x-2`}>
        {vgGraphs.map(({ btnDesc }, i) => (
          <button
            key={`switch-graph-${i}`}
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1"
            }
            onClick={() => setScreenId(i)}
          >
            {btnDesc}
          </button>
        ))}
      </div>
      <br />
      {vgGraphs.map(({ element }, i) => element)}
      <button onClick={() => blah(2000)} />
    </div>
  );
};

export default Graphs;
