import _ from 'lodash';

import {
  IComponent,
  IDrawable,
  ILifeCycled,
  IPoint,
  ITimeOptions,
} from '../app/types';
import { Vector2 } from '../space';

export type EntityOptions = {
  position: Vector2;
  type: 'stroke' | 'fill';
  color: string;
  /** from 0 to 1 */
  sharpness: number;
  /** from 0 to 1 */
  scale: number;
  anglesCount: number;
};

export class Entity
  implements
    IComponent<EntityOptions>,
    IDrawable,
    IPoint,
    ILifeCycled<ITimeOptions>
{
  private shape: Vector2[] = [];
  options: EntityOptions;

  velocity: Vector2 = new Vector2(0, 0);
  position: Vector2;

  constructor(options: EntityOptions) {
    this.options = options;
    this.position = options.position;
  }

  get pivot() {
    const { scale } = this.options;

    return this.position.add(new Vector2(scale, scale));
  }

  init() {
    this.setShape();
  }

  setShape(time = 0) {
    const { anglesCount, scale, sharpness } = this.options;
    const shape: Vector2[] = [];

    const seed = Math.round(sharpness * 64);

    for (
      let angle = 0;
      angle < Math.PI * 2;
      angle += (Math.PI * 2) / anglesCount
    ) {
      const x =
        Math.cos(angle) * scale +
        (Math.cos(angle * seed + (time / 1000) * sharpness) * 2 - 1) *
          sharpness *
          scale;
      const y =
        Math.sin(angle) * scale +
        (Math.sin(angle * seed + (time / 1000) * sharpness) * 2 - 1) *
          sharpness *
          scale;

      shape.push(new Vector2(x, y));
    }

    this.shape = shape;
  }

  update(options: ITimeOptions) {
    this.setShape(options.time);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { type, color } = this.options;
    const { pivot } = this;

    ctx.beginPath();

    this.shape.concat(this.shape[0]).forEach(({ x, y }, idx) => {
      if (idx === 0) {
        ctx.moveTo(x + pivot.x, y + pivot.y);
        return;
      }

      ctx.lineTo(x + pivot.x, y + pivot.y);
    });

    switch (type) {
      case 'fill':
        ctx.fillStyle = color;
        ctx.fill();
        break;
      case 'stroke':
        ctx.strokeStyle = color;
        ctx.stroke();
        break;
    }
  }
}
