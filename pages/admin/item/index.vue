<template>

  <v-card class="elevation-5"
  >
    <v-data-table
    :headers="headers"
    :items="items.data"
    :items-per-page="30"
    sort-by="calories"
    class="elevation-1"
    :item-class="sss"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>کالا ها</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-toolbar-items>

        <v-text-field
          class="mt-3"
          label="جستجوی کالا"
          v-model="searchItem"
          @keyup="searchItems"
        ></v-text-field>
        </v-toolbar-items>

        <v-spacer></v-spacer>


        <v-dialog
          v-model="dialog"
          max-width="500px"
          persistent

        >


          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              کالای جدید
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card >
            <v-card-title >
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item.name"
                      label="نام کالا"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item.code"
                      label="کد کالا"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item.minimum"
                      label="حداقل موجودی"
                      min="0"
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item.description"
                      label="توضیحات کالا"
                    ></v-text-field>
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
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                ذخیره
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:item.minimum="{item}">
      <v-chip color="primary">{{item.minimum}}</v-chip>
    </template>

    <template v-slot:item.count="{item}">
      <v-chip color="primary">{{item.count}}</v-chip>
    </template>

    <template v-slot:item.exit="{item}">
      <check-out v-if="item.count > 0" :item-id="item.id"></check-out>
    </template>

    <template v-slot:item.actions="{ item }">
<!--      <v-btn rounded elevation="5"-->
<!--        class="ml-3 pb-5 pt-0"-->
<!--        @click="editItem(item)"-->
<!--      >-->
<!--        mdi-pencil-->
<!--      </v-btn>-->

      <v-btn fab small color="info" @click="editItem(item)">
        <v-icon >mdi-pen</v-icon>
      </v-btn>


      <v-btn
        rounded
        fab
        small
        color="error"
        @click="deleteItem(item)"
      >
        <v-icon>mdi-delete</v-icon>

      </v-btn>


    </template>

  </v-data-table>

    <v-pagination v-model="items.meta.current_page"
                  :length="items.meta.last_page"
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
import CheckOut from "../../../components/checkOut";
import swall from "../../../plugins/swall";
export default {
  components: {CheckOut},
  layout:'adminDashboardLayout',
  middleware: 'auth',
  name: "index",

   async asyncData({$axios}) {
      const items = await $axios.get('/api/item');


    return{
      items: items.data
    }
  },
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      headers: [
        {
          text: 'شماره کالا',
          value: 'id',
        },
        {
          text: 'نام کالا',
          value: 'name',
        },
        {
          text: 'کد کالا ',
          value: 'code',
        },
        {
          text: 'تعداد موجود',
          value: 'count',
        },
        {
          text: 'حداقل موجودی',
          value: 'minimum',
        },
        {
          text: 'توضیحات',
          value: 'description',
        },
        {
          text: 'عملیات',
          value: 'actions',
        },
        {
          text: 'خروج',
          value: 'exit',
        },
      ],
      item:{
        name:'',
        code:'',
        minimum: 0,
        description:'',
        count : ''
      },

      defaultItem: {
        name:'',
        code:'',
        description:'',
        count : ''
      },

      searchItem : ' ',
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'کالای جدید' : 'به روز رسانی کالا'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods:{
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.item = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

      //this.$nuxt.refresh()
    },

    async save () {
      if (this.editedIndex > -1) {
        let res = await this.$axios.patch('api/item/'+ this.item.id, {
          name: this.item.name,
          code: this.item.code,
          description: this.item.description,
          count : this.item.count,
          minimum : this.item.minimum
        });
        Object.assign(this.items.data[this.editedIndex], this.item)

      } else {
        let res = await this.$axios.post('api/item', {
          name: this.item.name,
          code: this.item.code,
          description: this.item.description,
          count : this.item.count,
          minimum : this.item.minimum
        })

        this.items.data.push(this.item)

      }
      this.close()
    },

    async editItem (item) {
      this.editedIndex = this.items.data.indexOf(item)
      this.item = Object.assign({}, item)
      this.dialog = true
    },


   async deleteItem (item) {
      this.editedIndex = this.items.data.indexOf(item)
      this.item = Object.assign({}, item)

      swall.confirm('ایا مایل به حذف کالای مورد نظر میباشید؟ با حذف کالا کلیه سفارشات و ورودی و خروجی انبار نیز حذف میگردد','warning', '').then((result) => {
        if (result.value){
          let res =  this.$axios.delete('api/item/' + this.item.id)
          this.items.data.splice(this.editedIndex, 1)

        }
      })
    },


    async searchItems() {
      let items= await this.$axios.get('/api/itemSearch',{
        params:{
          name : this.searchItem
        }
      })

      this.items = items.data;
    },

    async changePage() {
      let response = await this.$axios.get('api/item?page=' + this.items.meta.current_page)
      this.items = response.data
    },

    sss(it){
      return it.minimumColor;
    }



  }


}
</script>

<style scoped>

.styleFalse{
  color: orangered !important;
}

.styleTrue{
  background: lightgreen;
}

</style>
