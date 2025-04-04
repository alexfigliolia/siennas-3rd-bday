import { Fragment } from "react";
import { AnimatedScreen } from "Components/AnimatedScreen";
import { StaggeredText } from "Components/StaggeredText";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Alex = (_: Propless) => {
  return (
    <AnimatedScreen className="alex" screenNumber={3}>
      {renderText => (
        <Fragment>
          <StaggeredText animate={renderText} text="Love" />
          <StaggeredText animate={renderText} text="Alex" />
        </Fragment>
      )}
    </AnimatedScreen>
  );
};
