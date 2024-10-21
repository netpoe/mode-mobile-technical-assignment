#! /usr/bin/bash

ROOT=`pwd`/api

cd $ROOT

source .env

rm -rf dist

yarn

yarn build

cp package.json dist
cp .npmrc dist
cp yarn.lock dist

cd dist

yarn link