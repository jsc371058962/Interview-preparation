class LinkedList {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
// ----------------------start-------------------
// 反转单链表(迭代)
function reverseList(head) {
  let cur = head, prev = null;
  while (cur) {
    const temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  return cur;
}
// (递归)
function reverseList1(head) {
  // 终止条件
  if (head === null || head.next === null) return head;
  const newHead = reverseList1(head.next);
  // 反转指针指向
  head.next.next = head;
  // 断开之前的连接关系
  head.next = null;
  return newHead;
}
// ----------------------end---------------------

