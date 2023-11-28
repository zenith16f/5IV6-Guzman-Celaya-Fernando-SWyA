/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg07.llavesexportadas;

// Imports
import java.io.*;
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;

/**
 *
 * @author Zenith
 */
public class LlavesExportadas {

    /**
     * @param args the command line arguments
     */
    // Variables
    private static Cipher rsa;

    public static void main(String[] args) throws Exception {
        // TODO code application logic here

        KeyPairGenerator generadorLlaves = KeyPairGenerator.getInstance("RSA");

        KeyPair llavesRSA = generadorLlaves.generateKeyPair();

        PublicKey llavePublica = llavesRSA.getPublic();
        PrivateKey llavePrivada = llavesRSA.getPrivate();

        // Methods to save and load
        saveKey(llavePublica, "public.key");
        llavePublica = loadPublicKey("public.key");

        saveKey(llavePrivada, "private.key");
        llavePrivada = loadPrivateKey("private.key");

        rsa = Cipher.getInstance("RSA/ECB/PKCS1Padding");

        String texto = "Habia una vez un patito que decia miau miau";

        // Cipher
        rsa.init(Cipher.ENCRYPT_MODE, llavePublica);

        // Format cipher
        byte[] cifrado = rsa.doFinal(texto.getBytes());

        // Print cipher
        for (byte b : cifrado) {
            System.out.print(Integer.toString(0XFF & b));
        }
        System.out.println("");

        // Descipher
        rsa.init(Cipher.DECRYPT_MODE, llavePrivada);

        byte[] bytesDescifrado = rsa.doFinal(cifrado);

        String textoDescifrado = new String(bytesDescifrado);
        System.out.println("Mensaje Descifrado: " + textoDescifrado);

    }

    private static void saveKey(Key llave, String archivo) throws Exception {
        byte[] llavesPubPriv = llave.getEncoded();

        // Generate File
        FileOutputStream fos = new FileOutputStream(archivo);

        fos.write(llavesPubPriv);
        fos.close();
    }

    private static PublicKey loadPublicKey(String archivo) throws Exception {
        FileInputStream fis = new FileInputStream(archivo);
        int numBytes = fis.available();
        byte[] bytes = new byte[numBytes];
        fis.read(bytes);

        fis.close();

        KeyFactory fabricaLlaves = KeyFactory.getInstance("RSA");

        KeySpec keySpec = new X509EncodedKeySpec(bytes);

        PublicKey llaveArchivo = fabricaLlaves.generatePublic(keySpec);

        return llaveArchivo;

    }

    private static PrivateKey loadPrivateKey(String archivo) throws Exception {
        FileInputStream fis = new FileInputStream(archivo);
        int numBytes = fis.available();
        byte[] bytes = new byte[numBytes];
        fis.read(bytes);

        fis.close();

        KeyFactory fabricaLlaves = KeyFactory.getInstance("RSA");

        KeySpec keySpec = new PKCS8EncodedKeySpec(bytes);

        PrivateKey llaveArchivoPrivado = fabricaLlaves.generatePrivate(keySpec);

        return llaveArchivoPrivado;
    }

}
