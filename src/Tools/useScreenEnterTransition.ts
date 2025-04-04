import GSAP from "gsap";
import type { RefObject } from "react";
import { useCallback } from "react";
import { ScreenAnimation } from "./ScreenAnimation";

export const useScreenEnterTransition = (
  container: RefObject<HTMLElement | null>,
  renderButton: () => void,
  onEnter: () => void,
) => {
  return useCallback(() => {
    onEnter();
    const TL = GSAP.timeline();
    TL.to(container.current, {
      [ScreenAnimation.getAxis()]: "0%",
      delay: 1.75,
      duration: ScreenAnimation.axisDuration,
      ease: "expo.inOut",
    });
    TL.to(container.current, {
      scale: 1,
      duration: ScreenAnimation.scaleDuration,
      ease: "expo.inOut",
    });
    void TL.play().then(renderButton);
  }, [container, renderButton, onEnter]);
};
