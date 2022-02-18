// 设置蛇
class Snake {
  // 表示蛇的头部
  head: HTMLElement;
  // 表示蛇的身体
  bodys: HTMLCollection;
  // 表示蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('snake') as HTMLElement;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodys = this.element.getElementsByTagName('div');

  }
  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 修改蛇的坐标
  set X(value: number) {
    // 如果坐标位置没有改变，则直接返回
    if (value == this.X) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了');
    }

    // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在往左走时，不能往右走，反之也是一样
     /*
      首先先确定有第二个身体 然后判断第二个身体的坐标值是否等于新值
      例：
        如果蛇头的left坐标值为200 此时是向右移动 则第二个身体的坐标值为190 如果是相反反向，此时新值是200 - 10 = 第二个身体的值 然后进入判断
        新值为190 小于原来的值 所以 + 10 让他往原来的方向走 反之一样

     */
    if (this.bodys[1] && (this.bodys[1] as HTMLElement).offsetLeft === value) {
      // 如果发生掉头，让蛇向反方向继续移动
      if (value > this.X) {
        value = this.X - 10;
      } else {
        // 向右走
        value = this.X + 10;
      }
    }

    // 调用蛇身体移动的方法
    this.moveBody();
    this.head.style.left = value + 'px';
    // 检查是否撞到了自己
    this.checkHeadBody();
  }

  set Y(value: number) {
    
    // 如果坐标位置没有改变，则直接返回
    if (value == this.Y) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了');
    }

    // 修改Y时，是在修改垂直坐标，蛇在上下移动，蛇在往上走时，不能往下走，反之也是一样
    /*
      首先先确定有第二个身体 然后判断第二个身体的坐标值是否等于新值
      例：
        如果蛇头的top坐标值为200 此时是向下移动 则第二个身体的坐标值为190 如果是相反反向，此时新值是200 - 10 = 第二个身体的值 然后进入判断
        新值为190 小于原来的值 所以 + 10 让他往原来的方向走 反之一样

     */
    if (this.bodys[1] && (this.bodys[1] as HTMLElement).offsetTop === value) {
      // 如果发生掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        // 向下走
        value = this.Y + 10;
      }
    }

    // 调用蛇身体移动的方法
    this.moveBody();
    this.head.style.top = value + 'px';
    // 检查是否撞到了自己
    this.checkHeadBody();
    
  }

  // 添加蛇的身体
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }

  // 添加蛇身体移动的方法
  /*
    把前一个身体的设置给后一个
    例如：
      第4节 = 第3节
      第3节 = 第2节
      第2节 = 第1节
   */
  moveBody() {
    // 如果没有第二个身体 不会进入循环
    for (let i = this.bodys.length - 1; i > 0; i--) {
      // 获取前一个身体的位置
      let X = (this.bodys[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodys[i - 1] as HTMLElement).offsetTop;
      // 把前一个身体的位置设置给当前的身体
      (this.bodys[i] as HTMLElement).style.left = X + 'px';
      (this.bodys[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检查蛇头是否撞到身体
  checkHeadBody() {
    // 获取所有的身体，检查是否和蛇头的坐标发生了重叠
    for (let i = 1; i < this.bodys.length; i++) {
      // 获取除蛇头外的所有所有身体的坐标
      let bd = this.bodys[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入了判断说明蛇头撞到了身体， 游戏结束
        throw new Error('撞到自己了~~~');
      }
    }
  }

}

export default Snake;