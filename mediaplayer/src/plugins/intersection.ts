import { MediaPlayer } from "../../mediaPlayer";

export default class Intersection {
    private observer : IntersectionObserver;
    private config : IntersectionObserverInit;
    constructor(){
        this.observer;
        this.config = {
            threshold: 0.25
        };
    }

    public run(player: MediaPlayer) {
        document.onvisibilitychange = () => {
            document.visibilityState === 'hidden' ? (
                player.pause(),
                document.title = '¡Video pausado!'
            ) : (
                player.play(),
                document.title = 'PlatziMediaPlayer'
            );
        };

        this.observer = new IntersectionObserver(entries => {
            const entry : IntersectionObserverEntry = entries[0];
            entry.isIntersecting ? (
                console.log('Intersecting is true'),
                player.play()
            ) : (
                console.log('Intesecting is false'),
                player.pause()
            );
        }, this.config);

        this.observer.observe(player.media);
    }
};
