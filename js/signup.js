function updateinputView1(){
    var  question1 = document.getElementById("txtQuestion1");
    var  expect1 = document.getElementById("divsecurityError1");
   
    if (question1.value =="Question 1"){
        expect1.classList.add("invisible");
    } 
    else{
        expect1.classList.remove("invisible");
    }
}
function updateinputView2(){
    var  question2 = document.getElementById("txtQuestion2");
    var  expect2 = document.getElementById("divsecurityError2");
   
    if (question2.value =="Question 2"){
        expect2.classList.add("invisible");
    } 
    else{
        expect2.classList.remove("invisible");
    }
}
function updateinputView3(){
    var  question3 = document.getElementById("txtQuestion3");
    var  expect3 = document.getElementById("divsecurityError3");
   
    if (question3.value =="Question 3"){
        expect3.classList.add("invisible");
    } 
    else{
        expect3.classList.remove("invisible");
    }
}

function validateForm(){
    var password = document.getElementById("txtpassword").value;
    var conpassword = document.getElementById("txtconpassword").value;
    var passwordError = document.querySelector("#divpasswordError");
    var formIsValid = true;
    

    if (password != conpassword){
        
        passwordError.classList.remove("invisible");
        
        passwordError.innerHTML ="Passwords do not match"
        
        
        formIsValid = false;
    }
    else{
       
        passwordError.classList.add("invisible");
        passwordError.innerHTML =""
        var conError = document.querySelector("#divconditionError");
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
                document.querySelector("#divinvalidError").classList.remove("invisible");
                divinvalidError.innerHTML ="the field has an invalid input";
                elements[i].classList.add("hasError");
                formIsValid = false;
            }
            else {
                elements[i].classList.remove("hasError");
            }
        }
    }
    
    //var examine = document.getElementById("txtpassword").value;
   
   


    return formIsValid;

}



