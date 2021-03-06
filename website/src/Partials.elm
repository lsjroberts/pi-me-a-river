module Partials where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)

import Model exposing (..)

pageHeader : Html
pageHeader =
  header [ class "page-header" ]
    [ h1 [ ] [ text "Pi Me A River" ]
    --, h2 [ ] [ text "Is the average sinuosity of the world's rivers equal to π?" ]
    , p [ ] [ text "A look into the data and relationships of the world's rivers" ]
    ]

pageFooter : Address Action -> Model -> Html
pageFooter address model =
  footer [ class "page-footer" ]
    [ navigation address model
    , p [ class "credits" ]
      [ text "Created by "
      , a [ href "https://twitter.com/gelatindesign" ] [ text "gelatindesign" ]
      ]
    , p [ class "credits" ]
      [ text "Source available on "
      , a [ href "https://github.com/lsjroberts/pi-me-a-river" ] [ text "github" ]
      ]
    ]

navigation : Address Action -> Model -> Html
navigation address model =
  nav [ ]
    [ ul [ ]
      [ li [ ] [ a [ onClick address (ChangeUrl "/docs") ] [ text "API Documentation" ] ]
      , li [ ] [ a [ onClick address (ChangeUrl "/data") ] [ text "Data & Resources" ] ]
      , li [ ] [ a [ onClick address (ChangeUrl "/about") ] [ text "About" ] ]
      ]
    ]
