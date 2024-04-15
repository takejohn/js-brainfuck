import { assertEquals, assertThrows } from '@std/assert';
import { Parser, SyntaxTree } from '../mod.ts';

Deno.test('Parser', () => {
    const parser = new Parser();
    assertEquals(
        parser.parse('+-><,.'),
        new SyntaxTree.Block([
            SyntaxTree.IncreaseValue.instance,
            SyntaxTree.DecreaseValue.instance,
            SyntaxTree.IncreasePointer.instance,
            SyntaxTree.DecreasePointer.instance,
            SyntaxTree.Read.instance,
            SyntaxTree.Write.instance,
        ]),
    );
    assertEquals(
        parser.parse('+[-]'),
        new SyntaxTree.Block([
            SyntaxTree.IncreaseValue.instance,
            new SyntaxTree.LoopWhile(
                new SyntaxTree.Block([
                    SyntaxTree.DecreaseValue.instance,
                ]),
            ),
        ]),
    );
    assertThrows(() => parser.parse(']'));
    assertThrows(() => parser.parse('['));
});
