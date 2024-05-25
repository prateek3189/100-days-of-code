let productNameInput = document.getElementById("product-name");
let remainingCharsElement = document.getElementById("remaining-chars");

function updateRemainingChars(event) {
  let enteredText = event.target.value;
  let enteredTextLength = enteredText.length;
  let remainingChars = 60 - enteredTextLength;

  if (remainingChars < 10) {
    remainingCharsElement.style.color = "red";
  }
  remainingCharsElement.innerHTML = remainingChars;
}

productNameInput.addEventListener("input", updateRemainingChars);
