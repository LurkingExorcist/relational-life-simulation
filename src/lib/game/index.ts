import * as entity from "./entity";
import * as life from "./life";
import * as map from "./map";

export const Game = {
  ...entity,
  ...life,
  ...map
}

export type Game = typeof entity & typeof life & typeof map;