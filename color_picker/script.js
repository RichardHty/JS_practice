var questionText = document.querySelector("#question");
var easyMode = document.getElementById("easyMode");
var hardMode = document.getElementById("hardMode");
var colorPat = document.getElementById("colorPat");
var colorValue = [];
var colors = [];
var colorAmount = 4;
var pickedColor = 0;
var hardRange = 10;
function generateOneSqure(flag){
  if(!flag){
    for(var i = 0;i<3;i++){
      colorValue[i] = 256;
      hardRange = 0;
    }
  }
  for(var i = 0;i<3;i++){
    colorValue[i] = Math.floor(Math.random()*(colorValue[i]-hardRange)+hardRange);
  }
  setRGB();
}

function setRGB(){
  var tempString = "rgb(";
  tempString += colorValue[0]+", ";
  tempString += colorValue[1]+", ";
  tempString += colorValue[2];
  tempString += ")";
  colors.push(tempString);
}

function generateSquares(hardFlag){

  for(var i=0;i<colorAmount;i++){
    generateOneSqure(false);
    generateOneSqure(hardFlag);
  }
}
function displaySquares(){
  for(var i = 0;i<colorAmount;i++){
    var div = document.createElement("div");
    div.classList.add("square");
    div.style.backgroundColor = colors[i];
    colorPat.appendChild(div);
  }
}
function pickColor(){
  pickedColor = Math.floor(Math.random()*colorAmount);
  questionText.textContent = colors[pickedColor];
}

colorAmount = 6;
generateSquares(true);
displaySquares();
pickColor();
console.log(colors);
console.log(pickedColor);
console.log(colorPat.innerHTML);
