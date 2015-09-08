module Model where

import Api


type Action
  = NoOp
  | UpdateSearchInput String
  | ChangeUrl String
  | UpdateSearchResults (Maybe (List River))
  | UpdateRiver (Maybe River)


type alias River =
  { id : String
  , name : String
  , nameEn : String
  --, countries : List String
  --, coords : List Coord
  --, bounds : Bound
  --, sinuosity : Float
  --, realLength : Float
  --, directLength : Float
  }


type alias Coord =
  { lat : Float
  , lon : Float
  }


type alias Bound =
  { northEast : Coord
  , southWest : Coord
  }


type alias Model =
  { url : String
  , searchResults : List River
  , searchInput : String
  , river : Maybe River
  }


empty : Model
empty =
  { url = "/"
  , searchResults = []
  , searchInput = ""
  , river = Nothing
  }


normaliseCoord : Coord -> Coord
normaliseCoord { lat, lon } =
  { lat = lat + 90
  , lon = lon + 90
  }