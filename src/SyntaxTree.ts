import type { Context } from './Context.ts';

export interface Node {
    execute(context: Context): void | PromiseLike<void>;
}

export class Block implements Node {
    private readonly nodes: Iterable<Node>;

    constructor(nodes: Iterable<Node>) {
        this.nodes = nodes;
    }

    async execute(context: Context): Promise<void> {
        for (const node of this.nodes) {
            await node.execute(context);
        }
    }
}

export class IncreaseValue implements Node {
    public static readonly instance = new IncreaseValue();

    execute(context: Context): void {
        context.memory.increaseValue();
    }
}

export class DecreaseValue implements Node {
    public static readonly instance = new DecreaseValue();

    execute(context: Context): void {
        context.memory.decreaseValue();
    }
}

export class IncreasePointer implements Node {
    public static readonly instance = new IncreasePointer();

    execute(context: Context): void {
        context.memory.increasePointer();
    }
}

export class DecreasePointer implements Node {
    public static readonly instance = new DecreasePointer();

    execute(context: Context): void {
        context.memory.decreasePointer();
    }
}

export class Read implements Node {
    public static readonly instance = new Read();

    async execute(context: Context): Promise<void> {
        const value = await context.read();
        context.memory.setValue(value);
    }
}

export class Write implements Node {
    public static readonly instance = new Write();

    async execute(context: Context): Promise<void> {
        const value = context.memory.getValue();
        await context.write(value);
    }
}

export class LoopWhile implements Node {
    private readonly inner: Node;

    constructor(inner: Node) {
        this.inner = inner;
    }

    async execute(context: Context): Promise<void> {
        const memory = context.memory;
        const inner = this.inner;
        while (memory.getValue() != 0) {
            await inner.execute(context);
        }
    }
}
