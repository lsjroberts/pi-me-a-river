module River where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import String exposing (contains, toLower)

import Model exposing (River)
import Map

import Utils


-- MODEL

filterRivers : String -> List River -> List River
filterRivers term rivers =
  let
    isMatching : String -> River -> Bool
    isMatching term' river =
      ((toLower river.name) |> contains term') ||
      (river.countries
        |> List.map toLower
        |> List.filter (contains term')
        |> List.length
        |> (<) 0
      )
  in
    rivers |> List.filter (term |> toLower |> isMatching)


-- VIEW

riversList : List River -> Html
riversList rivers =
  let
    riverItems = List.map riverItem rivers
  in
    section [ class "rivers-list" ] riverItems

riverItem : River -> Html
riverItem river =
  article [ class "river" ]
    [ h2 [ ] [ a [ href ("river/" ++ river.id) ] [ text river.name ] ]
    --, ul [ ]
    --    [ li [ ]
    --      [ text ( Utils.join ", " river.countries )
    --      ]
    --    , li [ ] [ text ("Length: " ++ (toString river.realLength) ++ " km") ]
    --    , li [ ] [ text ("Direct: " ++ (toString river.directLength) ++ " km") ]
    --    , li [ ] [ text ("Sinuosity: " ++ (toString river.sinuosity)) ]
    --    ]
    , Map.river river
    ]