// Variables
var viggenere =
  viggenere ||
  function () {
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
  };
