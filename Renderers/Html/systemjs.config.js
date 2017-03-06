/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '/node_modules/',
      'src:': '/src/',
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      src: 'src',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',

      // ng2 libraries
      'ng2-translate/ng2-translate': 'npm:ng2-translate/bundles/ng2-translate.umd.js',
      'ng2-translate': 'npm:ng2-translate/bundles/ng2-translate.umd.js',
      'ng2-cookies/ng2-cookies': 'npm:ng2-cookies/',
     
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'file-saver': 'npm:file-saver/FileSaver.js',
      'crypto-js': 'npm:crypto-js/crypto-js.js',
      'lodash' : 'npm:lodash/lodash.min.js',
      'jquery' : 'npm:jquery/dist/jquery.min.js',
      'brace': 'npm:brace',
      'markdown-it': 'npm:markdown-it/dist/markdown-it.min.js',
      'vkbeautify': 'npm:vkbeautify/index.js',
      'w3c-blob': 'npm:w3c-blob/index.js',
      'buffer': 'npm:buffer/index.js',
      'isarray': 'npm:isarray/index.js',
      'ieee754': 'npm:ieee754/index.js',
      'base64-js': 'npm:base64-js/base64js.min.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      src: {
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'ng2-cookies/ng2-cookies': {
        main: './index.js',
        defaultExtension: 'js'
      },
      brace: {
        main: './index.js',
        defaultExtension: 'js' 
      }
    }
  });
})(this);
