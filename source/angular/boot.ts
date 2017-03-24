
// This is how you import components in ES6
// Absolute paths like the one below looks into node_modules
import {platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Relative paths look up from the current file
import {AdaptiveCardModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AdaptiveCardModule)
  .then(function() {
    console.log('Browser is ready to go');
  }, function(err) {
    console.error('Ouch, something went wrong', err);
  });
