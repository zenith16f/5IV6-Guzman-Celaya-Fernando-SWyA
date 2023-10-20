// Variables
var viggenere =
  viggenere ||
  (function () {
    var doStaff = function (txt, desp, action) {
      var replace = (function () {
        // ABC
        var abc = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];

        var longitud = abc.length;

        return function (caracter) {
          var i = abc.indexOf(caracter.toLowerCase());
          if (i != -1) {
            var position = i;
            if (action) {
              // Cifrar
              position += desp;
              position = position >= longitud ? position - longitud : position;
            } else {
              // Descifrar
              position -= desp;
              position = position < 0 ? longitud + position : position;
            }
            return abc[position];
          }
          return caracter;
        };
      })();
      // Validar
      var regularExpression = /([a-z])/gi;

      return String(txt).replace(regularExpression, function (match) {
        return replace(match);
      });
    };

    return {
      // Distinguir entre cifrar o descifrar
      encode: function (txt, desp) {
        return doStaff(txt, desp, true);
      },
      decode: function (txt, desp) {
        return doStaff(txt, desp, false);
      },
    };
  })();

function longitudCifrar() {
  camposVacios();
  var texto = document.getElementById("texto").value;
  var clave = document.getElementById("textoClave").value;

  if (clave.length > texto.length) {
    alert("La clave no puede ser mayor que el texto a cifrar");
  } else {
    codificar(texto, clave);
  }
}

function longitudDescifrar() {
  camposVacios();
  var texto = document.getElementById("texto").value;
  var clave = document.getElementById("textoClave").value;

  if (clave.length > texto.length) {
    alert("La clave no puede ser mayor que el texto a cifrar");
  } else {
    decodificar(texto, clave);
  }
}

function codificar(texto, clave) {
  var resultado = "";
  var indiceDeClave = 0;
  var charArTexto = texto.split("");

  for (var i = 0; i < charArTexto.length; i++) {
    var desplazamiento = obtenerIndiceClave(clave.charAt(indiceDeClave));
    var charTexto = charArTexto[i];

    resultado += viggenere.encode(
      charTexto,
      desplazamiento >= 26 ? desplazamiento % 26 : desplazamiento
    );
    indiceDeClave++;

    if (indiceDeClave >= clave.length) {
      indiceDeClave = 0;
    }
    document.getElementById("res").value = resultado;
  }
}

function decodificar(texto, clave) {
  var resultado = "";
  var indiceDeClave = 0;
  var charArTexto = texto.split("");

  for (var i = 0; i < charArTexto.length; i++) {
    var desplazamiento = obtenerIndiceClave(clave.charAt(indiceDeClave));
    var charTexto = charArTexto[i];

    resultado += viggenere.decode(
      charTexto,
      desplazamiento >= 26 ? desplazamiento % 26 : desplazamiento
    );
    indiceDeClave++;

    if (indiceDeClave >= clave.length) {
      indiceDeClave = 0;
    }
    document.getElementById("res").value = resultado;
  }
}

function obtenerIndiceClave(reco) {
  var abc = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  return abc.indexOf(reco.toLowerCase());
}

function camposVacios() {
  var texto = document.getElementById("texto").value;
  var clave = document.getElementById("textoClave").value;

  if (texto == "") {
    alert("El texto a cifrar no puede estar vacio");
  }

  if (clave == "") {
    alert("El clave no puede estar vacia");
  }
}

function colocar() {
  var copiado = document.getElementById("res").value;

  document.getElementById("texto").value = copiado;
}

function reiniciar() {
  document.getElementById("texto").value = "";
  document.getElementById("textoClave").value = "";
  document.getElementById("res").value = "";
}
