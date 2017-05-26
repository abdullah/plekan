/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import modules from './core/modules';
import { plekan } from './index';

Vue.config.productionTip = false;

Vue.use(plekan, {
  defaultLanguage: 'tr',
  languages: ['tr', 'en'],
  modules,
  thumbnailPath: '/static/thumbnails/',
  plekan_buttons: {
    // Special buttons
    save: {
      text: 'Show Result',
      class: 'plekan-footer-button save',
      callback(rows) {
        console.log(rows);
      },
    },
    cancel: {
      text: 'Cancel',
      class: 'plekan-footer-button cancel',
      callback(rows) {
        console.table(JSON.parse(JSON.stringify(rows[0].contents)));
      },
    },
  },
});

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
