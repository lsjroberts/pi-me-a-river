module Main where
{-| [describe main]
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)
import Task exposing (..)
import Time exposing (Time)

-- https://github.com/evancz/start-app/pull/11
--import StartApp
import FancyStartApp exposing (LoopbackFun)

import Model exposing (..)
import Router exposing (..)
import Api
import Pages.Index
import Pages.About
import Pages.Data
import Pages.Docs

import Mock


-- MAIN

main : Signal Html
main =
  fst viewAndTasks

viewAndTasks =
  FancyStartApp.start
    { initialState = initialModel
    , initialTasks = initialTasks
    , externalActions = externalActions
    , view = view
    , update = update
    }


-- MODEL

initialModel : Model
initialModel =
  --Mock.model
  Model.empty

initialTasks : LoopbackFun String Action -> List (Task String ())
initialTasks loopback =
  []


-- UPDATE

--update : LoopbackFun a Action -> Time -> Action -> Model -> (Model, List (Task a ()))
update loopback now action model =
  case action of
    NoOp ->
      ( model
      , []
      )

    UpdateSearchInput contents ->
      ( { model | searchInput <- contents }
      , [ Api.search contents
            |> Task.map (\rivers -> UpdateSearchResults rivers)
            |> loopback
        ]
      )

    UpdateSearchResults rivers ->
      ( { model | rivers <- rivers }
      , []
      )

    ChangeUrl url ->
      ( { model | url <- url }
      , []
      )


-- VIEW

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ Router.view address model ]


-- PORTS

port tasks : Signal (Task String ())
port tasks =
  snd viewAndTasks


port requestSearch : Signal (Task x ())
port requestSearch =
  let
    query = Api.query
    results = Api.results
  in
    Signal.map Api.search query.signal
      |> Signal.map (\task -> toResult task `andThen` Signal.send results.address)


externalActions =
  Signal.constant NoOp
