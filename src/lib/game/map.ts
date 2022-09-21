import { IRenderOptions, IComponent, ILifeCycled } from "../app/types";
import { Drawable } from "../drawable/rect";
import { Space } from "../space";

export type MapOptions = {
  background: string;
};

export class Map implements IComponent<MapOptions>, ILifeCycled<IRenderOptions> {
  options: MapOptions;

  constructor(options: MapOptions) {
    this.options = options;
  }

  update({ canvas }: IRenderOptions) {
    const { width, height } = canvas.getElement();

    canvas.draw(
      new Drawable.Rect({
        position: new Space.Vector2(0, 0),
        scale: new Space.Vector2(width, height),
        type: "fill",
        color: this.options.background,
      })
    );
  }
}
