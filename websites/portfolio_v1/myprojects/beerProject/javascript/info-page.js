const img = document.querySelector(".img");
const name = document.querySelector(".name");
const desc = document.querySelector(".description");
const abv = document.querySelector(".abv");
const volume = document.querySelector(".volume");
const ingredients = document.querySelector(".ingredients");
const hops = document.querySelector(".hops");
const foodPairing = document.querySelector(".food-pairing");
const brewersTips = document.querySelector(".brewers-tips");
const foodPairingUl = document.querySelector(".food-pairing-ul");
const ingredientsUl = document.querySelector(".ingredients-ul");
const hopsUl = document.querySelector(".hops-ul");

const obj = JSON.parse(sessionStorage.getItem("object"));

addInfo(obj);

function addInfo(obj) {
  img.src = obj.image_url;
  name.textContent = obj.name;
  desc.textContent = obj.description;
  abv.innerHTML = "Alcohol by volume: " + "&nbsp;" + obj.abv + "%";
  volume.innerHTML =
    "Volume:" + "&nbsp;" + obj.volume.value + "&nbsp;" + obj.volume.unit;

  obj.ingredients.hops.forEach((element) => {
    const li = document.createElement("li");
    li.className = "info-li";
    li.textContent = element.name;
    hopsUl.appendChild(li);
  });

  for (const property in obj.ingredients) {
    const li = document.createElement("li");
    li.className = "info-li";
    li.textContent = property;
    ingredientsUl.appendChild(li);
  }

  obj.food_pairing.forEach((element) => {
    const li = document.createElement("li");
    li.className = "info-li";
    li.textContent = element;
    foodPairingUl.appendChild(li);
  });

  brewersTips.innerHTML = "Brewers tips:" + "&nbsp;" + obj.brewers_tips;
}
