import './style.css';
import ColorScheme from 'color-scheme';

import { App, Canvas, TimeEngine } from './lib';
import { CanvasLayer } from './lib/canvas-layer';
import * as Game from './lib/game';
import { Vector2 } from './lib/space';

const app = new App({})
  .install(
    (ctx) =>
      new CanvasLayer(ctx, {
        root: document.querySelector('#app')!,
        width: 768,
        height: 768,
      })
  )
  .init();
// .install(() => new Game.Map({ background: 'black' }))
// .install((ctx) => {
//   const {
//     size: [width, height],
//   } = ctx.canvas;
//   const colors = new ColorScheme()
//     .scheme('triade')
//     .variation('soft')
//     .colors();

//   return new Game.Life({
//     entities: _.range(0, 100).map(
//       () =>
//         new Game.Entity({
//           position: new Vector2(
//             Math.random() * width,
//             Math.random() * height
//           ),
//           type: 'stroke',
//           color: `#${_.sample(colors)}` || 'white',
//           sharpness: Math.random() / 2 + 0.5,
//           scale: 16 * Math.random(),
//           anglesCount: 12,
//         })
//     ),
//     rules: [
//       // {
//       //   id: 'default',
//       //   getter: _.identity,
//       //   compare: () => -1,
//       // },
//       // {
//       //   id: "by-color",
//       //   getter: (entity) => entity.options.color,
//       //   compare: _.memoize(
//       //     (col1: string, col2: string) =>
//       //       ((parseInt(col1.slice(1), 16) - parseInt(col2.slice(1), 16)) /
//       //         0xffffff) * (Math.random() > 1/2 ? 1 : -1)
//       //   ),
//       // },
//       {
//         id: 'by-scale',
//         getter: (entity) => entity.options.scale,
//         compare: _.memoize((scale1: number, scale2: number) =>
//           Math.tan(scale1 / scale2)
//         ),
//       },
//     ],
//   });
// })
// .run();

window.app = app;
