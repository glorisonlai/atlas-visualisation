import SelectSearch, { fuzzySearch } from "react-select-search";
import { useState, useEffect } from "react";
import vegaEmbedModule from "vega-embed";
import { removeVegaEls } from "./graphs";

type LineActions = {
  getLocations?: () => string[];
  changeLineLocation?: (area: string) => void;
  changeCumLocation?: (area: string) => void;
  changeSummerLocation?: (area: string) => void;
};

const Trendline = (props: React.HTMLAttributes<HTMLElement>) => {
  const [area, setArea] = useState<string>("World");
  const [actions, setActions] = useState<LineActions>({});
  const [showCumGraph, setShowCumGraph] = useState<boolean>(false);

  useEffect(() => {
    vegaEmbedModule("#line-chart", require("./vgjson/line_chart.json"))
      .then((res: any) => {
        removeVegaEls();
        console.log("Fluctuations", res);
        setActions((actions) => ({
          ...actions,
          getLocations: (() =>
            res.view._bind[0].param.options) as () => string[],
          changeLineLocation: res.view._bind[0].state.update as (
            area: string
          ) => void,
        }));
      })
      .catch(console.error);

    vegaEmbedModule("#cum-temp", require("./vgjson/cumulative_temp.json"))
      .then(function (res: any) {
        removeVegaEls();
        console.log("Cumulative", res);

        setActions((actions) => ({
          ...actions,
          changeCumLocation: res.view._bind[0].state.update as (
            area: string
          ) => void,
        }));
      })
      .catch(console.error);

    vegaEmbedModule("#sd-temp", require("./vgjson/sd.json"))
      .then(function (res: any) {
        removeVegaEls();
        console.log("Summer-Winter", res);
        setActions((actions) => ({
          ...actions,
          changeSummerLocation: res.view._bind[0].state.update as (
            area: string
          ) => void,
        }));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    !!actions.changeLineLocation && actions.changeLineLocation(area);
    !!actions.changeCumLocation && actions.changeCumLocation(area);
    !!actions.changeSummerLocation && actions.changeSummerLocation(area);
  }, [area, actions]);

  return (
    <div
      className={`${props.className && props.className} flex flex-col w-map`}
    >
      <div className={"flex flex-row py-2 justify-center"}>
        <h1 className={"text-2xl pr-4"}>Area</h1>
        <SelectSearch
          options={
            actions.getLocations
              ? actions
                  .getLocations()
                  .map((area) => ({ name: area, value: area }), {})
              : [{ name: "World", value: "World" }]
          }
          value={area}
          placeholder="Search Area..."
          search
          filterOptions={fuzzySearch}
          onChange={(newArea) =>
            setArea(typeof newArea == "string" ? newArea : "World")
          }
        />
      </div>
      <div className={"flex flex-row py-2"}>
        <div>
          <input
            type="checkbox"
            id="show-cum-graph"
            name="show-cum-graph"
            onChange={() => setShowCumGraph((checked) => !checked)}
            checked={showCumGraph}
          />
          <label className={"px-2"} htmlFor="show-cum-graph">
            Show Cumulative Effects
          </label>
        </div>
      </div>
      <div className={"flex flex-col"}>
        <div id="line-chart" className={`${showCumGraph && "hidden"}`} />
        <div id="cum-temp" className={`${!showCumGraph && "hidden"}`} />
      </div>
      <br />
      <span>
        Since 1985, the average global temperature fluctuations has consistently
        been steadily increasing. This is causing global temperatures to&nbsp;
        <span
          className={"underline text-blue-500 cursor-pointer"}
          onClick={() => setShowCumGraph(true)}
        >
          exponetially increase,
        </span>{" "}
        year by year.
      </span>
      <br />
      <br />
      <h1 className={"justify-self-center text-3xl py-2"}>
        Scorching Summers, Blistering Winters
      </h1>
      <div className={"flex flex-row py-2 justify-center"}>
        <h1 className={"text-2xl pr-4"}>Area</h1>
        <SelectSearch
          options={
            actions.getLocations
              ? actions
                  .getLocations()
                  .map((area) => ({ name: area, value: area }), {})
              : [{ name: "World", value: "World" }]
          }
          value={area}
          placeholder="Search Area..."
          search
          filterOptions={fuzzySearch}
          onChange={(newArea) =>
            setArea(typeof newArea == "string" ? newArea : "World")
          }
        />
      </div>
      <div>
        <div id="sd-temp" />
      </div>
      <span>
        While temperatures continue to increase, ironically Winters get even
        colder over time.
      </span>
    </div>
  );
};

export default Trendline;
