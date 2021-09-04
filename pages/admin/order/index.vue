<template>
  <v-card class="elevation-5">
    <v-data-table
      :headers="headers"
      :items="orders.data"
      hide-default-footer
      :server-items-length="orders.meta.total"
      no-data-text="سفارشی موجود نیست"
      s

      @click:row=""
    >


      <template v-slot:item.invoice="props">
        <v-edit-dialog
          :return-value.sync="props.item.invoice"
          @save="saveInvoice(props.item.id, props.item.invoice)"
          @close="close"
        >
          {{ props.item.invoice }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.invoice"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>



      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>سفارشات</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            persistent
            v-model="dialog"
            max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                سفارش جدید
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">ثبت سفارش</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-autocomplete
                        :search-input.sync="man"
                        v-model="selectedMan"
                        :items="men"
                        color="white"
                        item-text="name"
                        item-value="id"
                        label="سفارش دهنده"
                        no-data-text="با سفارش دهنده ای منطبق نیست"
                        @keyup="manSearch"
                        :disabled="orderDisable"
                      ></v-autocomplete>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-autocomplete
                        :search-input.sync="place"
                        v-model="selectedPlace"
                        :items="places"
                        color="white"
                        item-text="name"
                        item-value="id"
                        label="محل سفارش"
                        no-data-text="با محل سفارشی منطبق نیست"
                        @keyup="placeSearch"
                        :disabled="orderDisable"
                      ></v-autocomplete>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-btn
                        :disabled="orderDisable"
                        fab
                        small
                        color="green"
                        @click="addOrder"
                      >
                        <v-icon>
                          mdi-check-outline
                        </v-icon>
                      </v-btn>
                    </v-col>


                  </v-row>

                  <v-divider ></v-divider>

                  <v-row v-show="orderDisable">

                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >
                      <v-autocomplete
                        :search-input.sync="item"
                        v-model="selectedItem"
                        :items="items"
                        item-text="name"
                        item-value="id"
                        label="نام کالا"
                        no-data-text="با کالایی منطبق نیست"
                        @keyup="itemSearch"
                        :disabled="!orderDisable"
                      ></v-autocomplete>

                    </v-col>

                    <v-col
                      cols="12"
                      sm="2"
                      md="1"
                    >
                      <v-text-field
                        hide-details
                        single-line
                        v-model="quantity"
                        label="تعداد"
                        min="0"
                        type="number"
                        :disabled="!orderDisable"
                      ></v-text-field>

                    </v-col>



                    <v-col
                      cols="12"
                      sm="6"
                      md="3"
                    >

                      <v-text-field
                        :disabled="!orderDisable"
                        v-model="itemPlace"
                        label="محل استفاده"
                      ></v-text-field>

                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >

                      <v-text-field
                        label="توضیحات"
                        v-model="description"
                        :disabled="!orderDisable"
                      ></v-text-field>

                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="12"
                    >
                      <v-btn
                        class="mx-2"
                        :disabled="!orderDisable"
                        dark
                        block
                        color="primary"
                        @click="addItem"
                      >
                        افزودن
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  بستن
                </v-btn>


              </v-card-actions>
            </v-card>

          </v-dialog>

        </v-toolbar>
      </template>


      <template v-slot:item.actions="{ item }">
        <order-detail :order-id="item.id"></order-detail>
      </template>

<!--      <template v-slot:top="{ pagination, options, updateOptions }">-->
<!--        <v-data-footer-->
<!--          :pagination="pagination"-->
<!--          :options="options"-->
<!--          :items-per-page-options="[orders.meta.per_page,-1]"-->
<!--          @update:options="updateOptions"-->
<!--          items-per-page-text="تعداد رکورد ها"-->
<!--          items-per-page-all-text="همه"-->
<!--          show-first-last-page-->
<!--          page-text=""-->
<!--          next-icon="mdi-arrow-right"-->
<!--          prev-icon="mdi-arrow-left"-->
<!--        />-->
<!--        <v-divider></v-divider>-->
<!--      </template>-->

    </v-data-table>

    <v-pagination v-model="orders.meta.current_page"
                  :length="orders.meta.last_page"
                  circle
                  dark
                  prev-icon="mdi-arrow-left"
                  next-icon="mdi-arrow-right"
                  @input="changePage"
    >
    </v-pagination>
  </v-card>
</template>

<script>


import swal from "../../../plugins/swall";
import OrderDetail from "../../../components/OrderDetail";
import swall from "../../../plugins/swall";

export default {
  name: "index",
  components: {OrderDetail},
  layout:'adminDashboardLayout',

  async asyncData({$axios}) {
    let orders = await $axios.get('api/order')
    return{
      orders : orders.data
    }
  },
  data() {
    return {
      orderId:'',
      quantity:'0',
      description:'',
      entry:true,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      men : [],
      man : '',
      selectedMan:'',

      places : [],
      place : '',
      selectedPlace:'',

      items:[],
      item:'',
      selectedItem:'',

      itemPlace:'',

      orderDisable: false,

      headers: [
        {
          text: 'شماره سفارش',
          value: 'id',
        },
        {
          text: 'سفارش دهنده ',
          value: 'man',
        },
        {
          text: 'محل سفارش',
          value: 'place',
        },
        {
          text: 'تاریخ سفارش',
          value: 'created',
        },
        {
          text: 'شماره فاکتور',
          value: 'invoice',
        },
        {
          text: 'عملیات',
          value: 'actions',
        },
      ],
    }
  },

  methods: {
    async manSearch() {
      let man= await this.$axios.get('/api/man',{
        params:{
          name : this.man
        }
      })

      this.men = man.data.data;


    },

    async placeSearch() {
      let places= await this.$axios.get('/api/place',{
        params:{
          name : this.place
        }
      })

      this.places = places.data.data;

    },


    async itemSearch() {
      let items= await this.$axios.get('/api/itemSearch',{
        params:{
          name : this.item
        }
      })

      this.items = items.data.data;

    },

    async addOrder(){
      let order = await this.$axios.post('api/order', {
        men_id : this.selectedMan,
        place_id : this.selectedPlace,
      })
      this.orderDisable = true
      this.orderId = order.data.id

    },

    async addItem() {
      let order = await this.$axios.post('api/entry', {
        entry: true,
        quantity:this.quantity,
        discription:this.description,
        order_id:this.orderId,
        item_id : this.selectedItem,
        place : this.itemPlace
      })
      swall.message('  سفارش  ' + this.item + '  ثبت شد  ')
    },

    close() {
      this.dialog = false;
      this.description = null;
      this.selectedPlace = null;
      this.quantity = null;
      this.selectedItem = null;
      this.itemPlace = null;
      this.selectedMan = null;
      this.orderDisable = false;
      this.$nuxt.refresh()

    },

    async saveInvoice(id, invoiceNo) {
      //console.log(id)
      let invoice = await this.$axios.patch('api/order/' + id, {
        invoiceNo : invoiceNo,
      });
    },

    async changePage() {
      let response = await this.$axios.get('api/order?page=' + this.orders.meta.current_page)
      this.orders = response.data
    },



  },
}
</script>

<style scoped>

</style>
