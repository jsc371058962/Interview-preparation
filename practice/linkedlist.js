// 学习一通链表的结构，还是挺有用的，在面试中可能会出现

// 先设计链表元素的数据结构
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 单向链表
class LinkedList {
  constructor() {
    this.head = new Node('head');
    // 插入node
    this.insert = insert;
    // 找到先前的node
    this.findPrev = findPrev;
    // 找基准node
    this.find = find;
    // 删除node
    this.remove = remove;
    // 展示链表
    this.display = display;
  }
}

function find(item) {
  let curNode = this.head;
  while (curNode.val !== item) {
    curNode = curNode.next;
  }
  return curNode;
}

function insert(newElement, baseNode) {
  const newNode = new Node(newElement);
  const _baseNode = this.find(baseNode);
  newNode.next = _baseNode.next;
  _baseNode.next = newNode;
}

function findPrev(item) {
  let curNode = this.head;
  while ((curNode.next !== null) && (curNode.next.val !== item)) {
    curNode = curNode.next;
  }
  return curNode;
}

function remove(node) {
  const prevNode = this.findPrev(node);
  prevNode.next = node.next;
  node.next = null;
}

function display() {
  let curNode = this.head;
  while (curNode.next !== null) {
    console.log(curNode.next.val);
    curNode = curNode.next;
  }
}

var fruits = new LinkedList();

fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
console.log(fruits.display());




// 双向链表

class DNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.previous = null;
  }
}

class DLinkedList {
  constructor() {
    this.head = new DNode('head');
    this.insert = dInsert;
    this.find = dFind;
    this.remove = dRemove;
    this.findPrev = dFindPrev;
    this.findLast = dFindLast;
    this.orderDisplay = dOrderDisplay;
    this.reverseDisplay = dReverseDisplay;
  }

  get head() {
    return this.head;
  }
}

function dFind(item) {
  let curNode = this.head;
  while (curNode.val !== item) {
    curNode = curNode.next;
  }
  return curNode;
}

function dInsert(newElement, baseNode) {
  let newNode = new DNode(newElement);
  let _baseNode = this.find(baseNode);
  newNode.next = _baseNode.next;
  newNode.previous = _baseNode;
  _baseNode.next.previous = newNode;
  _baseNode.next = newNode;
}

function dFindPrev(item) {
  let curNode = this.head;
  while ((curNode.next !== null) && (curNode.next.val !== item)) {
    curNode = curNode.next;
  }
  return curNode;
}

function dRemove(node) {
  // 找到当前节点
  let curNode = this.find(node);
  while (curNode !== null) {
    curNode.previous.next = curNode.next;
    curNode.next.previous = curNode.previous;
    curNode.next = null;
    curNode.previous = null;
  }
}

function dFindLast() {
  let lastNode = this.head;
  while (lastNode.next !== null) {
    lastNode = lastNode.next;
  }
  return lastNode;
}

function dOrderDisplay() {
  let curNode = this.head;
  while (curNode.next !== null) {
    console.log(curNode.next.val);
    curNode = curNode.next;
  }
}

function dReverseDisplay() {
  let lastNode = this.findLast();
  while (lastNode.previous !== null) {
    console.log(lastNode.val);
    lastNode = lastNode.previous;
  }
}

var fruits = new DLinkedList();

fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
fruits.orderDisplay();
fruits.reverseDisplay();


// 判断链表是否有环
// 遍历链表，存入hash，has做判断
function hasDumplicate(fruits) {
  const set = new Set();
  // linkedList的head可以在构造函数中写出： get head() { return this.head; }
  const curNode = fruits.head;
  while (curNode.next !== null) {
    if (set.has(curNode.next.val)) {
      return true;
    }
    curNode = curNode.next;
    set.add(curNode.val);
  }
  return false;
}




