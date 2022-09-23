import { IComponent, ILayer, _Object } from '../core';

export type CanvasLayerContext<C extends _Object> = C & {
  canvas: HTMLCanvasElement;
  renderer: CanvasRenderingContext2D;
};

export type CanvasLayerOptions = {
  root: HTMLElement;
  width: number;
  height: number;
};

export class CanvasLayer<IC extends _Object>
  implements ILayer<CanvasLayerContext<IC>>, IComponent<CanvasLayerOptions>
{
  private _context: CanvasLayerContext<IC>;
  public options: CanvasLayerOptions;

  constructor(context: IC, options: CanvasLayerOptions) {
    this.options = options;

    this._context = { ...context, ...this.createCanvas() };
  }

  get ctx(): CanvasLayerContext<IC> {
    return this._context;
  }

  set ctx(value: CanvasLayerContext<IC>) {
    Object.assign(this._context, value);
  }

  private createCanvas() {
    const canvas = document.createElement('canvas');
    const renderer = canvas.getContext('2d');

    if (!renderer) {
      throw new Error("2d context didn't provided");
    }

    canvas.width = this.options.width;
    canvas.height = this.options.height;

    return {
      canvas,
      renderer,
    };
  }

  private mount() {
    this.options.root.replaceChildren(this.ctx.canvas);

    return this;
  }

  init(): this {
    return this.mount();
  }
}
