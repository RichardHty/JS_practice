//select all divs and give them a purple background
$('div').css("backgroundColor","purple");
//select divs with class "highlight" and make them 200px wide
$('div.highlight').css("width","200px");
//select the div with id "third" and give it a orange border
$('div#third').css("border","orange solid 2px");
//select first div only and change its font color to pink
$('div:nth-of-type(1)').css("color","pink");
$('div:nth-of-type(1)').css({
	backgroundColor:"red",
  color:"white"
});
$('div:nth-of-type(1)').attr({
	id:"red",
  tag:"good"
});
