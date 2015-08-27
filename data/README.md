# Pi Me A River - Data

The data behind _Pi Me A River_ is sourced from [Open Street Map](). This data is formatted as [geojson]() which is then transformed and imported into a [SOLR]() database which the api talks to.

## Downloading from Overpass API

The data is downloaded from the [Overpass API](http://overpass-api.de). The download script iterates over the api through a series of coordinate boxes of 30 degrees latitude and 10 degrees longitude.

Ensure you have the correct version of python:

```
$ python --version
Python 2.7.6
```

Then to download the whole globe of rivers go to the `/data` directory and run:

```
$ python download.py
```

This will download the river data into the `/data/geojson` directory as a series of geojson files.

> Warning! This could take a few hours depending on your connection speed, you will download over 6 GB of data.

This may be updated in the future to use javascript for consistency with the rest of the project.

## Importing to SOLR

Once the data is downloaded it needs to be imported into a SOLR database. The raw geojson is not compatible with SOLR so needs to be transformed.

### Preparing the data

Ensure you have the correct version of node:

```
$ node --version
v0.12.5
```

To prepare the data for import go to the `/data` directory and run:

```
$ node transform-to-solr.js
```

> Warning! This could take several minutes depending on the speed of your machine.

This will iterate over the list of geojson files in `/data/geojson` and generate the corresponding transformed json files in `/data/json`.

### Running the import

Once the json data has been prepared it can be imported into SOLR.

You can [download SOLR from here](http://lucene.apache.org/solr/), be sure to get at least version `5.3.0`. Unzip the download and copy the directory to `/data/solr`.

You'll then need to create the `rivers` collection from within the `/data` directory using:

```
$ solr/bin/solr create -c rivers
```

Once this is created and running you can import the json data into SOLR:

```
$ ./update-solr.sh
```

> Warning! This could take several hours depending on the speed of your machine.

### Querying the data

If you get bored while the data is importing you can query it by visiting this link - [http://localhost:8983/solr/rivers/select?q=Amazon&wt=json&indent=true](http://localhost:8983/solr/rivers/select?q=Amazon&wt=json&indent=true).

> Note: You may need to change the port depending on how you configured your SOLR instance.
