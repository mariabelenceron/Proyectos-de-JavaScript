const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mensajeAlerta('Agrega un termino de búsqueda');
        return;
    }

    buscarImagenes();
}

function mensajeAlerta(mensaje) {
    const existeAlerta = document.querySelector('.bg-red-100');

    if(!existeAlerta){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
    
        formulario.appendChild(alerta);
        
        setInterval(() => {
            alerta.remove();
        }, 3000);
    }
}

function buscarImagenes() {

    const termino = document.querySelector('#termino').value;

    const key = '19335500-6bb25f392ae6cc84f34c2e26e';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(fotos => {
            totalPaginas = calcularPaginas(fotos.totalHits);
            console.log(totalPaginas);
            mostrarImagenes(fotos.hits)
        
        })

}

function calcularPaginas(total) {
    return parseInt(Math.ceil(total/registrosPorPagina));
}

//Generador que registra la cantidad de elementos de acuerdo a las paginas
function *crearPaginador(total) {
    for (let i = 1; i <= total; i++){
        yield i;
    }
}

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);

    while(true){
        const { value, done } = iterador.next();
        //Si termina, no ejecutes nada
        if(done) return;
        //Caso contrario, genera u boton por cada elemento en el generador
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','rounded');
        
        boton.onclick = () => {
            paginaActual = value;

            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }
}

function mostrarImagenes(imagenes) {
    //Eliminar el HTML
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    //Itear sobre el arreglo de imagenes y construir en el HTML
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}" >

                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> Me Gusta</span></p>
                        <p class="font-bold"> ${views} <span class="font-light"> Veces vista</span></p>

                        <a 
                            class="w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1 block"
                            href="${largeImageURL}" target="_blank" rel="noopener noreferrer"
                        >
                            
                            Ver Imagen
                        </a>
                    </div>
                </div>
            </div>
        `;
    })

    //Limpiar paginador previo
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    imprimirPaginador();
}

