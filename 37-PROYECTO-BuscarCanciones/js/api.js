import * as UI from './interfaz.js';

class API {
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI(){
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;
        UI.Spinner();
        fetch(url)
            .then(resultado => resultado.json())
            .then(resultado => {
                if(resultado.lyrics){
                    UI.limpiarHTML();
                    const { lyrics } = resultado;
                    console.log(resultado);
                    
                    UI.divResultado.innerHTML = `<p>${lyrics}</p>`;
                    UI.headingResultado.textContent = `Letra de la canción: ${this.cancion} de ${this.artista}`;
                } else {
                    UI.limpiarHTML();
                    UI.divMensajes.textContent = 'La cancion no existe, prueba con otra';
                    UI.divMensajes.classList.add('error');
                    
                    setInterval(() => {
                        UI.divMensajes.textContent = '';
                        UI.divMensajes.classList.remove('error');
                    }, 3000);
                }
            })
    }
}

export default API;