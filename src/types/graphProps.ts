import React from "react";

export type ChartProp<T> = React.HTMLAttributes<T> & {
  actions: Map<string, Function>;
};
