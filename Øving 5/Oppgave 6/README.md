# Oppgave 6

Følgende linjer legges inn i crontab filen:
```
*/2 8-11,13-16  * * 1-6  root    killall quake
30-58/2 12  * * 1-6  root    killall quake
```

En smart bruker kan bare endre crontab filen selv til å ikke inneholde killall quake kommandoen.
