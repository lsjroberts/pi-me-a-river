# Pi Me A River - Website

The website for [Pi Me A River](http://pimeariver.com) provides an easy way to access visualisations of the rivers with basic analysis and comparisons.

## Install

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


## Grunt

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


## Redux

### State Shape

```
{
  "router": {
    "route": String,
    "params": [String],
    "url": String
  },
  "search": {
    "keywords": String,
    "results": [Int],
    "isFetching": Boolean,
  },
  "river": Int,
  "rivers": {
    Int: {
      "id": Int,
      "name": String,
      "nameEn": String
    }
  }
}
```
