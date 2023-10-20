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
  <h4>Desplazamiento</h4>
  <p>Escoge la forma para desplazar el texto</p>
  <button onclick="generarInputNumero()" class="btn btn-dark" type="button">
    Por numero
  </button>
  <button onclick="generarInputTexto()" class="btn btn-dark" type="button">
    Por letra
  </button>
  <br />
  <div id="inputContainer"></div>
  <br />
  <input
    type="button"
    class="btn btn-info"
    value="Cifrar"
    onclick="cifrarButton()"
  />
  <input
    type="button"
    class="btn btn-info"
    value="Descifrar"
    onclick="descifrarButton()"
  />
  <input
    type="button"
    class="btn btn-info"
    value="Reiniciar"
    onclick="reiniciar()"
  />
  <h4>Resultado</h4>

  <textarea
    id="res"
    onpaste="return false;"
    ondrop="return false;"
  ></textarea>
  <br />
  <input
    type="button"
    class="btn btn-info"
    value="Copiar"
    onclick="copy()"
  />
</div>
 `;
  // Agregamos el formulario al DOM
  cifrado.innerHTML = contenidoCifrado;
}

// Generar Input de tipo numero o texto
function generarInputTexto() {
  let inputContainer = document.getElementById("inputContainer");
  // Borrar contenido anterior
  if (inputContainer != null) {
    inputContainer.innerHTML = "";
  }
  let input = `
  <br />
  <input
  type="text"
  name="desplazamiento"
  id="desplazamiento"
  min="0"
  max="1"
  onkeypress="return inputLetras()"
  >`;

  // Add input to DOM
  inputContainer.innerHTML = input;
}

function generarInputNumero() {
  let inputContainer = document.getElementById("inputContainer");
  // Borrar contenido anterior
  if (inputContainer != null) {
    inputContainer.innerHTML = "";
  }
  let input = `
  <br />
  <input
  type="number"
  name="desplazamiento"
  id="desplazamiento"
  onkeypress="return inputNumeros(event)"
  >`;

  // Add input to DOM
  inputContainer.innerHTML = input;
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
              value="Copiar"
              onclick="colocar()"
            />
          </p>
        </article>
      </div>
  `;
  // Agregamos el formulario al DOM
  cifrado.innerHTML = contenidoCifrado;
}

// Function cancelar
function cancelar() {
  // Obtener div
  let cifrado = document.getElementById("cifrado");
  // Borrar contenido anterior
  if (cifrado != null) {
    cifrado.innerHTML = "";
  }
}
