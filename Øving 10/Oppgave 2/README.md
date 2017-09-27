# Oppgave 2
Bruker [Simple-Web-Server](https://github.com/eidheim/Simple-Web-Server) for å sette opp en https webserver.

## Kommandoer for å lage HTTPS server sertifikat

### Lage en privat nøkkel (Private Key)
```
openssl genrsa -des3 -out server.key 1024
```

### Lage CSR (Certificate Signing Request)
```
openssl req -new -key server.key -out server.csr
```

### Fjerne passord fra filene
Dette gjøres for at det skal bli letter å feks. restarte server med denne koden. Eller bare slik at man slipper å skrive inn passordet hver gang koden med tilhørende sertifikat kjøres.

```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```

### Signer sertifikat i 365 dager
```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
