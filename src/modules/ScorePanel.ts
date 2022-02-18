// 设置记分牌
class ScorePanel {
  // 用来记录等级和分数
  score = 0;
  level = 1;
  // 获取元素
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  // 设置变量限制等级
  maxLevel: number
  // 设置一个变量表示分数多少时升一级
  upScore:number
  constructor( maxLevel: number = 10,upScore:number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
  }

  // 设置加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    // 当我们分数余10 = 0 时，则升一级
    if (this.score % this.upScore === 0) {
      this.addLevel();
    }
  }

  // 设置升级的方法
  addLevel() {
    // 最多是10级 不能无限提升
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}



export default ScorePanel;