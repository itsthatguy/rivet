# Composability

With contract tests composability you are able to reuse fundamental pieces of your contracts, such as data types, to make your them much more maintainable. We do this by leveraging CommonJS modules, and compiling your contracts to JSON.

## Defaults

Rivet ships with a few pre-defined data types.

### `email`

```json
{
  "id": "types.email",
  "type": "string",
  "format": "email"
}

```

### `phone`
```json
{
  "id": "types.phone",
  "type": "string",
  "pattern": "((\\(\\d{3}\\) ?)|(\\d{3}-))?\\d{3}-\\d{4}"
}
```

### `token`
```json
{
  "id": "types.token",
  "type": "string",
  "pattern": "^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
}
```

### `uri`
```json
{
  "id": "types.uri",
  "type": "string",
  "pattern": "[0-9a-fA-F]{8,20}"
}
```

### `uuid`
```json
{
  "id": "types.uuid",
  "type": "string",
  "format": "uuid",
  "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$"
}
```

## Custom Data Types

JSON Schema has a limited number of data types that it supports. For example, string, number, boolean. However, you can build custom data type validation using the `pattern` key in JSON schema. This is useful for data types with a value such as`token`.

There is no mechanism for stuffing these custom data types into Rivet, however, you can still store them in your project, or an npm module, and reference them on your own.

**Custom **`token`** data type:**

```json
{
  "id": "types.token",
  "type": "string",
  "pattern": "^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
}
```


