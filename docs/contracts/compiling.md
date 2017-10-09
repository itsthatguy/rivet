# Compiling

### _... WIP - Not sure where to put this..._
When defining an API's collection of endpoints, you have many duplications. Maintaining this in pure JSON can be difficult. For example, describing that the value of a key in a JSON payload is of type UUID requires including a Regular Expression in your JSON Schema to validate the field. JSON Schema has mechanisms for referencing external resources where you could store and reference the duplicate definitions. However, this feature of JSON Schema is implemented in different ways depending on the JSON Schema parser that you're using. Which, if your system has many different languages, you are forced to use different parsers.

To help with this, we've decided that defining your contracts in javascript, and leveraging CommonJS modules, we can make for a much nicer environment for maintaining, and creating your contracts. This way, you can share duplication definitions across multiple contracts, without having to implement custom solutions for JSON Schema parsing.

The way we do this is by compiling your contracts from Javascript, into JSON files, with everything resolved and ready for use.

Json-schema types, and properties exist to make defining schemas for your application much easier, and less redundant. To do this, we take commonly used elements in a schema, define them here, then in your application schemas you can simply do the following:

