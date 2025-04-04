import GSAP from "gsap";
import { useId, useLayoutEffect, useMemo } from "react";
import { SplitText } from "Components/SplitText";

export const StaggeredText = ({
  text,
  className,
  animate,
  duration = 3,
  stagger = 0.075,
}: Props) => {
  const ID = useId();
  const letterClass = useMemo(() => `.${ID}`, [ID]);

  useLayoutEffect(() => {
    GSAP.set(letterClass, {
      opacity: 0,
      y: "70%",
    });
  }, [letterClass]);

  useLayoutEffect(() => {
    if (!animate) {
      GSAP.to(letterClass, {
        opacity: 0,
        duration,
        stagger,
      });
      GSAP.to(letterClass, {
        y: "70%",
        duration,
        stagger,
        ease: "expo.inOut",
      });
      return;
    }
    GSAP.to(letterClass, {
      delay: duration * 0.42,
      opacity: 1,
      duration,
      stagger,
    });
    GSAP.to(letterClass, {
      y: "0%",
      duration,
      stagger,
      ease: "expo.inOut",
    });
  }, [letterClass, animate, stagger, duration]);

  return (
    <h1 className={className} aria-label={text}>
      <SplitText text={text} className={ID} />
    </h1>
  );
};

interface Props {
  text: string;
  animate: boolean;
  className?: string;
  stagger?: number;
  duration?: number;
}
