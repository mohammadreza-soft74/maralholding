<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      persistent

      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          fab
          small
          dark
          v-bind="attrs"
          v-on="on"
          @click="getEntries"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>کالا های سفارش</v-toolbar-title>
          <v-spacer></v-spacer>
<!--          <v-toolbar-items>-->
<!--            <v-btn-->
<!--              dark-->
<!--              text-->
<!--              @click="dialog = false"-->
<!--            >-->
<!--              Save-->
<!--            </v-btn>-->
<!--          </v-toolbar-items>-->
        </v-toolbar>

        <v-divider></v-divider>

        <v-data-table
          :headers="headers"
          :items="orderEntries"

          :loading="process"
          :items-per-page="30"
          locale="IR-FA"
          no-data-text="سفارشی موجود نیست"
          loading-text="در حال دریافت اطلاعات"
          class="elevation-1"

        >

          <template v-slot:item.entry_status="{ item }">
            <v-checkbox
              v-model="item.order_income"
              @change="updateOrderIncome(item)"
              color="success"
              hide-details
            ></v-checkbox>
          </template>

        </v-data-table>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import swal from "../plugins/swall";

export default {
  name: "OrderDetail",
  props:['orderId'],

  methods: {
   async getEntries() {
     this.process = true;
      let entries = await this.$axios.get('api/order/' + this.orderId);
      //this.orderEntries = entries.data.data.entries
     this.orderEntries = entries.data.data.entries;

     this.process = false;

    },

    async updateOrderIncome(item) {
     this.process = true
      let order = await this.$axios.patch('api/entry/' + item.id,{
        order_income : item.order_income
      })
      this.process = false
      swal.message(' وضعیت کالای ' + item.name + ' تغییر پیدا کرد ', 'success')
    }
  },

  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      process : false,
      orderEntries:[],

      headers: [
        {
          text: 'شماره',
          value: 'id',
        },
        {
          text: 'نام ',
          value: 'name',
        },
        {
          text: 'محل مصرف',
          value: 'place',
        },
        {
          text: 'تعداد',
          value: 'quantity',
        },
        {
          text: 'توضیحات',
          value: 'description',
        },
        {
          text: 'وضعیت',
          value: 'income',
        },

        {
          text: 'رسید',
          value: 'entry_status',
        }
      ],
    }
  },




}
</script>

<style scoped>

</style>
