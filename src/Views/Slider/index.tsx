import { Fragment, useLayoutEffect } from "react";
import { ScreenAnimation } from "Tools/ScreenAnimation";
import type { Propless } from "Types/React";
import { Alex } from "Views/Alex";
import { Card } from "Views/Card";
import { Entrance } from "Views/Entrance";
import { HappyBirthday } from "Views/HappyBirthday";

export default function Slider(_: Propless) {
  useLayoutEffect(() => {
    ScreenAnimation.enter();
  }, []);

  return (
    <Fragment>
      <Entrance />
      <HappyBirthday />
      <Card />
      <Alex />
    </Fragment>
  );
}
