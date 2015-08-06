module Utils where
{-| Utility functions
-}

import Html exposing (Attribute)
import Html.Events exposing (on, targetValue)
import Signal exposing (Address)


onInput : Address a -> (String -> a) -> Attribute
onInput address f =
  on "input" targetValue (\v -> Signal.message address (f v))

join : String -> List String -> String
join glue items =
  items |> List.intersperse glue |> List.foldr (++) ""

last : List a -> Maybe a
last items =
  items |> List.drop ((List.length items)-1) |> List.head