import { Context } from './Context.ts';
import { Parser } from './Parser.ts';

class Pipeline {
    private readonly writingQueue: (() => number)[] = [];

    private readonly readingQueue: ((value: number) => void)[] = [];

    read(): number | PromiseLike<number> {
        const input = this.writingQueue.shift();
        if (input != null) {
            return input();
        } else {
            return new Promise((resolve) => {
                this.readingQueue.push((value) => {
                    resolve(value);
                });
            });
        }
    }

    write(value: number): void | PromiseLike<void> {
        const output = this.readingQueue.shift();
        if (output != null) {
            output(value);
        } else {
            return new Promise((resolve) => {
                this.writingQueue.push(() => {
                    resolve();
                    return value;
                });
            });
        }
    }
}

class InterpreterContext extends Context {
    private readonly inputPipeline = new Pipeline();

    private readonly outputPipeline = new Pipeline();

    read(): number | PromiseLike<number> {
        return this.inputPipeline.read();
    }

    write(value: number): void | PromiseLike<void> {
        return this.outputPipeline.write(value);
    }

    input(value: number): void | PromiseLike<void> {
        return this.inputPipeline.write(value);
    }

    output(): number | PromiseLike<number> {
        return this.outputPipeline.read();
    }
}

/**
 * An interpreter.
 */
export class Interpreter {
    private readonly parser = new Parser();

    private readonly context = new InterpreterContext();

    /**
     * Executes the code.
     * @param source The code to execute
     * @returns Will be resolved when the execution end
     */
    execute(source: string): void | PromiseLike<void> {
        return this.parser.parse(source).execute(this.context);
    }

    /**
     * Inputs a byte
     * @param value The byte to input
     * @returns Will be resolved when the byte is read
     */
    input(value: number): void | PromiseLike<void> {
        return this.context.input(value);
    }

    /**
     * Outputs a byte
     * @returns Will be resolved with the written byte
     */
    output(): number | PromiseLike<number> {
        return this.context.output();
    }
}
