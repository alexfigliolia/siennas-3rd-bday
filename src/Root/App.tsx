import { useCallback, useState } from "react";
import { useSetup } from "@figliolia/galena-window";
import { WindowSize } from "State/WindowSize";
import { Loading } from "Views/Loading";
import { LazySlider } from "Views/Slider/Lazy";
import "./styles.scss";

export function App() {
  useSetup(WindowSize);
  const [mountSlider, setMountSlider] = useState(false);

  const initSlider = useCallback(() => {
    setTimeout(() => setMountSlider(true), 1100);
  }, []);

  return (
    <div className="main">
      {mountSlider && <LazySlider />}
      <Loading onComplete={initSlider} />
    </div>
  );
}
