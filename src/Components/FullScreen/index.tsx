import type { ForwardedRef } from "react";
import { forwardRef, type HTMLProps } from "react";
import { useClassNames } from "@figliolia/classnames";
import { selectHeight, useWindowSize } from "State/WindowSize";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const FullScreen = forwardRef(function FullScreen(
  { children, className }: Props,
  ref: ForwardedRef<HTMLElement>,
) {
  const classes = useClassNames("full-screen", className);
  const height = useWindowSize(selectHeight);
  return (
    <section
      ref={ref}
      className={classes}
      style={{ height, maxHeight: height }}>
      {children}
    </section>
  );
});

export interface Props extends HTMLProps<HTMLDivElement>, OptionalChildren {}
