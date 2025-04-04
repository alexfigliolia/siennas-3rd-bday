import GSAP from "gsap";
import type { HTMLAttributes } from "react";
import { useLayoutEffect, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const NavButton = ({ children, className, animate, ...rest }: Props) => {
  const button = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!button.current) {
      return;
    }
    GSAP.set(button.current, {
      y: "100%",
      opacity: 0,
      pointerEvents: "none",
    });
    if (animate) {
      GSAP.to(button.current, {
        y: "0%",
        opacity: 1,
        duration: 1.5,
        pointerEvents: "auto",
        ease: "expo.inOut",
      });
    }
  }, [animate]);

  const classes = useClassNames("nav-button", className);
  return (
    <button ref={button} {...rest} className={classes}>
      {children}
    </button>
  );
};

interface Props extends HTMLAttributes<HTMLButtonElement> {
  animate: boolean;
}
