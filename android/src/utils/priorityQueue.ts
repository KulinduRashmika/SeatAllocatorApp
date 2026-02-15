export type Comparator<T> = (a: T, b: T) => number;
// comparator: return < 0 if a should come BEFORE b

export class PriorityQueue<T> {
  private heap: T[] = [];
  constructor(private compare: Comparator<T>) {}

  size() {
    return this.heap.length;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  push(value: T) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  toArraySorted(): T[] {
    const copy = new PriorityQueue<T>(this.compare);
    for (const x of this.heap) copy.push(x);

    const out: T[] = [];
    while (copy.size() > 0) out.push(copy.pop()!);
    return out;
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.heap[i], this.heap[p]) < 0) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  private bubbleDown(i: number) {
    const n = this.heap.length;
    while (true) {
      let best = i;
      const l = i * 2 + 1;
      const r = i * 2 + 2;

      if (l < n && this.compare(this.heap[l], this.heap[best]) < 0) best = l;
      if (r < n && this.compare(this.heap[r], this.heap[best]) < 0) best = r;

      if (best !== i) {
        [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
        i = best;
      } else break;
    }
  }
}
