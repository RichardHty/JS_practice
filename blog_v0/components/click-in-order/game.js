
class NumberBox extends createjs.Container {
  constructor(game,number=0) {
    super();
    var comp=AdobeAn.getComposition("87A16492813E4547B63FF972E909928A");
    var lib=comp.getLibrary();
    var movieclip = new lib.NumberedBox();

    this.game = game;
    this.number = number;
    movieclip.NumberText.text= number;

    new createjs.ButtonHelper(movieclip, 0, 1, 2, false, new lib.NumberedBox(), 3);

    this.addChild(movieclip);
    this.setBounds(0,0,50,50);

    this.on('click', this.handleClick.bind(this));
  }
  handleClick() {
    this.game.handleClick(this);
  }
}
class GameGrade {
  constructor(amount=10) {
    this.resetNum();
    this.amount= amount;
  }
  resetNum() {
    this.num = 1;
  }
  nextNum() {
    this.num += 1;
  }
  isRightNum(number) {
    return number === this.num;
  }
  isGamewin(){

    return this.num > this.amount;
  }
}
class Game {
  constructor() {
    console.log(`Welcome to the game. Version ${this.version()}`);

    this.canvas = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(this.canvas);
    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;
    this.reinitialize();
    createjs.Ticker.setFPS(60);
    this.stage.enableMouseOver();
    createjs.Touch.enable(this.stage);
    //keep re-drawing the stage
    createjs.Ticker.on("tick",this.stage);
    window.debugStage = this.stage;

    this.gameData = new GameGrade();
    var comp=AdobeAn.getComposition("87A16492813E4547B63FF972E909928A");
    this.lib=comp.getLibrary();

    this.restartGame();

  }
  version() {
    return `1.0.0`;
  }
  generateMultipleBox(amount=10) {
    for (var i = amount;i>0;i--){
      var movieclip = new NumberBox(this,i);
      this.stage.addChild(movieclip);

      movieclip.x = Math.random() * (this.stage.width - movieclip.getBounds().width);
      movieclip.y = Math.random() * (this.stage.height - movieclip.getBounds().height);
    }
  }
  handleClick(numberBox) {
    if(this.gameData.isRightNum(numberBox.number)) {
      this.stage.removeChild(numberBox);
      this.gameData.nextNum();
    }
    if(this.gameData.isGamewin()) {
      this.gameOverView = new this.lib.GameOverView();
      this.stage.addChild(this.gameOverView);

      this.gameOverView.RestartBtn.on('click',(function(){
        this.restartGame();
      }).bind(this));
    }
  }
  reinitialize(){
    this.stage.width = this.canvas.width;
    this.stage.height = this.canvas.height;

    let ratio = window.devicePixelRatio;
    if (ratio === undefined) {
      return;
    }

    this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
    this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

    this.stage.scaleX=this.stage.scaleY=ratio;

    this.canvas.style.width = this.stage.width + "px";
    this.canvas.style.height = this.stage.height + "px";
  }
  restartGame(){
    this.gameData.resetNum();
    this.stage.removeAllChildren();
    this.stage.addChild(new this.lib.Background());
    this.generateMultipleBox(this.gameData.amount);

  }
}

var game = new Game();
