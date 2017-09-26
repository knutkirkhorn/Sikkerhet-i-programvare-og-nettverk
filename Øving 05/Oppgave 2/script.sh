#! /bin/sh
# Find files that are not accessed for 1 week
# and make a compressed version of them
find /home -atime +7 -size +1k -exec gzip {} \;
