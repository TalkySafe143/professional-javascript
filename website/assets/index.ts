import { MediaPlayer }  from 'mediaplayer-talkysafe';
import AutoPlay from 'mediaplayer-talkysafe/lib/src/plugins/autoPlay';
import Intersection from 'mediaplayer-talkysafe/lib/src/plugins/intersection';
import AdsPlugin from 'mediaplayer-talkysafe/lib/src/plugins/Ads/index'

const video : HTMLVideoElement = document.querySelector('video');
const playButton : HTMLButtonElement = document.querySelector('.play');
const muteButton : HTMLButtonElement = document.querySelector('.mute');

const playerConfig  = {
    el: video,
    plugins: [new AutoPlay(), new Intersection(), new AdsPlugin()]
}

const player = new MediaPlayer(playerConfig);
playButton.onclick = () => player.togglePlay();
muteButton.onclick = () => player.toggleMute();

if (!navigator.serviceWorker) alert('Tu navegador no soporta Service Worker!, no podrás usar la aplicacion sin conexion:(');
navigator.serviceWorker.register('/sw.js').catch(err => console.log(err.message));
