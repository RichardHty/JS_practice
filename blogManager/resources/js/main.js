
window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('text-input');
    var markdownArea = document.getElementById('preview');   
    if(pad && markdownArea){
    	var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    	};
    
    	pad.addEventListener('input', convertTextAreaToMarkdown);

    	convertTextAreaToMarkdown();
    }
    
};
if($('.special.cards .image')){
	$('.special.cards .image').dimmer({
	  on: 'hover'
	});
}
