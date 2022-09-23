import { ITimeEngine, TimeEngineUpdateCallback } from './types';

export class TimeEngine implements ITimeEngine {
  private dT = 0;
  private lastTime = new Date().getTime();

  update(onUpdate: TimeEngineUpdateCallback) {
    const time = new Date().getTime();
    this.dT = (time - this.lastTime) / 1000;
    this.lastTime = time;

    onUpdate({ dT: this.dT, time });
    requestAnimationFrame(() => this.update(onUpdate));
  }
}
