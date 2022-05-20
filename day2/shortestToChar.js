/**
 * leetcode 821. 字符的最短距离
 * 地址：https://leetcode-cn.com/problems/shortest-distance-to-a-character
 * 给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。
 * 返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。
 * 两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。
 * 提示：
 *    1 <= s.length <= 10**4
 *    s[i] 和 c 均为小写英文字母
 *    题目数据保证 c 在 s 中至少出现一次
 * */
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
/**
 * 解法1（字符首位循环）：
 *    1、找出字符串s中从左到右距离字符c的距离
 *    2、找出字符串s中从右到左距离字符c的距离
 *    3、比较左边查找的距离和右边查找的距离最小值即为字符最短距离
 * 复杂度分析:
 *    时间复杂度：O(N)O(N)，其中 NN 是 S 的长度，我们需要遍历字符串两次。
 *    空间复杂度：O(N)O(N)，targetArr数组的大小。
 */
var shortestToChar = function (s, c) {
  const len = s.length;
  let targetArr = [];
  // 保证i-prev很大（取当前字符长度的两倍的负值），不会影响最近距离的判断
  // 先正序循环获取距离
  let prev = -(len*2);
  for (let i = 0; i < len; ++i) {
    // 遇到和目标c相同字符把prev变成当前字符下标
    if (s.charAt(i) == c) prev = i;
    targetArr[i] = Math.abs(i - prev);
  }
  // 保证prev-i很大（取当前字符长度的两倍），不会影响最近距离的判断
  // 再倒序循环获取距离
  prev = len*2;
  for (let i = len - 1; i >= 0; --i) {
    if (s.charAt(i) == c) prev = i;
    // 对比两次循环结果，取最小的数
    targetArr[i] = Math.min(targetArr[i], prev - i);
  }
  return targetArr;
};

/**
 * 解法2（双指针）：
 *    1、
 *    2、
 *    3、
 * 复杂度分析:
 *    时间复杂度：
 *    空间复杂度：
 */
//  var shortestToChar = function (s, c) {

//  }

shortestToChar("baaaaa", "b");
