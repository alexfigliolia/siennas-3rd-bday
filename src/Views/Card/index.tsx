import { AnimatedScreen } from "Components/AnimatedScreen";
import { StaggeredText } from "Components/StaggeredText";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Card = (_: Propless) => {
  return (
    <AnimatedScreen
      className="card"
      screenNumber={2}
      renderTextTimeout={3500}
      renderControlsTimeout={1000}>
      {renderText => (
        <StaggeredText
          animate={renderText}
          duration={1.5}
          stagger={0.015}
          text="It's been a wonderful year of watching you explore and grow. We're so proud of what a great sister and big girl you're becoming. Wishing you the best birthday ever! Happy 3rd!"
        />
      )}
    </AnimatedScreen>
  );
};
