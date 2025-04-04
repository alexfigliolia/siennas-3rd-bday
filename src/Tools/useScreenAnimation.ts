import { useLayoutEffect } from "react";
import type { Listener } from "@figliolia/event-emitter";
import type { ScreenTransition } from "./ScreenAnimation";
import { ScreenAnimation } from "./ScreenAnimation";

export const useScreenAnimation = (callback: Listener<ScreenTransition>) => {
  useLayoutEffect(() => {
    const ID = ScreenAnimation.subscribe(callback);
    return () => {
      ScreenAnimation.unsubscribe(ID);
    };
  }, [callback]);
};
