
// array items

let teamsArray=[
    "Arsenal",
    "Liverbool",
    "Man-City",
    "Aston-Villa",
    "Tott-Ham",
    "Man-United",
    "Wes-Ham",
    "Britton",
    "Welverhamton",
    "New-Castle",
    "Chealse",
    "Full-Ham",
    "Born-Moth",
    "Crystale-Balce",
    "Brintford",
    "Everton",
    "Notengham-Forest",
    "Lotton-Town",
    "Bernly",
    "Chefeld-United",
];

// determine the setting levels

lvls={
    "Normal" : 3,
    "Easy" : 5,
    "Hard" : 2,
}

// determine the defaul lvl

defaultLevelName= "Normal";
defaultLevelSeconds= lvls[defaultLevelName];


// catch selctors

let startButton= document.querySelector(".start");
let lvlNameSpan= document.querySelector(".lvl");
let secondsSpan= document.querySelector(".second");
let theWord= document.querySelector(".the-word");
let input= document.querySelector(".input");
let upcomingWords= document.querySelector(".upcoming-words");
let timeLeftSpan= document.querySelector(".time span");
let scoreGot= document.querySelector(".score .got");
let scoreTotal= document.querySelector(".score .total");
let finishMessage= document.querySelector(".finish");

// det lvlsname, seconds, score

lvlNameSpan.innerHTML= defaultLevelName;
secondsSpan.innerHTML= defaultLevelSeconds;
timeLeftSpan.innerHTML= defaultLevelSeconds;
scoreTotal.innerHTML= teamsArray.length;


// must stop pasteInput

input.onpaste= function(){
    return false;
}

// run the start button and the game

startButton.onclick= function(){
    this.remove();
    input.focus();

    // genTeams
    genTeam();

}

function genTeam(){
    // create random team
    let randomTeam= teamsArray[Math.floor(Math.random()*teamsArray.length)];
    // index of the team
    let indexTeam= teamsArray.indexOf(randomTeam);
    // remove the team selected
    teamsArray.splice(indexTeam, 1);
    theWord.innerHTML= randomTeam;

    // empty upcoming words

    upcomingWords.innerHTML= "";

    //gen word in the page

    for(let i=0; i<teamsArray.length; i++){
        let div= document.createElement("div");
        let txtTeam= document.createTextNode(teamsArray[i]);
        div.appendChild(txtTeam);
        upcomingWords.appendChild(div);
    }
    runGame();
}

function runGame(){
    timeLeftSpan.innerHTML= defaultLevelSeconds;
    let start= setInterval(()=>{
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML=== "0"){
            clearInterval(start)
            if(theWord.innerHTML.toLocaleLowerCase()=== input.value.toLocaleLowerCase()){
                input.value="";
                scoreGot.innerHTML++;
                if(teamsArray.length>0){
                    genTeam();
                }
                else{
                    let span= document.createElement("span");
                    span.className="good";
                    let txtSpan= document.createTextNode("Congrats");
                    span.appendChild(txtSpan);
                    finishMessage.appendChild(span);
                    upcomingWords.remove();
                }
            }
            else{
                let span= document.createElement("span");
                span.className="bad";
                let txtSpan= document.createTextNode("Game Over");
                span.appendChild(txtSpan);
                finishMessage.appendChild(span);
            }
        }
    },1000)
}