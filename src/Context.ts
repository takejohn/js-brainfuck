import { Memory } from './Memory.ts';

export abstract class Context {
    public readonly memory = new Memory();

    abstract read(): number | PromiseLike<number>;

    abstract write(value: number): void | PromiseLike<void>;
}
