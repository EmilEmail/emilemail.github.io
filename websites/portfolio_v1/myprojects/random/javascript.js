let url = "https://randomuser.me/api/?results=5";
let userAmount = 5;


///////////////////Hämta all data///////////////////////

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
        userData = data.results[0];
        console.log(userData);
        printPersons()
    })
    .catch(e => {
    console.log("There is a problem! " + e.message);
    });

//////////////Declarations//////////////

let userData;
let name = "";

let profilePictureTag = document.querySelector("#profile-pic");

let contactListTag = document.querySelector("#contact-list");

let genderTag = document.querySelector("#gender");
let countryTag = document.querySelector("#country");
let cityTag = document.querySelector("#city");

 
//////////////Functions/////////////// 

function getName() {
    for (let i = 0; i < userAmount; i++){
        h2Tag = document.querySelector("h2");
        h2Tag[i];
    }
    h2Tag.innerHTML = userData.name.first + " " + userData.name.last;
}

function getPicture() {
    profilePictureTag.src = userData.picture.thumbnail;
}

function getContactData() {
    let liTag = document.createElement("li");
    liTag.innerHTML = "E-mail: " + userData.email;
    contactListTag.appendChild(liTag);

    liTag = document.createElement("li");
    liTag.innerHTML = "Telefon: " + userData.phone;
    contactListTag.appendChild(liTag);
}

function getUserInfo() {
    genderTag.innerHTML = userData.gender;
    countryTag.innerHTML = userData.location.country;
    cityTag.innerHTML = userData.location.city;
}

function createProfile() {
    let profileWrapperTag = document.querySelector("#profile-wrapper");
    let sectionTag = document.createElement("section", []);
    let h2Tag = document.createElement("h2");
    let imgTag = document.createElement("img");
    let ulTag = document.createElement("ul");
    let tableTag = document.createElement("table");

/////////// wrapper///////////

    profileWrapperTag.appendChild(sectionTag);
    sectionTag.className = "profile";

    sectionTag.appendChild(imgTag);
    sectionTag.appendChild(h2Tag);
    sectionTag.appendChild(ulTag);
    sectionTag.appendChild(tableTag);

    for (let i = 0; i < 3; i++) {
        let trTag = document.createElement("tr");
        let thTag = document.createElement("th");
        let tdTag = document.createElement("td");
        tableTag.appendChild(trTag);
        trTag.appendChild(thTag);
        trTag.appendChild(tdTag);
    }

    let tableRow = document.querySelectorAll("tr");
    tableRow[0].className = "gender";
    tableRow[1].className = "country";
    tableRow[2].className = "city";
}

function printPersons() {
    for (let i = 0; i < userAmount; i++) {
        createProfile();
        getName();

    }
}
