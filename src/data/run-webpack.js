export default
`npx webpack --config webpack.configdev.js

if [[ ! -d public ]]; then
    mkdir public
fi
if [[ ! -d public/img ]]; then
    mkdir public/img
fi
if [[ ! -d public/libs ]]; then
    mkdir public/libs
fi
if [[ ! -d public/libs/wpower ]]; then
    mkdir public/libs/wpower
fi
cp -f dist/index.js public/index.js
cp -f index.html    public/index.html
cp -f index.css     public/index.css
cp -f img/icon.png  public/img/icon.png
cp -f libs/wpower/wpower.css public/libs/wpower/wpower.css

echo "Open http://localhost:8080 to test"
npx webpack serve
# EOF`;
// EOF