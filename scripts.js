// document references
const currentTimeHeading = document.getElementById("current-time");
const timetableElement = document.getElementById("timetable");

const date = new Date();

const green = "#008223";
const darkGreen = "#003e11";


const jk = {
    name: "JK",
}

function highlightCurrentDayTime() {
    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();  
    let currentDay = date.getDay();
    
    let timeRow = timetableElement.rows[0];

    let periodIndex = 1;

    for (let i = 1; i < timeRow.cells.length; i++) {
        let hourMinute = timeRow.cells[i].textContent.split(":");
        let periodHour = parseInt(hourMinute[0]);
        let periodMinute = parseInt(hourMinute[1]);

        currentHours = 16;
        currentMinutes = 29;

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
        row = timetableElement.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            if (j === periodIndex) {
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
}

highlightCurrentDayTime()

function update() {
    setTimeout(() => {
        // update code here
        let currentHours = date.getHours();
        let currentMinutes = date.getMinutes();
        
        currentTimeHeading.textContent = currentHours + ":" + currentMinutes;

        // highlightCurrentDayTime();


        update();
    }, 500);
}

window.addEventListener("load", (event) => {
    console.log("HTML is fully loaded");

    let currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    
    currentTimeHeading.textContent = currentHours + ":" + currentMinutes;

    console.log("Time is loaded.");

    // load in everyone's timetables

    update();
});