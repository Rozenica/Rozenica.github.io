const CACHE_NAME = 'rozenica-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './index.js',
  './index.icon.png',
  './index.apple-touch-icon.png',
  './index.png',
  './index.pck',
  './index.wasm',
  './manifest.json'
  // Add other assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
