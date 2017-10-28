#include <iostream>

using namespace std;

int main() {
  char message[18] = {22, 17, 19, 05, 21, 24, 20, 17, 24, 24, 17, 01, 20, 13, 14, 21, 18, 18};
  string alphabet = "abcdefghijklmnopqrstuvwxyzæøå";
  // char alphabet = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'};
  int messageLength = 18;
  
  string oldMessage;
  for (int i = 0; i < messageLength; i++) {
    oldMessage += message[i] + 'a';
  }
  cout << "Old message: " << oldMessage << endl;
  
  string newMessage;
  for (int s = 1; s < 15; s++) {
    for (int i = 0; i < 18; i++) {
      // newMessage += ((message[i]+s) % 29) + 'a';
      int number = (message[i]-s) % 29;
      if (number < 0) {
        number = 29 + number;
      }
      
      // cout << "OLD: " << (message[i]-s) % 29 << endl;
      //cout << number << ": " << alphabet[number] << endl;
      
      newMessage += alphabet[number];
    }
    cout << "New message (shift=" << s << "): " << newMessage << endl;
    newMessage = "";
  }
  //=> jegvilhellerhabiff
}
