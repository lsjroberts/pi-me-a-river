# Pi Me A River - Website

The website for [Pi Me A River](http://pimeariver.com) provides an easy way to access visualisations of the rivers with basic analysis and comparisons.

It is written in [Elm](http://elm-lang.org) with a [Grunt](http://gruntjs.com/) build process.

## Elm

Ensure you have the correct version of elm:

```
$ elm
Elm Platform 0.15.1 - a way to run all Elm tools
...
```

Then install the elm packages using:

```
$ elm package install
```

## Grunt

Ensure you have the correct versions of npm & node installed:

```
$ npm --version
2.11.2
$ node --version
v0.12.5
```

Then install the node packages using:

```
$ npm install --dev
```

You can install grunt globally using:

```
$ npm install --global grunt
```

You should then be able to run the build process with:

```
$ grunt build
```

And watch the source files to auto build on changes using:

```
$ grunt watch
```
