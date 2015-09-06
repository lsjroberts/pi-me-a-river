module Map where

import Svg exposing (..)
import Svg.Attributes exposing (..)
import Html exposing (Html)

import Model exposing (River, Coord, Bound)

import Utils

{-|
type alias Line =
  { x1 : Float
  , y1 : Float
  , x2 : Float
  , y2 : Float
  }

river : River -> Html
river river =
  let
    toViewBox : Bound -> String
    toViewBox {northEast, southWest} =
      [ toString northEast.lon
      , toString (0 - northEast.lat)
      , toString 180 --(abs (southWest.lon - northEast.lon))
      , toString 90 --(abs (southWest.lat - northEast.lat))
      ] |> Utils.join " "

    toLine : Coord -> Coord -> Line
    toLine c1 c2 =
      { x1 = c1.lon
      , x2 = c2.lon
      , y1 = c1.lat
      , y2 = c2.lat
      }

    toSvgLine : Line -> Svg
    toSvgLine line' =
      line
        [ x1 (toString line'.x1)
        , y1 (toString (0 - line'.y1))
        , x2 (toString line'.x2)
        , y2 (toString (0 - line'.y2))
        ] [ ]

    toLines : List Coord -> List Svg
    toLines coords =
      List.map2 toLine coords (List.drop 1 coords)
        |> List.map toSvgLine
  in
   svg
    [ version "1.1"
    , x "0"
    , y "0"
    , viewBox (toViewBox river.bounds)
    , width "100%"
    , height "100"
    , class "river-map"
    ]
    (toLines river.coords)
-}
