

function Purchase(){
    var cartItemContainer = document.getElementsByTagName("TBODY")[0];
    console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByTagName("TR");
    console.log(cartRows);
    var total= 0;
    for(let i = 0; i< cartRows.length; i++){
        var cartRow  = cartRows[i]
        var priceElement= cartRow.getElementsByClassName("span-cart-items")[1];
        console.log(priceElement);
        var quantityElement = cartRow.getElementsByClassName("span-cart-items")[2];
        var price = parseFloat(priceElement.innerText.replace("$" , " "));
        console.log(quantityElement);
        var quantity = quantityElement.innerHTML;
        console.log(price);
        total = total + (price * quantity)
        console.log(total);
    }
    total = Math.round(total *100)/100
    console.log(total);
    console.log("hi")
    document.getElementById("total").innerText = total;
}

var buttonClick= document.getElementById("myBtn");
var insideBox= document.getElementsByClassName("close")[0];
var modal = document.getElementsByClassName("myModal");

buttonClick.onclick = function() {
    modal.style.display = "block";
}
insideBox.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}  

