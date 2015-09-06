module Search where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import String exposing (contains, toLower, isEmpty)

import Model exposing (..)
import River exposing (filterRivers, riversList)

import Utils


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
    searchTitle =
      [ text "Search the "
      , text (model.rivers |> List.length |> toString)
      , text " rivers in the database"
      ]
    showingTitle =
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
    title =
      if isEmpty model.searchInput
        then searchTitle
        else showingTitle
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
        else model.rivers
  in
    results
      |> List.sortBy .realLength
      |> List.reverse
      |> riversList