import { MediaPlayer, MediaPlayerConfig } from './mediaPlayer';
import AutoPlay from './plugins/autoPlay';
import Intersection from './plugins/intersection';

const video : HTMLVideoElement = document.querySelector('video');
const playButton : HTMLButtonElement = document.querySelector('.play');
const muteButton : HTMLButtonElement = document.querySelector('.mute');

const playerConfig : MediaPlayerConfig = {
    el: video,
    plugins: [new AutoPlay(), new Intersection()]
}

const player : MediaPlayer = new MediaPlayer(playerConfig);
playButton.onclick = () => player.togglePlay();
muteButton.onclick = () => player.toggleMute();

if (!navigator.serviceWorker) alert('Tu navegador no soporta Service Worker!, no podrás usar la aplicacion sin conexion:(');
navigator.serviceWorker.register('/sw.js').catch(err => console.log(err.message));
