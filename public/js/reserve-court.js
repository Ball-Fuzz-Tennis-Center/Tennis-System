// Page Elements

var durationDropdown = document.getElementById("durationDropdown");
var dateSelect = document.getElementById("dateSelect");
var ballMachineCheck = document.getElementById("ballMachineCheck");
var timeDropdown = document.getElementById("timeDropdown");

dateSelect.disabled = true;
ballMachineCheck.disabled = true;
timeDropdown.disabled = true;

// Variables

var duration = 0;
var date = 0;
var time = 0;

function changedReservationLength() {
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

    populateDateSelect();
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

function populateDateSelect() {
    var days = []

    const today = new Date();
    const todayPlus1 = new Date();
    const todayPlus2 = new Date();
    const todayPlus3 = new Date();
    const todayPlus4 = new Date();
    const todayPlus5 = new Date();

    todayPlus1.setDate(todayPlus1.getDate() + 1);
    todayPlus2.setDate(todayPlus2.getDate() + 2);
    todayPlus3.setDate(todayPlus3.getDate() + 3);
    todayPlus4.setDate(todayPlus4.getDate() + 4);
    todayPlus5.setDate(todayPlus5.getDate() + 5);

    days.push(today);
    days.push(todayPlus1);
    days.push(todayPlus2);
    days.push(todayPlus3);
    days.push(todayPlus4);
    days.push(todayPlus5);

    clearDateSelect();

    days.forEach((day, index) => {
        var selectDay = document.createElement("option");
        selectDay.text = `${day.toDateString()}`
        selectDay.value = index + 1;
        dateSelect.add(selectDay);
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