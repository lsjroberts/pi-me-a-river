module Main where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)
import String exposing (contains, toLower, isEmpty)

import StartApp

import Utils
import Partials


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
    , { id = "3"
      , name = "Amazon"
      , countries = [ "Brazil", "Peru", "Colombia" ]
      , source = { latitude = -15.518056, longitude = -71.765278 }
      , mouth = { latitude = -0.166667, longitude = -49 }
      , sinuosity = 2.310103634478628
      , realLength = 6992
      , directLength = 3026.7040385735936
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

search : Address Action -> Model -> Html
search address model =
  div [ class "search" ]
    [ searchForm address model
    , searchResults model
    ]

searchForm : Address Action -> Model -> Html
searchForm address model =
  let
    title =
      if isEmpty model.searchInput
        then
          [ text "Search the "
          , text (model.rivers |> List.length |> toString)
          , text " rivers in the database"
          ]
        else
          [ text "Showing "
          , text
            ( filterRivers model.searchInput model.rivers
              |> List.length
              |> toString
            )
          , text " of "
          , text (model.rivers |> List.length |> toString)
          , text " rivers in the database"
          ]
  in
    Html.form [ class "search" ]
      [ h2 [ ] title
      , input
        [ type' "search"
        , placeholder "e.g. \"Amazon\", \"Brazil\""
        , value model.searchInput
        , Utils.onInput address UpdateSearchInput
        ]
        [ ]
      ]

searchResults : Model -> Html
searchResults model =
  let
    results : List River
    results =
      if not (isEmpty model.searchInput)
        then model.rivers |> filterRivers model.searchInput
        else [ ]
  in
    results
      |> List.sortBy .realLength
      |> List.reverse
      |> riversList

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

riverItem : River -> Html
riverItem river =
  li [ ]
    [ a [ href ("river/" ++ river.id) ] [ text river.name ]
    , ul [ ]
        [ li [ ]
          [ text
            ( river.countries
              |> List.intersperse ", "
              |> List.foldr (++) ""
            )
          ]
        , li [ ] [ text ("Length: " ++ (toString river.realLength) ++ " km") ]
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
      [ ol [ ] riverItems
      ]

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ Partials.pageHeader
    , search address model
    , Partials.pageFooter
    ]

main : Signal Html
main =
  StartApp.start
    { model = initialModel
    , view = view
    , update = update
    }