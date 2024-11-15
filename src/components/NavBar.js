import StorageService from "../services/storage";
import { router } from "../router";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Observe `playername` and `score` attributes for dynamic updates
  static get observedAttributes() {
    return ["playername", "score"];
  }

  // Set up initial rendering when the element is added to the DOM
  connectedCallback() {
    const username = this.getAttribute("playername") || "Player";
    const score = this.getAttribute("score") || 0;
    this.render(username, score);
  }

  // Re-render if observed attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "playername" || name === "score") {
      this.render(this.getAttribute("playername"), this.getAttribute("score"));
    }
  }

  // Render the NavBar component structure and styles
  render(username, score) {
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #333;
          color: #fff;
        }

        .username {
          font-size: 1.2em;
        }

        .buttons-container {
          display: flex;
          gap: 10px;
        }

        .button {
          padding: 8px 16px;
          font-size: 1em;
          background-color: #57ff94;
          color: #333;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button img {
          width: 12px;
        }

        .save-button:hover {
          background-color: #45d07f;
        }
      </style>

      <div class="navbar">
        <div class="username">👤 ${username}</div>
        <div class="buttons-container">
          <button class="button mute-button" id="muteButton">🔊</button>
          <button class="button save-button">
            <img src="/assets/img/exit.svg" alt="exit button" />
          </button>
        </div>
      </div>
    `;

    // Add event listeners for the mute and save buttons
    this.shadowRoot
      .querySelector(".mute-button")
      .addEventListener("click", () => {
        this.toggleMute();
      });

    this.shadowRoot
      .querySelector(".save-button")
      .addEventListener("click", () => {
        this.saveScore(username, score);
        this.exitGame();
      });
  }

  // Save player score to localStorage and navigate to the home page
  saveScore(username, score) {
    StorageService.savePlayerScore(username, score);
    window.history.pushState({}, "", "/home");
    router();
  }

  // Toggle mute state and dispatch a custom event for external handling
  toggleMute() {
    const muteButton = this.shadowRoot.querySelector("#muteButton");
    const isMuted = muteButton.classList.toggle("muted");

    // Update the button icon based on the mute state
    muteButton.textContent = isMuted ? "🔇" : "🔊";

    // Dispatch a custom event for mute toggle
    this.dispatchEvent(
      new CustomEvent("toggleMute", {
        detail: { isMuted },
        bubbles: true,
        composed: true,
      })
    );
  }

  // Dispatch a custom event to signal game exit
  exitGame() {
    this.dispatchEvent(
      new CustomEvent("exitGame", { bubbles: true, composed: true })
    );
  }
}

// Register the custom element
customElements.define("nav-bar", NavBar);
