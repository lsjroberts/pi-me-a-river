module Search where

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import String exposing (contains, toLower, isEmpty)

import Model exposing (..)
import River exposing (filterRivers, riversList)

import Utils exposing (onInput)

import Api


-- VIEW

search : Address Action -> Model -> Html
search address model =
  div [ class "search" ]
    [ searchForm address model
    , searchResults address model
    ]

searchForm : Address Action -> Model -> Html
searchForm address model =
  let
    searchTitle =
      [ text "Search the "
      , text (model.searchResults |> List.length |> toString)
      , text " rivers in the database"
      ]
    showingTitle =
      [ text "Showing "
      , text
        ( filterRivers model.searchInput model.searchResults
          |> List.length
          |> toString
        )
      , text " of "
      , text (model.searchResults |> List.length |> toString)
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
        , placeholder "e.g. \"Amazon\", \"Orinoco\""
        , value model.searchInput
        , onInput address Search
        ]
        [ ]
      ]

searchResults : Address Action -> Model -> Html
searchResults address model =
  let
    results : List River
    results =
      if not (isEmpty model.searchInput)
        then model.searchResults |> filterRivers model.searchInput
        else model.searchResults
  in
    results
    --  --|> List.sortBy .realLength
    --  --|> List.reverse
      |> riversList address
