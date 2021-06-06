const cacheName = 'Version 1';
const filesToCach = [
    '/',
    '/index.html',
    '/assets/index.js',
    '/assets/mediaPlayer.js',
    '/assets/Naturaleza.mp4',
    '/assets/index.css',
    '/assets/plugins/autoPlay.js',
    '/assets/plugins/intersection.js'
];

const openCache = async () => {
    const cache = await caches.open(cacheName);
    cache.addAll(filesToCach);
    console.log('Sitio cacheado (arr function)');
}

const respondCache = async e => {
    const match = await caches.match(e.request);
    return match || fetch(e.request) // Esta es otra forma de validar si match es undefined, si es un defined se va a retornar el valor que esta al otro lado del || (or)
}

const updateCache = async e => {
    const cache = await caches.open(cacheName);
    const response = await fetch(e.request);
    return cache.put(e.request, response)
}


self.addEventListener('install', e => {
    e.waitUntil(openCache())
    console.log('Se ha instalado el Service Worker!');
});

self.addEventListener('activate', () => {
    caches.keys().then(key => {
        return Promise.all(
            key.map(cache => {
                if (cache !== cacheName) {
                    caches.delete(cache)
                        .then(() => console.log('Cache ajena eliminada'))
                        .catch(err => console.log(err.message));
                }
            })
        )
    })
    console.log('Esta activado el Service Worker!')
});


self.addEventListener('fetch', e => {
    e.waitUntil(updateCache(e))
    e.respondWith(respondCache(e))
    console.log('He recibido una peticion!!')
    console.log(e)
})