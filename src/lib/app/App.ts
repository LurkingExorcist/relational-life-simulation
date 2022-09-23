import { IContexted, IInitable, ILayer, LayerFn } from '@/lib/core/types';

import { _Object } from '../core';

export class App<C extends _Object> implements IContexted<C>, IInitable {
  private _context: C;
  private _layers: ILayer<any>[];

  constructor(context: C, layers: ILayer<C>[] = []) {
    this._context = context;
    this._layers = layers;
  }

  init() {
    this._layers.forEach((layer) => layer.init());

    return this;
  }

  get ctx(): C {
    return this._context;
  }

  set ctx(value: C) {
    Object.assign(this._context, value);
  }

  install<OutputContext extends C>(
    layerFn: LayerFn<C, OutputContext>
  ): App<OutputContext> {
    const layer = layerFn(this.ctx);

    return new App<OutputContext>(layer.ctx, [...this._layers, layer]);
  }
}
