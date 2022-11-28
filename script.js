const squares = document.querySelectorAll(".square");
squares.forEach(squares => squares.addEventListener("click", thisSquare,));
squares.forEach(squares => squares.addEventListener("click", thatSquare));

function thisSquare(event){
    if(event.target.innerText !=="" || event.target.innerText ==="O"){
        return
    }else{
    event.target.innerText = "X";
}
}

function thatSquare(event){
    console.log(event.target.nextElementSibling)
    let nextSquare = event.target.nextElementSibling
    if(nextSquare.innerText !=="" || event.target.innerText ==="O"){
        return
    }
   event.target.nextElementSibling.innerText = "O";
    console.log(event)
    if(nextSquare == null ){

   event.target.previousElementSibling.innerText ="0"}
   }
