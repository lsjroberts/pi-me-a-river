module Main where
{-| [describe main]
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Signal exposing (Address)

import StartApp
import Router
import History

import Model exposing (..)
import Router exposing (..)
import Pages.Index
import Pages.About
import Pages.Data
import Pages.Docs
import Pages.Errors

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

route : Route (Address Action -> Model -> Html)
route =
  Router.match
    [ ("/", Pages.Index.view)
    , ("/about", Pages.About.view)
    ]
    Pages.Errors.notFound


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
    [ Signal.map3 route History.path address model ]