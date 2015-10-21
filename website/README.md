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

And finally start the server with:

```
$ npm start
```


## Redux

### State

```
{
  "search": {
    "term": String,
    "results": [Int],
    "isFetching": Boolean,
  },
  "river": Int,
  "compare": [Int],
  "rivers": {
    Int: {
      "id": Int,
      "name": String,
      "nameEn": String
    }
  }
}
```


## Project

```
website/
  modules/
    rivers/
  routes/
    home/
      index.js
      containers/
        home.js
      components/
        header.js
        searchForm.js
        footer.js
    search/
      index.js
      containers/
        search.js
      components/
        advancedSearchForm.js
    river/
      index.js
      containers/
      components/
        header.js
        map.js
        charts.js
        footer.js
    compare/
      index.js
      containers/
      components/
  index.html
  index.js
  server.js
```
