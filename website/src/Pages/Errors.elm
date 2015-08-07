module Pages.Errors where

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)

import Model exposing (..)

notFound _ _ =
  h1 [ ] [ text "Nothing here!" ]