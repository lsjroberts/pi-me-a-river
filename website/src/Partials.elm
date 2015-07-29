module Partials where

import Html exposing (..)
import Html.Attributes exposing (..)

pageHeader : Html
pageHeader =
  header [ class "page-header" ]
    [ h1 [ ] [ text "Pi Me A River" ]
    --, h2 [ ] [ text "Is the average sinuosity of the world's rivers equal to π?" ]
    , h2 [ ] [ text "A look into the data and relationships of the world's rivers" ]
    ]

pageFooter : Html
pageFooter =
  footer [ class "page-footer" ]
    [ navigation
      [ { href = "/docs", text = "API Documentation" }
      , { href = "/data", text = "Data & Resources" }
      , { href = "/about", text = "About" }
      ]
    , p [ class "credits" ]
      [ text "Created by "
      , a [ href "http://gelatindesign.co.uk" ] [ text "gelatindesign" ]
      ]
    , p [ class "credits" ]
      [ text "Source available on "
      , a [ href "https://github.com/lsjroberts/pi-me-a-river" ] [ text "github" ]
      ]
    ]

navigation : List { href : String, text : String } -> Html
navigation links =
  let
    items =
      links |> List.map (\l -> li [ ] [ a [ href l.href ] [ text l.text ] ])
  in
    nav [ ]
      [ ul [ ] items ]