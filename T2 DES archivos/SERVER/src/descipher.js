//* Imports
import CryptoJS from "crypto-js";

//* Export
export const desencriptado = async (req, res) => {
  const clave = req.body.key;

  if (!clave || clave.length !== 8) {
    return res.status(400).send("La clave es invalida");
  }

  try {
    const datosEncriptados = req.body.data;

    const bytes = CryptoJS.DES.decrypt(datosEncriptados, clave);
    const datosDesencriptados = bytes.toString(CryptoJS.enc.Utf8);

    console.log("Decrypted data: ", datosDesencriptados);

    res.send(datosDesencriptados);
  } catch (error) {
    res.status(500).send("Error al descifrar el archivo: " + error.message);
  }
};
