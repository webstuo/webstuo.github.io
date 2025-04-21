Dir=$(pwd)
cd /mnt/c/novaeh/wpower
echo "Web packing Wpower..."
bash pack.sh

cd $Dir
echo -e "\nCopying..."
cp -f /mnt/c/novaeh/wpower/dist/wpower.js \
    ./libs/wpower/wpower.js
cp -f /mnt/c/novaeh/wpower/dist/wpower.css \
    ./libs/wpower/wpower.css    
echo Done.
# EOF