import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    'https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.17/vuetify.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options);
