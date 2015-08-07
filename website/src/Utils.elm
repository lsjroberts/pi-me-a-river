module Utils where
{-| Utility functions
-}

import Html exposing (Attribute)
import Html.Events exposing (on, onClick, targetValue)
import Signal exposing (Address, message)

import History


onInput : Address a -> (String -> a) -> Attribute
onInput address f =
  on "input" targetValue (\v -> message address (f v))

--routeTo : Address a -> String -> Attribute
routeTo address url =
  onClick address (History.setPath url)

join : String -> List String -> String
join glue items =
  items |> List.intersperse glue |> List.foldr (++) ""

last : List a -> Maybe a
last items =
  items |> List.drop ((List.length items)-1) |> List.head