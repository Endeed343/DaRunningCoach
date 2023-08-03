//THIS CODE IS THE PROPERTY OF DANE PARK CHAKY

//gt stands for goal time
//dm stands for daily mileage

//gm stands for goal mileage

//TO DO
//publish and clean up other files



function makeTable() {
        let workoutIndexer = 0;



        let schedule = [
                { Monday: 'Default', Tuesday: 'Default', Wednesday: 'Default', Thursday: 'Default', Friday: 'Default', Saturday: 'Default', Sunday: 'Default' },
                { Monday: 'Default', Tuesday: 'Default', Wednesday: 'Default', Thursday: 'Default', Friday: 'Default', Saturday: 'Default', Sunday: 'Default' },
                { Monday: 'Default', Tuesday: 'Default', Wednesday: 'Default', Thursday: 'Default', Friday: 'Default', Saturday: 'Default', Sunday: 'Default' },
                { Monday: 'Default', Tuesday: 'Default', Wednesday: 'Default', Thursday: 'Default', Friday: 'Default', Saturday: 'Default', Sunday: 'Default' }
        ]




        let dayCounter = 1;
        let weekCounter = 0;
        let dayTraining = "";

        //FUNCTIONS

        function offSeasonWO(dm) {
                let wu = 0;
                let cd = 0;
                let n = 0;
                let pace = 0;
                if (workoutOrder[workoutIndexer] == 'n mile tempo') {
                        if (dm >= 6) {
                                wu = Math.round((dm - 4) / 2);
                                cd = Math.round((dm - 4) / 2);
                                n = 4;
                                pace = convertTime(tempo)[0];
                                //alert(pace);
                                dayTraining = '' + wu + ' mile warmup, ' + '4 mile tempo @' + pace + ', ' + cd + ' mile cooldown';
                        }
                        else {
                                //alert(weekCounter +' ,  ' + dayCounter);
                                let newWo = '';
                                if(workoutIndexer + 2 >= workoutOrder.length)
                                        if(workoutOrder[workoutIndexer - 3] != 'n mile progression') newWo = workoutOrder[workoutIndexer - 3];
                                        else newWo = workoutOrder[workoutIndexer - 4];
                                else if(workoutOrder[workoutIndexer + 2] != 'n mile progression') newWo = workoutOrder[workoutIndexer + 2];
                                else newWo = workoutOrder[workoutIndexer + 3];
                                workoutOrder[workoutIndexer] = newWo;
                                offSeasonWO(dm);
                                return;

                        }
                }
                if (workoutOrder[workoutIndexer] == 'n mile progression') {
                        if(dm >= 8)
                        {
                                wu = Math.round((dm-6) / 2);
                                cd = Math.round((dm-6) / 2);
                                let start = convertTime(progressionStart)[0];
                                let finish = convertTime(progressionFinish)[0];
                                dayTraining = '' + wu + ' mile warmup, 6 mile progression starting at ' + start + ' pace, and dropping 15 seconds each mile down to ' + finish + ' for the last mile, ' + cd + ' mile cooldown';
                        }
                        else
                        {
                                //alert(weekCounter + ' ,  ' + dayCounter);
                                let newWo = '';
                                if(workoutIndexer + 2 >= workoutOrder.length)
                                        if(workoutOrder[workoutIndexer - 3] != 'n mile tempo') newWo = workoutOrder[workoutIndexer - 3];
                                else if(workoutOrder[workoutIndexer + 2] != 'n mile tempo') newWo = workoutOrder[workoutIndexer + 2];
                                else newWo = workoutOrder[workoutIndexer + 3];
                                workoutOrder[workoutIndexer] = newWo;
                                offSeasonWO(dm);
                                return;
                        }
                        
                }
                if (workoutOrder[workoutIndexer] == 'n steady w nx15/45') {
                        n = Math.ceil(dm * 0.3);
                        pace = convertTime(steady)[0];
                        dayTraining = '' + 'Steady ' + dm + ' miles @' + pace + ' with 15sec hard/45 sec easy in the middle ' + n + ' miles';
                }
                if (workoutOrder[workoutIndexer] == 'n w nx2/2steady') {
                        if(dm >= 9) n = 10;
                        if(dm >= 8) n = 8;
                        if(dm >= 7) n = 6;
                        if(dm >= 6) n = 5;
                        if(dm <= 5) n = 4;
                        pace = convertTime(steady)[0];
                        dayTraining = '' + 'Steady ' + dm + ' miles @' + pace + ' with ' + n + ' x 2 min @tempo/2 min steady in the middle';
                }
                if (workoutOrder[workoutIndexer] == 'n steady w nx3/1') {
                        if(dm >= 9) n = 8;
                        if(dm >= 8) n = 6;
                        if(dm >= 7) n = 5;
                        if(dm >= 6) n = 4;
                        if(dm <= 5) n = 3;
                        pace = convertTime(steady)[0];
                        dayTraining = '' + 'Steady ' + dm + ' miles @' + pace + ' with ' + n + ' x 3 min @tempo/1 min easy in the middle';
                }

                workoutIndexer++;
        }

        function convertTime(cTime) {
                //newTimes[0] is the pace
                //newTimes[1] is the max for the pace

                let newTimes = ['', ''];
                if ((cTime % 1) < 0.2) {
                        newTimes[0] = '' + Math.round(cTime) + ':00';
                        newTimes[1] = '' + Math.round(cTime) + ':30';
                }
                if ((cTime % 1) < 0.4 && (easy % 1) >= 0.2) {
                        newTimes[0] = '' + Math.round(cTime) + ':15';
                        newTimes[1] = '' + Math.round(cTime) + ':45';
                }
                if ((cTime % 1) < 0.6 && (cTime % 1) >= 0.4) {
                        if ((cTime % 1) > 0.5) {
                                newTimes[0] = '' + (Math.round(cTime) - 1) + ':30';
                                newTimes[1] = '' + Math.round(cTime) + ':00';
                        }
                        else {
                                newTimes[0] = '' + Math.round(cTime) + ':30';
                                newTimes[1] = '' + (Math.round(cTime) + 1) + ':00';
                        }
                }
                if ((cTime % 1) < 0.8 && (cTime % 1) >= 0.6) {
                        if ((cTime % 1) > 0.5) {
                                newTimes[0] = '' + (Math.round(cTime) - 1) + ':45';
                                newTimes[1] = '' + Math.round(cTime) + ':15';
                        }
                        else {
                                newTimes[0] = '' + Math.round(cTime) + ':45';
                                newTimes[1] = '' + (Math.round(cTime) + 1) + ':15';
                        }
                }
                if ((cTime % 1) >= 0.8) {
                        newTimes[0] = '' + Math.round(cTime) + ':00';
                        newTimes[1] = '' + Math.round(cTime) + ':30';
                }

                return newTimes;
        }

        function makeDays(type, dm) {

                //MAKES New Week After 7 Days
                if (dayCounter > 7) {
                        dayCounter = 1;
                        weekCounter++;
                }

                //rounds dm and keeps track of lost mileage
                dm = Math.round(dm);


                //converts paces to 8:88 form
                let easyPace = convertTime(easy)[0];
                let easyMax = convertTime(easy)[1];
                let steadyPace = convertTime(steady)[0];
                let steadyMax = convertTime(steady)[1];
                let dailyMile = convertTime(mile)[0];
                let dailyThousand = convertTime(oneThousand)[0];


                //Converts the type of day and the dm into a string
                //explaining what to run

                if (type == 1) {
                        dayTraining = 'Off day';
                }
                if (type == 2) {
                        dayTraining = 'Easy ' + dm + ' miles' + ' @' + easyPace + '-' + easyMax;
                }
                if (type == 3) {
                        dayTraining = 'Steady ' + dm + ' miles' + ' @' + steadyPace + '-' + steadyMax;
                }
                if (season == 'inSeason') {
                        if (type == 4 || type == 5) {
                                let wu = 0;
                                let cd = 0;
                                let n = 0;
                                let pace = 0;
                                if (workoutOrder[workoutIndexer] == 'nx400') {
                                        let halfway = 0;
                                        wu = Math.floor(dm * 0.3);
                                        cd = Math.floor(dm * 0.3);
                                        n = Math.round((0.4 * dm) * 2);
                                        halfway = Math.round(n / 2);
                                        pace = Math.ceil(fourHundred * 60);
                                        dayTraining = '' + wu + ' mile warmup, ' + n + 'x400 @' + pace + ' with a one lap jog after each rep and a 4 minute break after lap ' + halfway + ', ' + cd + ' mile cooldown after';
                                }
                                if (workoutOrder[workoutIndexer] == 'nx200') {
                                        wu = Math.floor(dm * 0.3);
                                        cd = Math.floor(dm * 0.3);
                                        n = Math.round(0.4 * dm * 4);
                                        pace = Math.ceil(twoHundred * 60);
                                        dayTraining = '' + wu + ' mile warmup, ' + n + 'x200 @' + pace + ' with a 200m jog after each rep, ' + cd + ' mile cooldown';

                                }
                                if (workoutOrder[workoutIndexer] == 'nx1000') {
                                        wu = Math.floor(dm * 0.3);
                                        cd = Math.floor(dm * 0.3);
                                        n = Math.round((0.4 * dm) * 1.6);
                                        pace = dailyThousand;
                                        dayTraining = '' + wu + ' mile warmup, ' + n + 'x1000 @' + pace + ' with a 2 min rest in between reps, ' + cd + ' mile cooldown';
                                }
                                if (workoutOrder[workoutIndexer] == 'nx1600') {
                                        wu = Math.floor(dm * 0.25);
                                        cd = Math.floor(dm * 0.25);
                                        n = Math.floor(0.5 * dm);
                                        pace = dailyMile;
                                        dayTraining = '' + wu + ' mile warmup, ' + n + 'x1600 @' + pace + ' with a 3 min rest in between reps, ' + cd + ' mile cooldown';
                                }
                                if (workoutOrder[workoutIndexer] == 'n w 60/90') {
                                        wu = Math.floor(dm * 0.2);
                                        cd = Math.floor(dm * 0.2);
                                        n = Math.round(dm * 0.6);
                                        dayTraining = '' + wu + ' mile warmup, ' + n + 'miles of 60 seconds hard, 90 seconds easy, ' + cd + ' mile cooldown';
                                }
                                if (workoutOrder[workoutIndexer] == '600 + nx200') {
                                        wu = Math.floor((dm - 0.75) / 2);
                                        cd = Math.floor((dm - 0.75) / 2);
                                        dayTraining = '' + wu + ' mile warmup, ' + 'one 600 as fast as possible w/ 3min rest after, followed by 3x200 w/ 2min rest after, ' + cd + ' mile cooldown';
                                }
                                if (workoutOrder[workoutIndexer] == 'ladder') {
                                        if (dm > 7) {
                                                wu = Math.floor((dm - 2.375) / 2);
                                                cd = Math.floor((dm - 2.375) / 2);
                                                dayTraining = '' + wu + ' mile warmup, ' + '200, 400, 800, 1000, 800, 400, 200 at hard effort with 2 minutes rest after each rep, ' + cd + ' mile cooldown';
                                        }
                                        else {
                                                wu = Math.floor((dm - 1.25) / 2);
                                                cd = Math.floor((dm - 1.25) / 2);
                                                dayTraining = '' + wu + ' mile warmup, ' + '200, 400, 800, 400, 200 at hard effort with 2 minutes rest after each rep, ' + cd + ' mile cooldown';
                                        }
                                }
                                workoutIndexer++;
                        }
                }
                if(season == 'offSeason') {
                        if (type == 4 || type == 5) {

                                offSeasonWO(dm);
                        }

                }
                if (type == 6) {
                        dayTraining = 'Long ' + dm + ' miles' + ' @' + easyPace + '-' + easyMax;
                }

                //Sets Day Training to the designated day in schedule

                if (dayCounter == 1) {
                        schedule[weekCounter].Monday = dayTraining;
                }
                if (dayCounter == 2) {
                        schedule[weekCounter].Tuesday = dayTraining;
                }
                if (dayCounter == 3) {
                        schedule[weekCounter].Wednesday = dayTraining;
                }
                if (dayCounter == 4) {
                        schedule[weekCounter].Thursday = dayTraining;
                }
                if (dayCounter == 5) {
                        schedule[weekCounter].Friday = dayTraining;
                }
                if (dayCounter == 6) {
                        schedule[weekCounter].Saturday = dayTraining;
                }
                if (dayCounter == 7) {
                        schedule[weekCounter].Sunday = dayTraining;
                }


                //Moves to the Next Day

                dayCounter++;
        }



        function makeWeek(type, gm) {
                if (type == 1) {
                        makeDays(2, gm * 0.29);
                        makeDays(1, 0);
                        makeDays(2, gm * 0.29);
                        makeDays(1, 0);
                        makeDays(6, gm * 0.42);
                        makeDays(1, 0);
                        makeDays(1, 0);
                }

                if (type == 2) {
                        makeDays(3, gm * 0.17);
                        makeDays(3, gm * 0.25);
                        makeDays(1, 0);
                        makeDays(6, gm * 0.33);
                        makeDays(1, 0);
                        makeDays(3, gm * 0.25);
                        makeDays(1, 0);
                }

                if (type == 3) {
                        makeDays(6, gm * 0.33);
                        makeDays(1, 0);
                        makeDays(3, gm * 0.18);
                        makeDays(1, 0);
                        makeDays(3, gm * 0.22);
                        makeDays(4, gm * 0.27);
                        makeDays(1, 0);
                }

                if (type == 4) {
                        makeDays(6, gm * 0.26);
                        makeDays(4, gm * 0.18);
                        makeDays(1, 0);
                        makeDays(3, gm * 0.18);
                        makeDays(4, gm * 0.21);
                        makeDays(2, gm * 0.17);
                        makeDays(1, 0);
                }

                if (type == 5) {
                        makeDays(6, gm * 0.22);
                        makeDays(4, gm * 0.15);
                        makeDays(2, gm * 0.14);
                        makeDays(4, gm * 0.19);
                        makeDays(2, gm * 0.14);
                        makeDays(3, gm * 0.16);
                        makeDays(1, 0);
                }
        }





        //Gets Infromation from the Form

        let days = document.forms["runnerInfo"].daysRan.value;
        let season = document.forms["runnerInfo"].season.value;
        let raceTime = document.forms["runnerInfo"].raceTime.value;
        let mileage = document.forms["runnerInfo"].mileage.value;

        //Variable Declaration and some Initialization

        let mile = raceTime / 3.1;
        let eightHundred = mile / 2 - 0.25;
        let fourHundred = eightHundred / 2 - 0.08333;
        let twoHundred = fourHundred / 2 - 0.01666;
        let oneThousand = eightHundred * 1.25 + 0.08333;
        let tempo = (raceTime / 3.1) + 0.25;
        let progressionFinish = tempo + 0.25;
        let steady = tempo + 1.5;
        let progressionStart = tempo + 1.75;//REMEMBEr, progression is -15seconds each mile
        let easy = tempo + 2;

        let goalMileage = 0;
        let montType = 0;

        //Finds Goal Weekly Mileage

        if (raceTime > 30) {
                goalMileage = 20;
        }
        else if (raceTime > 25) {
                goalMileage = 25;
        }
        else if (raceTime > 20) {
                goalMileage = 30;
        }
        else if (raceTime > 18) {
                goalMileage = 35;
        }
        else if (raceTime > 17) {
                goalMileage = 40;
        }
        else if (raceTime > 16) {
                goalMileage = 45;
        }
        else if (raceTime > 15) {
                goalMileage = 50;
        }
        else if (raceTime > 14) {
                goalMileage = 60;
        }
        else if (raceTime > 13) {
                goalMileage = 70;
        }
        else if (raceTime > 12) //YOU ARE CRAZY!
        {
                goalMileage = 80;
        }

        //Finds Month Type

        if (days <= 2 || mileage < goalMileage * 0.28) {
                monthType = 1;
        }
        else if (days == 3 || mileage < goalMileage * 0.54) {
                monthType = 2;
        }
        else if (days == 4 || mileage < goalMileage * 0.76) {
                monthType = 3;
        }
        else if (days >= 5) {
                monthType = 4;
        }

        //makes the workout order

        let monthlyWorkouts = 0;
        switch (monthType) {
                case 1:
                        monthlyWorkouts = 4;
                case 2:
                        monthlyWorkouts = 5;
                case 3:
                        monthlyWorkouts = 8;
                case 4:
                        monthlyWorkouts = 8;

        }

        let inSeasonWorkouts = ['nx400', 'nx1000', 'nx1600', 'nx200', 'n w 60/90', '600 + nx200', 'ladder'];
        let offSeasonWorkouts = ['n mile tempo', 'n mile progression', 'n steady w nx15/45', 'n w nx2/2steady', 'n steady w nx3/1'];
        let inSeasonWorkoutsCopy = inSeasonWorkouts;
        let offSeasonWorkoutsCopy = offSeasonWorkouts;
        let workoutOrder = [];
        let firstWO = '';
        if (season == 'inSeason') {
                for (let i = 0; i < monthlyWorkouts; i++) {
                        if (i == 0) {
                                let j = Math.floor(Math.random() * inSeasonWorkoutsCopy.length);
                                workoutOrder.push(inSeasonWorkoutsCopy[j]);
                                firstWO = inSeasonWorkoutsCopy[j];
                                inSeasonWorkoutsCopy.splice(j, 1);
                        }
                        else if (i != 7) {
                                let j = Math.floor(Math.random() * inSeasonWorkoutsCopy.length);
                                workoutOrder.push(inSeasonWorkoutsCopy[j]);
                                inSeasonWorkoutsCopy.splice(j, 1);
                        }
                        else {
                                workoutOrder.push(firstWO);
                        }
                }
        }
        if (season == 'offSeason') {
                for (let i = 0; i < monthlyWorkouts; i++) {
                        if (i == 0) {
                                let j = Math.floor(Math.random() * offSeasonWorkoutsCopy.length);
                                workoutOrder.push(offSeasonWorkoutsCopy[j]);
                                firstWO = offSeasonWorkoutsCopy[j];
                                offSeasonWorkoutsCopy.splice(j, 1);
                        }
                        else if (i < 5) {
                                let j = Math.floor(Math.random() * offSeasonWorkoutsCopy.length);
                                workoutOrder.push(offSeasonWorkoutsCopy[j]);
                                offSeasonWorkoutsCopy.splice(j, 1);
                        }
                        else if (i >= 5) {
                                workoutOrder.push(workoutOrder[i - 5]);
                        }
                }
        }



        let workoutCounter = 0;


        //makes the schedule array

        if (monthType == 1) {
                makeWeek(1, goalMileage * 0.28);
                makeWeek(2, goalMileage * 0.42);
                makeWeek(4, goalMileage * 0.76);
                makeWeek(5, goalMileage);
        }

        if (monthType == 2) {
                makeWeek(3, goalMileage * 0.54);
                makeWeek(4, goalMileage * 0.76);
                makeWeek(5, goalMileage);
                makeWeek(5, goalMileage);
        }

        if (monthType == 3) {
                makeWeek(4, goalMileage * 0.76);
                makeWeek(5, goalMileage);
                makeWeek(5, goalMileage);
                makeWeek(5, goalMileage);
        }

        if (monthType == 4) {
                makeWeek(5, goalMileage);
                makeWeek(5, goalMileage);
                makeWeek(5, goalMileage);
                makeWeek(5, goalMileage);
        }

        //makes the table


        let swap = true;

        let myTable = document.querySelector("#table");

        let headers = ['Monday', 'Tuesday', 'Wednesdsay', 'Thursday', 'Friday', 'Saturday', "Sunday"];

        let table = document.createElement('table');
        let headerRow = document.createElement('tr');

        //Makes Table Headers
        //headerText is a string, the for each calls the function once for each element
        //in headers and takes in the each value as the headerText string

        headers.forEach(headerText => {
                let header = document.createElement('th');
                let textNode = document.createTextNode(headerText);
                header.appendChild(textNode);
                header.style.padding = '10px';
                header.style.backgroundColor = 'rgb(122, 209, 168)';
                headerRow.appendChild(header);
        })

        //Table Appends The Headers/First Row

        table.appendChild(headerRow);

        //NOTE FOR THE FUTURE!!!
        //COLOR CODE EACH DAY BASED ON EASY, OFF, STEADY, or HARD

        //Makes Each Day

        schedule.forEach(day => {
                let row = document.createElement('tr');

                Object.values(day).forEach(text => {
                        let cell = document.createElement('td');
                        let textNode = document.createTextNode(text);
                        cell.appendChild(textNode);
                        cell.style.padding = '10px';
                        cell.style.backgroundColor = 'rgb(174, 231, 240)';
                        row.appendChild(cell);

                })

                row.style.borderbottom = '1px solid black';
                table.appendChild(row)
        })

        myTable.appendChild(table);

        //Styles the Table

        //table.style.width = '90vw';
        //table.style.marginLeft = '5vw';
        table.style.marginLeft = 'auto';
        table.style.marginRight = 'auto';
        //table.style.marginRight = '5vw';
        table.style.overflow = 'scroll';
        table.style.marginTop = "15vh";
        table.style.borderSpacing = '1%';
        table.style.backgroundColor = 'white';
        table.style.boxShadow = "rgba(0, 0, 0) 15px 25px 50px -12px";


        window.scrollTo(0, document.body.scrollHeight);
}

/*

setInterval( function scaleTable(){
//alert(table.scrollWidth);
var curOverflow = table.style.overflow;
//alert((table.scrollWidth * 0.9) + "   " + window.innerWidth);
table.style.overflow = 'hidden';
var isOverflowing = (table.scrollWidth * 0.9) > window.innerWidth;
table.style.overflow = curOverflow;



if(isOverflowing)
{
table.style.transform = 'scale(0.7)';
table.style.marginLeft = '-15vw';
}
else{
//let theTable = document.getElementById('table');
table.style.transform = 'scale(1)'; 
table.style.marginLeft = 'auto';
table.style.marginRight = 'auto';
}
 
}, 1000)*/