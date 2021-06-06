export default function Intersection(){
    this.observer;
    this.config = {
        threshold: 0.25
    };
};

Intersection.prototype.run = function(player) {
    document.onvisibilitychange =  () => {
        document.visibilityState === 'hidden' ?(
            player.pause(),
            document.title = '¡Video pausado!'
        ) : (
            player.play(),
            document.title = 'PlatziMediaPlayer'
        );
    };

    this.observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        entry.isIntersecting ? (
            console.log('Intersecting is true'),
            player.play()
        ) : (
            console.log('Intersecting is false'),
            player.pause()
        );
    }, this.config);

    this.observer.observe(player.media);
}
