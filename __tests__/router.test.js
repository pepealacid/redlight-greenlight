import { router } from "../public/src/router";
import * as home from "../public/src/pages/home";
import * as game from "../public/src/pages/game";

// Mock the page rendering functions to track their calls
jest.mock("../public/src/pages/home");
jest.mock("../public/src/pages/game");

describe("Router", () => {
  // Test that the router renders the Home view on the root path ('/')
  it("renders Home on '/' path", () => {
    window.history.pushState({}, "", "/");
    router();
    expect(home.renderHome).toHaveBeenCalled();
  });

  // Test that the router renders the Game view when the path is '/game'
  it("renders Game on '/game' path", () => {
    window.history.pushState({}, "", "/game");
    router();
    expect(game.renderGame).toHaveBeenCalled();
  });

  // Test that the router redirects to '/home' if the path is unknown
  it("redirects unknown paths to '/home'", () => {
    window.history.pushState({}, "", "/unknown");
    router();
    expect(home.renderHome).toHaveBeenCalled();
  });

  // Test that when redirected to '/home', the URL is updated without a page reload
  it("updates the URL to '/home' without reloading on unknown paths", () => {
    window.history.pushState({}, "", "/unknown");
    router();

    // Verify the URL was updated to '/home'
    expect(window.location.pathname).toBe("/home");
    // Check that renderHome was called, confirming the redirection
    expect(home.renderHome).toHaveBeenCalled();
  });
});
