// Variables
const desplazamiento = document.getElementById("desplazamiento");

const texto = document.getElementById("texto");

const textoCifrado = document.getElementById("cifrado");
// Functions
const cifrar = () => {
  // Obtener el texto ingresado
  const textoIngresado = texto.value;
  // Obtener caracter por caracter y validar la entrada del texto
  textoCifrado.value = textoIngresado
    .split("")
    .map((caracter) => {
      let mayus = caracter === caracter.toUpperCase() ? true : false;
      let valorEntero = caracter.toLowerCase().charCodeAt(0);

      // Validar si el caracter es una letra
      if (valorEntero >= 97 && valorEntero <= 122) {
        const valorDesplazamiento = parseInt(desplazamiento.value);

        if (valorEntero + valorDesplazamiento > 122) {
          valorEntero = 97 + (valorEntero - 122) + valorDesplazamiento - 1;
        } else {
          valorEntero = valorEntero + valorDesplazamiento;
        }
      }

      let cifrado = String.fromCharCode(valorEntero);
      return mayus ? cifrado.toUpperCase() : cifrado;
    })
    .join("");
};

texto.addEventListener("keyup", cifrar);
desplazamiento.addEventListener("change", cifrar);
