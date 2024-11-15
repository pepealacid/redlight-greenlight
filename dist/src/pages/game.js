import StorageService from "../services/storage";
import "../components/NavBar";
import "../components/PersonIcon";

// Main function to render the Game view
export function renderGame() {
  const app = document.getElementById("app");

  // Set initial flags for game state
  renderGame.isGreen = false;
  renderGame.isMuted = false;

  // Set initial view styling
  app.classList.add("game-view");
  app.classList.remove("home-view");

  // Initial game state
  const playerName = StorageService.getPlayerName();
  const playerData = StorageService.getPlayerData(playerName) || {
    score: 0,
    maxScore: 0,
  };
  let counter = Number(playerData.score);
  let lastButton = null;
  let currentTimeout;
  const greenLightAudio = new Audio("../../assets/audio/song.mp3");
  greenLightAudio.loop = true;

  // Render main HTML structure for the Game view
  app.innerHTML = `
    <nav-bar playerName="${playerName}" score="${counter}"></nav-bar>
    <div class="max">Max Score: <span id="maxScoreValue">${playerData.maxScore}</span></div>
    <div id="person-container"></div> 
    <div class="controls">
      <button id="leftButton">Left</button>
      <button id="rightButton">Right</button>
    </div>
    <div class="score-container">Score: <span id="scoreValue">${counter}</span></div>
  `;

  // DOM element selection
  const scoreDisplay = document.getElementById("scoreValue");
  const maxScoreDisplay = document.getElementById("maxScoreValue");
  const personContainer = document.getElementById("person-container");
  const scoreContainer = document.querySelector(".score-container");
  const navBar = document.querySelector("nav-bar");

  // Initialize the game setup
  initializeGame();

  /** Main Functions */

  // Game setup and event attachment
  function initializeGame() {
    setCounterDisplay(counter);
    setMaxScoreDisplay(playerData.maxScore);
    toggleTrafficLight();
    attachEventListeners();
  }

  // Clean up audio, timers, and events when exiting the game view
  function cleanup() {
    StorageService.savePlayerScore(playerName, counter);
    greenLightAudio.pause();
    greenLightAudio.currentTime = 0;
    clearTimeout(currentTimeout);
    window.removeEventListener("popstate", cleanup);
    navBar.removeEventListener("exitGame", cleanup);
  }

  // Toggle between red and green light states
  function toggleTrafficLight() {
    clearTimeout(currentTimeout);
    if (renderGame.isGreen) {
      switchToRedLight();
    } else {
      switchToGreenLight();
    }
  }

  // Switch to red light state
  function switchToRedLight() {
    greenLightAudio.pause();
    renderGame.isGreen = false;
    updatePersonIcon(false); // Face front
    currentTimeout = setTimeout(toggleTrafficLight, 3000);
  }

  // Switch to green light state
  function switchToGreenLight() {
    if (!renderGame.isMuted) greenLightAudio.play();
    renderGame.isGreen = true;
    updatePersonIcon(true); // Face back
    const greenDuration = calculateGreenLightDuration(counter);
    currentTimeout = setTimeout(toggleTrafficLight, greenDuration);
  }

  /** Helper Functions */

  // Calculate green light duration based on score
  function calculateGreenLightDuration(score) {
    const baseDuration = Math.max(10000 - score * 100, 2000);
    const randomOffset = Math.floor(Math.random() * 3000) - 1500;
    return baseDuration + randomOffset;
  }

  // Update person icon orientation based on light state
  function updatePersonIcon(isGreenValue) {
    personContainer.innerHTML = "";
    const newPersonIcon = document.createElement("person-icon");
    newPersonIcon.setAttribute("isgreen", isGreenValue.toString());
    personContainer.appendChild(newPersonIcon);
  }

  // Display updated counter value
  function setCounterDisplay(value) {
    navBar.setAttribute("score", value);
    scoreDisplay.textContent = value;
  }

  // Display updated maximum score
  function setMaxScoreDisplay(value) {
    maxScoreDisplay.textContent = value;
  }

  // Reset the counter and indicate score loss
  function resetCounter() {
    counter = 0;
    scoreDisplay.textContent = counter;
    scoreContainer.classList.add("red-background", "counter-animate");
    lastButton = null;
    StorageService.savePlayerScore(playerName, counter);
    setTimeout(() => {
      scoreContainer.classList.remove("red-background", "counter-animate");
    }, 4000);
  }

  // Check if the current score exceeds the maximum score and update it
  function checkAndUpdateMaxScore() {
    if (counter > playerData.maxScore) {
      playerData.maxScore = counter;
      setMaxScoreDisplay(counter);
      StorageService.savePlayerScore(playerName, counter);
    }
  }

  /** Event Handling Functions */

  // Handle left/right button clicks and adjust score accordingly
  function handleButtonClick(button) {
    if (!renderGame.isGreen) {
      resetCounter();
    } else {
      if (lastButton !== button) {
        counter++;
        lastButton = button;
      } else if (counter > 0) {
        counter--;
      }
      setCounterDisplay(counter);
      checkAndUpdateMaxScore();
    }
  }

  // Attach all event listeners for game controls and UI interactions
  function attachEventListeners() {
    document
      .getElementById("leftButton")
      .addEventListener("click", () => handleButtonClick("left"));
    document
      .getElementById("rightButton")
      .addEventListener("click", () => handleButtonClick("right"));

    navBar.addEventListener("toggleMute", (event) => {
      renderGame.isMuted = event.detail.isMuted;
      if (renderGame.isMuted) {
        greenLightAudio.pause();
      } else if (renderGame.isGreen) {
        greenLightAudio.play();
      }
    });

    window.addEventListener("popstate", cleanup);
    navBar.addEventListener("exitGame", cleanup);
  }
}
