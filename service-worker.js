const CACHE_VERSION = "v2"; // Cambia esto en cada actualización
const STATIC_CACHE_NAME = `pwa-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `pwa-dynamic-${CACHE_VERSION}`;
const urlsToCache = [
  "/",
  "/index.html",
  "/src/styles/main.css",
  "/src/styles/home.css",
  "/src/styles/game.css",
  "/src/app.js",
];

// Evento 'install': añade los archivos al caché estático
self.addEventListener("install", (event) => {
  console.log("Service Worker installing and caching static assets.");
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  // Activar inmediatamente la nueva versión del Service Worker
  self.skipWaiting();
});

// Evento 'activate': limpia cachés antiguos
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating and cleaning old caches.");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (![STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME].includes(cacheName)) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  clients.claim();
});

// Evento 'fetch': Responde con caché primero para estáticos; Red primero para CSS
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes(".css")) {
    // Network first strategy for CSS files
    event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => caches.match(event.request));
      })
    );
  } else {
    // Cache first strategy for other static assets
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
    );
  }
});
