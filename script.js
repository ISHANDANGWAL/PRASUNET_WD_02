/* script.js */
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerHTML = 'Pause';
        running = true;
        lapBtn.disabled = false;
        resetBtn.disabled = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.innerHTML = 'Start';
        lapBtn.disabled = true;
        resetBtn.disabled = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00';
    startPauseBtn.innerHTML = 'Start';
    lapCounter = 0;
    laps.innerHTML = '';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function recordLap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
    laps.appendChild(lapTime);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}
