export { default as Home } from './containers/Home';

/*
var HomeRoute = {
  path: 'home',

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
        require('./containers/home'),
        require('./components')
      ]);
    })
  }
}
*/
