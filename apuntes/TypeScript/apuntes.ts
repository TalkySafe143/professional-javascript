//------------------------------------------------------------------ TYPESCRIPT --------------------------------------------------------------------------------
// En este archivo va a estar todo lo relacionado con el lenguaje TypeScript. Este es un lenguaje creado y mantenido por TypeScript, este es un superset de JavaScript. Live Server no es capaz de transcribir TypeScript a JavaScript, por lo tanto hay que usar un paquete llamado parcel-bundler.
// Vamos a hacer la instalacion con npm para el desarrollo. npm i -D parcel-bundler. Este paquete viene con un comando para reemplazar a live server o a cualquier otro que hayamos estado usando para el servidor.
// El comando para que parcel funcione tiene que tener los HTML que queremos que transpile de TypeScript. Es decir: 'parcel index.html apuntes/**/*.html'. La ultima parte del comando indica todos los archivos HTML que existan en la carpeta 'apuntes'.
// Un abrebocas de TS es este!
const suma = (a: number, b: number) => a + b; // Como podemos ver le podemos dar tipado a los parametros de la funciones para especificar que es un numero!

//----------------------- Tipos Basicos ----------------------------------

let muted : boolean = true; // Asi declaramos una variable especificando que es un tipo booleano. Si se trata de redefinir con algún otro tipo de dato, este va a dar un error.

let numerador : number = 42; // Asi declaramos una variable especificando que es un tipo numero.

let cadena : string = 'Sebastian' // Asi declaramos una variable especificando que es un tipo string.

let people : string[] = ['Juan', 'Pablo']; // En el tema de los arreglos podemos especificar si un arreglo tiene que ser de un tipo en especifico, solo hay que acompañarlo de los corchetes caracteristicos de las arrays
let peopleAndNumbers : Array< string | number > = ['Ricardo', 3] // Si queremos que un arreglo tenga mas de un tipo en su interior tenemos que seguir esta sintaxis: Array< TYPE | TYPE | ... >, dentro de estos '<>' vamos a escribir los tipos de datos que queremos que tenga la array concatenados con el PIPE operator '|', este operador es el significado de 'or'.

// Los enun son tipos de datos que estan delimitados, es decir, es como si crearamos un tipo de dato y este solo tenga las opciones que le indiquemos en un objeto. Tiene algunas particularidades
enum Color { // Vamos a escribir el keyword 'enum' seguido de su nombre, en este caso 'Color'.
    Rojo = 'Rojo', // A cada uno de los valores le podemos asignar un string o cualquier tipo de numero
    Azul = 'Azul', // Pero si no se le asigna nada a los valores, estos van a enumerarse como un index (0, 1, 2, 3...)
    Verde = 'Verde' // El tipo de dato enum es como un objeto, sin embargo este lleva el operdor de asignacion '=' no lleva los dos puntos (:).
};
let colorFavorito: Color = Color.Azul; // Podemos asignarle a una variable nuestro tipo de dato enum, como si hubieramos creado un tipo de dato. A partir de esto, esa variable solamente va a tener la posibilidad de tomar los valores que posee el tipo de dato 'Color', los datos son como propiedades asi que tenemos que referenciarlos asi: ENUM.VALOR. Como ejemplo: Color.Azul, Este va a coger el valor de 'Azul'.
console.log(`Mi color favorito es: ${colorFavorito}`) // Y aqui podemos manejar el tipo de dato.

let comodin: any = 'Joker' // Aveces no tenemos la certeza de que tipo de dato va a ser una variable, por eso TypeScript nos ofrece 'any', este acepta todos los tipos.

let someObject : object = { some: 'Wildcard' } // Asi declaramos una variable especificando que es un tipo objeto.

// Algunos otros tipos de datos que tiene TypeScript son los siguientes:

let notSure : unknown = 4; // Este es parecido al any, ya que no se sabe con exactitud que tipo de dato va a ser
notSure = 'Quizá un string luego'

//---------------------- Funciones ----------------------------------

// En TypeScript podemos ser explicitos de que tipo de dato debe retornar una funcion, o que tipo de dato tiene que ser sus parametros.

function sumita(a: number, b: number) : number { // En este caso, para asginar el tipo de dato a los parametros de una funcion se hace de la misma manera como si estuvieramos definiendo alguna variable, y despues de los argumentos podemos ingresar (:) y el tipo de dato que va a RETORNAR la funcion
    return a + b;
}

const sumitaArrow = (a: number, b:number) : number => { // Este sería el ejemplo con arrow functions
    return a + b;
}

function createAdder (a: number) : (number) => number { // De esta manera podemos especificar cuando una funcion retorna otra funcion, tenemos que seguir la siguiente sintaxis: function NOMBRE (PARAMETROS) : (TIPO DE PARAMETRO) => TIPO QUE RETORNA {}. Una aclaracion es que el tipo de parametro y el tipo que retorna son de la funcion que va a retornar la funcion que estamos tipando
    return function (b: number) : number {
        return b + a;
    }
}

function fullName(firstName: string = 'Sebastian', lastName?: string) : string { // Para agregar parametros opcionales, es decir, no son necesarios, solamente tenemos que  ingresar un signo de interrogacion antes de los dos puntos especificando el tipo de parametro: (PARAMETRO?: TIPO) tal que así. Y como vemos el primer parametro trae un valor por defecto, este valor se le tiene que asignar despues del tipado del parametro, como se ve en el primer parametro de la funcion.
    return `${firstName} ${lastName}`; // La funcion va a seguir funcionando solo con los parametros que sean necesarios
} 

//--------------------- Interfaces --------------------------------

// Las interfaces sirven para poder definir la forma que tiene un objeto, esto es util para poder indicar especificamente como tiene que ir un objeto y ademas posee el autocompletado despues :)

interface Rectangulo { // Asi se crea una interfaz, este contiene el keyword 'interface' y despues le asignamos un nombre
    ancho: number // Aqui especificamos las propiedades que debe tener un objeto si es de tipo 'Rectangulo', y por supuesto el tipo de dato de la propiedad
    alto: number // A las interfaces no se les requiere ingresar comas.
    color?: string // A las interfaces tambien les podemos asignar propiedades opcionales. de la misma manera como lo hacemos con las funciones 
}

let rect: Rectangulo = { // Cuando nosotros vayamos a crear un objeto, podemos especificarle que es de tipo 'Rectangulo' o el nombre de la interfaz
    ancho: 200, // Automaticamente va a requerir las propiedades que le indicamos.
    alto: 400 // Y si falta alguna propiedad, va a lanzar un error.
}

function area(r: Rectangulo) : number { // Podemos hacer lo mismo con las funciones, si quieremos que un parametro reciba un objeto en forma de la interfaz de 'Retangulo', entonces este va a necesitar ese objeto
    return r.alto * r.ancho; // Y cuando nos referimos a ese parametro de una vez va a reconocer las propiedades de la interfaz
}

//-------------------- Clases ---------------------------------------

// Las clases en TypeScript vuelven a retomar el concepto de propiedades privadas, publicas o protegidas, las que ya vimos en otros lenguajes como Java.
// Vamos a ver el ejemplo de una clase para que podamos ver las diferencias.
// NOTAS: Los prototipos en TypeScript no se sugieren, es mejor hacerlo con el KeyWord 'class'. TODO TIENE QUE IR TIPADO

import { MediaPlayer } from "../../assets/mediaPlayer"; // Explicacion mas adelante

export default class Intersection { // Aqui estamos declarando la clase con el export Default,
    private observer : IntersectionObserver; // Para poder aplicar las propiedades de la clase al constructor, tenemos que especificar afuera si son privadas, publicas o protegidas y de que tipo son! de lo contrario no podremos utilizar dichas propiedades en el contructor
    public config : IntersectionObserverInit; // Y como se ve, tambien hay que especificar el tipado, como esta clase esta dirigida a trabajar con IntersectionObserver, entonces vamos a especificar las interfaces que este ofrece
    constructor(){
        this.observer; // Ya en el constructor y con las propiedades tipadas podemos declarar con this nuestras propiedades
        this.config = {
            threshold: 0.25 // Al igual que nuestro objeto, que va a tener un autocompletado según la interfaz
        };
    }

    private run(player: MediaPlayer) { // Este parametro se recibe de otro modulo, por eso se importa al principio del ejemplo
        this.observer = new IntersectionObserver(entries => { // Como this.observer lo habíamos tipado con la interfaz IntersectionObserver, entonces este tiene que instanciar la interfaz
            const entry : IntersectionObserverEntry = entries[0]; // Declaramos nuestra constante que va a recibir los entries del IntersectionObserver y tenemos que tiparlo de igual manera
            entry.isIntersecting ? (
                console.log('Intersecting is true'),
                player.play()
            ) : (
                console.log('Intesecting is false'),
                player.pause()
            );
        }, this.config); // this.config fue tipado con la interfaz que permite recibir configuraciones al IntersectionObserver

        this.observer.observe(player.media); // Cuando nosotros usamos player como tipo MediaPlayer (Modulo importado), este va a tener el autocompletado
    }
};
