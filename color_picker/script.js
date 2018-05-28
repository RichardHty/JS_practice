
var easyMode = document.getElementById("easyMode");
var hardMode = document.getElementById("hardMode");
var superMode = document.getElementById("superMode");

var colorPat = document.getElementById("colorPat");
var newColor = document.getElementById("reset");
var message = document.querySelector("#message");
var header = document.querySelectorAll(".header");
var btn = document.querySelectorAll(".btn");

var colorValue = [];
var colorResult = [];
var colors = [];
var pickedColor = 0;
var colorAmount = 3;
var hardRange = 80;
var hardFlag = false;
var isWon = false;
var checkState = function() {
  if(isWon){
    reset();
  }else{
    var eid = this.style.backgroundColor;
    if(eid === colors[0]){
      won();
    }else{
      message.textContent = "Try Again";
      this.style.visibility = "hidden";
    }
  }
}
var mouseOverChange = function () {
   this.style.backgroundColor = colors[0];
   this.style.color = "white";
}
var mouseLeaveChange =  function () {
    this.style.backgroundColor = 'transparent';
    this.style.color = colors[0];
}

function generateResult(){
  for(var i = 0;i<3;i++){
    colorValue[i] = Math.floor(Math.random()*256);
    colorResult[i]=colorValue[i];
  }
  parseRGB();
}
function generateOneSqure(){
  if(hardFlag){
    for(var i = 0;i<3;i++){
      colorValue[i] = Math.floor(Math.random()*hardRange*2+(colorResult[i]-hardRange));
    }
  }else{
    for(var i = 0;i<3;i++){
      colorValue[i] = Math.floor(Math.random()*256);
    }
  }
  parseRGB();
}
function parseRGB(){
  var tempString = "rgb(";
  tempString += colorValue[0]+", ";
  tempString += colorValue[1]+", ";
  tempString += colorValue[2];
  tempString += ")";
  colors.push(tempString);
}

function generateSquares(){
  generateResult();
  for(var i=1;i<colorAmount;i++){
    generateOneSqure();
  }
}
function displaySquares(){
  for(var i = 0;i<colorAmount;i++){
    var div = document.createElement("div");
    div.classList.add("square");
    if(i === pickedColor)
      div.style.backgroundColor = colors[0];
    else if(pickedColor !== 0 && i === 0)
      div.style.backgroundColor = colors[pickedColor];
    else
      div.style.backgroundColor = colors[i];
    div.addEventListener("click", checkState);
    document.getElementById("colorPat").appendChild(div);
  }
}
function pickColor(){
  pickedColor = Math.floor(Math.random()*colorAmount);
  document.querySelector("#question").textContent = colors[0];
}
function clearSquares(){
  var colorPat = document.querySelector("#colorPat");
  while(colorPat.firstChild){
    colorPat.removeChild(colorPat.firstChild);
  }
  colors.length = 0;
}
function reset(){
  message.textContent = "click to play";
  if(hardFlag){
    message.textContent += ", error limit: "+hardRange;
  }
  newColor.textContent = "new colors";
  for(var i = 0;i<header.length;i++){
    header[i].style.backgroundColor = "#0375b4";
  }
  clearSquares();
  generateSquares();
  pickColor();
  displaySquares();
  isWon = false;
  for(var i = 0;i<btn.length;i++){
    btn[i].removeAttribute("style");
    btn[i].removeEventListener('mouseover', mouseOverChange);
    btn[i].removeEventListener('mouseleave',mouseLeaveChange);
  }
}
function won(){
  message.textContent = "Correct!";
  newColor.textContent = "play again";
  for(var i = 0;i<header.length;i++){
    header[i].style.backgroundColor = colors[0];
  }
  var squares = document.querySelectorAll(".square");
  for(var i = 0;i<squares.length;i++){
    squares[i].style.backgroundColor = colors[0];
    squares[i].style.visibility = "visible";
  }
  console.log(btn);
  for(var i = 0;i<btn.length;i++){
    btn[i].style.color = colors[0];
    btn[i].addEventListener('mouseover', mouseOverChange);
    btn[i].addEventListener('mouseleave',mouseLeaveChange);
  }
  isWon = true;
}

easyMode.addEventListener("click", function(e){
  hardFlag = false;
  colorAmount = 3;
  reset();
  e.preventDefault();
});
hardMode.addEventListener("click", function(e){
  hardFlag = true;
  colorAmount = 6;
  reset();
  e.preventDefault();
});
superMode.addEventListener("click", function(e){
  hardFlag = true;
  hardRange = 20;
  colorAmount = 9;
  reset();
  e.preventDefault();
});
newColor.addEventListener("click",function(e){
  reset();
  e.preventDefault();
});
reset();
