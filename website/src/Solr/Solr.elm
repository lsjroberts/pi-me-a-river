import Http
import Json.Decode as Json exposing (..)
import Task exposing (Task)
import Html exposing (Html)

-- Lookups
--lookupRiver : String -> Task Http.Error (List String)
--lookupRiver keywords =
--  Http.get rivers (query keywords)


-- Decoders

type alias Data =
  { responseHeader : ResponseHeader
  , response : Response
  }

data : Decoder Data
data =
  object2 Data
    ("responseHeader" := responseHeader)
    ("response" := response)

type alias ResponseHeader =
  { status : Int
  }

responseHeader : Decoder ResponseHeader
responseHeader =
  object1 ResponseHeader
    ("status" := int)

type alias Response =
  { numFound : Int
  , start : Int
  --, docs : List Doc
  }

response : Decoder Response
response =
  object2 Response
    ("numFound" := int)
    ("start" := int)
    --("docs" := list doc)

--type Doc = RelationDoc Relation | WayDoc Way | NodeDoc Node

--doc : Decoder Doc
doc =
  ("docType" := string) `andThen` docInfo

--docInfo : String -> Decoder Doc
docInfo docType =
  case docType of
    "relation" -> relation
    --"way" -> way
    --"node" -> node

type alias Relation =
  { docType : List String
  , id : Int
  , ways : List Int
  , name : Maybe (List String)
  , name_en : Maybe (List String)
  }

relation : Decoder Relation
relation =
  object5 Relation
    ("docType" := list string)
    ("id" := int)
    ("ways" := list int)
    (maybe ("name" := list string))
    (maybe ("name_en" := list string))

type alias Way =
  { docType : List String
  , id : Int
  , nodes : List Int
  , name : Maybe (List String)
  , name_en : Maybe (List String)
  }

way : Decoder Way
way =
  object5 Way
    ("docType" := list string)
    ("id" := int)
    ("nodes" := list int)
    (maybe ("name" := list string))
    (maybe ("name_en" := list string))

type alias Node =
  { docType : List String
  , id : Int
  , lat : List Float
  , lon : List Float
  }

node : Decoder Node
node =
  object4 Node
    ("docType" := list string)
    ("id" := int)
    ("lat" := list float)
    ("lon" := list float)

-- Config
baseUrl : String
baseUrl =
  "http://localhost:8983/solr/rivers/select?"

find : String -> String
find q =
  baseUrl ++ "q=" ++ q ++ "&wt=json"


main : Signal Html
main =
  Signal.map view solr.signal

view : Data -> Html
view {response} =
  Html.text response.numFound


solr : Signal.Mailbox String
solr =
  Signal.mailbox ""

report : Data -> Task x ()
report response =
  Signal.send solr.address (toString response)

port lookup : Task Http.Error ()
port lookup =
  Http.get data (find "Amazon") `Task.andThen` report

--query : Signal.Mailbox String
--query =
--  Signal.mailbox ""

--results : Signal.Mailbox (Result String Data)
--results =
--  Signal.mailbox (Err "Couldn't find that river")

--port lookup : String -> Task.Task Http.Error (Data)
--port lookup =
--  Http.get data (find q) `Task.andThen`

--main =
--  Signal.map2 view query.signal results.signal
