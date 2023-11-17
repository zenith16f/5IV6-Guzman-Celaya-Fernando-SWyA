/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg06.rsa.libreria;

// Imports
import java.io.InputStream;
import java.security.*;
import javax.crypto.*;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

// Esta libreria nos sirve para poder calcular numeros primos mas grandes mejorando el rendimiento del algoritmo pero el tamaño del bloque no es dinamico es estatico, esto significa que unicamente puede almacenar 64 caracteres
/**
 *
 * @author Zenith
 */
public class RSALibreria {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        // TODO code application logic here
        Security.addProvider(new BouncyCastleProvider());

        System.out.println("1. Se crean las claves publica y privada");

        // Init keys
        KeyPairGenerator generadorClaves = KeyPairGenerator.getInstance("RSA", "BC");

        // Define the length
        generadorClaves.initialize(1024);

        // Generate public and private key
        KeyPair clavesRSA = generadorClaves.generateKeyPair();

        // Public Key
        PublicKey clavePublica = clavesRSA.getPublic();

        // Private Key
        PrivateKey clavePrivada = clavesRSA.getPrivate();

        // Starting to cipher
        System.out.println("2. Escriba el mensaje a cifrar (maximo 64 caracteres)");

        byte[] bufferPlano = leerLinea(System.in);

        Cipher cifrador = Cipher.getInstance("RSA", "BC");

        cifrador.init(Cipher.ENCRYPT_MODE, clavePublica);

        System.out.println("Ciframos con clave publica");
        byte[] bufferCifrado = cifrador.doFinal(bufferPlano);

        System.out.println("Texto cifrado: ");
        mostrarBytes(bufferCifrado);

        System.out.println("\n***********************************************************");

        // Descipher
        cifrador.init(Cipher.DECRYPT_MODE, clavePrivada);
        System.out.println("Desciframos con la clave privada");
        byte[] bufferDescifrado = cifrador.doFinal(bufferCifrado);
        System.out.println("Texto descifrado: ");
        mostrarBytes(bufferDescifrado);

        // Cipher with private
        System.out.println("\n***********************************************************");

        cifrador.init(Cipher.ENCRYPT_MODE, clavePrivada);

        System.out.println("Ciframos con clave privada");
        bufferCifrado = cifrador.doFinal(bufferPlano);

        System.out.println("Texto cifrado: ");
        mostrarBytes(bufferCifrado);

        System.out.println("\n***********************************************************");

        // Descipher
        cifrador.init(Cipher.DECRYPT_MODE, clavePublica);
        System.out.println("Desciframos con la clave publica");
        bufferDescifrado = cifrador.doFinal(bufferCifrado);
        System.out.println("Texto descifrado: ");
        mostrarBytes(bufferDescifrado);

        System.out.println("\n***********************************************************");
    }

    public static byte[] leerLinea(InputStream in) throws Exception {
        byte[] buffer = new byte[1000];

        int i = 0;
        byte c;
        c = (byte) in.read();

        while ((c != '\n') && (i < 1000)) {
            buffer[i] = c;
            c = (byte) in.read();
            i++;
        }

        byte[] buffer2 = new byte[i];

        for (int j = 0; j < i; j++) {
            buffer2[j] = buffer[j];

        }
        return buffer2;
    }

    public static void mostrarBytes(byte[] bufferCualquiera) throws Exception {
        System.out.write(bufferCualquiera, 0, bufferCualquiera.length);
    }

}
