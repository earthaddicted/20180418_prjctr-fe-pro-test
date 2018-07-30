var CACHE = 'cache-and-update';
 


self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});
 
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/star-wars-logo.jpg',
        '/gallery/bountyHunters.jpg',
        '/gallery/snowTroopers.jpg',
        '/gallery/myLittleVader.jpg'
    ]);
  });
}
 
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
 
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}



self.addEventListener('activate', function(event) {
  console.log('[activate] Activating ServiceWorker!');
  console.log('[activate] Claiming this ServiceWorker!');
  event.waitUntil(self.clients.claim());
});