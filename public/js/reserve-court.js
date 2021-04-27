// Page Elements

let durationDropdown = document.getElementById("durationDropdown");
let dateSelect = document.getElementById("dateSelect");
let ballMachineCheck = document.getElementById("ballMachineCheck");
let timeDropdown = document.getElementById("timeDropdown");

dateSelect.disabled = true;
ballMachineCheck.disabled = true;
timeDropdown.disabled = true;

// Variables

let duration = 0;
let date = 0;

// Get dates passed into EJS from controller and convert
let dates = JSON.parse(passedDates);

function changedDurationDropdown() {
    duration = durationDropdown.value;
    
    if (duration == -1) {
        clearDateSelect();
        dateSelect.disabled = true;
        ballMachineCheck.checked = false;
        ballMachineCheck.disabled = true;
        clearTimeDropdown();
        timeDropdown.disabled = true;
    }
    else {
        dateSelect.disabled = false;
        populateDateSelect();
    }
}

//menaingless change


function changedDateSelect() {
    date = dateSelect.value;

    if (date == -1) {
        ballMachineCheck.checked = false;
        ballMachineCheck.disabled = true;
        clearTimeDropdown();
        timeDropdown.disabled = true;
    }
    else {
        ballMachineCheck.disabled = false;
        timeDropdown.disabled = false;
        populateTimeDropdown();
    }
}

function populateDateSelect() {
    clearDateSelect();
    let today = new Date();

    for (let i = 0; i < dates.length; i++) {
        if (dates[i]) {
            let checkDate = new Date(dates[i].date);
            if (checkDate.toDateString() == today.toDateString()) {
                for (let j = 0; j < 6; j++) {
                    if (dates[i + j]) {
                        let dateId = dates[i + j]._id;
                        let newDate = new Date(dates[i + j].date);
                        let dateOption = document.createElement("option");
                        dateOption.value = `${dateId}`;
                        dateOption.text = `${newDate.toDateString()}`;
                        dateSelect.add(dateOption);
                    }
                }
            }
        }
    }
}

function populateTimeDropdown() {
    clearTimeDropdown();
    console.log(dates);
    dates.forEach((date) => {
        if (date._id == dateSelect.value) {
            for (let timeSlot of Object.keys(date.timeSlots)) {

                let timeSlotOption = document.createElement("option");
                timeSlotOption.value = timeSlot;
                timeSlotOption.text = `${getTimeSlotValue(timeSlot)}`;

                if (date.timeSlots[timeSlot] != null) {
                    timeSlotOption.disabled = true;
                }
                if (timeSlot > 30 - duration + 1) {
                    timeSlotOption.disabled = true;
                }

                timeDropdown.add(timeSlotOption);
            }
        }
    });
}

function clearDateSelect() {
    while (dateSelect.length > 1) {
        dateSelect.remove(dateSelect.length - 1);
    }
}

function clearTimeDropdown() {
    while (timeDropdown.length > 1) {
        timeDropdown.remove(timeDropdown.length - 1);
    }
}

function resetForm() {
    dateSelect.disabled = true;
    ballMachineCheck.disabled = true;
    timeDropdown.disabled = true;
}

function getTimeSlotValue(timeSlot) {
    let timeSlotValue = "";
    let timeSlotNumber = Number(timeSlot);

    switch (timeSlotNumber) {
        case 1:
            timeSlotValue = "7:00 am";
            break;
        case 2:
            timeSlotValue = "7:30 am";
            break;
        case 3:
            timeSlotValue = "8:00 am";
            break;
        case 4:
            timeSlotValue = "8:30 am";
            break;
        case 5:
            timeSlotValue = "9:00 am";
            break;
        case 6:
            timeSlotValue = "9:30 am";
            break;
        case 7:
            timeSlotValue = "10:00 am";
            break;
        case 8:
            timeSlotValue = "10:30 am";
            break;
        case 9:
            timeSlotValue = "11:00 am";
            break;
        case 10:
            timeSlotValue = "11:30 am";
            break;
        case 11:
            timeSlotValue = "12:00 pm";
            break;
        case 12:
            timeSlotValue = "12:30 pm";
            break;
        case 13:
            timeSlotValue = "1:00 pm";
            break;
        case 14:
            timeSlotValue = "1:30 pm";
            break;
        case 15:
            timeSlotValue = "2:00 pm";
            break;
        case 16:
            timeSlotValue = "2:30 pm";
            break;
        case 17:
            timeSlotValue = "3:00 pm";
            break;
        case 18:
            timeSlotValue = "3:30 pm";
            break;
        case 19:
            timeSlotValue = "4:00 pm";
            break;
        case 20:
            timeSlotValue = "4:30 pm";
            break;
        case 21:
            timeSlotValue = "5:00 pm";
            break;
        case 22:
            timeSlotValue = "5:30 pm";
            break;
        case 23:
            timeSlotValue = "6:00 pm";
            break;
        case 24:
            timeSlotValue = "6:30 pm";
            break;
        case 25:
            timeSlotValue = "7:00 pm";
            break;
        case 26:
            timeSlotValue = "7:30 pm";
            break;
        case 27:
            timeSlotValue = "8:00 pm";
            break;
        case 28:
            timeSlotValue = "8:30 pm";
            break;
        case 29:
            timeSlotValue = "9:00 pm";
            break;
        case 30:
            timeSlotValue = "9:30 pm";
            break;
        default:
            timeSlotValue = "undefined";
            break;
    }

    return timeSlotValue;
}