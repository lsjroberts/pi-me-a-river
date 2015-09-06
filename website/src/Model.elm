module Model where

type Action
  = NoOp
  | UpdateSearchInput String
  | ChangeUrl String

type alias River =
  { id : String
  , name : String
  , countries : List String
  , coords : List Coord
  , bounds : Bound
  , sinuosity : Float
  , realLength : Float
  , directLength : Float
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

normaliseCoord : Coord -> Coord
normaliseCoord { lat, lon } =
  { lat = lat + 90
  , lon = lon + 90
  }