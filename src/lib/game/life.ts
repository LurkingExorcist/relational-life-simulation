import _ from "lodash";
import {
  IComponent,
  IDrawable,
  ILifeCycled,
  IPoint,
  IRenderOptions,
  ITimeOptions,
} from "../app/types";
import { Space } from "../space";
import { EntityOptions } from "./entity";

export interface IEntity
  extends IComponent<EntityOptions>,
    IDrawable,
    IPoint,
    ILifeCycled<ITimeOptions> {}

export type EntityGetter<V> = (entity: IEntity) => V;
export type ValueComparer<V> = (value1: V, value2: V) => number;

export type LifeRule<V> = {
  id: string;
  getter: EntityGetter<V>;
  compare: ValueComparer<V>;
};

export type LifeOptions = {
  entities: IEntity[];
  rules: LifeRule<any>[];
};

export class Life
  implements
    IComponent<LifeOptions>,
    ILifeCycled<IRenderOptions & ITimeOptions>
{
  options: LifeOptions;
  groupsTree: Record<string, { rule: LifeRule<any>; groups: IEntity[][] }>;

  constructor(options: LifeOptions) {
    this.options = options;
    this.groupsTree = {};
  }

  setGroupsTree() {
    const { rules, entities } = this.options;
    rules.forEach((rule) => {
      const groups = _(entities)
        .groupBy(rule.getter)
        .entries()
        .map(([_key, items]) => items)
        .zip()
        .flatMap((group) => _.compact(group))
        .value();

      this.groupsTree[rule.id] = {
        rule,
        groups,
      };
    });
  }

  init() {
    this.setGroupsTree();

    this.options.entities.forEach((entity) => {
      entity.init?.();
    });
  }

  relation(
    entities1: IEntity[],
    entities2: IEntity[],
    options: LifeRule<any> & IRenderOptions & ITimeOptions
  ) {
    entities1.forEach((entity1) => {
      let fx = 0;
      let fy = 0;

      entities2.forEach((entity2) => {
        const distance = entity1.position.hypot(entity2.position);

        if (distance > 0 && distance < options.canvas.size.x / 2) {
          const gravity = options.compare(
            options.getter(entity1),
            options.getter(entity2)
          );

          const [dx, dy] = entity1.position.sub(entity2.position);

          if (dx === 0 || dy === 0) return;

          const F = (gravity / distance) * options.dT * 10;

          fx += F * dx;
          fy += F * dy;
        }
      });

      entity1.velocity = new Space.Vector2(
        (entity1.velocity.x + fx) * 0.5,
        (entity1.velocity.y + fy) * 0.5
      );

      entity1.position.x += entity1.velocity.x;
      entity1.position.y += entity1.velocity.y;
    });
  }

  shiftEntities(entities: IEntity[], offset: Space.Vector2) {
    return entities.map((entity) => {
      entity.position.add(offset.mulVec(new Space.Vector2(0, 1)));
      return entity;
    });
  }

  simulate(options: IRenderOptions & ITimeOptions) {
    const { rules, entities } = this.options;
    rules.map((rule) => {
      this.relation(
        entities,
        entities,
        { ...rule, ...options }
      );
    });
  }

  update(options: IRenderOptions & ITimeOptions): void {
    this.simulate(options);
    this.options.entities.forEach((entity) => {
      entity.update?.(options);
      options.canvas.draw(entity);
    });
  }
}
