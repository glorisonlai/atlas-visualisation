import React, { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
import Barchart from "./barChart";
import Trendline from "./trendLine";
import WorldMap from "./worldMap";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

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

  const vgGraphs: VgChart[] = [
    {
      element: <WorldMap />,
      btnDesc: "World Map",
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
      } w-full overflow-x-hidden `}
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
      <br />
      <h1 className={"text-3xl"}>Call to Action</h1>
      <h2 className={"text-xl"}>
        While the effects of global warming are dangerously clear, the actions
        being taken to fix climate change are few and far between
      </h2>
      <br />
      <span>
        The best thing you can do as an individual is to learn more about
        Climate Change.
      </span>
      <span>Provided below are resources for additional reading:</span>
      <ul></ul>
      <div className="w-full text-left">
        <Menu as="div" className="relative inline-block text-left w-full">
          <Menu.Button
            className={
              "inline-flex justify-center w-32 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md bg-opacity-50 hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            }
          >
            Donate
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={
                "absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              }
            >
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <h3 className="text-lg">
                      Before donating to a cause,{" "}
                      <span className="font-bold">
                        make sure you understand where your money is going.
                      </span>
                    </h3>
                    <br />
                    <span>
                      This includes researching the company, its mission
                      statement, and the campaign statement for yourself, before
                      making an informed decision about whether they best align
                      with your interests, before contributing to their cause.
                    </span>
                    <br />
                    <span>Below are some organisations to start with:</span>
                    <br />
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
                              Breakthrough – National Centre for Climate
                              Restoration
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
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Graphs;
