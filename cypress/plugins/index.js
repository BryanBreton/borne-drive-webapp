// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const path = require('path');

module.exports = (on, config) => {
  // Ajout de l'extension "ignore-x-frame-headers" afin de passer l'authentification Forgerock quand on n'est pas en HTTPS
  on("before:browser:launch", (browser = {}, args) => {
    if (browser.name === "chrome") {
      const ignoreXFrameHeadersExtension = path.join(__dirname, "../extensions/ignore-x-frame-headers")
      args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`))
      args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process")
    }
    return args
  })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return Object.assign({}, config, {
    integrationFolder: "cypress/tests"
  })
}
