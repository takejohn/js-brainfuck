export class Memory {
    private static readonly INITIAL_SIZE = 1024;

    private array: Uint8Array;

    private pointer = 0;

    constructor(initialSize: number = Memory.INITIAL_SIZE) {
        this.array = new Uint8Array(initialSize);
    }

    getValue(): number {
        return this.array[this.pointer];
    }

    setValue(value: number) {
        this.array[this.pointer] = value;
    }

    increaseValue(): void {
        const array = this.array;
        const pointer = this.pointer;
        const currentValue = array[pointer];
        if (currentValue < 255) {
            array[pointer] = currentValue + 1;
        } else {
            array[pointer] = 0;
        }
    }

    decreaseValue(): void {
        const array = this.array;
        const pointer = this.pointer;
        const currentValue = array[pointer];
        if (currentValue > 0) {
            array[pointer] = currentValue - 1;
        } else {
            array[pointer] = 255;
        }
    }

    increasePointer(): void {
        const newPointer = this.pointer + 1;
        const currentSize = this.array.length;
        if (newPointer >= currentSize) {
            const newArray = new Uint8Array(currentSize * 2);
            newArray.set(this.array);
            this.array = newArray;
        }
        this.pointer = newPointer;
    }

    decreasePointer(): void {
        const newPointer = this.pointer - 1;
        if (newPointer < 0) {
            throw new RangeError('Pointer must not be negative');
        }
        this.pointer = newPointer;
    }
}
