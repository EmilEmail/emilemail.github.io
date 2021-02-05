
let squareBtn = document.querySelector("#square-button");
let halfBtn = document.querySelector("#half-button");
let percentBtn = document.querySelector("#percent-button");
let areaBtn = document.querySelector("#area-button");

let solutionDiv = document.querySelector("#solution");

squareBtn.addEventListener('click', square);
halfBtn.addEventListener('click', halfNumber);
percentBtn.addEventListener('click', percent);
areaBtn.addEventListener('click', areaOfCircle);

let squareEnter = document.querySelector("#square-input");
    squareEnter.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {square(); } 
    });
let halfEnter = document.querySelector("#half-input");
    halfEnter.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {halfNumber(); } 
    });
let percentEnter = document.querySelector("#percent2-input");
    percentEnter.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {percent(event); } 
    });
let areaEnter = document.querySelector("#area-input");
    areaEnter.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {areaOfCircle(); }
            
    });

function square() {
    let squareInput = document.querySelector("#square-input").value;
    solutionDiv.textContent = "Square of " + squareInput  * squareInput + " is " + squareInput;
    
}

function halfNumber() {
    let halfInput = document.querySelector("#half-input").value;
    solutionDiv.textContent = "Half of " + halfInput + " is " + halfInput / 2;
}

function percent() {
    let fractionInput = document.querySelector("#percent1-input").value;
    let wholeInput = document.querySelector("#percent2-input").value;
    solutionDiv.textContent = fractionInput + " of " + wholeInput +
    " is " + ((fractionInput / wholeInput) * 100) + "%";
}

function areaOfCircle() {
    let areaInput = document.querySelector("#area-input").value;
    solutionDiv.textContent = "The area of a circle with a radius of "
    + areaInput + " is " + areaInput * areaInput * Math.PI;
}
// let textBox = document.getElementById('message');
//         textBox.addEventListener('keydown', (event) => {
//             console.log(`key=${event.key},code=${event.code}`);

//         });