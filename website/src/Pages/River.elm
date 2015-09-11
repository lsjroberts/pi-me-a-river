module Pages.River where

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)

import Model exposing (..)
import River exposing (riverItem)

import Partials

view : Address Action -> Model -> Html
view address model =
  let
    views =
      case model.river of
        Nothing ->
          [ Partials.pageHeader
          , Partials.pageFooter address model
          ]
        Just river ->
          [ Partials.pageHeader
          , riverItem address river
          , Partials.pageFooter address model
          ]
  in
    section [ ] views