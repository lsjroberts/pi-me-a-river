# Loop through lat/lon's and sequentially download files

import os, requests

# http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A900%5D%3B%28node%5B%22waterway%22%3D%22river%22%5D%2848%2E951%2C%2D20%2E896%2C59%2E955%2C12%2E634%29%3Bway%5B%22waterway%22%3D%22river%22%5D%2848%2E951%2C%2D20%2E896%2C59%2E955%2C12%2E634%29%3Brelation%5B%22waterway%22%3D%22river%22%5D%2848%2E951%2C%2D20%2E896%2C59%2E955%2C12%2E634%29%3B%29%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B

baseUrl = "http://overpass-api.de/api/interpreter?data="
basePath = os.path.dirname(os.path.realpath(__file__)) + "/files/s_{south}_w_{west}_n_{north}_e_{east}.geojson"

dataTemplate  = "[out:json][timeout:900];("
dataTemplate += "node['waterway'={waterway}]({south},{west},{north},{east});"
dataTemplate += "way['waterway'={waterway}]]({south},{west},{north},{east});"
dataTemplate += "relation['waterway'='river']({south},{west},{north},{east});"
dataTemplate += ");out body;>;out skel qt;"

latStep = 30
lonStep = 10

batch = 0

def download_file(url, path):
    # NOTE the stream=True parameter
    r = requests.get(url, stream=True)
    with open(path, 'wb') as f:
        chunkNum = 0
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                chunkNum += 1
                print("chunk", chunkNum)
                f.write(chunk)
                f.flush()
    return path

for lat in range(-180,180,latStep):
    for lon in range(-90,90,lonStep):
        batch += 1
        url = baseUrl + dataTemplate.format(
            waterway="riverbank", south=lon, north=lon+lonStep, west=lat, east=lat+latStep
        )
        filePath = basePath.format(
            south=lon, north=lon+lonStep, west=lat, east=lat+latStep
        )
        print(batch, "calling", url, "...")
        download_file(url, filePath)
        print("...completed")