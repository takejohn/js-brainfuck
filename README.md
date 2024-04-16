# jsr:@takejohn/brainfuck

A Brainfuck interpreter for JavaScript/TypeScript environment.

## Installation

- Deno:
  ```sh
  deno add @takejohn/brainfuck
  ```
- npm:
  ```sh
  npx jsr add @takejohn/brainfuck
  ```
- Yarn:
  ```sh
  yarn dlx jsr add @takejohn/brainfuck
  ```
- pnpm:
  ```sh
  pnpm dlx jsr add @takejohn/brainfuck
  ```
- Bun:
  ```sh
  bunx jsr add @takejohn/brainfuck
  ```

## Example

```js
import { Interpreter } from '@takejohn/brainfuck';

const interpreter = new Interpreter();
const program = `
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
`;
const execution = interpreter.execute(program);

let output = '';
while (true) {
    const value = await Promise.race([interpreter.output(), execution]);
    if (value == null) { // When execution is done
        break;
    }
    output += String.fromCharCode(value);
}
console.log(output); // 'Hello World!\n"
```
