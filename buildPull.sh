#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[1;34m'

NC='\033[0m' # No Color
start=`date +%s`

set -e

echo -e "${GREEN}Initializing Build & Deploy" ${NC} &&

echo -e "${GREEN}Generate WebP Images?\n" ${NC} &&

if  read -t 10 -n 1 answer
then
  # exit 0
  answer=answer
else
echo -e "\n${BLUE}Using default (No)" ${NC}
  answer="n"
fi

if  read -t 10 -p "Enter Commit message: " mess
then
  # exit 0
  mess=mess
else
    echo -e "\n${BLUE}Using default git commit message" ${NC}
    mess="Auto build.."
fi

if [ answer == "y" ];
  then
      echo -e "${GREEN}Generating WebP Files" ${NC} &&
      ./scripts/webp.sh
else
    echo -e "${BLUE}Skipping Generating WebP Files" ${NC}
fi

echo -e "${GREEN}Building Project.." ${NC} &&
mpg123 ./sounds/build.mp3 &>/dev/null &&


if  ng build --prod
then
  echo -e "${GREEN}Successfully built JS Packages" ${NC}
else
echo -e "${RED}Build Failure" ${NC} &&
    mpg123 ./sounds/fail2.mp3 &>/dev/null
  exit 1
fi




echo -e "${GREEN}Add all files to repo" ${NC} &&
git add -A &&
echo -e "${GREEN}Git Commit" ${NC} &&
git commit -m "${mess}" &&
echo -e "${GREEN}Git Push" ${NC} &&
git push &&
echo -e "${GREEN}Git Pull & Deploy" ${NC} &&
./scripts/pushprod.sh

end=`date +%s`
runtime=$((end-start))

echo -e "${GREEN}Completed in ${runtime}s${NC}"

