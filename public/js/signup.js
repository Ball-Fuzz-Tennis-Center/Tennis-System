function updateinputView1(){
    var  answer1 = document.getElementById("txtSAnswer1");
    var  expect1 = document.getElementById("divSecurityError1");
   
    if (answer1.value =="Question 1"){
        expect1.classList.add("invisible");
    } 
    else{
        expect1.classList.remove("invisible");
    }
}
function updateinputView2(){
    var  answer2 = document.getElementById("txtSAnswer2");
    var  expect2 = document.getElementById("divSecurityError2");
   
    if (answer2.value =="Question 2"){
        expect2.classList.add("invisible");
    } 
    else{
        expect2.classList.remove("invisible");
    }
}
function updateinputView3(){
    var  answer3 = document.getElementById("txtSAnswer3");
    var  expect3 = document.getElementById("divSecurityError3");
   
    if (answer3.value =="Question 3"){
        expect3.classList.add("invisible");
    } 
    else{
        expect3.classList.remove("invisible");
    }
}

function validateForm() {
    var password = document.getElementById("txtPassword").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    var passwordError = document.querySelector("#divPasswordError");
    var formIsValid = true;
    

    if (password != confirmPassword) {
        
        passwordError.classList.remove("invisible");
        
        passwordError.innerHTML ="Passwords do not match"
        password.classList.add("hasError");
        
        formIsValid = false;
    }
    else {
       
        passwordError.classList.add("invisible");
        passwordError.innerHTML =""
        var conError = document.querySelector("#divConditionError");
        var result0 = /[A-Z]/g;
        var result1 = /[a-z]/g;
        var result2 = /[0-9]/g;

        if(result0.test(password) == true && result1.test(password) == true && result2.test(password) == true){
            conError.innerHTML =""
            conError.classList.add("invisible");
            formIsValid = true;
    
        }
        else{
            conError.innerHTML ="Password needs to have atleast 1 capital letter, atleast 1 lowercase letter and a number"
            conError.classList.remove("invisible");
            formIsValid = false;
        }
    }

    var elements = document.getElementsByTagName("input");
    var invalidChars = ['#', '{', '}', '<', '()', '>', '"', '`' ];

    for (let i=0; i< elements.length; i++){
        for (let j=0; j< invalidChars.length; j++){
            if(elements[i].value.indexOf(invalidChars[j]) != -1){
                document.querySelector("#divInvalidError").classList.remove("invisible");
                divinvalidError.innerHTML ="the field has an invalid input";
                elements[i].classList.add("hasError");
                formIsValid = false;
            }
            else {
                elements[i].classList.remove("hasError");
            }
        }
    }

    return formIsValid;
}



