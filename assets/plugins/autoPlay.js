function AutoPlay(){};

AutoPlay.prototype.run = function(player){ // Cuando estamos pidiendo player vamos a pedir la instancia del MediaPLayer, a la clase en general, por eso en la llamada a este metodo, en los parametros va a recibir 'this'
    player.mute();
    player.play();
}

export default AutoPlay;