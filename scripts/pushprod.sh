#!/bin/bash
set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
STATUS=$?

CONNECTION="dufferz@dufferz.net"
PORT=2220
TIMEOUT=10


if  ssh $CONNECTION -o ConnectTimeout=$TIMEOUT -p $PORT 'cd ~/DFZStoreModuled; git pull';
then
  echo -e "${GREEN}Successully pulled" ${NC} &&
  mpg123 ./sounds/success.mp3 &>/dev/null
  exit 0
else
echo -e "${RED}Failure" ${NC} &&
    mpg123 ./sounds/fail2.mp3 &>/dev/null
  exit 1
fi



