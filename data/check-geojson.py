import os

for filename in os.listdir("./geojson"):
  path, extension = os.path.splitext(filename)
  if os.path.isfile("./geojson/" + filename) and extension == ".geojson":
    with open("./geojson/" + filename, 'r') as f:
      firstline = f.readline().strip()
      if firstline != "{":
        print "Error with '" + filename + "'"