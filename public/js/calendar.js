const date =new Date();
date.setDate(1);

const renderCalendar =() =>{
    const monthDays = document.querySelector(".days");
    

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const previousLastDay =   new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex -1;

    let days ="";  
    var count = 0;
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    var dictMonth = {};
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    document.querySelector(".date h8").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML =  new Date().toDateString();
    
    var currentIndex = firstDayIndex;
    for(let k = 1; k <= lastDay; k++){
        if(currentIndex < 7 ){
            dictMonth [k] = currentIndex;
            currentIndex = currentIndex + 1;
        }
        else{
            currentIndex = currentIndex % 7;
            dictMonth [k] = currentIndex;
            currentIndex = currentIndex + 1; 
        }
    }
    
    for(let x = firstDayIndex; x > 0; x-- ){
        days += `<div class ="prev-date"> ${previousLastDay - x + 1} </div>`;
    }

    for(let i = 1; i<=lastDay; i++){
        if (i === new Date().getDate() && date.getMonth()=== new Date().getMonth()){
            if(dictMonth[i] == 3){
                days += `<div class="today"> ${i} 
                <p class="event"> Sale and 15% off all merchandise </p></div>`;
            }
            else if(dictMonth[i] == 5){
                count ++;
                if(count%2 == 1){
                    days += `<div class="today"> ${i}
                    </div>`;
                       
                }
                else{
                    days += `<div class="today" > ${i} 
                   </div>`;
                }
            }
            else{
                days += `<div class ="today"> ${i}</div>`;
            }
        }
        else{
            if(dictMonth[i] == 3){
                days += `<div class="month-day" > ${i}
                <p class="event"> Sale and 15% off all merchandise</p> </div>`;
            }
            else if(dictMonth[i] == 5){
                count ++;
                if(count%2 == 1){
                    days += `<div class="month-day"> ${i}
                    <button class=" btn btn-primary btn-s" id="myBtn">Meet And Greet</button>
                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <p>yet to write it</p>
                        </div>
                    </div>
                    </div>`;
                    
                }
                else{
                    days += `<div class="month-day" > ${i} 
                   </div>`;
                }
            }
            else{
                days += `<div class="month-day" > ${i} 
                </div>`;
            }  
        } 
    }
    for(let j =1; j <=nextDays; j++){
        days += `<div class ="next-date"> ${j} </div>`;
        monthDays.innerHTML = days;
    }
    

    btn.onclick = function() {
    modal.style.display = "block";
    }
    span.onclick = function() {
    modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
document .querySelector('.previous').addEventListener('click', () =>{
    date.setMonth(date.getMonth()-1);
    renderCalendar();
});
    
document .querySelector('.next').addEventListener('click', () =>{
    date.setMonth(date.getMonth()+1);
    renderCalendar();
});


    
renderCalendar();

