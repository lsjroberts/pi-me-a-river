module Main where
{-| [describe main]
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)

import StartApp

import Model exposing (..)
import Router exposing (..)

import Mock


-- MAIN

main : Signal Html
main =
  StartApp.start
    { model = initialModel
    , view = view
    , update = update
    }


-- MODEL

initialModel : Model
initialModel =
  Mock.model


-- UPDATE

update : Action -> Model -> Model
update action model =
  case action of
    NoOp ->
      model

    UpdateSearchInput contents ->
      { model | searchInput <- contents }

    ChangeUrl url ->
      { model | url <- url }


-- VIEW

view : Address Action -> Model -> Html
view address model =
  div [ class "wrapper" ]
    [ Router.view address model ]