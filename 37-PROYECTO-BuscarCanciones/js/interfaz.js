export const formulario = document.querySelector('#formulario-buscar'),
            divBuscar = document.querySelector('#buscar'),
            divMensajes = document.querySelector('#mensajes'),
            divResultado = document.querySelector('#resultado'),
            headingResultado = document.querySelector('.letra-resultado h2');

export function limpiarHTML() {
    // divResultado.innerHTML = '';
    while(divResultado.firstChild){
        divResultado.removeChild(divResultado.firstChild);
    }
}

export function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
        <div class="dot1"></div>
        <div class="dot2"></div>
    `;
    divResultado.appendChild(divSpinner);
}