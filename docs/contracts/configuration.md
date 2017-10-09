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
|contractsRoot|`contracts/`|string|The root path to your contracts folder|
|contractsPath|glob string|`**/*.contract.json`||
|compiledContractsRoot|