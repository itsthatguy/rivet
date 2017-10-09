# Configuration

> Notes:

> Available locations are merged
> - `.contractrc`
> - `contract.rc.[json|xml|js]`
> - `package.json`

> Document all configuration options

| option | type | default | description |
|--------|------|---------|-------------|
|appRoot|string|Directory with package.json|The root path|
|contractsRoot|string|`contracts/`|The root path to your contracts folder, relative to `appRoot`|
|contractsPath|string|`**/*.contract.json`|Glob pattern used to find contract files, relative to `contractsRoot`|
|compiledContractsRoot|string|`contracts/json`|Where contracts are compiled to, relative to `appRoot`|