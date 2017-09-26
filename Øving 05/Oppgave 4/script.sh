#! /bin/sh
# Make copies of .txt files and store them as .txt.kopi
find folder -name "*.txt" -exec cp {} {}.kopi \;


# Other solution, but this only apply to files in the directory and not recursively in subdirectories
#for afile in folder/*.txt; do
#    
#    cp "$afile" "$afile.kopi"
#done
