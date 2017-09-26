#! /bin/sh

#Skriver ut "Jeg heter" og brukernavn til datamaskinen i dette tilfellet: Jeg heter knut
echo Jeg heter `whoami`

#Lager en variabel i bash med navnet MASKIN og er verdien til hostname.
#I dette tilfellet er det 'knut-HP-ProBook-4330s'
MASKIN=`hostname`

#Skriver ut alle filer og mapper i nåværende katalog
`which ls`

#Skriver ut alle filer og mapper i nåværende katalog, inkluderer også mapper med .
`echo ls -al`
