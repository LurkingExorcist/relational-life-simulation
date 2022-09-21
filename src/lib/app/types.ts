import { Space } from "../space";

export interface IService<O extends Record<string, any> = any> extends IComponent<O>, ILifeCycled<ITimeOptions & IRenderOptions> {}

export type ServiceFn = (ctx: IRenderOptions) => IService;

export interface IApp {
  mount(el: HTMLElement): IApp;
  run(): IApp;
  install(service: IService | ServiceFn): IApp;
}

export interface ICanvas {
  size: Space.Vector2;
  getElement(): HTMLCanvasElement;
  draw(drawable: IDrawable): void;
}

export type CanvasOptions = {
  width: number;
  height: number;
}

export interface ITimeEngine {
  update(onUpdate: TimeEngineUpdateCallback): void;
}

export type TimeEngineUpdateCallback = (options: ITimeOptions) => void

export interface ITimeOptions {
  dT: number;
  time: number;
}

export interface IRenderOptions {
  canvas: ICanvas;
}

export interface IComponent<O extends Record<string, any> = any> {
  options: O;
}

export interface ILifeCycled<U> {
  init?(): void;
  update?(options: U): void;
}

export interface IDrawable {
  pivot: Space.Vector2;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface IPoint {
  velocity: Space.Vector2;
  position: Space.Vector2;
}