//---------------------------------------------------------------- APUNTES -------------------------------------------------------------------------------------
// https://augdiaugus.gitbook.io/recoleccion-de-notas-publicas/escuela-de-javascript/curso-profesional-de-javascript#interfaces
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

//-------------------- Call, apply y blind -------------------------

// Estos tres metodos pertenecen al prototipo de Function y sirve para poder establecer el valor de this.
//--------------------- call() --------------------------------------

// Cuando nosotros no establecemos una funcion como un prototipo pero queremos usar THIS, call() nos va a ayudar a establecer el this para esa funcion. EJEMPLO:

function saludar() {
    console.log(`Hola mi pana, mi nombre es ${this.nombre} ${this.apellido}`); // Aqui estamos definiendo una funcion que utliza el this, un this que en este caso cogería a Window, porque es el objeto que lo ejecuta
}

saludar.call({ // El metodo CALL(), permite pasarle el objeto al cual se va a referir this. Como vemos estamos asignando el this de la funcion con un objeto, que este tiene la propiedades que estamos necesitando en la funcion
    nombre: "Sebastian", // Si nosotros no definimos el objeto para la funcion con el metodo call(), no se llama la funcion y el this se referirá a Window
    apellido: "Galindo"
}) // Este metodo ejecuta la funcion de una vez

// Cuando una funcion recibe parametros, con el metodo call() tenemos que tambien incluir esos parametros aparte del contexto del this. EJEMPLO:

function caminar(metros, direccion) {
    console.log(`${this.name} caminó ${metros} metros hacia ${direccion}.`); // En este caso tambien estamos llamando a los parametros
}

caminar.call({
    name: "Sebastian"
}, 400, 'Belen') // A parte del objeto le estamos pasando los argumentos que necesita la funcion para poder ejecutarse. call() ejecuta la funcion con el this y los argumentos que le indiquemos

//---------------------- apply() ------------------------

// El metodo apply() es muy parecido, casi que cumple la misma funcionalidad que el call, solo que los argumentos de la funcion se pasan como un array.

caminar.apply({nombre: "Sebastian"}, [400, 'Belen']) // Esta sintaxis de apply() va a tener el mismo efecto que call(), es casi lo mismo!

//------------------- bind() ----------------------------

// El metodo bind() lo que hace es crear una nueva funcion en base a la funcion que le especifiquemos pero aplicando el this que le pasemos como argumento. Este metodo NO ejecuta la funcion.

const daniel = { nombre: "Daniel" }; // Estamos definiendo el objeto del this que le vamos a pasar como argumento a bind();

const danielCamina = caminar.bind(daniel, 400, 'Belen'); // En este caso, estamos creando la funcion danielCamina() con el this y los argumentos que le pasamos al metodo bind() en base a la funcion caminar(), es como instanciar esa funcio para que se maneje con un this diferente
danielCamina(); // Aqui estamos ejecutando dicha funcion caminar pero con sus argumentos y sus this ya aplicados

// El function currying es cuando aplicamos el bind() con la mitad o cierto tipo de argumentos y luego en la misma funcion llenamos los otros argumentos, esto permite hacer funciones reutilizables

//--------------- Utilidad -----------------------------
// Vamos a ver un ejemplo de utilidad de los metodos call, apply o bind
const buttons = document.getElementsByClassName('mamawbo'); // Aqui estamos pidiendo que nos recolecte todos los elementos, esto nos devuelve un NodeList
console.log(buttons); // Este NodeList pareciera que fuera un array, pero no lo es, no tiene todos los metodos de los arrays
Array.prototype.forEach.call(buttons, buttonn => buttonn.onclick = () => alert('Nunca pares de aprender')) // Por eso estos metodos toman importancia, porque podemos acceder al prototipo de forEach, que es la funcion que queremos ejecutar pero no podemos y le podemos aplicar el this del NodeList, ya que este tiene una propiedad length y eso le basta a forEach para poder iterar con los elementos de la array, o en este caso del NodeList


//---------------- Pequeña anotacion de los prototipos --------

const newObjeto = Object.create(objeto) // Tenemos el metodo Object.create() que recibe como parametro un objeto, este metodo va a crear un nuevo objeto pero va a asignar el objeto que le pasemos como parametro como prototipo, es decir, el objeto newObjeto va a tener y va a heredar todos los metodos y propeidades que tiene el objeto 'objeto'. Object.create() principalmente asigna un prototipo a un objeto que vayamos a crear.

// NOTA: Cuando nosotros creamos una instancia de un objeto, tenemos que referirnos a el prototipo con (__proto__) pero si estamos modificando el prototipo directamente desde el objeto principal, tenemos que refirnos a el con (prototype)
// NOTA: Object.getPrototypeOf() es la forma recomendada de obtener el prototipo de una instancia, porque __proto__ esta definido por el browser y no es tan efectivo

// Cuando nosotros utilizamos la palabra reservada new, estamos ahorrando muchos aspectos que si usariamos el Object.create().
// - Hace un Object.create() y coge el prototipo del objeto que se especifique despues del 'new'
// - Inicializa el this. Cuando miramos la sintaxis de una funcion con new es que inicializa el this. Por eso podemos acceder y estableces propiedades de metodo de this. Es como si hiciera lo siguiente! this = Object.create(Funcion.prototype). y al final de la funcion retorna this. Cuando nosotros instanciamos el objeto con new, lo que estamos viendo en realidad es el retorno de this. Este segundo punto lo hace implicitamente!

// Cada instancia de un objeto tiene algunas propiedades para verificar la herencia prototipal que tiene JavaScript
// Vamos a hacer un objeto desde la funcion para ver esto.

function Hero(name){
    this.name = name;
}

Hero.prototype.saludar = function(){console.log(`Hola, yo soy ${this.name}`)};

const zelda = new Hero('Zelda');

zelda.hasOwnProperty('name') // este metodo, hasOwnProperty() es un metodo que nos permite verificar si la propiedad o el metodo que le pasemos en el parametro, a que pertenece?? A una herencia o a ese objeto mismo? Si tiene esa propiedad desde el mismo objeto sin ninguna herencia, va a retornar 'true'. Si hace parte de una herencia prototipal, va a retornar 'false'

//------------- Pequeña anotacion del engine de JavaScript -------------------

// Como ya sabemos, el engine o nuestro archivo fuente hace el siguiente recorrido hasta llegar al navegador.
// File -> Parser -> AST -> Interpreter -> Profiler (Monitor) -> Compiler -> Optimized code -> Bitecode/Machine Code
// El parser mira todos los token o palabras reservadas que tiene el archivo para generar el AST, sin embargo si algo no concuerda se produce el Syntax Error!!
// El Syntax Error es originario del parser, hay dos tipos de parsing que puede realizar el parser:
// Eager parsing: Encuentra los errores en la sintaxis, crea el AST y construye los scopes
// Lazy parsing: Doble de rapido que el Eager parsing, no crea el AST y construye los scopes parcialmente
// Una pagina en el cual podemos ver los TOKENS y los arboles (AST) que nos hace el Parser es: https://esprima.org/demo/parse.html# Aqui podemos ver todo!

// Bytecode vs Machine code!
// Bytecode: Es parecido al lenguaje assembly, este es portatil y es ejecutado por una maquina virtual
// Machine code: Codigo binario y tiene instrucciones especificas a una arquitectura o procesador.

// Callstack: Este se le agrega las tareas o las funciones por medio de procedimientos que se llama 'push' y para eliminar funciones del stack porque y fueron ejecutadas se llama 'pop', las promesas van es una cola que se les llama microtareas (Microtasks Queue), y esta tiene preferencia frente a task queue, osea, el event loop siempre va a hacer las microtareas y luego va a hacer las tareas que estan en cola.

//----------------- Pequeña anotacion de los getter y los setter -----------------
// Cuando nosotros tenemos un objeto y queremos hacer una propiedad virtual podemos hacer algun metodo getter o setter
const objeto = { // Nosotros tenemos un objeto
    nombre: 'Sebastian',
    get name() { // Con el keyword get seguido del nombre de la propiedad que deseemos, se va a hacer automaticamente el getter 
        return this.nombre; // A este metodo getter le vamos a retornar el valor que nosotros le digamos o el correspondiente al nombre del getter
    },
    set name(value){ // Con el keyword set seguido del mismo nombre del getter, este va a tomar el rol de setter, la mayoría de los casos se le asigna parametros
        this.nombre = value; // Aqui lo unico que hacemos es reasignar el valor.
    }
}
// Los getter y los setter son utiles para cuando nosotros tenemos que pasar objetos mediante archivos para los plugins o algo así, no queremos que tenga el accesos a las variables directamente del objeto o de la clase, podemos hacer un objeto y dentro crear referencias para las propiedades principales, los getter sirven para dar una referencia a esa propiedad y los setter para poder modificarla desde fuera.

objeto.name // En este momento se esta llamando al getter del objeto y va a retornar la referencia que le indicamos

objeto.name = 'Pepito' // Cuando nosotros queremos reasignar la variable es cuando se llama al setter para modificarlo.

// NOTA: Si el setter no existiera en el objeto, reasignarlo no sería posible! ya que el getter es readonly.

//----------------- Proxys -------------------------------------------
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy Estos son los metodos del handler
//------------------ LEE ATENTAMENTE ---------------------------------
// Los proxys nos permiten interceptar los llamados a un objeto, es decir, si llamamos a una propiedad o a un metodo el Proxy lo va a saber! Es como un worker o un service worker pero interno, con los objetos y no con las peticiones web.
// LEELO DE ABAJO PARA ARRIBA
const target = { // Este es el objeto o los valores que se van a interceptar, OJO! Solo se intercepta el objeto 'p', el cual es una copia de este
    red: 'Rojo',
    green: 'Verde',
    blue: 'Azul'
}

const handler = { // Aqui vamos a definir el objeto con su respectivo getter para poder manipular lo que interceptó
    get(obj, prop) { // Como primer parametro tenemos al objeto base el cual se interceptó, de segundo parametro fue la llamada que se le hizo al objeto, es decir. Si se pide: p.red, entonces el segundo parametro del getter va a ser 'red', si pedimos: p.reeeed, el segundo parametro va a ser 'reeeed'.
        if (prop in obj) return obj[prop]; // Verificamos si hay alguna propiedad con ese nombre que pidió, si si. Se lo retornamos
        // Vamos a crear una sugerencia en caso de que no haya nada con ese nombre.
        const suggestion = Object.keys(obj).find(key => { // Vamos a sacarle todas las keys al objeto base, esto nos regresa una array y con el metodo find() de array va a servir para encontrar la llave mas parecida. Recordemos que find recorre todas las keys buscando alguna coincidencia que le demos en el callback, y find() nos pasa la key que esta evaluando como parametro para el callback
            return Levenshtein.get(key, prop) <= 3; // Levenshtein es una libreria para saber cuantos caracteres son diferentes una cadena, es decir: 'red' y 'reed' nos va a retornar 1. le estamos pidiendo que evalue la diferencia entre la llave que esta evaluando el find() con lo que se pidió y se paso como segundo parametro del getter, si la diferencia es menor o igual a 3, entonces retorne true.
            // Cuando la condicion dentro del callback de find() retorna true, entonces find() coge esa llave que estaba evaluando y la retorna. por eso suggestion contiene la sugerencia de la llave mas parecida
        });
        if (suggestion) console.log(`Ups! Al parecer no se encontró ${prop}, pero quizá quisiste decir ${suggestion}?`); // Haz la sugerencia.
    }
}

const p = new Proxy(target, handler) // Primero que todo hay que instanciar el objeto Proxy, este va a recibir dos parametros, el objeto que se va a interceptar y el handler, o lo que vamos a hacer cuando intercepte algo, este handler es un objeto con un getter o setter, como se te antoje!
// En este caso 'p' quedaría con el mismo valor que el objeto 'target'
// Lee muy atentamente la explicacion a este ejercicio y lee las documentaciones