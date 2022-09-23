import { CanvasOptions, ICanvas, IDrawable } from './types';

import { Vector2 } from '../space';

export class Canvas implements ICanvas {
  private element: HTMLCanvasElement;

  constructor(options: CanvasOptions) {
    this.element = document.createElement('canvas');
    this.element.width = options.width;
    this.element.height = options.height;
  }

  private get ctx() {
    const ctx = this.element.getContext('2d');

    if (!ctx) {
      throw new Error("Can't get canvas context");
    }

    return ctx;
  }

  public get size() {
    const { width, height } = this.getElement();

    return new Vector2(width, height);
  }

  public getElement() {
    return this.element;
  }

  public draw(drawable: IDrawable) {
    drawable.draw(this.ctx);
  }
}
