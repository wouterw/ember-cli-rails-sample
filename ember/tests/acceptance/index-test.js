import startApp from 'app/tests/helpers/start-app';

var App;

module('Acceptances - Index Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('index renders', function() {
  expect(1);

  visit('/').then(function() {
    var title = find('h2#title').text();

    equal(title, 'Welcome to Ember.js');
  });
});
