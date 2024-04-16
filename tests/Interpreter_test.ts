import { assertEquals } from '@std/assert';
import { Interpreter } from '../mod.ts';

Deno.test('Interpreter', async () => {
    const interpreter = new Interpreter();
    interpreter.execute('++.');
    assertEquals(await interpreter.output(), 2);

    interpreter.input(21);
    interpreter.execute(',>,.<.');
    interpreter.input(42);
    assertEquals(await interpreter.output(), 42);
    assertEquals(await interpreter.output(), 21);
});
