import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import { FullScreen } from "Components/FullScreen";
import { Preloader } from "Tools/ImagePreloader";
import { LazySlider } from "Views/Slider/Lazy";
import { Column } from "./Column";
import { AnimationQueue } from "./Queue";
import "./styles.scss";

export const Loading = ({ onComplete }: Props) => {
  const firstIncrement = useRef(true);
  const [hidden, setHidden] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const queue = useController(new AnimationQueue());
  const quantities = useMemo(() => [8, 22, 59, 81, 100], []);

  const enqueue = useCallback(
    (total: number) => {
      firstIncrement.current = false;
      queue.push(() => {
        return new Promise(resolve => {
          const percentage = quantities[total];
          setTimeout(() => {
            firstIncrement.current = false;
            setPercentage(percentage);
            setTimeout(
              () => {
                if (percentage === 100) {
                  onComplete();
                  setHidden(true);
                }
                resolve();
              },
              firstIncrement.current ? 2000 : 0,
            );
          }, 1010);
        });
      });
    },
    [queue, onComplete, quantities],
  );

  useLayoutEffect(() => {
    let preloaded = 0;
    void Preloader.preload(() => enqueue(preloaded++));
    void LazySlider.preload()
      .then(() => enqueue(preloaded++))
      .catch(console.log);
  }, [enqueue]);

  const [hundreths, tenths, ones] = useMemo(() => {
    const tokens = percentage.toString().split("");
    if (tokens.length < 2) {
      return [-1, -1, percentage];
    }
    if (tokens.length < 3) {
      return [-1, ...tokens.map(t => parseInt(t))];
    }
    return tokens.map(t => parseInt(t));
  }, [percentage]);

  const classes = useClassNames("loading", { hidden });

  return (
    <FullScreen className={classes}>
      <Column value={hundreths} />
      <Column value={tenths} />
      <Column value={ones} />
      <div>%</div>
    </FullScreen>
  );
};

interface Props {
  onComplete: () => void;
}
