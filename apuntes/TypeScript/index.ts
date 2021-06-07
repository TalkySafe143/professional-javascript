interface Observer {
    update: (data: any) => void;
}

interface Subject {
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer: Observer) => void;
}

class BitcoinPrice implements Subject { // El keyword 'implements' en una clase verifica si la clase satisface con todas las propiedades y metodos que pueda contener dicha interfaz.

    constructor() {
        const el : HTMLInputElement = document.querySelector('#value');
        el.oninput = () => this.notify(el.value)
    }

    observers : Observer[] = [];
    subscribe (observer: Observer) {
        this.observers.push(observer)
    }

    unsubscribe (observer: Observer) {
        const index = this.observers.findIndex(obs => {
            return obs === observer;
        })
        this.observers.splice(index, 1);
    }

    notify(data: any){
        this.observers.forEach(obs => obs.update(data));
    }
}

class PriceDisplay implements Observer {
    private el: HTMLElement;

    constructor(){
        this.el = document.querySelector('#price')
    }

    update(data: any){
        this.el.innerText = data;
    }
}

const value = new BitcoinPrice();
const display = new PriceDisplay();

value.subscribe(display);

setTimeout(() => value.unsubscribe(display), 5000)