import React, { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
import Barchart from "./barChart";
import Trendline from "./trendLine";
import WorldMap from "./worldMap";
import { Menu } from "@headlessui/react";

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
      <br />
      <h1>Call to Action</h1>
      <h2>
        While the effects of global warming are dangerously clear, the actions
        being taken to fix climate change are few and far between
      </h2>
      <span>
        The best thing you can do as an individual is to learn more about
        Climate Change.
      </span>
      <span>Provided below are resources for additional reading:</span>
      <ul></ul>
      <Menu>
        <Menu.Button>Donate</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <div>
                <h3>
                  Before donating to a cause, make sure you understand where
                  your money is going.
                </h3>
                <span>
                  This includes researching the company, its mission statement,
                  and the campaign statement for yourself, before making an
                  informed decision about whether they best align with your
                  interests, before contributing to their cause.
                </span>
                <span>Below are some organisations to start with:</span>
                <Menu>
                  <Menu.Button>Australia</Menu.Button>
                  <Menu.Items>
                    <Menu.Item>
                      {({ active }) => (
                        <a>Australian Conservation Foundation</a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a>
                          Breakthrough – National Centre for Climate Restoration
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => <a>Climate Council</a>}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Graphs;
