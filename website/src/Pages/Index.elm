module Pages.Index where

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)

import Model exposing (..)
import Search exposing (..)

import Partials

view : Address Action -> Model -> Html
view address model =
  section [ ]
    [ Partials.pageHeader
    , search address model
    , Partials.pageFooter address model
    ]