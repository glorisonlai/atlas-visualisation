import React, { HTMLAttributes } from "react";

const Sidebar = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <ul className={`${className} sidebar`}>
      <li>Visualisation</li>
      <li>Dataset</li>
      <li>Donate</li>
    </ul>
  );
};

export default Sidebar;
