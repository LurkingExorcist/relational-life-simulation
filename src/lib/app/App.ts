import _ from "lodash";
import { IApp, ICanvas, IService, ITimeEngine, ServiceFn } from "./types";

export class App implements IApp {
  private canvas: ICanvas;
  private timeEngine: ITimeEngine;
  private services: IService<any>[] = [];

  constructor(options: { canvas: ICanvas; timeEngine: ITimeEngine }) {
    this.canvas = options.canvas;
    this.timeEngine = options.timeEngine;
  }

  public mount(el: HTMLElement) {
    el.appendChild(this.canvas.getElement());

    return this;
  }

  public run() {
    this.services.forEach((service) => service.init?.());

    this.timeEngine.update((opt) => {
      this.services.forEach((service) => {
        service.update?.({
          ...opt,
          canvas: this.canvas,
        });
      });
    });

    return this;
  }

  public install(service: IService | ServiceFn) {
    this.services.push(
      _.cond<IService | ServiceFn, IService>([
        [
          _.isFunction,
          (fn: any) =>
            fn({
              canvas: this.canvas,
            }),
        ],
        [_.isObject, _.identity],
      ])(service)
    );

    return this;
  }
}
