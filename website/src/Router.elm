module Router where

import Html exposing (Html)
import Signal exposing (Address)

import Model exposing (Model, Action)

import Pages.Index
import Pages.About
import Pages.Docs
import Pages.Data

view : Address Action -> Model -> Html
view address model =
  let
    view' =
      case model.url of
        "/" -> Pages.Index.view
        "/about" -> Pages.About.view
        "/data" -> Pages.Data.view
        "/docs" -> Pages.Docs.view
  in
    view' address model

