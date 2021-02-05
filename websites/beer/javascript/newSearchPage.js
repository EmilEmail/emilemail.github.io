const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".input");
const closeUl = document.querySelector(".close");
const search = document.querySelector(".search");
const name = document.querySelector(".name");
const hops = document.querySelector(".hops");
const malt = document.querySelector(".malt");
const bb = document.querySelector(".bb");
const ba = document.querySelector(".ba");
const al = document.querySelector(".al");
const ag = document.querySelector(".ag");
const ulContainer = document.querySelector(".ul-container");
const ul = document.querySelector(".list");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const counter = document.querySelector(".counter");
const pages = document.querySelector(".pages");
const oldUrl = JSON.parse(sessionStorage.getItem("url"));
const oldCurrentPage = JSON.parse(sessionStorage.getItem("currentPage"));
let currentPage = 1;

if (oldUrl !== null) {
  Caching(oldUrl, oldCurrentPage);
}

closeUl.addEventListener("click", closeList);
search.addEventListener("click", searchEvent);

function getInput() {
  let url = `https://api.punkapi.com/v2/beers?page=1&per_page=10&`;

  if (name.value !== "") url += `beer_name=${name.value.trim()}&`;
  if (hops.value !== "") url += `hops=${hops.value.trim()}&`;
  if (malt.value !== "") url += `malt=${malt.value.trim()}&`;
  if (bb.value !== "") url += `brewed_before=${bb.value.trim()}&`;
  if (ba.value !== "") url += `brewed_after=${ba.value.trim()}&`;
  if (al.value !== "") url += `abv_lt=${al.value.trim()}&`;
  if (ag.value !== "") url += `abv_gt=${ag.value.trim()}&`;

  return url;
}

function getData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const beerNames = getBeerNames(data);
      sessionStorage.setItem("url", JSON.stringify(url));
      addItems(beerNames);
      listEvent(data);
    })
    .catch((err) => err.message);
}

function searchEvent(event) {
  event.preventDefault();
  const val = validation();
  if (!val) return;
  const url = getInput();
  calculateTotalPages(url);
  getData(url);
  changePages(url, currentPage);
}

function getBeerNames(data) {
  let beerNames = [];
  data.forEach((element) => {
    beerNames.push(element.name);
  });
  return beerNames;
}

function addItems(beerNames) {
  ul.innerHTML = "";
  for (let i = 0; i < beerNames.length; i++) {
    li = document.createElement("li");
    li.className = "li";
    li.textContent = beerNames[i];
    ul.appendChild(li);
  }
  ulContainer.style.display = "flex";
}

function changePages(url, currentPage) {
  counter.textContent = currentPage;

  let newUrl = url;
  left.addEventListener("click", () => {
    if (currentPage == 1) {
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    } else {
      currentPage -= 1;
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    }
  });

  right.addEventListener("click", () => {
    if (currentPage == pages.textContent) {
      currentPage = pages.textContent;
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    } else {
      currentPage += 1;
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    }
  });
}

function listEvent(data) {
  const items = document.querySelectorAll(".li");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.addEventListener("click", () => {
      data.forEach((element) => {
        if (element.name === item.textContent) {
          sessionStorage.setItem("object", JSON.stringify(element));
          window.open("info-page.html", "_self");
        }
      });
    });
  }
}

function Caching(oldUrl, oldCurrentPage) {
  if (oldCurrentPage === null) oldCurrentPage = 1;
  getData(oldUrl);
  changePages(oldUrl, oldCurrentPage);
  calculateTotalPages(oldUrl);
}

function closeList() {
  ulContainer.style.display = "none";
}

function validation() {
  let validationApproved = true;

  /*check if all inputs are empty*/
  let isEmpty = true;
  inputs.forEach((element) => {
    if (element.value !== "") isEmpty = false;
  });

  if (isEmpty === true) {
    alert("You have to fill in atleast one search method.");
    validationApproved = false;
    return validationApproved;
  }

  /*check brewed before value*/
  let regex = /^[0-9]{2}\-[0-9]{4}$/;
  if (bb.value !== "" && !regex.test(bb.value)) {
    alert("You must use the format MM-YYYY.");
    validationApproved = false;
    return validationApproved;
  }

  /*check brewed after value*/
  if (ba.value !== "" && !regex.test(ba.value)) {
    alert("You must use the format MM-YYYY.");
    validationApproved = false;
    return validationApproved;
  }

  /*check if brewed after is before brewed before*/
  if (bb.value !== "" && ba.value !== "") {
    if (bb.value <= ba.value) {
      alert("Brewed after cannot be after brewed before.");
      validationApproved = false;
      return validationApproved;
    }
  }
  /*check if ABV greater than is lesser ABV lesser than*/
  if (al.value !== "" && ag.value !== "") {
    if (parseInt(ag.value) >= parseInt(al.value)) {
      alert("ABV lesser than cannot be lesser then ABV greater than.");
      validationApproved = false;
      return validationApproved;
    }
  }

  /*check if ABV is between 0-100*/
  if (al.value !== "" && al.value <= 0) {
    alert("ABV must be between 0-100%.");
    validationApproved = false;
    return validationApproved;
  }

  /*check if ABV is between 0-100*/
  if (ag.value !== "" && ag.value >= 100) {
    alert("ABV must be between 0-100%.");
    validationApproved = false;
    return validationApproved;
  }

  return validationApproved;
}

/*Kanske inte det mest optimala sättet att räkna ut antalet sidor på... */
function calculateTotalPages(url) {
  let array = [];
  let counter = 1;
  while (counter < 100) {
    checkUrl = url.substring(0, 38) + counter + url.substring(39, url.length);
    fetch(checkUrl)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length !== 0) array.push(data);
        pages.textContent = array.length;
      })
      .catch((err) => err.message);
    counter++;
  }
}
