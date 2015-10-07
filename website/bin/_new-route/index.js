var {{Name}}Route = {
  path: '{{name}}',

  getChildRoutes (location, next) {
    require.ensure([], function (require) {
      next(null, [
        // require('./routes/sub-route')
      ]);
    });
  }

  getComponents (next) {
    require.ensure([], function (require) {
      next(null, [
        require('./containers/{{name}}'),
        require('./components/{{name}}')
      ]);
    })
  }
}
