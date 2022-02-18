// 定义食物food
class Food {
  // 为这个元素设置为html元素
  element: HTMLElement;
  constructor() {
    // 不加！ this.food会飘红的原因：
    // 因为这个元素是我们在网页中获取的，所以ts不确定有没有这个元素，但是我们确定有这个元素，所以加！表示确定有这个元素
    this.element = document.getElementById('food')!; 
    
  }
  // 定义获取元素坐标的方法 X
  get X() {
    return this.element.offsetLeft;
  }
  // 定义获取元素坐标的方法 Y
  get Y() {
    return this.element.offsetTop;
  }
  //修改食物的位置
  change() {
    // 使用Math.random()方法获取一个0-1的随机数
    // 因为我们的游戏屏幕是300px - 蛇的宽度10px = 290px 所以食物的范围只在0-290px之间
    // 在使用Math.round()方法向上取整 * 10 让每一个随机数都是10的倍数 否则蛇吃不到食物
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = top + 'px';
    this.element.style.left = left + 'px';
  }
}

// 测试代码
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

export default Food;