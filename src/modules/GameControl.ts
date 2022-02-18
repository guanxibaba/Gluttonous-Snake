import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";

// 游戏的控制器
class GameControl {
  // 食物
  food: Food;
  // 蛇
  snake: Snake;
  // 记分牌
  scorePanel: ScorePanel;
  // 保存蛇移动的方向
  direction: string = '';
  // 记录游戏是否开始
  isLive = true;
  constructor() {
    this.food = new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  // 游戏的初始化
  init() {
    // 设置键盘弹起事件
    addEventListener('keydown', this.keyDownHeadler.bind(this))
    // 在游戏初始化时就调用移动蛇的函数
    this.run()
  }
  // 绑定键盘按下事件
  keyDownHeadler(event:KeyboardEvent) {
    
    // 修改direction属性
    this.direction = event.key;
    
  }
  
  // 根据按键来让蛇移动
  /* 
  ArrowUp 向上移动 Y+10px
  ArrowDown 向下移动 Y-10px
  ArrowLeft 向左移动 X-10px
  ArrowRight 向右移动 X+10px
  */
  run() {
    // 获取原来蛇的头的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;


    switch (this.direction) {
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
    }
    // 检测蛇是否吃到了食物
    this.checkEat(X, Y)
    try {
      
      // 修改蛇的坐标
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      // 弹出警示框表示蛇撞墙了
      alert(e.message);
      // 设置游戏结束
      this.isLive = false

    }
    
    
    
    // 开启定时器
    this.isLive && setTimeout(this.run.bind(this),300 - (this.scorePanel.level-1) * 30)
  }

  // 检测蛇是否吃到食物了
  checkEat(X: number, Y: number) {
    if (this.food.X === X && this.food.Y === Y) {
      // 食物重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇的身体增加
      this.snake.addBody();
    }
  }
}

export default GameControl;