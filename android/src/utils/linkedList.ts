export class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  append(value: T) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail!.next = node;
    this.tail = node;
  }

  find(predicate: (v: T) => boolean): T | undefined {
    let cur = this.head;
    while (cur) {
      if (predicate(cur.value)) return cur.value;
      cur = cur.next;
    }
    return undefined;
  }

  toArray(): T[] {
    const out: T[] = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}
