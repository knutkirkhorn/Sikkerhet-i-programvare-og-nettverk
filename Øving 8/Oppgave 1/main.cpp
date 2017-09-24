#include <iostream>

using namespace std;

int main() {
  string message = "judwxohuhuCghuhCkduCixqqhwCphoglqjhqD";
  
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  int stringLength = 52;
  int shiftSize = 3;
  
  cout << "Old message: " << message << endl;
  int teller = 0;
  for (char c : message) {
    char currentChar;
    
    for (int i = 0; i < stringLength; i++) {
      if (c == alphabet[i]) {
        int newPosition = i - shiftSize;
        
        if (newPosition < 0) {
          newPosition += stringLength;
        }
        currentChar = alphabet[newPosition];
      }
    }
    
    message[teller] = currentChar;
    teller++;
  }
  
  cout << "New message: " << message << endl;
  
  //Meldingen med shift størrelse 3:
  //gratulererzderezharzfunnetzmeldingenA
  
  //Splittet opp: gratulerer z dere z har z funnet z meldingen A
}
