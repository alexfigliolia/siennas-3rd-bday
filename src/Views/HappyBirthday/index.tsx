import { AnimatedScreen } from "Components/AnimatedScreen";
import { StaggeredText } from "Components/StaggeredText";
import type { Propless } from "Types/React";
import "./styles.scss";

export const HappyBirthday = (_: Propless) => {
  return (
    <AnimatedScreen className="happy-birthday" screenNumber={1}>
      {renderText => (
        <StaggeredText animate={renderText} text="Happy Birthday" />
      )}
    </AnimatedScreen>
  );
};
