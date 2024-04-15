import { assertEquals, assertThrows } from '@std/assert';
import { Parser } from '../src/Parser.ts';
import {
    Block,
    DecreasePointer,
    DecreaseValue,
    IncreasePointer,
    IncreaseValue,
    LoopWhile,
    Read,
    Write,
} from '../src/SyntaxTree.ts';

Deno.test('Parser', () => {
    const parser = new Parser();
    assertEquals(
        parser.parse('+-><,.'),
        new Block([
            IncreaseValue.instance,
            DecreaseValue.instance,
            IncreasePointer.instance,
            DecreasePointer.instance,
            Read.instance,
            Write.instance,
        ]),
    );
    assertEquals(
        parser.parse('+[-]'),
        new Block([
            IncreaseValue.instance,
            new LoopWhile(
                new Block([
                    DecreaseValue.instance,
                ]),
            ),
        ]),
    );
    assertThrows(() => parser.parse(']'));
    assertThrows(() => parser.parse('['));
});
