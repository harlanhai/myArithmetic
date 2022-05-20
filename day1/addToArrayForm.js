/**
 * leetcode 989. 数组形式的整数加法
 * 地址：https://leetcode-cn.com/problems/add-to-array-form-of-integer/
 * 整数的 数组形式  num 是按照从左到右的顺序表示其数字的数组。
 * 例如，对于 num = 1321 ，数组形式是 [1,3,2,1] 。
 * 给定 num ，整数的 数组形式 ，和整数 k ，返回 整数 num + k 的 数组形式 。
 * 提示：
 *  1 <= num.length <= 104
 *  0 <= num[i] <= 9
 *  num 不包含任何前导零，除了零本身
 *  1 <= k <= 104
 */ 
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  const len = num.length, resArr = [];
  for (let i = len - 1; i >= 0; --i) {
    // 让数组最后一位和目标数组k的个位相加
    let sum = num[i] + k % 10;
    console.log(k%10);
    // 去掉数字k的个位数
    k = Math.floor(k / 10);
    // 当前位置的数大于10需要进一，把他加到新的数字k上
    // 并让当前位的数字减10，即为当前的真实数字
    if (sum >= 10) {
      k++;
      sum -= 10;
    }
    resArr.push(sum);
  }
  // 不能使用if，如果[]的长度小于k的位数大于1则会输出错误
  // if(k > 0){
  //   resArr.push(k % 10);
  // }
  // 判断最后一位k是否大于10
  for (; k > 0; k = Math.floor(k / 10)) {
    resArr.push(k % 10);
  }
  return resArr.reverse();

  /* 转成number存在长度溢出导致错误 */ 
  // // 2、获取两数之和
  // numTotal += k;
  // // 3、把总数分解成数组返回
  // const totalStr = numTotal.toString();
  // for (let i = 0; i < totalStr.length; i++) {
  //   totalArr.push(totalStr.charAt(i));
  // }
};

// addToArrayForm([1,2,6,], 534);
addToArrayForm([2], 806);
// addToArrayForm([1,2,6,3,0,7,1,7,1,9,7,5,6,6,4,4,0,0,6,3], 534);
