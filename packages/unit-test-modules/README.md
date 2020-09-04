# Unit test server modules

Boilerplate code for a simple WebApp with unit tests for server modules. To run the tests use commands `yarn install` and `yarn run test`. In order for the modules to be ran in a Node.js environment they have to be converted to the CommonJS standard. In order to convert a module you'll have to add the `define-shim.js` to the `src` folder in your project and add the `if`-statement to your modules.

```javascript
if (typeof define !== 'function') {
  var define = require('../../define-shim').define(module);
}
```

## Building

- `npm run create-addon` creates an addon with the name configured in the setup task
- `npm run build` compresses `/src` into `/dist`. If you use babel to transpile your code, this target will compress a transpiled version of your `/src`
- `npm run build deploy` runs the build step and deploys to the addon configured in the setup task
- `npm run build force-deploy` runs the build step and deploys with the possibility to overwrite an existing WebApp
- `npm run dev` watches files for changes and runs `build force-deploy` on save
- `npm run sign` invokes the signing endpoint of the SiteVision developer REST API. A signed version of the WebApp will be created in the `/dist` folder
- `npm run deploy-prod` deploys the signed WebApp to a production environment
- `npm run setup-dev-properties` creates .dev-properties.json with information about the development environment

[Visit developer.sitevision.se for more information](https://developer.sitevision.se)
