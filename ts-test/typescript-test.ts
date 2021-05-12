// ----------------------start-------------------
var num: number = 1;
var str: string = '1';
var sy: symbol = Symbol();
var bi: bigint = BigInt(2);
var arrayOfNumber: number[] = [1, 3, 4];
var arrayOfString: string[] = ['1', '2', '3'];

var arrayOfNumber1: Array<number> = [1, 2, 3];
var arrayOfString1: Array<string> = ['1', '2', '3'];

var arrayOfObj: object[] = [{}];
arrayOfObj.push([]);

var arrayOfAny: any[] = [1, '', false, null, undefined, {}, function name(params: any) {}];
// const str1: string = 'string';
// if (typeof str1 === 'number') {
//   str1.toLowerCase();
// }

const person: {
  id: number,
  name?: never
} = { id: 1 };
person.id = 2;
person.name;

var numArray: number[] = [1, 2, 3];
var greaterThan2: number = numArray.find((item) => item > 2) as any;


function sayHello(word: string) {
  console.log(word);
}
sayHello('hello world!');
// ----------------------end---------------------


