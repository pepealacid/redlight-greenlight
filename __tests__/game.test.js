import { renderGame } from "../src/pages/game";
import StorageService from "../src/services/storage";
import { fireEvent } from "@testing-library/dom";

// Mock StorageService to isolate storage from affecting real data
jest.mock("../src/services/storage");

// Mock HTMLAudioElement methods globally
beforeAll(() => {
  Object.defineProperty(global, "Audio", {
    value: jest.fn().mockImplementation(() => ({
      play: jest.fn(),
      pause: jest.fn(),
    })),
  });
});

describe("Game functionality", () => {
  let app;

  beforeEach(() => {
    // Set up the DOM element to hold the game view
    document.body.innerHTML = `<div id="app"></div>`;
    app = document.getElementById("app");

    // Mock initial player data
    StorageService.getPlayerName.mockReturnValue("TestPlayer");
    StorageService.getPlayerData.mockReturnValue({ score: 0, maxScore: 0 });
    StorageService.savePlayerScore = jest.fn();

    // Render the game view
    renderGame();
  });

  afterEach(() => {
    // Clear all mocks after each test to reset data and calls
    jest.clearAllMocks();
  });

  // Test that the game view initializes with player name and score
  it("should initialize game view with player name and initial score", () => {
    const playerName = app.querySelector("nav-bar").getAttribute("playerName");
    const initialScore = app.querySelector("#scoreValue").textContent;

    expect(playerName).toBe("TestPlayer");
    expect(initialScore).toBe("0");
  });

  // Test that the score increases when buttons are clicked in sequence
  it("should increase score when buttons are clicked in sequence", () => {
    const leftButton = app.querySelector("#leftButton");
    const rightButton = app.querySelector("#rightButton");
    const scoreDisplay = app.querySelector("#scoreValue");

    fireEvent.click(leftButton);
    expect(scoreDisplay.textContent).toBe("1");

    fireEvent.click(rightButton);
    expect(scoreDisplay.textContent).toBe("2");
  });

  // Test that score decreases when the same button is clicked consecutively
  it("should decrease score when the same button is clicked consecutively", () => {
    const leftButton = app.querySelector("#leftButton");
    const scoreDisplay = app.querySelector("#scoreValue");

    fireEvent.click(leftButton); // increases score to 1
    fireEvent.click(leftButton); // decreases score back to 0

    expect(scoreDisplay.textContent).toBe("0");
  });

  // Test that score resets to 0 when light is red and a button is clicked
  it("should reset score when light is red and a button is clicked", () => {
    const leftButton = app.querySelector("#leftButton");
    const scoreDisplay = app.querySelector("#scoreValue");

    // Set light to red by setting isGreen to false
    renderGame.isGreen = false;
    fireEvent.click(leftButton); // attempt to increase score
    expect(scoreDisplay.textContent).toBe("0"); // confirm reset to 0
  });

  // Test that isMuted is set to true when toggleMute event is dispatched
  it("should set isMuted to true when toggleMute event is dispatched", () => {
    const navBar = app.querySelector("nav-bar");
    const muteEvent = new CustomEvent("toggleMute", {
      detail: { isMuted: true },
      bubbles: true,
      composed: true,
    });

    // Dispatch mute event
    fireEvent(navBar, muteEvent);

    // Verify that isMuted is set to true (assuming renderGame exposes isMuted)
    expect(renderGame.isMuted).toBe(true);
  });

  // Test that score is saved and cleanup runs when exitGame event is dispatched
  it("should save score and cleanup when exitGame event is dispatched", () => {
    const navBar = app.querySelector("nav-bar");
    const exitEvent = new Event("exitGame", {
      bubbles: true,
      composed: true,
    });

    // Dispatch exit event and verify score is saved and cleanup occurs
    fireEvent(navBar, exitEvent);
    expect(StorageService.savePlayerScore).toHaveBeenCalledWith(
      "TestPlayer",
      0
    );
  });
});
