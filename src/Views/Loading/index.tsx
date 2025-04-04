import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import { FullScreen } from "Components/FullScreen";
import { Preloader } from "Tools/ImagePreloader";
import { LazySlider } from "Views/Slider/Lazy";
import { Column } from "./Column";
import { AnimationQueue } from "./Queue";
import "./styles.scss";

export const Loading = ({ onComplete }: Props) => {
  const [hidden, setHidden] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const queue = useController(new AnimationQueue());

  const enqueue = useCallback(
    (total: number, remaining: number) => {
      queue.push(() => {
        return new Promise(resolve => {
          const percentage = Math.floor(((total - remaining) * 100) / total);
          setPercentage(percentage);
          setTimeout(() => {
            if (percentage === 100) {
              onComplete();
              setHidden(true);
            }
            resolve();
          }, 1010);
        });
      });
    },
    [queue, onComplete],
  );

  useLayoutEffect(() => {
    const total = Preloader.imageList().length + 1;
    let remaining = total;
    void Preloader.preload(() => {
      --remaining;
      enqueue(total, remaining);
    });
    void LazySlider.preload()
      .then(() => {
        --remaining;
        enqueue(total, remaining);
      })
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
