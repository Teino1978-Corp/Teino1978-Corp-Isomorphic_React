.get('/:path*', function *() {
      let
        theme   = this.query.theme || config.layout.theme,
        appFile = path.join(config.layout.publicDir, 'themes', theme, `${theme}.js`);

      let App = require(appFile);

      let bootstrap = {
        path: this.path
      };

      let layoutData = _.defaults({
        stylesheet: `/themes/${theme}/${theme}.css`,
        javascript: `/themes/${theme}/${theme}.js`,
        rootHTML: yield App.start(bootstrap),
        appStart: `App.start(${htmlescape(bootstrap)});`
      }, config.layout.pageConstants);

      this.body = app.layout(layoutData);
    });