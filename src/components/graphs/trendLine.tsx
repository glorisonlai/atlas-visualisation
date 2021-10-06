import { ChartProp } from "types/graphProps";

const Trendline = (props: ChartProp<HTMLElement>) => {
  return (
    <div className={`${props.className && props.className} flex flex-col`}>
      <div className={"flex-row"}>
        <div id="line-chart" />
      </div>
      <br />
      <span>
        Since 1985, the average global temperature fluctuations has been
        steadily increasing
      </span>
    </div>
  );
};
export default Trendline;
