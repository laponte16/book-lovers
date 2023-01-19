var x;
x=$(document);
x.ready(start);

var content = $("#answer");
var wordCounter = $("#wordCounter");
var wordCount = 0;

function start(){

    content.on("input",function(){
        wordCount = content.val().length;
        wordCounter.text(wordCount + "/500");
    });

}