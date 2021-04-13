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

function changedReservationDuration() {
    duration = durationDropdown.value;
    
    if (duration == -1) {
        clearDateSelect();
        dateSelect.disabled = true;
        ballMachineCheck.checked = false;
        ballMachineCheck.disabled = true;
    }
    else {
        dateSelect.disabled = false;
        populateDateSelect();
    }
}

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

    // Only displays first 6 dates including today
    for (let i = 0; i < 6; i++) {
        if (dates[i]) {
            let newDate = new Date(dates[i].date);
            let dateOption = document.createElement("option");
            dateOption.value = `${newDate.getDay()}`;
            dateOption.text = `${newDate.toDateString()}`;
            dateSelect.add(dateOption);
        }
    }
}

function populateTimeDropdown() {
    clearTimeDropdown();
    
    dates.forEach((date) => {
        let currentDate = new Date(date.date);
        if (currentDate.getDay() == dateSelect.value) {
            for (let timeSlot of Object.keys(date.timeSlots)) {
                let availableTimeSlot = true;
                
                for (let i = 0; i < duration; i++) {
                    if (Number(timeSlot) + Number(i) <= 30) {
                        if (date.timeSlots[timeSlot + i] != null) {
                            availableTimeSlot = false;
                        }
                    }
                    else {
                        availableTimeSlot = false;
                    }
                }

                let timeSlotOption = document.createElement("option");
                timeSlotOption.value = timeSlot;
                timeSlotOption.text = `${getTimeSlotValue(timeSlot)}`;
                if (!availableTimeSlot) {
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