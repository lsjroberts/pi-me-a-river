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
        , placeholder "e.g. \"Amazon\", \"Orinoco\""
        , value model.searchInput
        , onInput address UpdateSearchInput
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
      --|> List.sortBy .realLength
      --|> List.reverse
      |> riversList

{-
view : String -> Result String (List River) -> Html
view string result =
  let
    field =
      input
        [ placeholder "River"
        , value string
        , on "input" targetValue (Signal.message query.address)
        , myStyle
        ]
        []

    viewRiver river =
      div [ myStyle ]
        [ a [ href ("/river/" ++ (toString river.id)) ] [ text river.name ]
        ]

    messages =
      case result of
        Err msg ->
          [ div [ myStyle ] [ text msg ] ]

        Ok rivers ->
          List.map viewRiver rivers
  in
    div [] (field :: messages)


myStyle : Attribute
myStyle =
  style
    [ ("width", "100%")
    , ("height", "40px")
    , ("padding", "10px 0")
    , ("font-size", "2em")
    , ("text-align", "center")
    ]

-}
