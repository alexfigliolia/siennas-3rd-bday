import { useCallback } from "react";
import { AnimatedScreen } from "Components/AnimatedScreen";
import { StaggeredText } from "Components/StaggeredText";
import { ScreenAnimation } from "Tools/ScreenAnimation";
import type { Propless } from "Types/React";
import "./styles.scss";

export const HappyBirthday = (_: Propless) => {
  const confetti = useCallback(() => {
    ScreenAnimation.throwConfetti();
  }, []);

  return (
    <AnimatedScreen className="happy-birthday" screenNumber={1}>
      {renderText => (
        <StaggeredText
          animate={renderText}
          text="Happy Birthday"
          onAnimation={confetti}
        />
      )}
    </AnimatedScreen>
  );
};
