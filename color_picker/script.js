
var easyMode = document.getElementById("easyMode");
var hardMode = document.getElementById("hardMode");

var colorValue = [];
var colorResult = [];
var colors = [];
var colorAmount = 4;
var pickedColor = 0;
var hardRange = 50;
var hardFlag = false;

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
easyMode.addEventListener("click", function(e){
  hardFlag = false;
  colorAmount = 3;
  clearSquares();
  generateSquares();
  pickColor();
  displaySquares();
  e.preventDefault();
});
hardMode.addEventListener("click", function(e){
  hardFlag = true;
  colorAmount = 6;
  clearSquares();
  generateSquares();
  pickColor();
  displaySquares();
  e.preventDefault();
});
// colorAmount = 6;
// generateSquares(true);
// pickColor();
// displaySquares();

console.log(colors);
console.log(pickedColor);
console.log(colorPat.innerHTML);
