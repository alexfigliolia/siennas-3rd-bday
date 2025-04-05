import Confetti from "canvas-confetti";
import { useCallback } from "react";
import { AnimatedScreen } from "Components/AnimatedScreen";
import { StaggeredText } from "Components/StaggeredText";
import type { Propless } from "Types/React";
import "./styles.scss";

export const HappyBirthday = (_: Propless) => {
  const throwConfetti = useCallback(() => {
    void Confetti({
      particleCount: 200,
      spread: window.innerWidth / 2,
      origin: { y: 0.5 },
      zIndex: 10000,
    });
  }, []);

  const confetti = useCallback(() => {
    throwConfetti();
    setTimeout(() => throwConfetti(), 750);
  }, [throwConfetti]);

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
