#!/bin/sh
pyftsubset.exe ./font/Symbola.otf --unicodes="$(glyphhanger ./index.html)" --output-file="./font/Symbola.woff" --flavor="woff"
pyftsubset.exe ./font/Symbola.otf --unicodes="$(glyphhanger ./index.html)" --output-file="./font/Symbola.woff2" --flavor="woff2"