//* Imports
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import io from "socket.io-client";

const socket = io("http://localhost:3000/");

axios.defaults.baseURL = "http://localhost:3000";
export default function Cifrado() {
  //Estados
  //   const [messages, setMessages] = useState([]);
  //   const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [down, setDown] = useState(null);

  //* CHAT
  //   useEffect(() => {
  //     socket.on("message", receiveMessage);

  //     return () => {
  //       socket.off("message", receiveMessage);
  //     };
  //   }, []);

  //   const receiveMessage = (message) =>
  //     setMessages((state) => [...state, message]);

  //   const handleSubmitMessage = (event) => {
  //     event.preventDefault();
  //     const newMessage = {
  //       body: message,
  //       from: "Me",
  //     };
  //     setMessages((state) => [...state, newMessage]);
  //     setMessage("");
  //     socket.emit("message", newMessage.body);
  //   };

  //* ENCRYPT
  const handleEncrypt = () => {
    const fileInput = document.getElementById("fileInput");
    const keyInput = document.getElementById("keyInput");

    if (fileInput.files.length === 0 || keyInput.value.length !== 8) {
      alert(
        "Por favor, seleccione un archivo y una clave válida (máximo 8 caracteres)."
      );
      return;
    }

    const file = fileInput.files[0];
    const key = keyInput.value;

    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;

      const encryptedText = CryptoJS.DES.encrypt(fileContent, key).toString();

      // Create a blob of the data
      const blob = new Blob([encryptedText], {
        type: "text/plain;charset=utf-8",
      });
      const downloadUrl = URL.createObjectURL(blob);
      setDownloadLink(downloadUrl);
    };
    reader.readAsText(file, "UTF-8");
  };

  //* DECRYPT
  const handleDesencrypt = () => {
    const fileInput = document.getElementById("fileInputDesencrypt");
    const keyInput = document.getElementById("keyInputDesencrypt");

    if (fileInput.files.length === 0 || keyInput.value.length !== 8) {
      alert(
        "Por favor, seleccione un archivo y una clave válida (máximo 8 caracteres)."
      );
      return;
    }

    const file = fileInput.files[0];
    const key = keyInput.value;
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;
      axios
        .post("/descifrar", { key: key, data: fileContent })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "text/plain;charset=utf-8",
          });
          const downloadUrlDes = URL.createObjectURL(blob);
          setDown(downloadUrlDes);
          console.log("Respuesta del servidor:", response.data);
        })
        .catch((error) => {
          console.error("Error en la solicitud al servidor:", error);
        });
    };

    reader.readAsText(file, "UTF-8");
  };

  //* RENDER
  return (
    <>
      {/* ENCRYPT */}
      <div className="bg-slate-400 p-10">
        <div className="container mx-auto max-w-lg p-4 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4 text-black">Cifrado</h1>
          <div className="mb-4">
            <input
              type="file"
              id="fileInput"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              accept=".txt"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="keyInput"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              placeholder="Clave secreta (máximo 8 caracteres)"
            />
          </div>
          <button
            id="encryptButton"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleEncrypt}
          >
            Cifrar
          </button>
          {downloadLink && (
            <>
              <a
                download="archivo_cifrado.txt"
                href={downloadLink}
                className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4 block hover:bg-green-600"
              >
                Descargar cifrado
              </a>
            </>
          )}
        </div>
      </div>

      {/* DECRYPT */}
      <div className="bg-slate-400 p-10">
        <div className="container mx-auto max-w-lg p-4 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4 text-black">Descifrado</h1>
          <div className="mb-4">
            <input
              type="file"
              id="fileInputDesencrypt"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              accept=".txt"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="keyInputDesencrypt"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              placeholder="Clave secreta (máximo 8 caracteres)"
            />
          </div>

          <button
            id="encryptButton"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleDesencrypt}
          >
            Descifrar
          </button>
          {down && (
            <>
              <a
                download="archivo_descifrado.txt"
                href={down}
                className="w-full bg-green-500 text-white py-2 px-4 rounded mt-4 block hover:bg-green-600"
              >
                Descargar descifrado
              </a>
            </>
          )}
        </div>
      </div>

      {/** Chat between users */}
      {/* <div className="h-screen bg-slate-400 text-black flex items-center justify-center m-0 p-0">
        <form
          onSubmit={handleSubmitMessage}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <h1 className="text-2xl font-bold my-2 text-black">Chat</h1>

          <ul className="h-64 overflow-y-auto mt-4">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`my-2 p-2 rounded-md ${
                  message.from === "Me" ? "bg-blue-200" : "bg-gray-300"
                }`}
              >
                <b>{message.from}</b>
                <br />
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} download={true}>
                        {props.children}
                      </a>
                    ),
                  }}
                >
                  {message.body}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
          <input
            name="message"
            type="text"
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            value={message}
            autoFocus
          />
        </form>
      </div> */}
    </>
  );
}
