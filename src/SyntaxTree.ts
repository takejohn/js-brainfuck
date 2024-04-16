import type { Context } from './Context.ts';

/**
 * A node of a syntax tree.
 */
export interface Node {
    /**
     * Executes this node.
     * @param context The context to execute over
     */
    execute(context: Context): void | PromiseLike<void>;
}

/**
 * A group of nodes.
 */
export class Block implements Node {
    private readonly nodes: Iterable<Node>;

    /**
     * Creates a block.
     * @param nodes Nodes to be contained
     */
    constructor(nodes: Iterable<Node>) {
        this.nodes = nodes;
    }

    async execute(context: Context): Promise<void> {
        for (const node of this.nodes) {
            await node.execute(context);
        }
    }
}

/**
 * A node for '+'.
 */
export class IncreaseValue implements Node {
    public static readonly instance: IncreaseValue = new IncreaseValue();

    execute(context: Context): void {
        context.memory.increaseValue();
    }
}

/**
 * A node for '-'.
 */
export class DecreaseValue implements Node {
    public static readonly instance: DecreaseValue = new DecreaseValue();

    execute(context: Context): void {
        context.memory.decreaseValue();
    }
}

/**
 * A node for '>'.
 */
export class IncreasePointer implements Node {
    public static readonly instance: IncreasePointer = new IncreasePointer();

    execute(context: Context): void {
        context.memory.increasePointer();
    }
}

/**
 * A node for '<'.
 */
export class DecreasePointer implements Node {
    public static readonly instance: DecreasePointer = new DecreasePointer();

    execute(context: Context): void {
        context.memory.decreasePointer();
    }
}

/**
 * A node for ','.
 */
export class Read implements Node {
    public static readonly instance: Read = new Read();

    async execute(context: Context): Promise<void> {
        const value = await context.read();
        context.memory.setValue(value);
    }
}

/**
 * A node for '.'.
 */
export class Write implements Node {
    public static readonly instance: Write = new Write();

    async execute(context: Context): Promise<void> {
        const value = context.memory.getValue();
        await context.write(value);
    }
}

/**
 * A node for '[', ']' and the content.
 */
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
