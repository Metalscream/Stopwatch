const startPauseHTML = document.getElementById("startPause")
const reset = document.getElementById("reset")
const hoursHTML = document.getElementById("hours")
const minutesHTML = document.getElementById("minutes")
const secondsHTML = document.getElementById("seconds")
const milisecondsHTML = document.getElementById("miliseconds")
let isCounting = false
let countMiliseconds = 0
let countSeconds = 58
let countMinutes = 0
let countHours = 0

var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

let outputUpdate = () => {
    hoursHTML.innerHTML = countHours + ":"
    minutesHTML.innerHTML = countMinutes + ":"
    if(countSeconds < 10){
        secondsHTML.innerHTML = "0" + countSeconds.toString() + "."
    }else{
        secondsHTML.innerHTML = countSeconds + "."
    }
    if(countMiliseconds < 10){
        milisecondsHTML.innerHTML = "0" + countMiliseconds.toString()
    }else{
        milisecondsHTML.innerHTML = countMiliseconds
    }
}

let stopwatch = () => {
    if(isCounting){
        outputUpdate()
        setTimeout(stopwatch, 10)
        setTimeout(timeAdd, 10)
    }
}

let timeAdd = () => {
    if(countMiliseconds % 100 == 0){
        circle.dispatchEvent(event)
    }
    if(countMiliseconds < 99){
        countMiliseconds += 1
    }else{
        countMiliseconds = 0
        if(countSeconds < 59){
            countSeconds = countSeconds += 1
        }else{
            countSeconds = 0
            if(countMinutes < 59){
                countMinutes += 1
            }else{
                countMinutes = 0
                countHours += 1
            }
        }
    }
}

let outputReset = () => {
    countMiliseconds = 0
    countSeconds = 0
    countMinutes = 0
    countHours = 0
    outputUpdate()
}

startPause.addEventListener("click", ()=>{
    if(!isCounting){
        isCounting = true
        setTimeout(timeAdd, 100)
        stopwatch()
        startPauseHTML.innerHTML = "Pause"
    }else{
        isCounting = false
        startPauseHTML.innerHTML = "Start"
    }
    console.log("Stopwatch is already going!")
})

reset.addEventListener("click", ()=>{
    outputReset()
})

//foreign code
const event = new Event("onRingChange")
circle.addEventListener("onRingChange", () => {
    setProgress(countSeconds)
}, false)

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent / 60 * circumference;
  console.log()
  circle.style.strokeDashoffset = offset;
}

