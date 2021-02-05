const input = document.querySelector(".input");
const ulContainer = document.querySelector(".ul-container");
const ul = document.querySelector(".list");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const counter = document.querySelector(".counter");
const select = document.querySelector("select");
let currentPage = 1;
const oldBeerNames = JSON.parse(sessionStorage.getItem("beerNames"));
const beerData = JSON.parse(sessionStorage.getItem("beerData"));

if (oldBeerNames !== null && beerData !== null) {
  changeCurrentPage(oldBeerNames, beerData);
  addItems(oldBeerNames, currentPage);
  listEvent(beerData);
}

document.querySelector(".close").addEventListener("click", closeList);
document.querySelector(".search").addEventListener("click", (e) => {
  let filteredInput = input.value.trim().replace(" ", "_");
  e.preventDefault();

  if (select.value === "abv-lesser" && isNaN(filteredInput)) {
    alert("To search on ABV you must use number.");
    return;
  } else if (select.value === "abv-greater" && isNaN(filteredInput)) {
    alert("To search on ABV you must use number.");
    return;
  } else if (select.value === "abv-lesser" && filteredInput < 0) {
    alert("Beers can only have an ABV between 0-100%");
    return;
  } else if (select.value === "abv-greater" && filteredInput > 100) {
    alert("Beers can only have an ABV between 0-100%");
    return;
  }

  if (filteredInput !== "") {
    getData(filteredInput)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length === 0) {
          alert("couldnt find your beer.");
        } else {
          let beerNames = getBeerNames(data);
          changeCurrentPage(beerNames, data);
          addItems(beerNames, currentPage);
          listEvent(data);
          input.value = "";
        }
      })
      .catch((err) => err.message);
  } else {
    alert("Input field is empty.");
  }
});

function getData(input) {
  switch (select.value) {
    case "name":
      return fetch(`https://api.punkapi.com/v2/beers?beer_name=${input}`);
    case "hops":
      return fetch(`https://api.punkapi.com/v2/beers?hops=${input}`);
    case "malt":
      return fetch(`https://api.punkapi.com/v2/beers?malt=${input}`);
    case "brewed-before":
      return fetch(`https://api.punkapi.com/v2/beers?brewed_before=${input}`);
    case "brewed-after":
      return fetch(`https://api.punkapi.com/v2/beers?brewed_after=${input}`);
    case "abv-greater":
      return fetch(`https://api.punkapi.com/v2/beers?abv_gt=${input}`);
    case "abv-lesser":
      return fetch(`https://api.punkapi.com/v2/beers?abv_lt=${input}`);
    default:
      alert("Please select a search method");
  }
}

function getBeerNames(data) {
  let beerNames = [];
  data.forEach((element) => {
    beerNames.push(element.name);
  });
  sessionStorage.setItem("beerNames", JSON.stringify(beerNames));
  sessionStorage.setItem("beerData", JSON.stringify(data));
  return beerNames;
}

function changeCurrentPage(beerNames, data) {
  let numberOfPages = Math.ceil(beerNames.length / 10);

  if (numberOfPages === 0) {
    numberOfPages = 1;
  }

  document.querySelector(".pages").textContent = numberOfPages;

  left.addEventListener("click", () => {
    if (currentPage === 1) {
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
    } else {
      currentPage -= 1;
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
      listEvent(data);
    }
  });

  right.addEventListener("click", () => {
    if (currentPage === numberOfPages) {
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
    } else {
      currentPage += 1;
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
      listEvent(data);
    }
  });
}

function addItems(beerNames, currentPage) {
  ul.innerHTML = "";
  if (currentPage === 1) {
    for (let i = 0; i < 10; i++) {
      li = document.createElement("li");
      li.className = "li";
      li.textContent = beerNames[i];
      ul.appendChild(li);
    }
  } else {
    const number = Math.round(currentPage) * 10 - 10;
    for (let i = number; i < number + 10; i++) {
      li = document.createElement("li");
      li.className = "li";
      li.textContent = beerNames[i];
      ul.appendChild(li);
    }
  }
  ulContainer.style.display = "flex";
}

function listEvent(data) {
  const items = document.querySelectorAll(".li");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.addEventListener("click", (e) => {
      data.forEach((element) => {
        if (element.name === item.textContent) {
          sessionStorage.removeItem("object");
          sessionStorage.setItem("object", JSON.stringify(element));
          window.open("info-page.html", "_self");
        }
      });
    });
  }
}

function closeList(e) {
  e.preventDefault();
  ulContainer.style.display = "none";
  ul.innerHTML = "";
}
