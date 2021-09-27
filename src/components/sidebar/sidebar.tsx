import React, { HTMLAttributes } from "react";

const Sidebar = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <ul
      className={`${className} flex-col content-center h-screen right-10 text-right bg-gray-100`}
    >
      <li>Visualisation</li>
      <li>Dataset</li>
      <li>Donate</li>
    </ul>
  );
};

export default Sidebar;
