import GSAP from "gsap";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FullScreen } from "Components/FullScreen";
import { NavButton } from "Components/NavButton";
import { StaggeredText } from "Components/StaggeredText";
import { ScreenAnimation } from "Tools/ScreenAnimation";
import { useRipples } from "Tools/useRipples";
import { useScreenAnimation } from "Tools/useScreenAnimation";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Entrance = (_: Propless) => {
  const entered = useRef(false);
  const container = useRef<HTMLElement>(null);
  const [renderText, setRenderText] = useState(false);
  const [renderButton, setRenderButton] = useState(false);
  const [buildRipples, destroyRipples] = useRipples(container);

  useLayoutEffect(() => {
    GSAP.set(container.current, {
      scaleX: ScreenAnimation.getScale(),
      scaleY: 0,
    });
  }, []);

  const enterTransition = useCallback(() => {
    buildRipples();
    const delay = entered.current ? 3 : 1;
    if (!entered.current) {
      entered.current = true;
    }
    const scale = ScreenAnimation.getScale();
    GSAP.set(container.current, {
      scaleX: scale,
      scaleY: 0,
      [ScreenAnimation.getAxis()]: "0%",
    });
    setTimeout(
      () => {
        setRenderText(true);
      },
      delay * 1000 - 300,
    );
    void GSAP.to(container.current, {
      scaleY: scale,
      duration: 2,
      delay: delay,
      ease: "expo.inOut",
    }).then(() => {
      GSAP.to(container.current, {
        scaleY: 1,
        scaleX: 1,
        delay: 0.5,
        duration: 2,
        ease: "expo.inOut",
      });
      setTimeout(() => {
        setRenderButton(true);
      }, 2000);
    });
  }, [buildRipples]);

  const exitTransition = useCallback(() => {
    destroyRipples();
    const TL = GSAP.timeline();
    const scale = ScreenAnimation.getScale();
    TL.to(container.current, {
      scaleY: scale,
      scaleX: scale,
      duration: ScreenAnimation.scaleDuration,
      ease: "expo.inOut",
    });
    TL.to(container.current, {
      [ScreenAnimation.getAxis()]: "-100%",
      duration: ScreenAnimation.axisDuration,
      ease: "expo.inOut",
    });
    void TL.play().then(() => {
      setRenderText(false);
      setRenderButton(false);
    });
  }, [destroyRipples]);

  useScreenAnimation(([prev, next]) => {
    if (next === 0) {
      enterTransition();
    } else if (prev === 0) {
      exitTransition();
    }
  });

  const enter = useCallback(() => {
    ScreenAnimation.transition(1);
  }, []);

  return (
    <FullScreen ref={container} className="entrance">
      <div>
        <div>
          <div>
            <StaggeredText animate={renderText} text="Hi" />
            <StaggeredText animate={renderText} text="Sienna!" />
          </div>
          <NavButton animate={renderButton} onClick={enter}>
            Enter
          </NavButton>
        </div>
      </div>
    </FullScreen>
  );
};
