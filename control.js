//arrays used
let sessions = new Array(); //stores data about each sessions
let type = new Array(); //stores data about all possiable session type

//adds default types
type.push("");
type.push("options");


let list = document.getElementById('list'); //maybe useless idk

//used for stopwatch, clock stores the time
let offset,clock,interval;

//clock functions
function start(){
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
        li.innerHTML = elem.toString();
        document.getElementById('list').append(li);
    })
}

//session object
let session = function(inputTime,inputType){
    let objTime = inputTime;
    let objType = inputType;
    function toString(){
        return objTime/1000 + "s, " + objType; 
    }

    this.toString = toString;
}

//adds a session to session array 
function mark(){
    let inputType = document.getElementById("types").value;
    sessions.push(new session(clock,inputType));
    reset();
    start();
    render();
}

//important to start the page, it sets up the stopwatch and it populates the page
reset();
render();


//binding events and functions to buttons
document.getElementById('start').addEventListener("click",start);
document.getElementById('stop').addEventListener("click",stop);
document.getElementById('reset').addEventListener("click",reset);
document.getElementById('mark').addEventListener("click",mark);
document.getElementById('types').addEventListener("click",createNewType);