const startButton = document.querySelector(".start-button")
const input = document.querySelector(".guess-form")
const inputNumber = document.querySelector(".guess")
const chance = document.querySelector(".chance")
const container = document.querySelector(".container")
const failMessege = document.querySelector(".fail")
const successMessege = document.querySelector(".cong")
const strikePoint = document.querySelectorAll(".strike > div")
const ballPoint = document.querySelectorAll(".ball > div")
const retryButton = document.querySelector(".retry")
const retryButton2 = document.querySelector(".retry2")
let randomNumber = [];
let playerNumber = [];
let chances = 10;
let strikes = 0;
let balls = 0;

function playGame(){
    randomNumber.splice(0);
    for(let i =0 ;i<3;i++) {
    randomNumber.push(Math.floor(Math.random()*10));
    }
    inputNumber.value = "";
    chances = 10;
    input.classList.remove("hidden");
    chance.classList.remove("hidden");
    chance.innerText = `Try chance ${chances}`;
    console.log(randomNumber);
}

function guessNumber(e){
    e.preventDefault();
    chances --;
    reset();
    const playerLongNumber = inputNumber.value;
    if(playerLongNumber.length <3) {
        alert("You should guess 3 numbers");
        chances ++;
    } else {
    const splitPlayerNumber = function(playerNumber) {
        return (playerNumber+"").split("").map(Number)
    }
    playerNumber = splitPlayerNumber(playerLongNumber);
    chance.innerText = `Try chance ${chances}`;
    matchNumbers();
    }
    showStrikePoint();
    showBallPoint();
    success(strikes);
    fail(chances);
}

function matchNumbers(){
    for(let i = 0 ; i< randomNumber.length ; i++) {
        let ballCount = 0;
        let strikeCount = 0;
        for(let j=0; j< randomNumber.length ; j++) {
            if(randomNumber[i]===playerNumber[j] && i===j) {
                strikes++
                strikeCount = 1;
                break;
            } else if(randomNumber[i]===playerNumber[j] && i!==j && ballCount ===0 && strikeCount === 0) {
                ballCount = 1;
            }
        } if(ballCount>strikeCount) {
            balls++;
        }
    }
}
function fail(chances){
    if(chances===0) {
        container.classList.add("hidden");
        failMessege.classList.remove("hidden");
    }
}
function success(strikes){
    if(strikes===3) {
        container.classList.add("hidden");
        successMessege.classList.remove("hidden");
    }

}
function showStrikePoint(){
    for(let i=0 ; i<strikes ; i++) {
        strikePoint[i].style.backgroundColor = "tomato";
    }
}
function showBallPoint(){
    for(let i=0 ; i<balls ; i++) {
        ballPoint[i].style.backgroundColor = "yellow"
    }
}
function reset(){
    strikes = 0;
    balls = 0;
    strikePoint.forEach((strikePoint)=>strikePoint.style.backgroundColor = "floralwhite");
    ballPoint.forEach((ballPoint)=>ballPoint.style.backgroundColor = "floralwhite");
}

function retry(){
    reset();
    container.classList.remove("hidden");
    failMessege.classList.add("hidden");
    successMessege.classList.add("hidden");
    playGame();
}
startButton.addEventListener("click",playGame)
input.addEventListener("submit",guessNumber)
retryButton.addEventListener("click",retry)
retryButton2.addEventListener("click",retry)