import { Context } from '../src/Context.ts';
import { assertEquals } from '@std/assert';
import {
    Block,
    DecreasePointer,
    DecreaseValue,
    IncreasePointer,
    IncreaseValue,
    LoopWhile,
    Node,
    Read,
    Write,
} from '../src/SyntaxTree.ts';

class TestContext extends Context {
    buffer?: number;

    read(): number {
        return 21;
    }

    write(value: number): void {
        this.buffer = value;
    }
}

Deno.test('Simple instructions', async () => {
    const context = new TestContext();
    IncreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 1);
    DecreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 0);
    DecreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 255);
    IncreasePointer.instance.execute(context);
    assertEquals(context.memory.getValue(), 0);
    DecreasePointer.instance.execute(context);
    assertEquals(context.memory.getValue(), 255);
    IncreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 0);
    await new Block(new Array<Node>(42).fill(IncreaseValue.instance))
        .execute(context);
    assertEquals(context.memory.getValue(), 42);
    await Read.instance.execute(context);
    assertEquals(context.memory.getValue(), 21);
    await Write.instance.execute(context);
    assertEquals(context.buffer, 21);
    await new LoopWhile(DecreaseValue.instance).execute(context);
    assertEquals(context.memory.getValue(), 0);
});
