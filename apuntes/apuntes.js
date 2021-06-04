//---------------------------------------------------------------- APUNTES -------------------------------------------------------------------------------------

// En este espacio se van a tomar apuntes de todo lo que se explique, algunas cosas estan en el nivel master de mi otra carpeta de JavaScript, sin embargo aqui se van a documentar, hay que tener en cuenta que no se van a documentar cosas obvias como los queryselectors o cosas asi.

//------------ Pequeña anotacion de buenas practicas -----------------

const button = document.querySelector('button');
// A mi en lo personal me gusta mucho usar los addEventListeners, los cuales reciben callback cuando llega el evento, tal que asi
button.addEventListener('click', () => console.log('Que joto eres'));
// Sin embargo, estoy viendo que casi todos los desarrolladores o profesores utilizan la propiedad sujeta a el elemento o a las clases para detectar estos elementos
button.onclick = () => console.log('Que joto eres'); // Esto es exactamente lo mismo que el addEventListener, sin embargo se hace con la propiedad.
// Cada clase o cada elemento que tenga eventos disponibles tienen propiedades de eventos, estos eventos los podemos identificar porque siempre comienzan con 'on<EVENTO>' y asi se detecta cuando se hizo ese evento, asignamos esa propiedad a una funcion que queremos que haga

//------------- Pequeña anotacion de los prototipos -------------------

// Como ya vimos en el nivel MASTER de mi otra carpeta, todo es un objeto, absolutamente todo es un objeto y se maneja con los prototipos. 
// Yo almenos tengo acostumbrado a crear una clase y posteriormente hacer sus metodos, sin embargo en este curso se esta haciendo el uso de los prototipos, porque según el profesor 'No existen clases!!!!', las clases las hacemos desde las funciones y las propiedades y los metodos se los definimos por su prototipo.

function MediaPlayer(){}; // Podemos crear una funcion de la manera tradicional
// Dentro de las llaves de la funcion se puede establecer el contructor, si quieres escribir codigo en ese bloque automaticamente se señalara como contructor

MediaPlayer.prototype.play = function(){ // Aqui le estamos definiendo un metodo llamado 'play'
    // La razon por la cual se utlizan funciones normales, es porque las Arrow Functions recuerda que suben dos niveles de OBJETOS en el this, es decir, si este metodo lo hicieramos con arrow function, el this que introduzcamos acá va a referirse a la ventana window. Esto se llama THIS CONTEXTUAL
    console.log('Le diste a Play capo.')
}

const player = new MediaPlayer(); // Podemos instanciar normal esa clase y...
player.play(); // Podemos llamar a su metodo

//------------------ Flujo del DOM -----------------------------

// Cuando el DOM o el documento estar cargando su contenido va paso por paso, cuando este se encuentra una etiqueta <script> este va a parar en ella, va a ejecutar este script y va a seguir construyendo la pagina, cuando el DOM ha cargado salta un evento llamado: "DOMContentLoaded" que puede avisar que el DOM ya cargó y esta disponible para su uso, esto es mas que todo para los scripts que van el HEAD, pero scripts como algunos de Google Analitics necesitan ser pedidos asincronamente con la pagina, es por eso que a la etiqueta script se le puede añadir el atributo 'async' que permite que este no interrumpa con la carga del DOM. Esto es recomendado para scripts de fetching o que se solicita una API exterior necesaria para analiticas o cosas como esas, esta cuando termina el pedido al script se ejecuta e interrumpe la carga del DOM, tambien le podemos añadir la opcion 'defer', la cual esta hace el pedido asincronamente con la carga y se ejecuta hasta el final del procesamiento del DOM
// <script async src="./apuntes.js">

//------------------- Pequeña anotacion del scope ----------------

// Si bien ya vimos scope en otro curso, aqui se presenta un nuevo tipo de Scope. El module scope! El module Scope permite que todas las funciones y las variables que hayamos declarado en un archivo tipo modulo, se queden dentro de este archivo, que este no pueda salir! Para definir un script como modulo es tan simple como definir el atributo type="module" en la etiqueta <script> de HTML

//------------------- Pequeña anotacion de los closures -----------

// Aqui aparece un concepto nuevo el cual es el IIFE: (Immediately Invoque Function Expression), este termino se le denomina a las funciones que se llaman a si mismas por medio de esta sintaxis

(function() { // Como podemos ver esta funcion esta toda dentro de un parentesis, esta no tiene ningun nombre y se trata como anonima por los parentesis
    let color = 'green'; // Hacemos el codigo de la funcion como tal

    function printColor(){
        console.log(color); // Esto es un closure, jugar con las funciones y con el scope para hacer inaccesibles las variables y asi aparecen los metodos getters y setters
    }

    printColor();
})(); // Y al final de estos parentesis vamos a colocar otros parentesis para indicar una funcion, es como si la funcion que definimos dentro de los parentesis hubiera sido capsulada en unos parentesis que se tratan como variables

// Pero en sí los closures son aquellas funciones que retornan funciones para poder acceder a las variables que solo estan disponibles en ese Scope de la funcion.

function makeColorPrinter(color){
    let colorMessage = `Your color is: ${color}`;
    return () => console.log(colorMessage);
}
const colorPrinter = makeColorPrinter('Azul'); // Esto es un closure, ya que nos va a retornar la funcion con la que es posible acceder a la variable colorMessage.
colorPrinter(); // Your color is: Azul

// Y el ejemplo de las variables privadas estan en la carpeta de Scope_Clousures.