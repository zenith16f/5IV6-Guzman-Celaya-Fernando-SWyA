/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package t2rsaui;

// Imports
import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
import java.math.BigInteger;
import java.util.Arrays;

/**
 *
 * @author Zenith
 */
public class UI extends JFrame {

    private JTextArea inputTextArea;
    private JTextArea outputTextArea;
    private JButton encryptButton;
    private JButton decryptButton;
    private JTextArea decryptResult;

    private T2RSAUI rsa;

    public UI() {
        setTitle("RSA Encryption/Decryption");
        setSize(1500, 800);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBackground(Color.GRAY);

        initComponents();
        initListeners();

        rsa = new T2RSAUI(1024);
    }

    private void initComponents() {
        inputTextArea = new JTextArea(5, 20);
        outputTextArea = new JTextArea(5, 20);
        encryptButton = new JButton("Cifrar");
        decryptButton = new JButton("Descifrar");
        decryptResult = new JTextArea(5, 20);

        // Button style
        encryptButton.setBackground(Color.BLACK);
        encryptButton.setForeground(Color.WHITE);
        decryptButton.setBackground(Color.BLACK);
        decryptButton.setForeground(Color.WHITE);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(2, 2, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        panel.add(new JScrollPane(inputTextArea));
        panel.add(new JScrollPane(outputTextArea));
        panel.add(new JScrollPane(decryptResult));
        panel.add(encryptButton);
        panel.add(decryptButton);

        add(panel);
    }

    private void initListeners() {
        encryptButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String plaintext = inputTextArea.getText();
                BigInteger[] ciphertext = rsa.cifrar(plaintext);
                outputTextArea.setText(arrayToString(ciphertext));
            }
        });

        decryptButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String ciphertextText = outputTextArea.getText();
                String decryptedText = rsa.descifrar(stringToArray(ciphertextText));
                decryptResult.setText(decryptedText);
            }
        });
    }

    private String arrayToString(BigInteger[] array) {
        StringBuilder result = new StringBuilder();
        for (BigInteger num : array) {
            result.append(num.toString()).append(" ");
        }
        return result.toString();
    }

    private BigInteger[] stringToArray(String text) {
        String[] parts = text.split("\\s+");
        BigInteger[] result = new BigInteger[parts.length];
        for (int i = 0; i < parts.length; i++) {
            result[i] = new BigInteger(parts[i]);
        }
        return result;
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new UI().setVisible(true);
            }
        });
    }
}
