//1.手写函数柯里化
function curry(func) {
  // 此处补全代码

  // func为原始函数（返回执行结果）
  // curryParams为包装器参数（保存函数循环调用参数）
  // 当前方法执行第一个()
  return function curryFirst(...curryParams){
    // 判断传入的参数是否需要柯里化
    if(curryParams.length >= func.length){
      return func.apply(this, curryParams);
    }else{
      // 当柯里化参数(curryParams)小于调用原始函数(sum)的参数时，执行第二()
      return function(...nextParams){
        // 通过apply迭代执行curryFirst函数
        return curryFirst.apply(this, curryParams.concat(nextParams));
      }
    }
  }
}
function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6, still callable normally
alert(curriedSum(1)(2, 3)); // 6, currying of 1st arg
alert(curriedSum(1)(2)(3)); // 6, full currying


// 固定参数
// function curry(f) { // curry(f) 执行柯里化转换
//   // console.log(a, b, c);
//   return function firstFunc(a) {
//     console.log(a);
//     return function secondFunc(b) {
//       console.log(b);
//       return function thirdFunc(c) {
//         console.log(c);
//         return f(a, b, c);
//       }
//     };
//   };
// }

// // 用法
// function sum(a, b, c) {
//   return a + b + c;
// }

// let curriedSum = curry(sum);

// alert( curriedSum(1)(2)(5) ); // 3