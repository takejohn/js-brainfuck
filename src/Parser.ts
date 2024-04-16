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
} from './SyntaxTree.ts';

/**
 * An parser.
 */
export class Parser {
    /**
     * Parses a code.
     * @param source The code to parse
     * @returns The syntax tree
     */
    parse(source: string): Node {
        let nodes: Node[] = [];
        const stack: Node[][] = [];
        for (const c of source) {
            switch (c) {
                case '+':
                    nodes.push(IncreaseValue.instance);
                    break;
                case '-':
                    nodes.push(DecreaseValue.instance);
                    break;
                case '>':
                    nodes.push(IncreasePointer.instance);
                    break;
                case '<':
                    nodes.push(DecreasePointer.instance);
                    break;
                case ',':
                    nodes.push(Read.instance);
                    break;
                case '.':
                    nodes.push(Write.instance);
                    break;
                case '[':
                    stack.push(nodes);
                    nodes = [];
                    break;
                case ']': {
                    const outerNodes = stack.pop();
                    if (outerNodes == null) {
                        throw new Error('Surplus closing bracket');
                    }
                    outerNodes.push(new LoopWhile(new Block(nodes)));
                    nodes = outerNodes;
                    break;
                }
            }
        }
        if (stack.length != 0) {
            throw new Error('Closing bracket expected');
        }
        return new Block(nodes);
    }
}
