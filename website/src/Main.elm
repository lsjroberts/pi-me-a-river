module Main where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)
import String exposing (toUpper, repeat, trimRight)

import StartApp


-- MODEL

type alias River =
  { id : String
  , name : String
  , countries : List String
  , source : Coordinate
  , mouth : Coordinate
  , sinuosity : Float
  , realLength : Float
  , directLength : Float
  }

type alias Coordinate =
  { latitude : Float
  , longitude : Float
  }

type alias Model =
  { rivers : List River }

initialModel : Model
initialModel =
  { rivers =
    [ { id = "1"
      , name = "Thames"
      , countries = [ "United Kingdom" ]
      , source = { latitude = 51.694262, longitude = -2.029724 }
      , mouth = { latitude = 51.4989, longitude = 0.6087 }
      , sinuosity = 1.885297118918944
      , realLength = 346
      , directLength = 183.52544886845277
      }
    ]
  }


-- UPDATE

type Action
  = NoOp

update : Action -> Model -> Model
update action model =
  model


-- VIEW

pageHeader : Html
pageHeader =
  header [ class "hero" ]
    [ h1 [ ] [ text "pi me a river" ]
    --, h2 [ ] [ text "Is the average sinuosity of the world's rivers equal to π?" ]
    ]

riverItem : River -> Html
riverItem river =
  li [ ]
    [ a [ href ("river/" ++ river.id) ] [ text river.name ]
    , ul [ ]
        [ li [ ] [ text ("Length: " ++ (toString river.realLength) ++ " km") ]
        , li [ ] [ text ("Direct: " ++ (toString river.directLength) ++ " km") ]
        , li [ ] [ text ("Sinuosity: " ++ (toString river.sinuosity)) ]
        ]
    ]

riversList : List River -> Html
riversList rivers =
  let
    riverItems = List.map (riverItem) rivers
  in
    div [ ]
      [ h2 [ ] [ text "Rivers" ]
      , ol [ ] riverItems
      ]

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ pageHeader
    , riversList model.rivers
    ]

main : Signal Html
main =
  StartApp.start
    { model = initialModel
    , view = view
    , update = update
    }