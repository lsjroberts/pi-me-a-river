module Model where

import Api


type Action
  = NoOp
  | UpdateSearchInput String
  | ChangeUrl String
  | UpdateSearchResults (List Api.River)


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
  , rivers : List River
  , searchInput : String
  }


empty : Model
empty =
  { url = "/"
  , rivers = []
  , searchInput = ""
  }


normaliseCoord : Coord -> Coord
normaliseCoord { lat, lon } =
  { lat = lat + 90
  , lon = lon + 90
  }