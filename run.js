//getting the game type
var gametype = location.search.substring(1).split("=");
gametype = gametype[1];
var player1played = true;

// creating two img tags for the players images
var player1 = document.createElement("img");
var player2 = document.createElement("img");

// assigning their source 
player1.src = "/snakesandladders/imgs/players_red.png";
player2.src = "/snakesandladders/imgs/players_green.png";

//creating variables for player's positions
var currpos1 = "0";
var currpos2 = "0";
var pos;
var flag = 1;//variable to tell the turn of the next player

//on page load, adding the players to the initial div with id = 0; 
function start(){
    pos = document.getElementById(currpos1);
    pos.appendChild(player1);
    pos = document.getElementById(currpos2);
    pos.appendChild(player2);
}

//function to generate random numbers for the next position of the player
function dice(){
    var dicenum = Math.floor(Math.random() * (7 - 1) ) + 1;
    let imgname = "/snakesandladders/imgs/"+dicenum+".jpg";
    document.getElementById("dicenum").src=imgname;
    return dicenum;
}

//rolling the dice
function roll(){
    let sound = document.getElementById("audio");
    sound.play();
    document.getElementById("dicenum").src="/snakesandladders/imgs/dice_rolling_gif.gif";
    setTimeout(function(){
        if(flag){
            currpos1 = changepos(player1,currpos1,"/snakesandladders/imgs/players_green.png");
            console.log("red "+currpos1);
            if(currpos1 =="100"){
                on("Player 1");
                document.getElementById("btn").disabled = true;
            }
            flag = 0;
        }
        else{
            currpos2 = changepos(player2,currpos2,"/snakesandladders/imgs/players_red.png");
            console.log("green "+currpos2);
            if(currpos2=="100"){
                on("Player 2");
                document.getElementById("btn").disabled = true;
            }
            flag = 1;
        }
    }, 1000);
    if(gametype == "vs_comp"){
        setTimeout(function(){
            if(player1played){
                    roll();
                    player1played = false;
            }
            else{
                player1played = true;
            }
            console.log(player1played);
        },1500);
    }
}

function changepos(currplayer,currposition,nextplayer){
    let dicenumber = dice();
    if((parseInt(currposition)+dicenumber) <= 100){
        currposition = parseInt(currposition)+dicenumber;//update the curr position
        currposition = currposition.toString();
        pos = document.getElementById(currposition);
        pos.appendChild(currplayer);
        //delay of 1 sec to check the events
        let temp = snakebite(currposition);
        if(currposition != temp){
            currposition = temp;
        }
        else {
            temp = ladder(currposition);
            if(currposition != temp){
                currposition = temp;
            }
        }
        pos = document.getElementById(currposition);
        pos.appendChild(currplayer);
    }
    document.getElementById("player").src=nextplayer;
    return currposition;
}

//function to check if the player is bit by a snake
function snakebite(currpos){
    switch(currpos){
        case "43":
            currpos = "17";
            break;
        case "50":
            currpos = "5";
            break;
        case "56":
            currpos = "8";
            break;
        case "74":
            currpos = "15";
            break;
        case "84":
            currpos = "63";
            break;
        case "87":
            currpos = "49";
            break;
        case "98":
            currpos = "40";
            break;
    }
    return currpos;
}

//function to check if the player has reached a ladder
function ladder(currpos){
    switch(currpos){
        case "2":
            currpos = "23";
            break;
        case "6":
            currpos = "45";
            break;
        case "20":
            currpos = "59";
            break;
        case "52":
            currpos = "72";
            break;
        case "57":
            currpos = "96";
            break;
        case "71":
            currpos = "92";
            break;
    }
    return currpos;
}

function on(winner) {
    document.getElementById("overlay").innerHTML="Congratulations!"+winner+" has won the match.<br>Reload the page to play again";
    document.getElementById("overlay").style.display = "block";
}