import MediaPlayer from './mediaPlayer.js';
import AutoPlay from './plugins/autoPlay.js';

const video = document.querySelector('video');
const playButton = document.querySelector('.play');
const muteButton = document.querySelector('.mute');

const player = new MediaPlayer({
    el: video,
    plugins: [new AutoPlay()]
});
playButton.onclick = () => player.togglePlay();
muteButton.onclick = () => player.toggleMute();
