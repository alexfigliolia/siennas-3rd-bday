import BaloonsLarge from "Images/balloons.webp";
import BaloonsSmall from "Images/balloons-small.webp";
import BirthdayLarge from "Images/birthday.webp";
import BirthdaySmall from "Images/birthday-small.webp";
import ConfettiLarge from "Images/confetti.webp";
import ConfettiSmall from "Images/confetti-small.webp";
import CupcakesLarge from "Images/cupcakes.webp";
import CupcakesSmall from "Images/cupcakes-small.webp";
import { WindowSize } from "State/WindowSize";

export class Preloader {
  public static preload(
    onImageLoaded?: (remaining: number, total: number) => void,
  ) {
    const images = this.imageList();
    const { length } = images;
    let remaining = length;
    return Promise.all(
      images.map(img => {
        const promise = this.loadImage(img);
        if (onImageLoaded) {
          void promise.then(() => onImageLoaded(--remaining, length));
        }
        return promise;
      }),
    );
  }

  private static loadImage(src: string) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });
  }

  public static imageList() {
    if (WindowSize.getState().width >= 670) {
      return this.largeScreenImages;
    }
    return this.smallScreenImages;
  }

  private static get smallScreenImages() {
    return [CupcakesSmall, BaloonsLarge, BirthdayLarge, ConfettiLarge];
  }

  private static get largeScreenImages() {
    return [CupcakesLarge, BaloonsSmall, BirthdaySmall, ConfettiSmall];
  }
}
