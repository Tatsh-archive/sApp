#!/bin/sh
DOCDIR="/home/tatsh/dev/sApp-doc"
jsdoc -c=./jsdoc.conf
pushd "$DOCDIR"
git add .
git commit -m "Generated documentation"
git push -u origin gh-pages
popd
