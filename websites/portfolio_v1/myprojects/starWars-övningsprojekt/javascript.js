let page = 1;
let url = "https://swapi.dev/api/people/?page=" + page;
let urlWorld = "";
let characterData = [];
let homeworldData = [];
let buttons = [];

let DetailsFilled = false;

let characterList = document.querySelector("#characters");
let sectionDetails = document.querySelector("#char-details");
let sectionHomeWorld = document.querySelector("#home-world");

let nextPageBtn = document.querySelector("#next-page-btn");
let currentPageBtn = document.querySelector("#current-page-btn");
let pagenumber = document.querySelector("#page-number");
pagenumber.innerHTML = page + " of 8";
let animation = document.querySelector("#lds-ripple");


/////////////Hämta API/////////////////


async function myFetch(url) {
    let response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response.json();
    }
}
myFetch(url) 
.then(data => {
    characterData = data.results;
    worldData = data;  
})
.catch(e => {
    console.log("There is a problem! " + e.message);
});
async function getCharacter() {
   character = await myFetch(url);
   characterData = character.results;
   printCharName(characterData);
}
async function getHomeWorldInfo(urlWorld) {
    homeworldData = await myFetch(urlWorld);
    printHomeWorld(homeworldData);
}

getCharacter();


////////////Load into Page/////////////

function printCharName(characterData) {

    characterList.innerHTML = "";

    for (let i = 0; i < characterData.length; i++) {

            let btnTag = document.createElement("button");
            let charName = characterData[i].name;

            btnTag.innerHTML = charName;

            if (i % 2) {
                btnTag.classList.add("button-lighter");
                btnTag.classList.add("button-design");
            }
            else {
                btnTag.classList.add("button-design");
                btnTag.classList.add("button-darker");
            }
            

            btnTag.addEventListener('click', () => {

                let characterInfo = [];

                characterInfo[0] = characterData[i].gender;
                characterInfo[1] = characterData[i].height;
                characterInfo[2] = characterData[i].mass;
                characterInfo[3] = characterData[i].hair_color;
                characterInfo[4] = characterData[i].eye_color;
                characterInfo[5] = characterData[i].skin_color;
                
                sectionHomeWorld.innerHTML = "";
                let animationTag = getAnimation();
                animationTag.classList.add("loadbar2"); 
                sectionHomeWorld.appendChild(animationTag);

                getHomeWorldInfo(characterData[i].homeworld);
                printDetails(charName, characterInfo);
                activeButton(btnTag);
                
            });

            buttons.push(btnTag);
            characterList.appendChild(btnTag);
    }
}

function printDetails(charName, characterInfo) {
    sectionDetails.innerHTML = "";
    if (DetailsFilled === false) {
        
        let strArr = ["Name: ", "Gender: ", "Length: ", "Weight: ", "Hair color: ", "Eye color: ", "Skin color: "];
        let ulTag = document.createElement("ul");
        let h4Tag = document.createElement("h4");

        h4Tag.innerHTML = charName;
        for (let i = 1; i < characterInfo.length; i++) {
            let liTag = document.createElement("li");
            liTag.innerHTML = strArr[i] + characterInfo[i];
            ulTag.appendChild(liTag);
        }
        
        sectionDetails.appendChild(h4Tag);
        sectionDetails.appendChild(ulTag);
        DetailsFilled = true;
    }
    else {
        sectionDetails.innerHTML = "";
        DetailsFilled = false;
        printDetails(charName, characterInfo);
    }
}

function printHomeWorld(data) {

    sectionHomeWorld.innerHTML = "";

    let ulTag = document.createElement("ul");
    let h4Tag = document.createElement("h4");
    let arr = []
    arr[1] = "Rotation period: " + data.rotation_period;
    arr[2] = "Orbital period: " + data.orbital_period;
    arr[3] = "Diameter period: " + data.diameter;
    arr[4] = "Climate: " + data.climate;
    arr[5] = "Gravity: " + data.gravity;
    arr[0] = "Terrain: " + data.terrain;

    h4Tag.innerHTML = data.name;

    for (let i = 0; i < arr.length; i++) {
        let liTag = document.createElement("li");

        liTag.innerHTML = arr[i];
        ulTag.appendChild(liTag);
    }

    sectionHomeWorld.appendChild(h4Tag);
    sectionHomeWorld.appendChild(ulTag);
}

////////////////Page buttons functions///////////////

nextPageBtn.addEventListener('click', () => {
    if (page < 8) {
        page = page + 1;
        pagenumber.innerHTML = page + " of 8"
        url = "https://swapi.dev/api/people/?page=" + page;
        characterList.innerHTML = "";
        let animationTag = getAnimation();
        animationTag.classList.add("loadbar"); 
        characterList.appendChild(animationTag);
        getCharacter(characterData);
    } else {
        page = 8;
    }
});

currentPageBtn.addEventListener('click', () => {
    if (page > 1) {
        page = page - 1;
        pagenumber.innerHTML = page + " of 8"
        url = "https://swapi.dev/api/people/?page=" + page;
        characterList.innerHTML = "";
        let animationTag = getAnimation();
        animationTag.classList.add("loadbar"); 
        characterList.appendChild(animationTag);
        getCharacter(characterData);
    } else {
        page = 1;
    }
});

////////////////////Loading animation////////////////////

function getAnimation() {
    let divTag = document.createElement("div");
    divTag.classList.add("lds-hourglass"); 
    return divTag;
}

function activeButton(btnTag) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active-button");
        buttons[i].innerHTML = buttons[i].innerHTML.replace(" ►", "");
    }
    btnTag.classList.add("active-button");
    btnTag.innerHTML += " ►";
}




