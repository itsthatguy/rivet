# Configuration

If you don't want to use the Rivet default configuration, you can move your configuration into a separate file.

## File-based Configuring

### `package.json`

```json
{
  "rivet": {
    "contractsRoot": "contracts/"
  }
}
```

### Standalone file

Rivet accepts configuration files with the conventions.

- `.rivetrc`
- `.rivetrc.[js|json]`
- `.rivet.[js|json]`
- `rivetrc`
- `rivetrc.[js|json]`
- `rivet.[js|json]`

All configurations found will be merged into a single configuration object. That means, if you have both a rivet configuration file, and rivet configuration defined in `package.json`, they will be merged. `package.json` is the last file read, and anything specified will overwrite other configurations.


> NOTE: Rivet configuration files are CommonJS modules. You can use any javascript here, as long as you export a configuration object.

## Configuration options

### `appRoot`
The root app path.
> Default: Root app directory with package.json

### `contractsRoot`
The root path to your contracts folder, relative to `appRoot`.

> Default: `contracts/"`

### `contractsPath`
Glob pattern used to find contract files, relative to `contractsRoot`.

> Default: `"**/*.contract.json"`

### `compiledContractsRoot`
The location where contracts are compiled, relative to `appRoot`.

> Default: `contracts/json`

### `aliases`

| alias: | `require("mypath")` | `require("mypath/endpoint.contract.js")` |
|--------|---------------------|------------------------------------------|
| `{}` | `"node_modules/mypath/index.js"` | `"node_modules/mypath/endpoint.contract.js"` |
| `{ mypath: "/absolute/path/to/file.js" }` | `"/absolute/path/to/file.js"` | `error` |
| `{ mypath: "/absolute/path" }` | `"/absolute/path/index.js"` | `"/absolute/path/endpoint.contract.js"` |



