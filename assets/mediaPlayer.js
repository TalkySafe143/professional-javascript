function MediaPlayer(config) {
    this.media = config.el;
    // En este espacio estamos añadiendo el || (or), para asignar un valor por defecto que va a ser una array vacía.
    this.plugins = config.plugins || [];

    this._initPlugins();
};

MediaPlayer.prototype._initPlugins = function(){
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media,
        get muted() {
            return this.media.muted;
        },
        set muted(value) {
            this.media.muted = value;
        }
    }

    this.plugins.forEach(plugin => {
        plugin.run(player);
    })
}

MediaPlayer.prototype.play = function(){
    this.media.play();
}

MediaPlayer.prototype.pause = function(){
    this.media.pause();
}

MediaPlayer.prototype.togglePlay = function(){
    this.media.paused ? this.play() : this.pause();
}

MediaPlayer.prototype.toggleMute = function(){
    this.media.muted = !this.media.muted;
}

export default MediaPlayer;