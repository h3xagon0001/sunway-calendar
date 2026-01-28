// document references
const currentTimeHeading = document.getElementById("current-time");
const timetableElement = document.getElementById("timetable");
const statusListElement = document.getElementById("status-list");

let date;

const green = "#33e061";
const darkGreen = "#008223";


const jk = {
    name: "Jorkin",
    program: "A-Level",
    schedule: [
        [["CS", "NS-C2-4"], ["CS", "NS-C2-4"], ["CS", "NS-C2-4"], ["CS", "NS-C2-4"], [], [], [], [], [], [], [], [], ["Physics", "NS-C2-1"], ["Physics", "NS-C2-1"], ["Math", "NS-C2-1"], ["Math", "NS-C2-1"], ["FM", "NS-C2-1"], ["FM", "NS-C2-1"], [], []],
        [[], [], [], [], ["Math", "NS-C2-3"], ["Math", "NS-C2-3"], ["Physics", "NS-C2-3"], ["Physics", "NS-C2-3"], ["Math", "NS-C2-4"], ["Math", "NS-C2-4"], [], [], [], [], ["FM", "NE-5-9"], ["FM", "NE-5-9"], ["FM", "NE-5-9"], ["FM", "NE-5-9"], [], []],
        [[], [], [], [], ["Physics", "NS-C2-3"], ["Physics", "NS-C2-3"], [], [], [], [], ["Math", "NW-4-21"], ["Math", "NW-4-21"], ["FM", "NC-2-30"], ["FM", "NC-2-30"], ["CS", "NS-C2-3"], ["CS", "NS-C2-3"], [], [], [], []],
        [[], [], [], [], ["FM", "NE-2-13"], ["FM", "NE-2-13"], ["Physics", "NS-C3-1"], ["Physics", "NS-C3-1"], ["CS", "NS-C2-4"], ["CS", "NS-C2-4"], [], [], ["FM", "NS-C2-1"], ["FM", "NS-C2-1"], ["Math", "NS-C2-2"], ["Math", "NS-C2-2"], [], [], [], []],
        [["Math", "UW-8-4"], ["Math", "UW-8-4"], ["CS", "UW-8-1"], ["CS", "UW-8-1"], ["CS", "UW-8-1"], ["CS", "UW-8-1"], [], [], [], [], ["Physics", "PHY 2"], ["Physics", "PHY 2"], ["Physics", "PHY 2"], ["Physics", "PHY 2"], [], [], [], [], [], []]
    ],
    color: "#371362"
};

const rt = {
    name: "Jorkin",
    program: "A-Level",
    schedule: [
        [["CS", "NS-C2-4"], ["CS", "NS-C2-4"], ["CS", "NS-C2-4"], ["CS", "NS-C2-4"], [], [], [], [], [], [], [], [], ["Physics", "NS-C2-1"], ["Physics", "NS-C2-1"], ["Math", "NS-C2-1"], ["Math", "NS-C2-1"], ["FM", "NS-C2-1"], ["FM", "NS-C2-1"], [], []],
        [[], [], [], [], ["Math", "NS-C2-3"], ["Math", "NS-C2-3"], ["Physics", "NS-C2-3"], ["Physics", "NS-C2-3"], ["Math", "NS-C2-4"], ["Math", "NS-C2-4"], [], [], [], [], ["FM", "NE-5-9"], ["FM", "NE-5-9"], ["FM", "NE-5-9"], ["FM", "NE-5-9"], [], []],
        [[], [], [], [], ["Physics", "NS-C2-3"], ["Physics", "NS-C2-3"], [], [], [], [], ["Math", "NW-4-21"], ["Math", "NW-4-21"], ["FM", "NC-2-30"], ["FM", "NC-2-30"], ["CS", "NS-C2-3"], ["CS", "NS-C2-3"], [], [], [], []],
        [[], [], [], [], ["FM", "NE-2-13"], ["FM", "NE-2-13"], ["Physics", "NS-C3-1"], ["Physics", "NS-C3-1"], ["CS", "NS-C2-4"], ["CS", "NS-C2-4"], [], [], ["FM", "NS-C2-1"], ["FM", "NS-C2-1"], ["Math", "NS-C2-2"], ["Math", "NS-C2-2"], [], [], [], []],
        [["Math", "UW-8-4"], ["Math", "UW-8-4"], ["CS", "UW-8-1"], ["CS", "UW-8-1"], ["CS", "UW-8-1"], ["CS", "UW-8-1"], [], [], [], [], ["Physics", "PHY 2"], ["Physics", "PHY 2"], ["Physics", "PHY 2"], ["Physics", "PHY 2"], [], [], [], [], [], []]
    ],
    color: "#134862"
};

const memberArray = [jk, rt];

function highlightCurrentDayTime() {
    date = new Date();

    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();  
    let currentDay = date.getDay();
    
    let timeRow = timetableElement.rows[0];

    let periodIndex = 5;

    for (let i = 1; i < timeRow.cells.length; i++) {
        let hourMinute = timeRow.cells[i].textContent.split(":");
        let periodHour = parseInt(hourMinute[0]);
        let periodMinute = parseInt(hourMinute[1]);

        if (currentHours === periodHour) {
            if (periodMinute === 0) {
                if (0 <= currentMinutes && currentMinutes < 30) {
                    periodIndex = i;
                    break;
                }
            }

            else if (periodMinute === 30) {
                if (30 <= currentMinutes) {
                    periodIndex = i;
                    break;
                }
            }  
        }
    }

    for (let i = 0; i < timetableElement.rows.length; i++) {
        let row = timetableElement.rows[i];

        for (let j = 0; j < row.cells.length; j++) {
            if (j === periodIndex) {
                row.cells[j].style.backgroundColor = "";
                row.cells[j].style.backgroundColor = darkGreen;
            }

            if (i === currentDay && currentDay != 0) {
                row.cells[j].style.backgroundColor = darkGreen;
            }

            if (j === periodIndex && i === currentDay && currentDay != 0) {
                row.cells[j].style.backgroundColor = green;
            }
        }
    }

    return {periodIndex, currentDay};
}

function loadSchedule() {
    for (const member of memberArray) {
        let schedule = member.schedule

        for (let i = 1; i < timetableElement.rows.length; i++) {
            let row = timetableElement.rows[i];

            for (let j = 1; j < row.cells.length; j++) {
                let currentPeriod = schedule[i-1][j-1]

                if (currentPeriod.length != 0) {
                    let newPeriod = document.createElement("div");
                    newPeriod.classList.add("period-block");
                    newPeriod.style.backgroundColor = member.color;

                    newPeriod.appendChild(document.createTextNode(member.name + " | " + currentPeriod[0]));
                    newPeriod.appendChild(document.createElement("br"));
                    newPeriod.appendChild(document.createTextNode(currentPeriod[1]));

                    row.cells[j].appendChild(newPeriod);
                }
            }
        } 
    }
}

function memberStatus(timeInfo) {
    statusListElement.innerHTML = "";

    for (const member of memberArray) {
        let schedule = member.schedule;
        let statusDiv = document.createElement("h2");


        let currentStatus = "Not Free";

        if (schedule[timeInfo.currentDay][timeInfo.periodIndex - 1].length === 0) {
            currentStatus = "FREE";
            statusDiv.style.color = green;
        }        
        
        statusDiv.appendChild(document.createTextNode(member.name + ": " + currentStatus))

        statusListElement.appendChild(statusDiv);
    }
}

function update() {
    setTimeout(() => {
        // update code here
        date = new Date();

        let currentHours = date.getHours();
        let currentMinutes = date.getMinutes();
        
        currentTimeHeading.textContent = currentHours + ":" + currentMinutes.toString().padStart(2, "0");

        memberStatus(highlightCurrentDayTime());

        update();
    }, 500);
}

window.addEventListener("load", (event) => {
    console.log("HTML is fully loaded");

    date = new Date();

    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    
    currentTimeHeading.textContent = currentHours + ":" + currentMinutes.toString().padStart(2, "0");

    console.log("Time is loaded.");

    // load in everyone's timetables
    loadSchedule();

    memberStatus(highlightCurrentDayTime());

    update();
});