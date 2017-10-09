# Composability

With contract tests composability you are able to reuse fundamental pieces of your contracts, such as data types, to make your them much more maintainable. We do this by leveraging CommonJS modules, and compiling your contracts to JSON.

## Data Types

JSON Schema has a limited number of data types that it supports. For example, string, number, boolean. However, you can build custom data type validation using the `pattern` key in JSON schema. This is useful for data types with a value such as`token`.

**Custom **`token`** data type:**

```
{  
  "id": "types.token",
  "type": "string",
  "pattern": "^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
}
```

## How to add a custom data type
> Notes:
> - adding to configuration
> - initialize in a `new ContractTest({...})` instance?
> - support loading of your own data type module?



