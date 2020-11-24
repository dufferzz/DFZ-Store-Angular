#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m' # No Color




echo -e "${GREEN}Auto-Convert jpg, png, jpeg to WebP${NC}"
shopt -s nullglob

echo -e "${GREEN}cd src/assets/images/${NC}"

cd src/assets/images
for file in *.jpg ; do cwebp -q 50 "$file" -o "${file%.jpg}.webp"; done &&
for file in *.png ; do cwebp -q 50 "$file" -o "${file%.png}.webp"; done &&
for file in *.jpeg ; do cwebp -q 50 "$file" -o "${file%.jpeg}.webp"; done &&

cd products &&
for file in *.jpg ; do cwebp -q 50 "$file" -o "${file%.jpg}.webp"; done &&
for file in *.png ; do cwebp -q 50 "$file" -o "${file%.png}.webp"; done &&
for file in *.jpeg ; do cwebp -q 50 "$file" -o "${file%.jpeg}.webp"; done &&

echo -e "${GREEN}cd banners${NC}"
cd ../banners
for file in *.jpg ; do cwebp -q 50 "$file" -o "${file%.jpg}.webp"; done &&
for file in *.png ; do cwebp -q 50 "$file" -o "${file%.png}.webp"; done &&
for file in *.jpeg ; do cwebp -q 50 "$file" -o "${file%.jpeg}.webp"; done &&

echo -e "${GREEN}Done${NC}"
