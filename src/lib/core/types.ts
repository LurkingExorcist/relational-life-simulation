import { _Object } from './alias';

import { Vector2 } from '../space';

export interface IMountable {
  mount(el: HTMLElement): this;
}

export interface IContexted<C extends _Object> {
  get ctx(): C;
  set ctx(value: C);
}

export interface IInitable {
  init(): this;
}

export interface ILayer<C extends _Object> extends IContexted<C>, IInitable {}

export type LayerFn<IC extends _Object, OC extends IC> = (
  ctx: IC
) => ILayer<OC>;

export interface ICanvas {
  size: Vector2;
  getElement(): HTMLCanvasElement;
  draw(drawable: IDrawable): void;
}

export type CanvasOptions = {
  width: number;
  height: number;
};

export interface ITimeEngine {
  update(onUpdate: TimeEngineUpdateCallback): void;
}

export type TimeEngineUpdateCallback = (options: ITimeOptions) => void;

export interface ITimeOptions {
  dT: number;
  time: number;
}

export interface IRenderOptions {
  canvas: ICanvas;
}

export interface IComponent<O extends _Object = any> {
  options: O;
}

export interface ILifeCycled<U> {
  init?(): void;
  update?(options: U): void;
}

export interface IDrawable {
  pivot: Vector2;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface IPoint {
  velocity: Vector2;
  position: Vector2;
}
