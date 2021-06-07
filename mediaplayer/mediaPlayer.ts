interface MediaPlayerConfig {
    el: HTMLVideoElement;
    plugins?: Array<any>
}

class MediaPlayer {
    media : HTMLMediaElement;
    plugins: Array<any>;
    container: HTMLElement;

    constructor(config: MediaPlayerConfig) {
        this.media = config.el;
        // En este espacio estamos añadiendo el || (or), para asignar un valor por defecto que va a ser una array vacía.
        this.plugins = config.plugins || [];
        this.initPlayer();
        this.initPlugins();
    }

    initPlayer(){
        this.container = document.createElement('div');
        this.container.style.position = 'relative';
        this.media.parentNode.insertBefore(this.container, this.media);
        this.container.appendChild(this.media);
    }
    
    private initPlugins() {
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    togglePlay() {
        this.media.paused ? this.play() : this.pause();
    }
    toggleMute() {
        this.media.muted = !this.media.muted;
    }
};

export { MediaPlayer, MediaPlayerConfig };