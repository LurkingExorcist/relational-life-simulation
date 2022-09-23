import { CanvasLayerContext } from '../canvas-layer';
import { IComponent, ILayer, _Object } from '../core';

export class MapLayer<IC extends _Object>
  implements ILayer<MapLayerContext<IC>>, IComponent<MapLayerOptions> {}
