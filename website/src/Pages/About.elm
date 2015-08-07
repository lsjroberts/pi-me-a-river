module Pages.About where

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import Markdown

import Model exposing (..)
import Search exposing (..)

import Partials

view : Address Action -> Model -> Html
view address model =
  section [ ]
    [ Partials.pageHeader
    , about
    , Partials.pageFooter address model
    ]

about : Html
about =
  Markdown.toHtml """
  ## What is Pi Me a River?

  _Pi Me a River_ is a project by [Laurence Roberts](https://twitter.com/gelatindesign)
  aimed at bringing together the data required to better understand the formation
  and behaviour of the world's rivers.

  ## What inspired this?

  [This youtube video by Numberphile]().

  ## Can I use the data for research / analysis / fun?

  Yes! Please do. You can read about [developing with the api](/docs) and
  [downloading the raw data](/data). If you have any other requirements or
  questions please get in contact.

  ## How is it made?

  The project is open source and [available on github](https://github.com/lsjroberts/pi-me-a-river).
  """