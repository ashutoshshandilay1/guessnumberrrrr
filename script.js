const inputEl = document.querySelector("input");
const guessEl = document.querySelector(".guess");
const checkBtnEl = document.querySelector("button");
const remainingChancesTextEl = document.querySelector(".chances");
const remainingChancesEl = document.querySelector(".chance");
const popupEl = document.querySelector(".popup");
const popupCodeEl = document.querySelector(".redeem-code");
const closePopupBtnEl = document.querySelector(".close-popup");
const copyCodeBtnEl = document.querySelector(".copy-code");

let randomNumber = (Math.floor(Math.random() * 10) + 1) * 10; // Generates 10, 20, ..., 100
let totalChances = 10;

const resetGame = () => {
  randomNumber = (Math.floor(Math.random() * 10) + 1) * 10; // Regenerate random number
  totalChances = 10;
  inputEl.disabled = false;
  inputEl.value = "";
  checkBtnEl.textContent = "Check";
  guessEl.textContent = "";
  guessEl.style.color = "black";
  remainingChancesTextEl.textContent = "You have only";
  remainingChancesEl.textContent = totalChances;
  popupEl.style.display = "none"; // Hide popup if visible
  console.log(randomNumber)
};

const showPopup = () => {
  popupEl.style.display = "flex"; // Use flex to center the popup
  popupCodeEl.textContent = "INR 30 Redeem Code: ASDF SDAF SFFD FDSF";
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(popupCodeEl.textContent).then(() => {
    alert("Redeem code copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy the redeem code.");
  });
};

checkBtnEl.addEventListener("click", () => {
  let inputValue = parseInt(inputEl.value); // Ensure input is treated as a number

  // Reset game if button says "Play Again"
  if (checkBtnEl.textContent === "Play Again...😉") {
    resetGame();
    return;
  }



  totalChances--;

  if (inputValue === randomNumber) {
    inputEl.disabled = true;
    guessEl.textContent = "Hurrah...! Congratulations😍, You won the game.";
    guessEl.style.color = "green";
    checkBtnEl.textContent = "Play Again...😉";
    showPopup(); // Show popup on win
  } else if (totalChances === 0) {
    inputEl.disabled = true;
    guessEl.textContent = "Oops...! Bad luck😥, You lost the game.";
    guessEl.style.color = "red";
    checkBtnEl.textContent = "Play Again...😉";
    remainingChancesTextEl.textContent = "No chances left";
  } else if (inputValue > randomNumber) {
    guessEl.textContent = "Your Guess is High👍.";
    guessEl.style.color = "#1446a0";
  } else if (inputValue < randomNumber) {
    guessEl.textContent = "Your Guess is Low👎.";
    guessEl.style.color = "#1446a0";
  }

  remainingChancesEl.textContent = totalChances;
});

closePopupBtnEl.addEventListener("click", () => {
  popupEl.style.display = "none"; // Hide popup on close
});

copyCodeBtnEl.addEventListener("click", copyToClipboard);
