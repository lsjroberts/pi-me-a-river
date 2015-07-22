module Main where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)
import String exposing (toUpper, repeat, trimRight)

import StartApp


-- MODEL

type alias Model =
  { }

initialModel : Model
initialModel =
  { }


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
    , h2 [ ] [ text "Is the average sinuosity of the world's rivers equal to π?" ]
    ]

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ pageHeader
    ]

main : Signal Html
main =
  StartApp.start
    { model = initialModel
    , view = view
    , update = update
    }