module Api where

import Http
import Json.Decode as Json exposing ((:=))
import Task exposing (..)

import Html exposing (..)
import Html.Attributes as Attr exposing (..)
import Html.Events exposing (..)
import String


-- DECODERS

type alias Coordinate =
  { lat : Float
  , lon : Float
  }


coordinate : Json.Decoder Coordinate
coordinate =
  Json.object2 Coordinate
    ("lat" := Json.float)
    ("lon" := Json.float)


type alias Url =
  String


url : Json.Decoder Url
url =
  Json.string


type alias River =
  { id : String
  , name : String
  , nameEn : String
  }


river : Json.Decoder River
river =
  Json.object3 River
    ("id" := Json.string)
    ("name" := Json.string)
    ("name_en" := Json.string)


rivers : Json.Decoder (List River)
rivers =
  Json.at ["rivers"]
    <| Json.list
    <| river


-- WIRING

query : Signal.Mailbox String
query =
  Signal.mailbox ""


results : Signal.Mailbox (Result String (List River))
results =
  Signal.mailbox (Err "getting ready...")


search : String -> Task String (List River)
search name =
  let
    url =
      "http://localhost:3000/api/1.0/search?name=" ++ name
    handleError =
      mapError (always "Nothing found")
    validate =
      if String.length name >= 4
        then succeed url
        else fail "Need 4 or more chars"
  in
    validate `andThen` (handleError << Http.get rivers)


find : Int -> Task String River
find id =
  let
    url =
      "http://localhost:3000/api/1.0/rivers/" ++ (toString id)
    handleError =
      mapError (always "Nothing found")
    validate =
      if id > 0
        then succeed url
        else fail "ID must be a positive number"
  in
    validate `andThen` (handleError << Http.get river)


--search : String -> Task x (List River)
--search keywords =
--  let
--    url =
--      Http.url "http://localhost:3000/api/1.0/search"
--        [ "name" => keywords ]
--  in
--    Http.get rivers url


-- PORTS

--portRequestSearch : Signal (Task x ())
--portRequestSearch =
--  Signal.map search query.signal
--    |> Signal.map (\task -> toResult task `andThen` Signal.send results.address)
