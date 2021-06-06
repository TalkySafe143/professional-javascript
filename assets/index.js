import MediaPlayer from './mediaPlayer.js';
import AutoPlay from './plugins/autoPlay.js';
import Intersection from './plugins/intersection.js';

const video = document.querySelector('video');
const playButton = document.querySelector('.play');
const muteButton = document.querySelector('.mute');

const player = new MediaPlayer({
    el: video,
    plugins: [new AutoPlay(), new Intersection()]
});
playButton.onclick = () => player.togglePlay();
muteButton.onclick = () => player.toggleMute();

if (!navigator.serviceWorker) alert('Tu navegador no soporta Service Worker!, no podrás usar la aplicacion sin conexion:(');
navigator.serviceWorker.register('/sw.js').catch(err => console.log(err.message));