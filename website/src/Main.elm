module Main where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)
import String exposing (contains, toLower, isEmpty)

import StartApp

import Utils


-- MODEL

type alias River =
  { id : String
  , name : String
  , countries : List String
  , source : Coordinate
  , mouth : Coordinate
  , sinuosity : Float
  , realLength : Float
  , directLength : Float
  }

type alias Coordinate =
  { latitude : Float
  , longitude : Float
  }

type alias Model =
  { rivers : List River
  , searchInput : String
  }

initialModel : Model
initialModel =
  { rivers =
    [ { id = "1"
      , name = "Thames"
      , countries = [ "United Kingdom" ]
      , source = { latitude = 51.694262, longitude = -2.029724 }
      , mouth = { latitude = 51.4989, longitude = 0.6087 }
      , sinuosity = 1.885297118918944
      , realLength = 346
      , directLength = 183.52544886845277
      }
    , { id = "2"
      , name = "Nile"
      , countries =
          [ "Ethiopia"
          , "Sudan"
          , "Egypt"
          , "Uganda"
          , "Democratic Republic of the Congo"
          , "Kenya"
          , "Tanzania"
          , "Rwanda"
          , "Burundi"
          , "South Sudan"
          ]
      , source = { latitude = -2.282222, longitude = 29.331389 }
      , mouth = { latitude = 30.166667, longitude = 31.1 }
      , sinuosity = 1.8967430508041947
      , realLength = 6853
      , directLength = 3613.0355121609205
      }
    ]
  , searchInput = ""
  }


-- UPDATE

type Action
  = NoOp
  | UpdateSearchInput String

update : Action -> Model -> Model
update action model =
  case action of
    NoOp ->
      model

    UpdateSearchInput contents ->
      { model | searchInput <- contents }


-- VIEW

pageHeader : Html
pageHeader =
  header [ class "hero" ]
    [ h1 [ ] [ text "Pi me a river" ]
    --, h2 [ ] [ text "Is the average sinuosity of the world's rivers equal to π?" ]
    , h2 [ ] [ text "A look into the data and relationships of the world's rivers" ]
    ]

search : Address Action -> Model -> Html
search address model =
  div [ class "search" ]
    [ searchForm address model
    , searchResults model
    ]

searchForm : Address Action -> Model -> Html
searchForm address model =
  Html.form [ ]
    [ input
      [ type' "search"
      , placeholder "Search for a river, e.g. Thames"
      , value model.searchInput
      , Utils.onInput address UpdateSearchInput
      ]
      [ ]
    ]

searchResults : Model -> Html
searchResults model =
  let
    results =
      if not (isEmpty model.searchInput)
        then model.rivers |> filterRiversByName model.searchInput
        else model.rivers
  in
    results
      |> List.sortBy .realLength
      |> List.reverse
      |> riversList

filterRiversByName : String -> List River -> List River
filterRiversByName search rivers =
  let
    isMatching search river =
      (toLower river.name) |> contains search
  in
    rivers |> List.filter (search |> toLower |> isMatching)

riverItem : River -> Html
riverItem river =
  li [ ]
    [ a [ href ("river/" ++ river.id) ] [ text river.name ]
    , ul [ ]
        [ li [ ] [ text ("Length: " ++ (toString river.realLength) ++ " km") ]
        , li [ ] [ text ("Direct: " ++ (toString river.directLength) ++ " km") ]
        , li [ ] [ text ("Sinuosity: " ++ (toString river.sinuosity)) ]
        ]
    ]

riversList : List River -> Html
riversList rivers =
  let
    riverItems = List.map (riverItem) rivers
  in
    div [ ]
      [ h2 [ ] [ text "Rivers" ]
      , ol [ ] riverItems
      ]

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ pageHeader
    , search address model
    ]

main : Signal Html
main =
  StartApp.start
    { model = initialModel
    , view = view
    , update = update
    }