import { IDrawable } from '../app/types';
import { Vector2 } from '../space';

export const DEFAULT_COLOR = 'red';

export type RectOptions = {
  position: Vector2;
  scale: Vector2;
  type: 'clear' | 'fill' | 'stroke';
  color?: string;
};

export class Rect implements IDrawable {
  options: RectOptions;

  get pivot() {
    return this.options.position.add(this.options.scale.div(2));
  }

  constructor(options: RectOptions) {
    this.options = options;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const box = this.options.position.boxTuple(this.options.scale);

    switch (this.options.type) {
      case 'clear':
        ctx.clearRect(...box);
        break;
      case 'fill':
        ctx.fillStyle = this.options.color || DEFAULT_COLOR;
        ctx.fillRect(...box);
        break;
      case 'stroke':
        ctx.strokeStyle = this.options.color || DEFAULT_COLOR;
        ctx.strokeRect(...box);
        break;
    }
  }
}
