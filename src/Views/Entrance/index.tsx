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

  const setPosition = useCallback(() => {
    if (!container.current) {
      return;
    }
    const scale = ScreenAnimation.getScale();
    GSAP.set(container.current, {
      scale,
      yPercent: scale * 100,
      boxShadow: "none",
      [ScreenAnimation.getAxis()]: "0%",
    });
    GSAP.set(container.current?.firstChild, {
      yPercent: -100,
    });
  }, []);

  useLayoutEffect(() => {
    setPosition();
  }, [setPosition]);

  const enterTransition = useCallback(() => {
    if (!container.current) {
      return;
    }
    buildRipples();
    const delay = entered.current ? 3 : 1;
    if (!entered.current) {
      entered.current = true;
    }
    setPosition();
    setTimeout(
      () => {
        setRenderText(true);
      },
      delay * 1000 - 300,
    );
    GSAP.to(container.current.firstChild, {
      yPercent: 0,
      duration: 2,
      delay: delay,
      ease: "expo.inOut",
    });
    void GSAP.to(container.current, {
      yPercent: 0,
      duration: 2,
      delay: delay,
      ease: "expo.inOut",
    }).then(() => {
      GSAP.to(container.current, {
        boxShadow: "0em 0.5em 1em rgba(0,0,0, 0.2)",
        duration: 0.5,
      });
      GSAP.to(container.current, {
        scale: 1,
        delay: 0.5,
        duration: 2,
        ease: "expo.inOut",
      });
      setTimeout(() => {
        setRenderButton(true);
      }, 2000);
    });
  }, [buildRipples, setPosition]);

  const exitTransition = useCallback(() => {
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
      destroyRipples();
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
