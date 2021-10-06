import { ChartProp } from "types/graphProps";

const Barchart = (props: ChartProp<HTMLElement>) => {
  return (
    <div className={`${props.className && props.className}`}>
      <div id="bar-chart" />
      <br />
      <span>
        Since 1985, the average global temperature fluctuations has been
        steadily increasing
      </span>
    </div>
  );
};
export default Barchart;
