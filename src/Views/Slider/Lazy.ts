import { CreateLazyComponent } from "@figliolia/react-lazy";

export const LazySlider = CreateLazyComponent({
  loader: () => import("./index"),
});
