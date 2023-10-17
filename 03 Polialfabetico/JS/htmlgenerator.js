// Generar HTML cifrado Cesar
function generarCesar() {
  // Obtener div
  let cifrado = document.getElementById("cifrado");
  // Borrar contenido anterior
  if (cifrado != null) {
    cifrado.innerHTML = "";
  }

  // Contenido Viggenere
  let contenidoCifrado = `
 <div class="center-block">
      <h2>Aqui va toda la parte de Cesar</h2>
     </div>
 `;
  // Agregamos el formulario al DOM
  cifrado.innerHTML = contenidoCifrado;
}

// Generar HTML cifrado Viggenere
function generarViggenere() {
  // Obtener div
  let cifrado = document.getElementById("cifrado");
  // Borrar contenido anterior
  if (cifrado != null) {
    cifrado.innerHTML = "";
  }

  // Contenido Viggenere
  let contenidoCifrado = `
  <div class="center-block">
        <article class="datos">
          <h4>Ingrese la clave secreta</h4>
          <br />
          <p>
            <input
              type="text"
              name="posicionamiento"
              id="textoClave"
              onpaste="return false;"
              ondrop="return false;"
            />
          </p>
          <br />
          <p>
            <input
              type="button"
              class="btn btn-info"
              value="Cifrar"
              onclick="longitudCifrar()"
            />
            <input
              type="button"
              class="btn btn-info"
              value="Descifrar"
              onclick="longitudDescifrar()"
            />
            <input
              type="button"
              class="btn btn-info"
              value="Reiniciar"
              onclick="reiniciar()"
            />
          </p>
          <h4>Resultado</h4>
          <br />
          <textarea
            id="res"
            onpaste="return false;"
            ondrop="return false;"
          ></textarea>
          <br />
          <p>
            <input
              type="button"
              class="btn btn-info"
              value="copiar"
              onclick="colocar()"
            />
          </p>
        </article>
      </div>
  `;
  // Agregamos el formulario al DOM
  cifrado.innerHTML = contenidoCifrado;
}
