
var body = document.querySelector("body");
var button = document.querySelector("button");
body.style.backgroundColor = "white";
button.addEventListener("click",function(){
  // let color = body.getAttribute("class");
  // console.log(color);
  // if(color === "red"){
  //   body.style.backgroundColor = "white";
  // }else{
  //   body.style.backgroundColor = "red";
  // }
  let classList = body.classList;
  console.log(classList);
  classList.toggle("purple");

});

var row = 0;
for(int i=0;i<tableList.length;i++){
  tableList[i].tbody.forEach(function(ele){
    row++;
  });
}
