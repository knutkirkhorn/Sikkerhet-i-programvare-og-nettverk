#include <iostream>
#include <vector>
#include <random>
#include <cmath>

using namespace std;

int removeLastAndFirstDigits(int &number) {
  int newNumber = number/10;
  int temp = newNumber;
  
  int iterations = 1;
  while (temp > 9) {
    temp = floor(temp / 10);
    iterations *= 10;
  }
  return newNumber - (iterations*temp);
}

bool alreadyExists(int number, vector<int> &numbers) {
  for (size_t i = 0; i < numbers.size(); i++) {
    if (number == numbers.at(i)) {
      return true;
    }
  }
  return false;
}

int main() {
  vector<int> numbers;
  
  random_device rd;
  mt19937 generator(rd());
  uniform_int_distribution<> distribution(10000, 99999);
  
  int counter = 0;
  bool found = false;
  while (!found) {
    counter++;
    int randomNumber = distribution(generator);
    if (alreadyExists(removeLastAndFirstDigits(randomNumber), numbers)) {
      bool finished = false;
      while (!finished) {
        randomNumber = distribution(generator);
        randomNumber = removeLastAndFirstDigits(randomNumber);
        if (!alreadyExists(randomNumber, numbers)) {
          finished = true;
          break;
        }
      }
    }
    
    for (size_t i = 0; i < numbers.size(); i++) {
      if (removeLastAndFirstDigits(randomNumber) == removeLastAndFirstDigits(numbers.at(i))) {
        cout << "Hashkollisjon funnet på: " << counter << " forsøk, mellom: " << randomNumber << " og " << numbers.at(i) << endl;
        found = true;
        break;
      }
    }
    numbers.emplace_back(randomNumber);
  }
}