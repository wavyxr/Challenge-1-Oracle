const body=document.querySelector(".aside-contenedor")
//textareas
const areaEncriptacion=document.querySelector(".encriptador");
const textoEncriptado=document.querySelector(".encriptador-res");
//botones
const botonEncriptar=document.querySelector(".btn-encriptar");
const botonDesencriptador=document.querySelector(".btn-desencriptar");
const botonCopiar=document.querySelector(".btn-copiar");
//elementos que deben ocultarse
const ocultarse=document.querySelectorAll(".ocultarse")
const parrafos=document.querySelectorAll(".text")
//variables utilizadas para crear etiquetas <p> 
let exito=document.createElement("P")
let error=document.createElement("P")


//Arrowfuction utilizada para ocultar elementos del html
 const ocultarElementos=()=>{
    ocultarse.forEach((elementos)=>elementos.classList.add("ocultar"));
    
}

//utulizado para volver a mostrar objetos
const mostrarElementos=()=>{
    ocultarse.forEach((elementos)=>elementos.classList.remove("ocultar"))
    parrafos.forEach((elementos)=>elementos.classList.add("ocultar"))
}
ocultarElementos();

//Evento en escucha de la entrada de texto, y cada que se ingresa un valor se guarda en la const "verificar" y se crea otra const con todos los acentos posibles despues se hace una condicion la cual verifica que los caracteres no contengan acentos, en caso de tenerlos mostrara un mensaje en la pagina, y se eliminara autamitacamente 
areaEncriptacion.addEventListener("input",()=>{
    
    const verificar=areaEncriptacion.value;
    const acentos=/[´áéíóú]/g;
    if(verificar.match(acentos)){
        error.innerText="No se aceptan acentos";
        error.classList.add("error");
        body.appendChild(error);
        
        setTimeout(() => {
            error.remove()
        }, 1000);
        console.log("Nada de acentoos")
        areaEncriptacion.value=verificar.replace(acentos,"")
    }
})

//Similar a la anterior pero en esta esra en escucha del "keyup", junto con la propiedad parametro.getModifierState("CapsLock"), en pocas palabras evento que esta a la escucha de que las mayusculas esten activadas
areaEncriptacion.addEventListener("keyup", (event) => {
    if (event.getModifierState("CapsLock")) {
        areaEncriptacion.value="";
        error.innerText="No se aceptan Mayusculas";
        body.appendChild(error)
        error.classList.add("error");
        setTimeout(() => {
            error.remove()
        }, 1000);
    }
});


//ArrowFuction que se utiliza para encriptacion usando los parametros que dieron en el challenge, y contiene un condicion para para avisarle al usuario que no puede encriptar un texto vacio
const encriptacion=()=>{
    let texto=areaEncriptacion.value;
    texto=texto.replaceAll(/e/gi, "enter");
    texto=texto.replaceAll(/i/gi, "imes");
    texto=texto.replaceAll(/a/gi, "ai");
    texto=texto.replaceAll(/o/gi, "ober");
    texto=texto.replaceAll(/u/gi, "ufat");
    if(texto==""){
        areaEncriptacion.placeholder="¡Campo necesario!";
        areaEncriptacion.classList.add("error")
        setTimeout(() => {
            areaEncriptacion.placeholder="Ingrese texto aqui";
            areaEncriptacion.classList.remove("error")
        }, 2000);
        
    }
    else{

        textoEncriptado.value=texto;
        
        mostrarElementos()
        areaEncriptacion.value=""
    }
}


//igual que la anterior pero esta para desencriptar y de igual forma le avisa al usuario que no puede mandar el texto vacio
const desencriptar=()=>{
    let texto=areaEncriptacion.value;
    texto=texto.replaceAll(/enter/gi, "e");
    texto=texto.replaceAll(/imes/gi, "i");
    texto=texto.replaceAll(/ai/gi, "a");
    texto=texto.replaceAll(/ober/gi, "o");
    texto=texto.replaceAll(/ufat/gi, "u");
    if(texto==""){
        areaEncriptacion.placeholder="¡Campo necesario!";
        areaEncriptacion.classList.add("error")
        setTimeout(() => {
            areaEncriptacion.placeholder="Ingrese texto aqui";
            areaEncriptacion.classList.remove("error")
        }, 2000);
    }
    else{
        textoEncriptado.value=texto;
        areaEncriptacion.value=""
    }
}

//Evento a la escucha del click en el boton Encriptar y ejecutara una funcion 

botonEncriptar.addEventListener("click",()=>{
    encriptacion()
    
})

//Mismo que lo anterior pero para desencriptar
botonDesencriptador.addEventListener("click",()=>{
    desencriptar()
})

//Similar a los anteriores pero aqui se utiliza el objeto navigador.clipboard y el metodo whiteText para escribir en el portapapeles del usuario, en pocas palabras, boton que hace Ctrl+C al texto encriptado
botonCopiar.addEventListener("click",()=>{
    navigator.clipboard.writeText(textoEncriptado.value);
    
    exito.innerText="!Copiado al portapapeles¡";
    exito.classList.add("copiar");
    body.appendChild(exito);
    setTimeout(() => {
        exito.remove()
    }, 2000);
    
})