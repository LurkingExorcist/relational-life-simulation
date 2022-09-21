export namespace Space {
  export class Vector2 {
    x: number;
    y: number;

    constructor (x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    *[Symbol.iterator]() {
      for (const i of this.tuple()) {
        yield i;
      }
    }

    tuple() {
      return [this.x, this.y] as const;
    }

    concatTuple(vec: Vector2) {
      return [
        ...this.tuple(),
        ...vec.tuple(),
      ] as const;
    }

    boxTuple(scale: Vector2) {
      return this.concatTuple(
        this.add(scale)
      )
    }

    add(vec: Vector2) {
      return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    sub(vec: Vector2) {
      return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    div(value: number) {
      return new Vector2(this.x / value, this.y / value);
    }

    divVec(vec: Vector2) {
      return new Vector2(this.x / vec.x, this.y / vec.y);
    }

    mul(value: number) {
      return new Vector2(this.x * value, this.y * value);
    }

    mulVec(vec: Vector2) {
      return new Vector2(this.x * vec.x, this.y * vec.y);
    }

    hypot(vec: Vector2) {
      return Math.hypot(...this.sub(vec));
    }
  }
}