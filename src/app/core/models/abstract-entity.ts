export abstract class AbstractEntity<T> {
  id?: string | number;

  constructor(init: Partial<T>) {
    Object.assign(this, init);
  }
}
