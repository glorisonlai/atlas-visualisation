import Sidebar from "./components/sidebar/sidebar";
import Graphs from "./components/graphs/graphs";
import Heading from "components/heading";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <div className="fill-current text-blue-300 z-0 absolute w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          version="1.1"
        >
          <g
            id="Design-V2"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="V2-Landing-Copy"
              transform="translate(-720.000000, 0.000000)"
              fill="#DDF0F9"
            >
              <path
                d="M720,100 C840,33.3333333 960,0 1080,0 C1200,0 1320,33.3333333 1440,100 C1560,166.666667 1680,200 1800,200 C1920,200 2040,166.666667 2160,100 L2160,611 L720,611 L720,100 Z"
                id="Path-2"
                transform="translate(1440.000000, 305.500000) scale(1, -1) translate(-1440.000000, -305.500000) "
              />
            </g>
          </g>
        </svg>
      </div>
      <div className={"body p-10 min-h-screen"}>
        <div className={"relative"}>
          <Heading
            title={"Global Warming, Visualised"}
            subheading={"An interactive visualisation"}
          />
          <br />
          <Graphs className={"flex flex-col items-center w-4/5"} />
          {/* <Sidebar className="fixed" /> */}
        </div>
      </div>
      <button
        className={"fixed bg-gray-500 opacity-50 h-10 w-10 to"}
        onClick={() => window.scrollTo(0, 0)}
      >
        UP
      </button>
      <footer
        className={
          "footer bg-gray-100 mt-10 pt-2 border-b-4 border-blue-300 bottom-10 right-10"
        }
      >
        <div className="container mx-auto px-6 flex flex-col">
          <span>FIT3179 Assignment 2</span>
          <span className="text-sm text-blue-500 font-bold mb-2">
            © Glorison Lai | 30587220
          </span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
