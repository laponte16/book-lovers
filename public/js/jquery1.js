let modo=document.getElementById("dark");
let body=document.body;
let ligt=document.getElementById("luz");

modo.addEventListener("click", function(){

    let val=body.classList.toggle("dark")
    localStorage.setItem("modo",val)
    document.getElementById("modo").style.display = "none";
    document.getElementById("ligt").style.display = "block";
})


ligt.addEventListener("click",function(){
	document.getElementById("modo").style.display = "block";
    document.getElementById("ligt").style.display = "none";
})

let valor=localStorage.getItem("modo")

if (valor=="true") {
    body.classList.add("dark")
} else {
    body.classList.remove("dark")
}