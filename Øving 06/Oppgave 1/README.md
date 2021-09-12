# Oppgave 1
## Kommandoer for å kjøre "openssl-example" i en docker container

```
sudo docker run -ti debian:testing bash

apt-get update && apt-get dist-upgrade

apt-get install --yes g\+\+ libssl-dev &&
apt-get install --yes cmake

apt-get install --yes git

git clone https://github.com/knutkirkhorn/openssl-example

cd openssl-example

mkdir build

cd build

cmake ..

make

./examples

make test
```
