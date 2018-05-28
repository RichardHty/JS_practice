$('ul').on("click","li",function(){
  $(this).toggleClass("done");
});
$('ul').on("click","span",function(e){
  $(this).parent().fadeOut(500,function(){
    $(this).remove();
  });
  e.stopPropagation();
});

$("input[type='text']").keypress(function(e){
  if(e.which === 13){
    var todoText = $(this).val();
    if(todoText !== ""){
      $(this).val("");
      $("ul").append("<li><span><i class='fa fa-trash-alt'></i></span>"+todoText+"</li>");
    }else{
      $(this).addClass("input-error");
      $(this).attr("placeholder", "You need to do something");
    }
  }else{
    $(this).removeClass("input-error");
  }
});

$(".fas.fa-pencil-alt").click(function(){
  $("input[type='text']").fadeToggle(100);
});
