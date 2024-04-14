import { assertEquals } from '@std/assert';
import { Memory } from '../mod.ts';

Deno.test('Memory instruction', () => {
    const memory = new Memory();
    assertEquals(memory.getValue(), 0);
    memory.increaseValue();
    assertEquals(memory.getValue(), 1);
    memory.decreaseValue();
    assertEquals(memory.getValue(), 0);
    memory.decreaseValue();
    assertEquals(memory.getValue(), 255);
    memory.increasePointer();
    assertEquals(memory.getValue(), 0);
    memory.decreasePointer();
    assertEquals(memory.getValue(), 255);
})
