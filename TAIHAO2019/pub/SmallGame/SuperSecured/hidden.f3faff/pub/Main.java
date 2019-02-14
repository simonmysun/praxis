import java.io.*;

class Main {
    public static void main(String[] args) {
        if(args.length != 3) {
            System.out.println("Yet another super ciphering tool. It protects your file in an extremely fast and extremely safe method. \n\nUsage: \n\tjava Main.java [/PATH/TO/MESSAGE] [/PATH/TO/OUTPUT] [/PATH/TO/KEY]\n\nThe MIT License (MIT)\nCopyright (c) 2018 Maoyin Sun");
            return;
        }
        String inputFile = new String(args[0]); // Path to the file to be encryted
        String outputFile = new String(args[1]); // Path to the file to be decryted
        String keyFile = new String(args[2]); // Path to the file of the key
        
        try {
            InputStream inputStream = new FileInputStream(inputFile);
            InputStream keyStream = new FileInputStream(keyFile);
            OutputStream outputStream = new FileOutputStream(outputFile);
 
            int msgRead;
            int keyRead;
 
            while ((msgRead = inputStream.read()) != -1) {
                if((keyRead = keyStream.read()) == -1) {
                    keyStream.close();
                    keyStream = new FileInputStream(keyFile);
                    keyRead = keyStream.read();
                }
                outputStream.write(msgRead ^ keyRead);
            }
 
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
