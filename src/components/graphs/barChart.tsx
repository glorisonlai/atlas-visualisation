const Barchart = (props: React.HTMLAttributes<HTMLElement>) => {
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
