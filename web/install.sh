#! /usr/bin/bash

ROOT=`pwd`/web

cd $ROOT

yarn link ../api/dist
yarn add --dev dummy-todo-api@1.0.0