import { assertEquals } from '@std/assert';
import { Context, SyntaxTree } from '../mod.ts';

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
    SyntaxTree.IncreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 1);
    SyntaxTree.DecreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 0);
    SyntaxTree.DecreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 255);
    SyntaxTree.IncreasePointer.instance.execute(context);
    assertEquals(context.memory.getValue(), 0);
    SyntaxTree.DecreasePointer.instance.execute(context);
    assertEquals(context.memory.getValue(), 255);
    SyntaxTree.IncreaseValue.instance.execute(context);
    assertEquals(context.memory.getValue(), 0);
    await new SyntaxTree.Block(
        new Array<SyntaxTree.Node>(42).fill(SyntaxTree.IncreaseValue.instance),
    )
        .execute(context);
    assertEquals(context.memory.getValue(), 42);
    await SyntaxTree.Read.instance.execute(context);
    assertEquals(context.memory.getValue(), 21);
    await SyntaxTree.Write.instance.execute(context);
    assertEquals(context.buffer, 21);
    await new SyntaxTree.LoopWhile(SyntaxTree.DecreaseValue.instance).execute(
        context,
    );
    assertEquals(context.memory.getValue(), 0);
});
