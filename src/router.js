import { renderHome } from "./pages/home.js";
import { renderGame } from "./pages/game.js";

// Main routing function to handle page navigation
export function router() {
  console.log("Router executed"); // Verify router is being called
  const path = window.location.pathname;

  // Determine which page to render based on the current path
  if (path === "/" || path === "/home") {
    // Navigate to /home if on the root path or /home
    history.pushState(null, "", "/home"); // Update URL to /home without reloading
    renderHome();
  } else if (path === "/game") {
    // Navigate to the game view
    renderGame();
  } else {
    // Redirect unknown paths to /home
    history.pushState(null, "", "/home");
    renderHome();
  }
}

// Listen for 'popstate' event to handle browser navigation (back/forward)
window.addEventListener("popstate", router);
