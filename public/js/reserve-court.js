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
let time = 0;

function changedReservationDuration() {
    duration = durationDropdown.value;
    
    if (duration == 0) {
        clearDateSelect();
        dateSelect.disabled = true;
        ballMachineCheck.checked = false;
        ballMachineCheck.disabled = true;
    }
    else {
        dateSelect.disabled = false;
    }
}

function changedDateSelect() {
    date = dateSelect.value;

    if (date == 0) {
        ballMachineCheck.checked = false;
        ballMachineCheck.disabled = true;
        clearTimeDropdown();
        timeDropdown.disabled = true;
    }
    else {
        ballMachineCheck.disabled = false;
        timeDropdown.disabled = false;
    }
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