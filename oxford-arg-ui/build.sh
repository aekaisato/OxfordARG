#!/bin/bash

npm install
expo build:web
curl -O https://dl.nwjs.io/v0.52.0/nwjs-v0.52.0-win-x64.zip
curl -O https://dl.nwjs.io/v0.52.0/nwjs-v0.52.0-linux-x64.tar.gz
curl -O https://dl.nwjs.io/v0.52.0/nwjs-v0.52.0-osx-x64.zip
cp nwjs-pkg.json web-build/package.json
cd web-build
cp assets/icon.png web-build/
zip -r package.nw *
cd ..
mkdir -p nw/linux nw/mac nw/win
bsdtar -xf nwjs-*-linux-x64.tar.gz --strip-components=1 -C nw/linux
bsdtar -xf nwjs-*-osx-x64.zip --strip-components=1 -C nw/mac
bsdtar -xf nwjs-*-win-x64.zip --strip-components=1 -C nw/win
cp web-build/package.nw nw/linux
cp web-build/package.nw nw/win
cp web-build/package.nw nw/mac/nwjs.app/Contents/Resources/app.nw
