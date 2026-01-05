import React from "react";
import classNames from "classnames";

// PUBLIC_INTERFACE
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  /** Reusable button with Ocean Professional theme variants. */
  return (
    <button
      className={classNames(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
