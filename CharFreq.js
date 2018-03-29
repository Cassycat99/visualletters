"use strict";
//Cassy Smithies
//CharFreq Class
//Dictionary class that loads each line of the file loaded in main and tracks each character frequency
//Is able to display the character frequency in a histrogram, letter cloud, and snail race method
//Dump is used to debug the character's frequency onto the console

class CharFreq {

    constructor() {
        this.newCtrs = createNumberDict('a', 0); //creates new dictionary with a
        this.init();
    }

    init() {
        //counters NumberDict with character count pairs
        //converts string to number, cycles through numbers, then converts back to string 
        //to achieve the alphabet in a loop

        let aNum = 'b'.charCodeAt(0); // a is used to create the dictionary so it not needed to be readded
        for (let i = 0; i < 25; i++) {
            let l = String.fromCharCode(i + aNum);
            this.newCtrs.create(l, 0);
        }

        this.newCtrs.create('-', 0); //tracks spaces
        this.newCtrs.create('.', 0); //tracks punctutation


    }

    //DISPLAY METHOD.......................................................................
    display(state) {

        //Bar Display.......................................................................
        //draws histogram based off of character count/letter frequency
        
        if (state == 1) { //histogram

            let xLet = 8; //x coordinate of letter
            let x1 = 5; //x1 of line
            let x2 = 20; //x2 of line
            let y1 = 750; //y1 of line
            let y2 = 750; //y2 of line
            let hue = 360;
            textSize(20);
            fill(hue);
            stroke(hue);

            //creates bars for a through z
            for (let i = 0; i < 26; i++) {

                let aNum = 'a'.charCodeAt(0); //cyles through a-z
                let l = String.fromCharCode(i + aNum);
                let letFreq = this.newCtrs.get(l);

                letFreq = (letFreq * 2); //multiple letter frequency by 2 increase bar height visually but keep ratio

                noStroke();
                text(l, xLet, 770);
                xLet = xLet + 20;
                stroke(hue, 100, 100);

                for (let j = 0; j < letFreq; j++) { //draws a line for each count to create a growing bar
                    line(x1, y1, x2, y2);
                    y2 = y2 - 1;
                    y1 = y2;
                    stroke(hue, 100, 100);
                }

                y1 = 750 //sets coordinates for display of spaces
                y2 = 750
                x1 = x1 + 20;
                x2 = x2 + 20;
                hue = hue - 12;
            }

            //creates bar for space
            let spaceFreq = this.newCtrs.get('-');
            spaceFreq = (spaceFreq * 2);
            for (let k = 0; k < spaceFreq; k++) {
                line(x1, y1, x2, y2);
                y2 = y2 - 1;
                y1 = y1 - 1;
                stroke(hue, 100, 100);

            }

            //resets line over to period display
            x1 = x1 + 20;
            x2 = x2 + 20;
            y1 = 750;
            y2 = y1;

            //creates bars for periods
            let periodFreq = this.newCtrs.get('.');
            periodFreq = (periodFreq * 2);
            for (let m = 0; m < periodFreq; m++) {
                line(x1, y1, x2, y2);
                y2 = y2 - 1;
                y1 = y1 - 1;
                stroke(hue, 100, 100);
            }

            noStroke();
            text("-", 528, 770);
            text(".", 544, 770);
            stroke(hue, 100, 100);

            //Letter cloud Display.......................................................................
            //creates a cloud of letters whose size relates to their character frequency
            
        } else if (state == 2) { //letter cloud

            noStroke();
            let hue = 360;
            let newTextSize = 0;
            let numChar = 0; //number of characters, used in calculating character location

            for (let i = 0; i < 26; i++) { //cycles through a-z

                let aNum = 'a'.charCodeAt(0);
                let l = String.fromCharCode(i + aNum);
                let letFreq = this.newCtrs.get(l);

                numChar = i;
                let x1 = (numChar % 4) * 120 + 50; //creates x cloud location
                let y1 = Math.floor(numChar / 4) * 100 + 175; //creates y cloud location
                
                newTextSize = (letFreq * 5);

                if (newTextSize != 0) { //prevents letters that have no frequency from appearing
                    textSize(newTextSize);
                    fill(hue, 100, 100);
                    text(l, x1, y1);
                }
                hue = hue - 12;
            }

            //adds spaces to letter cloud by setting variables, checking if a frequency exisits and then draws
            hue = 144;
            numChar++;
            let spaceX = (numChar % 4) * 120 + 50;
            let spaceY = Math.floor(numChar / 4) * 100 + 175;
            fill(hue, 100, 100);
            let spaceFreq = this.newCtrs.get('-');
            newTextSize = (spaceFreq * 5);
            fill(hue, 100, 100);

            if (newTextSize != 0) {
                textSize(newTextSize);
                text('-', spaceX, spaceY);
            }

            //adds periods to letter cloud by setting variables, checking if a frequency exisits and then draws
            hue = 132;
            numChar++;
            let periodX = (numChar % 4) * 120 + 50;
            let periodY = Math.floor(numChar / 4) * 100 + 175;
            fill(hue, 100, 100);
            let periodFreq = this.newCtrs.get('.');
            newTextSize = (periodFreq * 5);
            fill(hue, 100, 100);

            if (newTextSize != 0) {
                textSize(newTextSize);
                text('.', periodX, periodY);
                hue = hue - 12;
            }

            //My Display.......................................................................
            //Uses letter frequency to relate to coordinate on screen racing letters from left to right
            //more color is added as the letter crosses the screen
        } else if (state == 3) { //mine

            noStroke();
            textSize(28);
            let xLet;
            let yLet = 790; //a starts at the bottom of the screen
            let hue = 360;
            let brightness;

            //a - z
            for (let i = 0; i < 26; i++) {

                let aNum = 'a'.charCodeAt(0); //cycles through alphabet
                let l = String.fromCharCode(i + aNum);
                let letFreq = this.newCtrs.get(l);

                xLet = (letFreq * 3); //multipler to x coordinate
                brightness = (letFreq * 2);
                fill(hue, brightness, 100);
                text(l, xLet, yLet);

                yLet = yLet - 28; //mores y coordinate up screen
                hue = hue - 12;
            }

            //adds space freq
            let spaceFreq = this.newCtrs.get('-');
            let spaceX;

            spaceX = (spaceFreq * 3);
            brightness = (spaceFreq * 2);
            fill(hue, brightness, 100);
            text('-', spaceX, 60);

            hue = hue - 12;

            //adds period freq
            let periodX;
            let periodFreq = this.newCtrs.get('.');

            periodX = (periodFreq * 3);
            brightness = (periodFreq * 2);
            fill(hue, brightness, 100);
            text('.', periodX, 30);

            hue = hue - 12;
        }


    }

    //COUNT METHOD.......................................................................
    countLine(s) {
        //At this point, one entire string/full sentence is past through
        //s is string


        let sAra = s.toLowerCase().split(''); //splits 1 string into letters

        for (let j = 0; j < sAra.length; j++) {

            if (sAra[j] >= 'a' && sAra[j] <= 'z') {
                this.newCtrs.add(sAra[j], 1); //increases counter on letters
                //fileStAra is array of strings of the letters

            } else if (sAra[j] == ' ') {
                this.newCtrs.add('-', 1); //increases counter on spaces

            } else {
                this.newCtrs.add('.', 1); //if character is unrecognized, add to period
            }

        }
    }

    //REINTIT METHOD.......................................................................
    reInit() {
        this.newCtrs.clear(); //clears dictionary
        this.newCtrs.create('a', 0); //adds a
        this.init(); //calls init which starts at b
    }


    //DUMP METHOD.......................................................................
    dump() {
        this.newCtrs.print(); //prints all counts onto console for debugging
    }
}
