const inputEl = document.querySelector("input");
const guessEl = document.querySelector(".guess");
const checkBtnEl = document.querySelector("button");
const remainingChancesTextEl = document.querySelector(".chances");
const remainingChancesEl = document.querySelector(".chance");
const popupEl = document.querySelector(".popup");
const popupCodeEl = document.querySelector(".redeem-code");
const closePopupBtnEl = document.querySelector(".close-popup");
const copyCodeBtnEl = document.querySelector(".copy-code");
const countdownEl = document.querySelector("h1"); // Countdown timer display

let randomNumber = Math.floor(Math.random() * 100) + 1; // Generates 1, 2, ..., 100
let totalChances = 10;

// Function to check if 24 hours have passed since the last play
const canPlay = () => {
  const lastPlayTimestamp = localStorage.getItem("lastPlayTimestamp");
  if (!lastPlayTimestamp) return true; // No record, allow play

  const lastPlayDate = new Date(parseInt(lastPlayTimestamp, 10));
  const now = new Date();

  // Check if 24 hours (86400000 ms) have passed
  return now - lastPlayDate >= 86400000;
};

// Save the current timestamp as the last play time
const recordPlayTime = () => {
  const now = new Date().getTime();
  localStorage.setItem("lastPlayTimestamp", now.toString());
};

// Function to start the countdown
const startCountdown = () => {
  const lastPlayTimestamp = localStorage.getItem("lastPlayTimestamp");
  if (!lastPlayTimestamp) return;

  const lastPlayDate = new Date(parseInt(lastPlayTimestamp, 10));
  const now = new Date();
  const remainingTime = 86400000 - (now - lastPlayDate);

  const updateCountdown = () => {
    const now = new Date();
    const remainingTime = 86400000 - (now - lastPlayDate);

    if (remainingTime <= 0) {
      countdownEl.textContent = "You can play now!";
      clearInterval(countdownInterval);
      inputEl.disabled = false;
      checkBtnEl.disabled = false;
      guessEl.textContent = "";
      guessEl.style.color = "black";
      remainingChancesTextEl.textContent = "You have only";
      remainingChancesEl.textContent = totalChances;
    } else {
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      countdownEl.textContent = `You can play again in ${hours}h ${minutes}m ${seconds}s`;
    }
  };

  // Update countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Run immediately to set initial time
};

// Restrict the game if the user cannot play
if (!canPlay()) {
  inputEl.disabled = true;
  checkBtnEl.disabled = true;
  guessEl.textContent = "You can only play once every 24 hours.";
  guessEl.style.color = "red";
  remainingChancesTextEl.textContent = "";
  remainingChancesEl.textContent = "";
  popupEl.style.display = "none";
  startCountdown(); // Start the countdown if the game is restricted
} else {
  checkBtnEl.addEventListener("click", () => {
    let inputValue = parseInt(inputEl.value); // Ensure input is treated as a number

    totalChances--;
    randomNumber = Math.floor(Math.random() * 100) + 1; // Regenerate random number on every click

    if (inputValue === randomNumber) {
      inputEl.disabled = true;
      guessEl.textContent = "Hurrah...! Congratulations😍, You won the game.";
      guessEl.style.color = "green";
      checkBtnEl.textContent = "Play Again...😉";
      showPopup(); // Show popup on win
      recordPlayTime(); // Record the play time
      startCountdown(); // Start countdown after recording

      // Refresh page after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (totalChances === 0) {
      inputEl.disabled = true;
      guessEl.textContent = "Oops...! Bad luck😥, You lost the game.";
      guessEl.style.color = "red";
      checkBtnEl.textContent = "Play Again...😉";
      remainingChancesTextEl.textContent = "No chances left";
      recordPlayTime(); // Record the play time
      startCountdown(); // Start countdown after recording

      // Refresh page after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else if (inputValue > randomNumber) {
      guessEl.textContent = "Your Guess is High👍.";
      guessEl.style.color = "#1446a0";
    } else if (inputValue < randomNumber) {
      guessEl.textContent = "Your Guess is Low👎.";
      guessEl.style.color = "#1446a0";
    }

    remainingChancesEl.textContent = totalChances;
  });
}

const resetGame = () => {
  randomNumber = Math.floor(Math.random() * 100) + 1; // Regenerate random number
  totalChances = 10;
  inputEl.disabled = false;
  inputEl.value = "";
  checkBtnEl.textContent = "Check";
  guessEl.textContent = "";
  guessEl.style.color = "black";
  remainingChancesTextEl.textContent = "You have only";
  remainingChancesEl.textContent = totalChances;
  popupEl.style.display = "none"; // Hide popup if visible
  console.log(randomNumber);
};

const showPopup = () => {
  popupEl.style.display = "flex"; // Use flex to center the popup
  popupCodeEl.textContent = "INR 10 Redeem Code: 0AF2 21DG YZJN NKUJ";
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(popupCodeEl.textContent).then(() => {
    alert("Redeem code copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy the redeem code.");
  });
};

closePopupBtnEl.addEventListener("click", () => {
  popupEl.style.display = "none"; // Hide popup on close
});

copyCodeBtnEl.addEventListener("click", copyToClipboard);
