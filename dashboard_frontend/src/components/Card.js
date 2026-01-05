import React from "react";
import classNames from "classnames";

// PUBLIC_INTERFACE
export function Card({ children, className, ...props }) {
  /** Simple surface container with hover-safe shadow and rounding. */
  return (
    <div className={classNames("card", className)} {...props}>
      {children}
    </div>
  );
}
