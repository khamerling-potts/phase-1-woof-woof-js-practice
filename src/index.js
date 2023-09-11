//initial fetch to load dog bar
fetchAllDogs();

function fetchAllDogs() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((data) => data.forEach(addDog));
}

function fetchGoodDogs() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((dog) => {
        if (dog.isGoodDog === true) {
          addDog(dog);
        }
      })
    );
}

function addDog(dog) {
  const span = document.createElement("span");
  span.innerText = dog.name;
  document.getElementById("dog-bar").appendChild(span);
  span.addEventListener("click", function () {
    const image = document.createElement("img");
    image.src = dog.image;
    const name = document.createElement("h2");
    name.innerText = dog.name;
    const button = document.createElement("button");
    button.innerText = dog.isGoodDog ? "Good dog!" : "Bad dog!";
    button.id = dog.id;
    document.getElementById("dog-info").innerHTML = "";
    document.getElementById("dog-info").append(image, name, button);
    button.addEventListener("click", toogleGoodness);
  });
}

function toogleGoodness(event) {
  const dogID = event.target.id;
  let goodness;
  switch (event.target.innerText) {
    case "Good dog!":
      goodness = false;
      event.target.innerText = "Bad dog!";
      break;
    case "Bad dog!":
      goodness = true;
      event.target.innerText = "Good dog!";
      break;
  }
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      isGoodDog: goodness,
    }),
  };
  fetch(`http://localhost:3000/pups/${dogID}`, configObj)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

document
  .getElementById("good-dog-filter")
  .addEventListener("click", toggleFilter);

function toggleFilter(event) {
  //clear dog bar
  document.getElementById("dog-bar").innerHTML = "";
  //change toggle button text and redo dog bar accordingly
  if (event.target.innerText.includes("OFF")) {
    event.target.innerText = event.target.innerText.replace("OFF", "ON");
    fetchGoodDogs();
  } else {
    event.target.innerText = event.target.innerText.replace("ON", "OFF");
    fetchAllDogs();
  }
}
