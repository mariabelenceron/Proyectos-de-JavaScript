//---------Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables de campo
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Expresiones Regulares
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//---------Eventos
eventListeners();
function eventListeners(){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar Formulario
    formulario.addEventListener('submit', enviarEmail);
}

//---------Funciones
//Deshabilita el boton de enviar
function iniciarApp(){
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}
//Valida el formulario
function validarFormulario(e){
    if(e.target.value.length > 0){
        //Eliminar los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        // e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    
    if(e.target.type === 'email'){
        //Expresiones regulares
        
        if(er.test(e.target.value)){
            //Eliminar los errores
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disable = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else {
        iniciarApp();
    }
}
//Mostrar al usuario el error
function mostrarError(infoError){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = infoError;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}
//Envia el email
function enviarEmail(e){
    e.preventDefault();
    
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Después de 3s ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje de que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center','my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario();
        },3000);
    }, 3000);
}
//Resetea el formulario
function resetearFormulario(){
    formulario.reset();
    iniciarApp();
    email.style.border = 'transparent';
    asunto.style.border = 'transparent';
    mensaje.style.border = 'transparent';

    const error = document.querySelector('p.error'); 
    if (error) {
        error.remove();
    }
}
