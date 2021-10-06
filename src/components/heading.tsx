type HeadingProps = {
  title: string;
  subheading: string;
};

const Heading = (
  props: React.HTMLAttributes<HTMLElement> & HeadingProps
): React.ClassicElement<HTMLElement> => {
  return (
    <div className={"relative"}>
      <h1 className={"text-blue-500 text-6xl"}>{props.title}</h1>
      <br />
      <h2 className={"text-2xl"}>{props.subheading}</h2>
    </div>
  );
};

export default Heading;
