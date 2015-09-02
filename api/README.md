FORMAT: 1A
HOST: http://pimeariver.com/api/1.0/

# Pi Me A River

# Group Name

## Search rivers by name [/search{?name}]

### Get rivers [GET]
Search for rivers with matching names

+ Parameters
    + name (string, `Amazon`) ... Name to search.

+ Response 200 (application/json)

        {
            "data": [
                {
                    "id": 2295651,
                    "name": "Rio Amazonas",
                    "name_en": "Amazon River"
                },
                {
                    "id": 123536834,
                    "name": "Amazon Creek",
                    "name_en": "Amazon Creek"
                }
            ]
        }

# Group Coordinates

## Find rivers near coordinates [/near{?lat}{?lon}{?distance}{?count}{?page}]

### Get rivers [GET]
Locate rivers with nodes close to a set of coordinates

+ Parameters
    + lat (number, `-15.518056`) ... Latitude to search near.
    + lon (number, `-71.765278`) ... Longitude to search near.
    + distance = `10` (optional, number, `20`) ... The radius in kilometres to search from lat and lon coordinates.
    + count = `10` (optional, integer, `15`) ... The number of results to return per page.
    + page = `1` (optional, integer, `2`) ... Which page of the result data to return.

+ Response 200 (application/json)

        {
            "data": [
                {
                    "id": 2295651,
                    "name": "Rio Amazonas",
                    "name_en": "Amazon River"
                }
            ]
        }

# Group Bounding Box

## Find rivers within a bounding box [/within{?box}{?enclosed}{?count}{?page}]

### Get rivers [GET]
Locate rivers with nodes close to a set of coordinates

+ Parameters
    + box (string, `-15.518056,-71.765278,0.707778,-50.089444`) ... 1st corner latitude, 1st corner longitude, 2nd corner latitude, 2nd corner longitude.
    + enclosed = `false` (optional, boolean, `true`) ... If the rivers should be fully enclosed by the box.
    + count = `10` (optional, integer, `15`) ... The number of results to return per page.
    + page = `1` (optional, integer, `2`) ... Which page of the result data to return.

+ Response 200 (application/json)

        {
            "data": [
                {
                    "id": 2295651,
                    "name": "Rio Amazonas",
                    "name_en": "Amazon River"
                }
            ]
        }

# Group River

## Details [/rivers/{id}{?coords}]

### Get river details [GET]
Get the river details optionally with a list of all coordinates. Warning: this list can get very long with hundreds of records.

+ Parameters
    + id (number, `2295651`) ... River id.
    + coords = `false` (optional, boolean, `true`) ... Should the full list of coords be included?

+ Response 200 (application/json)
        
        {
            "data": {
                "id": 2295651,
                "name": "Rio Amazonas",
                "name_en": "Amazon River",
                "length": 6992.0,
                "direct_length": 3026.704,
                "sinuosity": 2.3101,
                "source": [
                    -15.518056,
                    -71.765278
                ],
                "mouth": [
                    0.707778,
                    -50.089444
                ],
                "coords": [
                    [
                        -4.44218979,
                        -73.4501259
                    ],
                    [
                        -4.4278134,
                        -73.4432595
                    ],
                    ...
                ]
            }
        }
