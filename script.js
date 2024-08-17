let muñeco = document.querySelector(".muñeco"); 
let cambioTexto = document.querySelector(".texto_encriptado").textContent;
let textoIngresado = document.querySelector(".area_texto").value;
let botonCopiar = document.querySelector(".copiar"); // Referencia al botón de copiar
let areaSalida = document.querySelector(".area_salida");

// Ocultar el botón de copiar inicialmente
botonCopiar.style.display = "none";

function encriptar() {
    textoIngresado = document.querySelector(".area_texto").value;
    if (textoIngresado.length <= 0) {
        cambioTexto = document.querySelector(".texto_encriptado").textContent = "No se encontró texto a encriptar o desencriptar";
        alert("No ha ingresado texto, por favor añada su mensaje");
        areaSalida.value = ""
        botonCopiar.style.display = "none"; // Ocultar el botón si no hay texto
    } else {
        function reemplazarVocales(texto) {
            let textoModificado = texto
                .replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");

            cambioTexto = document.querySelector(".texto_encriptado").textContent = "Texto encriptado correctamente";
            muñeco.src = "./images/logoencriptado.jpg";
            botonCopiar.style.display = "block"; // Mostrar el botón de copiar después de encriptar
            return textoModificado;
        }

        let textoReemplazado = reemplazarVocales(textoIngresado);
        document.querySelector(".area_salida").value = textoReemplazado;
    }
}

function desencriptar() {
    textoIngresado = document.querySelector(".area_texto").value;

    if (textoIngresado.length <= 0) {
        cambioTexto = document.querySelector(".texto_encriptado").textContent = "No se encontró texto a encriptar o desencriptar";
        alert("No ha ingresado texto, por favor añada su mensaje");
        areaSalida.value = ""
        botonCopiar.style.display = "none"; // Ocultar el botón si no hay texto
    } else {
        function reemplazarVocales(texto) {
            let textoModificado = texto
                .replace(/enter/g, "e")
                .replace(/imes/g, "i")
                .replace(/ai/g, "a")
                .replace(/ober/g, "o")
                .replace(/ufat/g, "u");

            cambioTexto = document.querySelector(".texto_encriptado").textContent = "Texto desencriptado correctamente";
            muñeco.src = "./images/Muñeco.png";
            botonCopiar.style.display = "block"; // Mostrar el botón de copiar después de desencriptar
            return textoModificado;
        }

        let textoReemplazado = reemplazarVocales(textoIngresado);
        document.querySelector(".area_salida").value = textoReemplazado;
    }
}

function copiarTexto() {
    let copiar = document.querySelector(".area_salida");
    copiar.select();
    copiar.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    alert("Texto copiado correctamente.");
}
