import type { IScreen } from "@figliolia/galena-window";
import { WindowManager } from "@figliolia/galena-window";
import { createUseState } from "@figliolia/react-galena";

export const WindowSize = new WindowManager();
export const useWindowSize = createUseState(WindowSize);
export const selectWidth = (state: IScreen) => state.width;
export const selectHeight = (state: IScreen) => state.height;
