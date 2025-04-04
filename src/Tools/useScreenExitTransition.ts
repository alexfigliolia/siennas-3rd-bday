import GSAP from "gsap";
import type { RefObject } from "react";
import { useCallback } from "react";
import { ScreenAnimation } from "./ScreenAnimation";

export const useScreenExitTransition = (
  container: RefObject<HTMLElement | null>,
  onExit: () => void,
) => {
  const exitScreen = useCallback(() => {
    const TL = GSAP.timeline();
    TL.to(container.current, {
      scale: ScreenAnimation.getScale(),
      duration: ScreenAnimation.scaleDuration,
      ease: "expo.inOut",
    });
    TL.to(container.current, {
      [ScreenAnimation.getAxis()]: "-100%",
      duration: ScreenAnimation.axisDuration,
      ease: "expo.inOut",
    });
    return TL;
  }, [container]);

  const resetScreenPosition = useCallback(() => {
    GSAP.set(container.current, {
      [ScreenAnimation.getAxis()]: "100%",
    });
  }, [container]);

  return useCallback(() => {
    const TL = exitScreen();
    void TL.play().then(() => {
      onExit();
      resetScreenPosition();
    });
  }, [exitScreen, resetScreenPosition, onExit]);
};
