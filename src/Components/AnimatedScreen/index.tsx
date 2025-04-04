import type { ReactNode } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Controls } from "Components/Controls";
import type { Props as AnimatedScreenProps } from "Components/FullScreen";
import { FullScreen } from "Components/FullScreen";
import { ScreenAnimation } from "Tools/ScreenAnimation";
import { useRipples } from "Tools/useRipples";
import { useScreenAnimation } from "Tools/useScreenAnimation";
import { useScreenEnterTransition } from "Tools/useScreenEnterTransition";
import { useScreenExitTransition } from "Tools/useScreenExitTransition";
import { useScreenLayout } from "Tools/useScreenLayout";
import "./styles.scss";

export const AnimatedScreen = memo(function AnimatedScreen({
  children,
  className,
  screenNumber,
  renderTextTimeout = 3000,
  renderControlsTimeout = 0,
  ...rest
}: Props) {
  const container = useScreenLayout();
  const [renderText, setRenderText] = useState(false);
  const [renderControls, setRenderControls] = useState(false);

  const [buildRipples, destroyRipples] = useRipples(container);

  const classes = useClassNames("animated-screen", className);

  const onEnter = useCallback(() => {
    buildRipples();
    setTimeout(() => {
      setRenderText(true);
    }, renderTextTimeout);
  }, [renderTextTimeout, buildRipples]);

  const showControls = useCallback(() => {
    setTimeout(() => {
      setRenderControls(true);
    }, renderControlsTimeout);
  }, [renderControlsTimeout]);

  const onExit = useCallback(() => {
    setRenderText(false);
    setRenderControls(false);
    destroyRipples();
  }, [destroyRipples]);

  const exitTransition = useScreenExitTransition(container, onExit);

  const enterTransition = useScreenEnterTransition(
    container,
    showControls,
    onEnter,
  );

  const onChangeScreen = useCallback(
    ([prev, next]: [number, number]) => {
      if (next === screenNumber) {
        enterTransition();
      } else if (prev === screenNumber) {
        exitTransition();
      }
    },
    [screenNumber, enterTransition, exitTransition],
  );

  useScreenAnimation(onChangeScreen);

  const onBack = useCallback(() => {
    ScreenAnimation.transition(screenNumber - 1);
  }, [screenNumber]);

  const onForward = useMemo(
    () =>
      screenNumber === 3
        ? undefined
        : () => ScreenAnimation.transition(screenNumber + 1),
    [screenNumber],
  );

  return (
    <FullScreen className={classes} {...rest} ref={container}>
      <div>
        <div>
          <div className="content">{children(renderText)}</div>
          <Controls
            render={renderControls}
            onBack={onBack}
            onForward={onForward}
          />
        </div>
      </div>
    </FullScreen>
  );
});

interface Props extends Omit<AnimatedScreenProps, "children"> {
  screenNumber: number;
  renderTextTimeout?: number;
  renderControlsTimeout?: number;
  children: (renderText: boolean) => ReactNode;
}
