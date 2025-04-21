Dir=$(pwd)
cd /mnt/c/novaeh/wpower
echo "Web packing Wpower..."
bash pack.sh
git pull; git add -A; git commit -a -m Pack; git push

cd $Dir
echo -e "\nCopying..."
cp -f /mnt/c/novaeh/wpower/dist/wpower.js \
    ./libs/wpower/wpower.js
cp -f /mnt/c/novaeh/wpower/dist/wpower.css \
    ./libs/wpower/wpower.css    
echo Done.
# EOF