import { router } from "./router.js";

// Run the router on initial load to manage application routes
document.addEventListener("DOMContentLoaded", () => {
  router();

  /** Service Worker Registration for PWA functionality */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }
});
