module Main where
{-| [describe main]
-}

import Effects exposing (Effects, Never)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import Task exposing (..)
import Time exposing (Time)

import StartApp

import Model exposing (..)
import Router exposing (..)
import Api

--import Mock
import Debug


-- MAIN

app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = []
    }


main : Signal Html
main =
  app.html


init : (Model, Effects Action)
init =
  ( Model.empty
  , Effects.none
  )


-- MODEL

initialModel : Model
initialModel =
  --Mock.model
  Model.empty


-- UPDATE

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    NoOp ->
      ( model
      , Effects.none
      )

    UpdateSearchInput contents ->
      let
        log = Debug.log "a"
        task =
          Api.search contents
            |> Task.toMaybe
            |> Task.map UpdateSearchResults
            |> Effects.task
      in
        ( { model | searchInput <- contents }
        , task
        )

    UpdateSearchResults maybeRivers ->
      let
        log = Debug.log "b"
        newSearchResults =
          Maybe.withDefault model.searchResults maybeRivers
      in
        ( { model | searchResults <- newSearchResults }
        , Effects.none
        )

    UpdateRiver maybeRiver ->
      ( { model | river <- maybeRiver }
      , Effects.none
      )

    ChangeUrl url ->
      ( { model | url <- url }
      , Effects.none
      )


-- VIEW

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ Router.view address model ]


-- PORTS

port tasks : Signal (Task Never ())
port tasks =
  app.tasks
