module Utils where
{-| Utility functions
-}

import Html exposing (Attribute)
import Html.Events exposing (on, targetValue)
import Signal exposing (Address)


onInput : Address a -> (String -> a) -> Attribute
onInput address f =
  on "input" targetValue (\v -> Signal.message address (f v))
