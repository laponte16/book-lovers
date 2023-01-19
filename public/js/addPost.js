var x;
x=$(document);
x.ready(start);

var content = $(".content_post");
var wordCounter = $(".wordCounter");
var wordCount = 0;

function start(){

    content.on("change",wordCount);
    
}

function wordCount(){
    alert("Works");
    console.log("Works");

    wordCount = content.text.length;
    wordCounter.text(wordCount + "/2000");
}