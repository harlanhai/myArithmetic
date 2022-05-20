/**
 * 实现自定义栈类 CustomStack ：
 *  CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
 *  void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
 *  int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
 *  void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。
 * 示例：
 *  输入：
 *    ["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
 *    [[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
 *  输出：
 *    [null,null,null,2,null,null,null,null,null,103,202,201,-1]
 */
/**
 * @param {number} maxSize
 */
 var CustomStack = function(maxSize) {
  this.CustomStackMax = new Array(maxSize);
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
  if(this.CustomStackMax[this.CustomStackMax.length-1]){
    this.CustomStackMax.push(x);
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
  if(this.CustomStackMax.length > 0){
    return this.CustomStackMax.pop(x);
  }else{
    return -1;
  }
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
  if(this.CustomStackMax.length >= k){
    for(let i = 0; i <= k; i++){
      this.CustomStackMax[i] += val;
    }
  }else{
    for(let i = 0; i <= this.CustomStackMax.length; i++){
      this.CustomStackMax[i] += val;
    }
  }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */