import GSAP from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScreenAnimation } from "./ScreenAnimation";

export const useScreenLayout = () => {
  const screen = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!screen.current) {
      return;
    }
    GSAP.set(screen.current, {
      scale: ScreenAnimation.getScale(),
      [ScreenAnimation.getAxis()]: "100%",
    });
  }, []);

  return screen;
};
