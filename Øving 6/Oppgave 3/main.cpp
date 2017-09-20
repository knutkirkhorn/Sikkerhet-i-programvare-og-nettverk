#include "crypto.hpp"
#include <iostream>

using namespace std;

int main() {
  /*cout << "SHA-1 with 1 iteration" << endl;
  cout << Crypto::hex(Crypto::sha1("Test")) << endl << endl;
  
  cout << "SHA-1 with two iterations" << endl;
  cout << Crypto::hex(Crypto::sha1(Crypto::sha1("Test"))) << endl;

  cout << "The derived key from the PBKDF2 algorithm" << endl;
  cout << Crypto::hex(Crypto::pbkdf2("Password", "Salt")) << endl;*/
  
  string key = "ab29d7b5c589e18b52261ecba1d3a7e7cbf212c6";
  string salt = "Saltet til Ola";
  int iterations = 2048;
  int keyLength = 160 / 8;
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  char password[3];
  
  for (char c1 : alphabet) {
    password[0] = c1;
    
    for (char c2 : alphabet) {
      password[1] = c2;
      
      for (char c3 : alphabet) {
        password[2] = c3;
        string hash = Crypto::hex(Crypto::pbkdf2(password, salt, iterations, keyLength));
        cout << hash << ": " << password << endl;
        
        if (hash == key) {
          cout << "Password found: " << password << endl;
          return 0;
        }
      }
    }
  }
  
  /*146a0ad2711640cb8cb2e40b1c27435c2e8ba3c3: QwC
  975f6b1a139b3be77ca83be02ce2946beb877be4: QwD
  Password found: QwE*/
  return 0;
}
