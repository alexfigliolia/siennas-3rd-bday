import type { RefObject } from "react";
import { useCallback, useRef } from "react";
import { Ripples } from "@figliolia/ripples";

export const useRipples = (target: RefObject<HTMLElement | null>) => {
  const ripples = useRef<null | Ripples>(null);
  const buildRipples = useCallback(() => {
    if (!ripples.current && target.current?.firstChild) {
      ripples.current = new Ripples(target.current.firstChild as HTMLElement, {
        resolution: 512,
        dropRadius: 10,
        perturbance: 0.02,
      });
    }
  }, [target]);

  const destroyRipples = useCallback(() => {
    if (ripples.current) {
      ripples.current.destroy();
      ripples.current = null;
    }
  }, []);

  return [buildRipples, destroyRipples];
};
