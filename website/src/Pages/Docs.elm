module Pages.Docs where

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import Markdown

import Model exposing (..)

import Partials

view : Address Action -> Model -> Html
view address model =
  section [ ]
    [ Partials.pageHeader
    , docs
    , Partials.pageFooter address model
    ]

docs : Html
docs =
  Markdown.toHtml """
  ## API Documentation

  You can [read the full API documenation on apiary](http://docs.pimeariver.apiary.io).
  """