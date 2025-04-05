import { Fragment, useCallback } from "react";
import { AnimatedScreen } from "Components/AnimatedScreen";
import { StaggeredText } from "Components/StaggeredText";
import { ScreenAnimation } from "Tools/ScreenAnimation";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Alex = (_: Propless) => {
  const confetti = useCallback(() => {
    ScreenAnimation.throwConfetti();
  }, []);
  return (
    <AnimatedScreen className="alex" screenNumber={3}>
      {renderText => (
        <Fragment>
          <StaggeredText animate={renderText} text="Love," />
          <StaggeredText
            text="Uncle Alex"
            animate={renderText}
            onAnimation={confetti}
          />
        </Fragment>
      )}
    </AnimatedScreen>
  );
};
