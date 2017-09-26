#include <boost/multiprecision/cpp_int.hpp>
#include <iostream>

using namespace std;
using namespace boost::multiprecision;

int main() {
  //To decrypt
  int c = 66514;
  
  //Public key
  int e = 17;
  
  //Modulus
  int n = 86609;
  
  // (p-th power of b) mod m
  cpp_int b(c), p(e), m(n);
  
  cout << powm(b, p, m) << endl;
  //=> 1337
}
