
/**
 * Queue Implement
 */
export default class Queue {
    private _elements: any[];
    private _offset: number;
    /**
     * @constructor
     */
    constructor(elements?: any[]) {
        this._elements = Array.isArray(elements) ? elements : [];
        this._offset = 0;
    }

    /**
     * @public
     * adds an element at the back of the queue
     * @param element 
     */
    enqueue(element: any) {
        this._elements.push(element);
    }

    /**
     * @public
     * dequeue the front element of the queue
     */
    dequeue() {
        if (this.size() === 0) return undefined;

        const first = this.front();
        this._offset += 1;

        if (this._offset * 2 < this._elements.length) return first;

        // only remove dequeued elements when reaching half size
        // to decrease latency of shifting elements
        this._elements = this._elements.slice(this._offset);
        this._offset = 0;
        return first;
    }

    /**
     * @public
     * peeks on the front element of the queue
     */
    front() {
        return this.size() > 0 ? this._elements[this._offset] : undefined;
    }

    /**
     * @public
     * peeks on the back element of the queue
     */
    back() {
        return this.size() > 0 ? this._elements[this._elements.length - 1] : undefined;
    }

    /**
     * @public
     * returns the number of elements in the queue
     */
    size() {
        return this._elements.length - this._offset;
    }

    /**
     * @public
     * checks if the queue is empty
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * @public
     * returns the remaining elements in the queue as an array
     */
    toArray() {
        return this._elements.slice(this._offset);
    }

    /**
     * @public
     * clears all elements from the queue
     */
    clear() {
        this._elements = [];
        this._offset = 0;
    }

    /**
     * @public
     * creates a shallow copy of the queue
     */
    clone() {
        return new Queue(this._elements.slice(this._offset));
    }

    /**
     * @public
     * @static
     * creates a queue from an existing array
     */
    static fromArray(elements: any[]) {
        return new Queue(elements);
    }
}