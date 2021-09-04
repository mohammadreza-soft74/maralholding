import Vue from 'vue';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    inputFormat: 'YYYY-MM-DD HH:mm',
    format: 'jYYYY-jMM-jDD HH:mm',
    editable: false,
    altFormat: 'YYYY-MM-DD HH:mm',
    color: '#00acc1',
    autoSubmit: false,
    //...
    //... And whatever you want to set as default
    //...
  }
});
