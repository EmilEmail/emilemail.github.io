let url = "https://api.punkapi.com/v2/beers/random";
let randomButton = document.querySelector("#randomButton");
let ID = 0;
let beer;

/* Get one beer */

async function myFetch2(url) {
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return response.json();
  }
}
//
myFetch2(url)
  .then((data) => {
    beer = data[0];
    printBeerCard(beer);
  })
  .catch((e) => {
    console.log("There is a problem! " + e.message);
  });

function printBeerCard(beer) {
  let cardWrapper = document.querySelector("#card-wrapper");
  cardWrapper.innerHTML = "";
  let divTag = document.createElement("div");
  let h3Tag = document.createElement("h3");
  let imgTag = document.createElement("img");
  let pTag = document.createElement("p");
  let pTag2 = document.createElement("p");

  pTag.classList.add("p1");
  pTag2.classList.add("p2");
  divTag.classList.add("card");
  imgTag.src = beer.image_url;
  h3Tag.textContent = beer.name;
  pTag.textContent = beer.description;
  pTag2.textContent = "see more";

  divTag.addEventListener("click", () => {
    sessionStorage.removeItem("object");
    sessionStorage.setItem("object", JSON.stringify(beer));
    window.open("info-page.html", "_self");
  });

  divTag.appendChild(imgTag);
  divTag.appendChild(h3Tag);
  divTag.appendChild(pTag);
  divTag.appendChild(pTag2);
  cardWrapper.appendChild(divTag);
}

randomButton.addEventListener("click", () => {
  async function addRandomBeer(url) {
    let newBeer = await myFetch2(url);
    printBeerCard(newBeer[0]);
  }
  addRandomBeer(url);
});
