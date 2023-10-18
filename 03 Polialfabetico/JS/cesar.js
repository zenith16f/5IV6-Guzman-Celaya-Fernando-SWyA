const letras = "abcdefghijklmnopqrstuvwxyz";
//* Cipher
function cifrar(mensaje, desplazamiento) {
  if (letras.includes(desplazamiento)) {
    desplazamiento = letras.indexOf(desplazamiento.toLocaleLowerCase());
  }

  let texto = mensaje.toLowerCase();
  let res = "";
  desplazamiento = ((desplazamiento % 26) + 26) % 26;
  if (texto) {
    for (let i = 0; i < texto.length; i++) {
      let pos = (letras.indexOf(texto[i]) + desplazamiento) % 26;

      if (texto[i] !== " ") {
        res += letras[pos];
      } else {
        res += " ";
      }
    }
  } else {
    res += texto[i];
  }

  return res;
}

function cifrarButton() {
  inputsVacios();
  const texto = document.getElementById("texto");
  const desplazamiento = document.getElementById("desplazamiento");
  const resultado = document.getElementById("res");

  const mensajeCifrado = cifrar(texto.value, desplazamiento.value);
  resultado.value = mensajeCifrado;
}

//* Descipher
function descifrar(mensaje, desplazamiento) {
  if (letras.includes(desplazamiento)) {
    desplazamiento = letras.indexOf(desplazamiento.toLocaleLowerCase());
  }

  let texto = mensaje.toLowerCase();
  let res = "";
  desplazamiento = ((desplazamiento % 26) - 26) % 26;
  if (texto) {
    for (let i = 0; i < texto.length; i++) {
      let pos = (letras.indexOf(texto[i]) - desplazamiento) % 26;

      if (texto[i] !== " ") {
        res += letras[pos];
      } else {
        res += " ";
      }
    }
  } else {
    res += texto[i];
  }

  return res;
}

function descifrarButton() {
  inputsVacios();
  const texto = document.getElementById("texto");
  const desplazamiento = document.getElementById("desplazamiento");
  const resultado = document.getElementById("res");

  const mensajeDescifrado = descifrar(texto.value, desplazamiento.value);
  resultado.value = mensajeDescifrado;
}
//* Restart inputs
function reiniciar() {
  let inputContainer = document.getElementById("inputContainer");

  document.getElementById("texto").value = "";
  document.getElementById("res").value = "";
  if (inputContainer != null) {
    document.getElementById("desplazamiento").value = "";
  }
}

//* Copy to main text
function copy() {
  let copied = document.getElementById("res");

  document.getElementById("texto").value = copied.value;
}

//* Validaciones de teclado

function inputNumeros(e) {
  let teclado = document.all ? e.keyCode : e.which;
  if (teclado == 8) return true;
  let patron = /[0-9\d -]/;
  let codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function inputLetras() {
  var charCode = event.keyCode;

  if (
    (charCode > 64 && charCode < 91) ||
    (charCode > 96 && charCode < 123) ||
    charCode == 8
  )
    return true;
  else return false;
}

//* Void inputs
function inputsVacios() {
  var texto = document.getElementById("texto").value;
  var desplazamiento = document.getElementById("desplazamiento").value;

  if (texto == "") {
    alert("El texto a cifrar no puede estar vacio");
  }

  if (desplazamiento == "") {
    alert("El desplazamiento no puede estar vacio");
  }
}
