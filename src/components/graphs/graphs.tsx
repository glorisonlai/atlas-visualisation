import React, { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
// import bar_chart from './bar_chart.json'

const Graphs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vegaEmbedModule("#line_chart", require("./line_chart.json"))
      .then(function (res) {
        console.log(res);
      })
      .catch(console.log);

    vegaEmbedModule("#bar_chart", require("./bar_chart.json"))
      .then(function (res) {
        console.log(res);
      })
      .catch(console.log);

    vegaEmbedModule("#chloropleth", require("./chloropleth.json"))
      .then(function (res) {
        console.log(res);
      })
      .catch(console.log);
  });

  return (
    <div className={"w-screen"}>
      <div id="line_chart" />
      <div id="bar_chart" className={"overflow-auto w-screen"} />
      <br />
      <div id="chloropleth" className={"left"} />;
    </div>
  );
};

export default Graphs;
