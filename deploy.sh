npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:dclray/dclray.github.io.git master

cd ../
rm -rf public