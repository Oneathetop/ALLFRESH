const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/main.js',
    '/manifest.json'
];

// Install event
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Caching files');
            cache.addAll(CACHE_ASSETS);
        })
        .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
