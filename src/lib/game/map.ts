import { IRenderOptions, IComponent, ILifeCycled } from '../app/types';
import { ILayer } from '../core';
import { Rect } from '../drawable';
import { Vector2 } from '../space';

export type MapOptions = {
  background: string;
};

export class Map implements ILayer {
  options: MapOptions;

  constructor(options: MapOptions) {
    this.options = options;
  }

  update({ canvas }: IRenderOptions) {
    const { width, height } = canvas.getElement();

    canvas.draw(
      new Rect({
        position: new Vector2(0, 0),
        scale: new Vector2(width, height),
        type: 'fill',
        color: this.options.background,
      })
    );
  }
}
