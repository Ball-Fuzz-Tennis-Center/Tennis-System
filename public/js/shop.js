var  removingItems =document.getElementsByClassName("btn-danger");
for(let i = 0; i< removingItems.length; i++){
    var button = removingItems[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName("quantityinput");
for(let i = 0; i< quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
}

var addToCartButtons = document.getElementsByClassName("shop-item-button");
for(let i = 0; i< addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked)
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
}


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cartItems")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cartRow");
    var total= 0;
    for(let i = 0; i< cartRows.length; i++){
        var cartRow  = cartRows[i]
        var priceElement= cartRow.getElementByClassName("cartPrice")[0];
        var quantityElement = cartRow.getElementByClassName("quantityInput")[0];
        var price = parseFloat(priceElement.innerText.replace("$" , " "));
        var quantity = quantityElement.value;
        total = total + (price * quantity)
    }
    total = Math.round(total *100)/100
    document.getElementByClassname("cartPrice")[0].innerText =  '$' + total;
}


