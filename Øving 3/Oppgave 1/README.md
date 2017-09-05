# Kommandoer til oppgave 1
## Vis forskjell
diff file1.cpp file1_new.cpp

## Vis forskjell og antall forskjellige linjer
diff -u file1.cpp file1_new.cpp

## Vis forskjell og lag en patchfil som inneholder forskjellen
diff file1.cpp file1_new.cpp > patchfile

## Patch forskjellen
patch file1.cpp < patchfile

## Angre patching av forskjell
patch -R file1.cpp < patchfile
