#! /bin/sh
find bilder -name "*.jpg" -not -path '*/\jpg*' -type f -exec "./flyttjpg.sh" {} \;
