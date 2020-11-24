(function(){
    //-------Eventos
    document.addEventListener('DOMContentLoaded', () =>{
        conectarDB();
        
        formulario.addEventListener('submit',validarCliente);
    });


    //-------Funciones
    function validarCliente(e){
        e.preventDefault();

        //Leer los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //Crear un objeto con la información
        const cliente = { nombre, email, telefono, empresa,id: Date.now() };

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'],'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error','error');
        }

        transaction.oncomplete = function(){
            imprimirAlerta('El cliente se agrego correctamente');
        }
    }
})();