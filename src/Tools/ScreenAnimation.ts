import type { Listener } from "@figliolia/event-emitter";
import { EventEmitter } from "@figliolia/event-emitter";
import { WindowSize } from "State/WindowSize";

export class ScreenAnimation {
  private static screen = -1;
  public static readonly axisDuration = 1.75;
  public static readonly scaleDuration = 1.75;
  private static readonly Emitter = new EventEmitter<ScreenAnimationEvents>();

  public static enter() {
    this.transition(0);
  }

  public static transition(screen: number) {
    const { screen: previous } = this;
    this.Emitter.emit("pan", [previous, screen]);
    this.screen = screen;
  }

  public static subscribe(callback: Listener<ScreenTransition>) {
    return this.Emitter.on("pan", callback);
  }

  public static unsubscribe(ID: string) {
    return this.Emitter.off("pan", ID);
  }

  public static getScale() {
    return WindowSize.getState().width < 670 ? 0.8 : 0.7;
  }

  public static getAxis() {
    return WindowSize.getState().width < 670 ? "x" : "y";
  }
}

export type ScreenAnimationEvents = {
  pan: ScreenTransition;
};

export type ScreenTransition = [prev: number, next: number];
