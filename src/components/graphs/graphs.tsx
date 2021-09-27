import React, { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
// import bar_chart from './bar_chart.json'

const Graphs = () => {
  useEffect(() => {
    console.log("blah");
    vegaEmbedModule("#bar_chart", require("./bar_chart.json"))
      .then(function (res) {
        console.log(res);
      })
      .catch(console.log);
  });
  return <div id="bar_chart" />;
};

export default Graphs;
