import { Memory } from './Memory.ts';

/**
 * A context to execute programs.
 */
export abstract class Context {
    /**
     * The memory this context holds.
     */
    public readonly memory: Memory = new Memory();

    /**
     * Reads a byte from the input.
     * @returns The byte read
     */
    abstract read(): number | PromiseLike<number>;

    /**
     * Writes a byte to the output.
     * @param value The byte to write
     */
    abstract write(value: number): void | PromiseLike<void>;
}
