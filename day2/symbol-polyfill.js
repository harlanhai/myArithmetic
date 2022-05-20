/**
 * 手写 symbol polyfill
 * 题解：如果浏览器不支持情况下 写出让代码支持浏览器的symbol
 * 参考链接：
 *  https://segmentfault.com/a/1190000015262174
 *  https://tc39.es/ecma262/#sec-symbol-objects
 * -------------------------------------------------
 * 实现步骤：
 *  1. If NewTarget is not undefined, throw a TypeError exception.
 *     如果NewTarget不是undefined，抛出TypeError异常。
 *  2. If description is undefined, let descString be undefined.
 *     如果description为undefined，则让descString为undefined。
 *  3. Else, let descString be ? ToString(description).
 *     否则，让descString是ToString(description)。
 *  4. Return a new unique Symbol value whose [[Description]] value is descString.
 *     返回一个新的唯一符号值，它的[[Description]]值是descString。
 */
// 处理symbol用于对象的属性名时，可以保证不会出现同名的属性
var generateName = (function(){
  var suffix = 0;
  return function(descString){
    suffix++;
    return "@" + descString + "_" + suffix;
  }
})();

var MySymbol = function Symbol(description){
  // 实现步骤1：不能使用new
  if(this instanceof MySymbol)
    throw new TypeError("Symbol is not a constructor");
  // 实现步骤2 3
  var descString = description === undefined ? undefined : String(description);
  // 实现步骤4：因为调用改方法就会返回一个新对象，两个对象之间，只要引用不同就不会相同
  // 实现Symbol值可以作为标识符，用于对象的属性名，可以保证不会出现同名的属性
  // 由于需要修改toString方法返回一个唯一值，所以无法实现Symbol值可以显式转为字符串
  // 原因： Symbol('ccc') 和 Symbol('ccc') 两个Symbol值,但是当作为对象的属性名的时候，都会隐式转换为 Symbol(ccc) 字符串
  var symbol = Object.create({
    toString: function() {
      // return "Symbol(" + this.__Description__ + ")"
      return this.__Name__
    },
    // valueOf分为显式调用和隐式，我们无法判断是显式还是隐式的调用，所以这个我们就只能实现一半
    // 这里选择隐式调用
    valueOf: function(){
      return this;
    }
  });
  Object.defineProperties(symbol, {
    "__Description__": {
      value: descString,
      writable: false,
      enumerable: false,
      configurable: false
    },
    "__Name__": {
      value: generateName(descString),
      writable: false,
      enumerable: false,
      configurable: false
    }
  });
  return symbol;
}

var forMap = {};
Object.defineProperties(MySymbol, {
  // 使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。
  'for': {
    value: function(description){
      var descString = description === undefined ? undefined : String(description);
      var resMap = forMap[descString] ? forMap[descString] : forMap[descString] = MySymbol(descString);
      return resMap
    },
    writable: true,
    enumerable: false,
    configurable: true
  },
  // 方法用来获取全局symbol 注册表中与某个 symbol 关联的键。
  'keyFor': {
    value: function(symbol){
      for(var key in forMap){
        if(forMap[key] === symbol){
          return key;
        }
      }  
    },
    writable: true,
    enumerable: false,
    configurable: true
  }
})
// var a = MySymbol();
// var b = MySymbol();
// console.log("相等测试：", a === b);

// var c = MySymbol("ccc");
// console.log("String()测试：", String(c));
// console.log("toString()测试：", c.toString());

// var d = MySymbol("obj");
// var e = MySymbol("obj");
// console.log(d, e);
// var obj = {};
// obj[d] = "hello";
// obj[e] = "yideng";
// console.log(obj);

// var s1 = Symbol('foo')
// console.log(s1.valueOf()); // 原生输出：Symbol(foo)
// var f = MySymbol("f");  
// console.log(f.valueOf()); // 未做显式处理：{__Description__: 'f', __Name__: '@f_1'}
// console.log('1' + f);     // 做过隐式处理输出：1@f_1

// for & keyFor test
var globalSym1 = MySymbol.for("aaa");
var globalSym2 = MySymbol.for("bbb");
console.log(MySymbol.keyFor(globalSym1));
console.log(MySymbol.keyFor(globalSym2));