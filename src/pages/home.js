import StorageService from "../services/storage.js";
import { router } from "../router.js";

// Main function to render the Home view
export function renderHome() {
  const app = document.getElementById("app");

  // Set up initial view styling
  app.classList.add("home-view");
  app.classList.remove("game-view");

  // Fetch existing player names and ranking data
  const existingUsernames = StorageService.getAllPlayerNames();
  const ranking = StorageService.getRanking();

  // Render primary HTML structure for the Home view
  app.innerHTML = `
    <form id="playerForm">
      <input type="text" id="playerName" placeholder="Enter your name" required autocomplete="off"/>
      <select id="existingPlayers">
        <option value="">Select an existing user</option>
        ${generateUserOptions(existingUsernames)}
      </select>
      <button type="submit">Play</button>
    </form>
    ${generateRankingSection(ranking)}
  `;

  // Select DOM elements
  const form = document.getElementById("playerForm");
  const playerNameInput = document.getElementById("playerName");
  const existingPlayersSelect = document.getElementById("existingPlayers");

  // Initialize event listeners for interaction handling
  attachEventListeners();

  /** Helper Functions */

  // Generates options for the existing users dropdown
  function generateUserOptions(usernames) {
    return usernames
      .map((username) => `<option value="${username}">${username}</option>`)
      .join("");
  }

  // Generates HTML structure for the ranking section, if ranking data exists
  function generateRankingSection(ranking) {
    if (ranking.length) {
      return `
        <section class="ranking">
          <h2>Ranking</h2>
          <div class="podium">
            ${generatePodiumBox("second", ranking[1], 2)}
            ${generatePodiumBox("first", ranking[0], 1)}
            ${generatePodiumBox("third", ranking[2], 3)}
          </div>
        </section>
      `;
    }
    return "";
  }

  // Generates HTML for each position box in the podium section
  function generatePodiumBox(positionClass, playerData, position) {
    return `
      <div class="podium-box ${positionClass}">
        <div class="podium-info">
          <p class="bold podium-name">${
            playerData ? playerData.username : ""
          }</p>
          <p class="podium-score">${
            playerData ? `${playerData.maxScore} points` : ""
          }</p>
        </div>
        <span class="position">${position}</span>
      </div>
    `;
  }

  // Saves the player name and initializes the game view
  function savePlayerAndStartGame(name) {
    StorageService.savePlayerName(name);
    StorageService.savePlayerScore(name, 0); // Start with score 0 if new
    window.history.pushState({}, "", "/game");
    router();
  }

  /** Event Handling Functions */

  function attachEventListeners() {
    // Update input field with selected username from dropdown
    existingPlayersSelect.addEventListener("change", () => {
      const selectedUsername = existingPlayersSelect.value;
      playerNameInput.value = selectedUsername;
    });

    // Clear the dropdown selection if the input field is modified
    playerNameInput.addEventListener("input", () => {
      if (existingPlayersSelect.value) {
        existingPlayersSelect.value = ""; // Reset select to default option
      }
    });

    // Form submission to start the game
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = playerNameInput.value;
      const playerData = StorageService.getPlayerData(name);

      if (playerData) {
        // If player exists, load their data and start the game
        StorageService.savePlayerName(name);
        window.history.pushState({}, "", "/game");
        router();
      } else {
        // If player is new, save their data and start the game
        savePlayerAndStartGame(name);
      }
    });
  }
}
