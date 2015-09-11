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

    -- Actions
    Search name ->
      let
        searchTask =
          Api.search name
            |> Task.toMaybe
            |> Task.map UpdateSearchResults
            |> Effects.task
      in
        ( { model | searchInput <- name }
        , searchTask
        )

    ShowRiver id ->
      let
        findTask =
          Api.find id
            |> Task.toMaybe
            |> Task.map UpdateRiver
            |> Effects.task
      in
        ( { model | url <- "/river" }
        , findTask
        )

    Visit url ->
      ( { model | url <- url }
      , Effects.none
      )

    -- Side Effects
    UpdateSearchResults maybeRivers ->
      let
        log = Debug.log "UpdateSearchResults" maybeRivers
        newSearchResults =
          Maybe.withDefault [] maybeRivers
      in
        ( { model | searchResults <- newSearchResults }
        , Effects.none
        )

    UpdateRiver maybeRiver ->
      let
        log = Debug.log "UpdateRiver" maybeRiver
      in
        ( { model | river <- maybeRiver }
        , Effects.none
        )


--forward : Action -> Task -> Effects Action
--forward action task =
--  task
--    |> Task.toMaybe
--    |> Task.map action
--    |> Effects.task


-- VIEW

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ Router.view address model ]


-- PORTS

port tasks : Signal (Task Never ())
port tasks =
  app.tasks
