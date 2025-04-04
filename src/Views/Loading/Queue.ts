export class AnimationQueue {
  private running = false;
  private readonly queue: Animation[] = [];

  public push(item: Animation) {
    this.queue.push(item);
    void this.execute();
  }

  private async execute(): Promise<void> {
    if (this.running) {
      return;
    }
    const FN = this.queue.shift();
    if (FN) {
      this.running = true;
      await FN();
      this.running = false;
      return this.execute();
    }
  }
}

type Animation = () => Promise<void>;
