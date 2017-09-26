# Oppgave 2 og 3 - git og endring av makefile og fargedemo
Dett er en liste over git kommandoer som ble brukt for å lage et lokalt
git repository for denne oppgaven.
Mappen [farge-demo](farge-demo) er git repositoryet, og [farge-demo-clone](farge-demo-clone) er klonen til prosjektet.
Oppgave 3 ligger i [farge-demo-clone](farge-demo-clone) siden den ble gjort i git.

## Initier git repository
```
git init
```

## Initier bare git repository
```
git init --bare
```

## Klon det lokale git repositoryet
```
git clone ssh://<brukernavn>@<lokalip>/<lokal-mappe-plassering> <klonenavn>
```

## Sjekk git status
```
git status
```

## Sjekk ut ulike versjoner
```
git checkout <sha-settes-her>
```

## Stage alle endringer
```
git add .
```

## Lage en ny commit med melding
```
git commmit -m <melding>
```

## Pushe endringer
```
git push
```
