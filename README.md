# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application

To install and debug local workflow locally using `Linux` platform

```
gh extension install https://github.com/nektos/gh-act
```

Run all workflows

```
gh act push -n
```

Run selected workflow

```
gh act -W .github\workflows\build-with-cache.yml -n
```