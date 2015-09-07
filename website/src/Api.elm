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
  --, source : Coordinate
  --, mouth : Coordinate
  --, pages : List Url
  }


river : Json.Decoder River
river =
  Json.object3 River
    ("id" := Json.string)
    ("name" := Json.string)
    ("name_en" := Json.string)
    --("source" := coordinate)
    --("mouth" := coordinate)
    --("pages" := Json.list url)

rivers : Json.Decoder (List River)
rivers =
  "rivers" := Json.list river


-- WIRING

main : Signal Html
main =
  Signal.map2 view query.signal results.signal


query : Signal.Mailbox String
query =
  Signal.mailbox ""


results : Signal.Mailbox (Result String (List River))
results =
  Signal.mailbox (Err "getting ready...")


search : String -> Task String (List River)
search name =
  let
    toUrl =
      if String.length name >= 4
        then succeed ("http://localhost:3000/api/1.0/search?name=" ++ name)
        else fail "Need 4 or more chars"
  in
    toUrl `andThen` (mapError (always "Nothing found") << Http.get rivers)


-- PORTS
{-|

port requestSearch : Signal (Task x ())
port requestSearch =
  Signal.map search query.signal
    |> Signal.map (\task -> toResult task `andThen` Signal.send results.address)

-}


-- TESTING

view : String -> Result String (List River) -> Html
view string result =
  let
    field =
      input
        [ placeholder "River"
        , value string
        , on "input" targetValue (Signal.message query.address)
        , myStyle
        ]
        []

    viewRiver river =
      div [ myStyle ]
        [ a [ href ("/river/" ++ (toString river.id)) ] [ text river.name ]
        ]

    messages =
      case result of
        Err msg ->
          [ div [ myStyle ] [ text msg ] ]

        Ok rivers ->
          List.map viewRiver rivers
  in
    div [] (field :: messages)


myStyle : Attribute
myStyle =
  style
    [ ("width", "100%")
    , ("height", "40px")
    , ("padding", "10px 0")
    , ("font-size", "2em")
    , ("text-align", "center")
    ]
