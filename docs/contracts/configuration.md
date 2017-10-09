# Configuration

> Notes:

> Available locations are merged
> - `.contractrc`
> - `contract.rc.[json|xml|js]`
> - `package.json`

> Document all configuration options


|compiledContractsRoot|string|`contracts/json`||
|aliases|array of objects|`{}`||

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

| alias:                          | `require("mypath")` | `require("mypath/endpoint.contract.js")` |
|--------|---------------------|------------------------------------------|
| `{}` | `"node_modules/mypath/index.js"` | `"node_modules/mypath/endpoint.contract.js"` |
| `{ mypath: "/absolute/path/to/file.js" }` | `"/absolute/path/to/file.js"` | `error` |
| `{ mypath: "/absolute/path" }` | `"/absolute/path/index.js"` | `"/absolute/path/endpoint.contract.js"` |



