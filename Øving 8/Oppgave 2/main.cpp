#include <iostream>
#include <random>
#include <sstream>
#include <string>

using namespace std;

int main() {    
  string key = "Dette er en noekkel";
  string message = "114b70745a521c57371f7a245d6440662d49";
  //"114b70745a521c57371f7a245d6440662d49" => 11 4b 70 74 5a 52 1c 57 37 1f 7a 24 5d 64 40 66 2d 49
  char messages[18] = {0x11, 0x4b, 0x70, 0x74, 0x5a, 0x52, 0x1c, 0x57, 0x37, 0x1f, 0x7a, 0x24, 0x5d, 0x64, 0x40, 0x66, 0x2d, 0x49};
  
  string decrypted = "";
  
  //Create seed from key
  seed_seq seed(key.begin(), key.end());
  
  //Choice of pseudorandom number generator using the given seed
  minstd_rand0 generator(seed);
  
  //Choice of distribution with 1 byte values
  uniform_int_distribution<char> distribution;
  
  //Retrieve random numbers from the generator using the chosen distribution:
  for (size_t c = 0; c < 18; ++c) {
    decrypted += messages[c] ^ (int)distribution(generator);
  }
  
  cout << decrypted << endl;
  //=> Dette er meldingen
}
