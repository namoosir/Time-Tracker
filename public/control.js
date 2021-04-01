//arrays used
let sessions = new Array(); //stores data about each sessions
let type = new Array(); //stores data about all possible session type

//adds default types
type.push("");
type.push("options");
let startDate;


let list = document.getElementById('list'); //maybe useless idk

//used for stopwatch, clock stores the time
let offset,clock,interval;

//clock functions
function start(){
    startDate = new Date();
    if(!interval){
        offset = Date.now();
        interval = setInterval(update,1);
    }
    renderClock();
}
function stop(){
    if (interval){
        clearInterval(interval);
        interval = null;
    }
    renderClock();
}
function reset(){
    clock = 0;
    renderClock(0);
    stop();
}
function update(){
    clock += delta();
    renderClock();
}
function delta(){
    let now = Date.now();
        d = now - offset;
    offset = now;
    return d;
}

//creates new type and adds it to type array
function createNewType(){
    let t = document.getElementById('types').value;
    console.log(t);
    if(t === 'options'){
        let p = prompt("enter new type","");
        if (p != null){
            type.push(p);
        }
        render();

    }
}

//renders the clock only
function renderClock(){
    let x = document.getElementById('demo').innerHTML = new Date(clock).toISOString().substr(11,11);
}

//renders the the whole page
function render(){
    renderClock();
    console.log(sessions);

    //updates select options
    document.getElementById('types').innerHTML = "";
    console.log(type);
    type.forEach(function(elem){
        console.log(elem);
        let op = document.createElement('option');
        op.innerHTML = elem;
        op.id = elem;
        op.value = elem;
        document.getElementById('types').append(op);
    })

    //updates session log
    document.getElementById('list').innerHTML = "";
    sessions.forEach(function(elem){
        console.log(elem);
        let li = document.createElement('li');
        li.innerHTML = sessionToString(elem);

        document.getElementById('list').append(li);
    })
}

//session object methods
function addSessionsItem(inputTime,inputType){
    let x = {
        time: inputTime,
        type: inputType 
    }
    sessions.push(x);
}

function sessionToString(item){
        let inputTime = item.time;
        let inputType = item.type;
        let minutes = inputTime/60000;
        minutes = Math.floor(minutes);
        let seconds = new Date(inputTime).getSeconds();
        seconds = Math.floor(seconds);
        let hours = minutes/60;
        hours = Math.floor(hours);
        let output = "";
        if(hours > 0){
            output += hours.toString() + "hrs, ";
        }
        if(minutes > 0){
            output += minutes.toString() + "min, ";
        }
        if(seconds > 0){
            output += seconds.toString() + "s, ";
        }
        output += inputType;
        return output;
}


//adds a session to session array
function mark(){
    //sends post request to server
    let inputType = document.getElementById("types").value;
    addSessionsItem(clock,inputType);

    let xhttp = new XMLHttpRequest();
    let url = "/mark"
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("On client: "+ this.responseText);
            reset();
            start();
            render();
        }
    }

    xhttp.open("POST",url,true);
    //xhttp.setRequestHeader("Accept","application/json");
    xhttp.setRequestHeader("Content-Type", "text/html");
    console.log("on client "+ JSON.stringify(sessions));
    xhttp.send("Help me I am lost");
    
}

//important to start the page, it sets up the stopwatch and it populates the page


window.onload = function(){
  //send request to Server
  //populate sessions array
  reset();
  render();
}



//binding events and functions to buttons
document.getElementById('start').addEventListener("click",start);
document.getElementById('stop').addEventListener("click",stop);
document.getElementById('reset').addEventListener("click",reset);
document.getElementById('mark').addEventListener("click",mark);
document.getElementById('types').addEventListener("click",createNewType);
