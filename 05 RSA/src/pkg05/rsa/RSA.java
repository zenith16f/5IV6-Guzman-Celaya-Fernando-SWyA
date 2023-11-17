/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg05.rsa;

//Imports
import java.math.BigInteger;
import java.util.*;
import java.io.*;

/**
 *
 * @author Zenith
 */
public class RSA {

    /**
     * @param args the command line arguments
     */
    int tamprimo;
    BigInteger p, q, n;
    BigInteger fi;
    BigInteger e, d;

    public RSA(int tamprimo) {
        this.tamprimo = tamprimo;
    }

    // Generate nones
    public void generarPrimos() {
        p = new BigInteger(tamprimo, 10, new Random());

        do {
            q = new BigInteger(
                    tamprimo, 10, new Random());
        } while (q.compareTo(p) == 0);
    }

    // Generate Key's
    public void generarClaves() {
        n = p.multiply(q);

        fi = p.subtract(BigInteger.valueOf(1));

        fi = fi.multiply(q.subtract(BigInteger.valueOf(1)));

        do {
            e = new BigInteger(2 * tamprimo, new Random());
        } while (((e.compareTo(fi)) != 1) || (e.gcd(fi).compareTo(BigInteger.valueOf(1)) != 0));

        d = e.modInverse(fi);
    }

    // Cipher
    public BigInteger[] cifrar(String message) {
        int i;
        byte[] temp = new byte[1];
        byte[] digitos = message.getBytes();

        BigInteger[] bigDigitos = new BigInteger[digitos.length];

        for (i = 0; i < bigDigitos.length; i++) {
            temp[0] = digitos[i];
            bigDigitos[i] = new BigInteger(temp);
        }

        BigInteger[] cifrado = new BigInteger[bigDigitos.length];

        for (i = 0; i < bigDigitos.length; i++) {
            cifrado[i] = bigDigitos[i].modPow(e, n);
        }

        return cifrado;

    }

    // Descipher
    public String descifrar(BigInteger[] cifrado) {
        int i;
        BigInteger[] descifrado = new BigInteger[cifrado.length];

        for (i = 0; i < descifrado.length; i++) {
            descifrado[i] = cifrado[i].modPow(d, n);
        }

        char[] charArray = new char[descifrado.length];

        for (i = 0; i < charArray.length; i++) {
            charArray[i] = (char) (descifrado[i].intValue());
        }

        return (new String(charArray));

    }

    public static void main(String[] args) {

    }

}
