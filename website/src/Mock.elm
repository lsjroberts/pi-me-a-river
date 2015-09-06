module Mock where

import Model exposing (..)


model : Model
model =
  { url = "/"
  , rivers =
      [ thames
      , nile
      , amazon
      ]
  , searchInput = ""
  }

thames : River
thames =
  { id = "1"
  , name = "River Thames"
  , nameEn = "River Thames"
  }

nile : River
nile =
  { id = "2"
  , name = "Nile"
  , nameEn = "Nile"
  }

amazon : River
amazon =
  { id = "3"
  , name = "Rio Amazonas"
  , nameEn = "Amazon River"
  }

{-
thames : River
thames =
  { id = "1"
  , name = "Thames"
  , countries = [ "United Kingdom" ]
  , coords =
    [ { lat = 51.694262, lon = -2.029724 }
    , { lat = 51.4989, lon = 0.6087 }
    ]
  , bounds =
    { northEast = { lat = 51.694262, lon = -2.029724 }
    , southWest = { lat = 51.4989, lon = 0.6087 }
    }
  , sinuosity = 1.885297118918944
  , realLength = 346
  , directLength = 183.52544886845277
  }

nile : River
nile =
  { id = "2"
  , name = "Nile"
  , countries =
      [ "Ethiopia"
      , "Sudan"
      , "Egypt"
      , "Uganda"
      , "Democratic Republic of the Congo"
      , "Kenya"
      , "Tanzania"
      , "Rwanda"
      , "Burundi"
      , "South Sudan"
      ]
  , coords =
    [ { lat = -2.282222, lon = 29.331389 }
    , { lat = 30.166667, lon = 31.1 }
    ]
  , bounds =
    { northEast = { lat = 30.166667, lon = 29.331389 }
    , southWest = { lat = -2.282222, lon = 31.1 }
    }
  , sinuosity = 1.8967430508041947
  , realLength = 6853
  , directLength = 3613.0355121609205
  }

amazon : River
amazon =
  { id = "3"
  , name = "Amazon"
  , countries = [ "Brazil", "Peru", "Colombia" ]
  , coords =
    [ { lat = -15.518056, lon = -71.765278 }
    , { lat = -3.126273, lon = -59.900634 }
    , { lat = -0.166667, lon = -49 }
    ]
  , bounds =
    { northEast = { lat = -0.166667, lon = -71.765278 }
    , southWest = { lat = -15.518056, lon = -49 }
    }
  , sinuosity = 2.310103634478628
  , realLength = 6992
  , directLength = 3026.7040385735936
  }
-}
