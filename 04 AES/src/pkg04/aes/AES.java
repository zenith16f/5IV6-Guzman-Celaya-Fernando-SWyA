/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg04.aes;

// Imports
import java.security.*;
import javax.crypto.*;
import java.util.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 *
 * @author fer_1
 */
public class AES {

    /**
     * @param args the command line arguments
     */
    static String texto = "habia una vez un patito que decia miau miau";

    static String llave = "asdfghjkuiertyop";

    static String vector = "asdfghjkuiertyop";

    public static void main(String[] args) throws Exception {
        System.out.println("Ejemplo AES");
        System.out.println("Texto a cifrar:" + texto);

        byte[] cifrado = encrypt(texto, llave);

        System.out.println("Texto cifrado");
        for (int i = 0; i < cifrado.length; i++) {
            System.out.println(new Integer(cifrado[i]));
        }
        System.out.println();

        String descifrar = decrypt(cifrado, llave);
        System.out.println("Texto descifrado: " + descifrar);

    }

    public static byte[] encrypt(String texto, String llave) throws Exception {
        Cipher cifradoAES = Cipher.getInstance("AES/CBC/PKCS5Padding", "SunJCE");

        SecretKeySpec key = new SecretKeySpec(llave.getBytes("UTF-8"), "AES");

        cifradoAES.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(vector.getBytes("UTF-8")));

        return cifradoAES.doFinal(texto.getBytes("UTF-8"));
    }

    public static String decrypt(byte[] cifrado, String llave) throws Exception {
        Cipher cifradoAES = Cipher.getInstance("AES/CBC/PKCS5Padding", "SunJCE");

        SecretKeySpec key = new SecretKeySpec(llave.getBytes("UTF-8"), "AES");

        cifradoAES.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(vector.getBytes("UTF-8")));

        return new String(cifradoAES.doFinal(cifrado), "UTF-8");
    }

}
