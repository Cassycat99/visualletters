"use strict";
/**
 * Project 2, Phase 1: Frequency Visualization - by Cassy Smithies
 * Uses the p5.js NumberDict class to count the frequency of letters
 * in a text file.  The counts are visualized in an animation that
 * counts one line per frame and displays the running totals using
 * three different visualization techniques.
 *
 * Uses a state variable to control the visualization method, which
 * Illustrates another use for the Object gizmos in JavaScript.
 */

//VARIABLES.............................................................
let corpAra; // Array of strings to hold the text file (corpus)
let chFreq; // Character Frequency object
let lineNum = 0; // Offset into corpAra

let fileName = "Lyrics.txt";

// Set up an enumerated data type (enum) for the program's state
const StVal = {
    IDLE: 0, // No visualization is currently rendering
    BARS: 1, // The histogram vizualization is currently rendering
    LETS: 2, // The balloon vizualization is currently rendering
    MINE: 3, // My personal vizualization is currently rendering
}

let state = StVal.IDLE;


//PRELOAD..................................................................
function preload() {
    // Read the file into an array of strings, one line per string
    corpAra = loadStrings(fileName);
}



//SETUP.....................................................................
function setup() {
    createCanvas(560, 800);
    colorMode(HSB);
    background(0);
    frameRate(10); // Slow it down some
    textFont("monospace"); // All characters are the same width
    chFreq = new CharFreq(); // Create the Character Frequency object

}

//DRAW........................................................................
function draw() {
   
    // Only draw anything if we're not IDLE
    if (state != StVal.IDLE) {
        // Haven't finished to file yet
        if (lineNum < corpAra.length) {
            background(0);
            // Count characters in this line
            chFreq.countLine(corpAra[lineNum]);
            // Visualize counters so far using method indicated by state
            chFreq.display(state);
            // Next line for next time
            lineNum++;
        } else
            // Finished the file, so now we're IDLE
            state = StVal.IDLE;
    }
}



//KEY TYPED....................................................................
function keyTyped() {
    switch (key) {

        case 'h': //histogram
            // Ignore if we're still rendering
            if (state == StVal.IDLE) {
                state = StVal.BARS; // Change state to this visualizer
                chFreq.reInit(); // Reinitialize the counters
                lineNum = 0; // Start at beginning of file
                background(0); // Clear the canvas
            }
            break;
        case 'l': //letters
            if (state == StVal.IDLE) {
                state = StVal.LETS;
                chFreq.reInit();
                lineNum = 0;
                background(0);
            }
            break;
        case 'm':
            if (state == StVal.IDLE) {
                state = StVal.MINE;
                chFreq.reInit();
                lineNum = 0;
                background(0);
            }
            break;
        case 'd':
            chFreq.dump(); // For debugging purposes
            break;
    }
}
