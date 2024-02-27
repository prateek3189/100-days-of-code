// Open the player modal
function openPlayerConfig(event) {
  selectedPlayerId = +event.target.dataset["playerid"];
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";

  formElement[0].focus();
  if (players[selectedPlayerId - 1]["name"] !== "") {
    formElement[0].value = players[selectedPlayerId - 1]["name"];
  }
}

// Close the player modal
function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formErrorElement.style.display = "none";
  formErrorElement.innerHTML = "";
  formElement[0].value = "";
}

// Player Form Submit
function savePlayerForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playername").trim();

  if (!enteredPlayername) {
    formErrorElement.style.display = "block";
    formErrorElement.innerHTML = "Please enter a valid value";
    return;
  }
  formErrorElement.style.display = "none";
  formErrorElement.innerHTML = "";

  const updatedPlayerData = document.getElementById(
    "player-" + selectedPlayerId + "-data"
  );
  players[selectedPlayerId - 1]["name"] = enteredPlayername;
  updatedPlayerData.children[1].innerHTML = enteredPlayername;
  closePlayerConfig();
}
