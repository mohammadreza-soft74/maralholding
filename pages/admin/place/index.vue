<template>
  <v-container>
    <v-card>
      <v-toolbar color="orange">
        <v-toolbar-title>مکان سفارش</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <v-text-field
            v-model="search"
            outlined
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!--      fruit name edit box-->
        <v-dialog max-width="250px"
                  hide-overlay
                  persistent
                  transition="dialog-bottom-transition"
                  v-model="editDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>

            <v-toolbar color="orange">
              <v-toolbar-title > مکان سفارش </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-icon @click="close">mdi-close</v-icon>
            </v-toolbar>


            <v-card-text>
              <v-container>
                <v-form v-model="valid"
                        ref="form"
                >
                  <v-row>

                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="place.name"
                        type="text"
                        label="نام"
                        prepend-icon="mdi-account"
                        @keypress.enter.prevent="savePlace"
                        required
                      ></v-text-field>
                    </v-col>

                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                لغو
              </v-btn>


              <v-btn
                color="blue darken-1"
                text
                :disabled="!valid"
                @click="savePlace"
                :loading="proccess"
              >
                ذخیره
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>

        <v-spacer></v-spacer>

        <v-btn v-if="!$device.isMobile"
               small
               fab
               @click="$router.back()"
        >
          <v-icon color="red">mdi-arrow-left</v-icon>
        </v-btn>

      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="places"
        :items-per-page="10"
        :loading="proccess"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.operation="{ item }">
          <v-btn fab small color="red">
            <v-icon v-on:click="deletePlace(item)">mdi-delete</v-icon>
          </v-btn>

          <v-btn fab small color="primary">
            <v-icon v-on:click="editPlace(item)">mdi-pen</v-icon>
          </v-btn>

        </template>

        <template v-slot:no-results>

          کلمه وارد شده با هیچ مقداری مطابقت ندارد
        </template>

        <template v-slot:no-data>

          نتیجه ای یافت نشد

        </template>

      </v-data-table>

    </v-card>
  </v-container>
</template>

<script>
import swall from "../../../plugins/swall";

export default {
  name: "index",
  layout:'adminDashboardLayout',

  head() {
    return {
      title: 'افزودن مکان سفارش ' + process.env.NAME,
    }
  },

  data() {
    return {
      headers: [
        {
          text: 'شناسه',
          value: 'id',
        },
        {
          text: 'نام ',
          value: 'name',
        },
        {
          text: 'عملیات',
          value: 'operation',
        },
      ],

      proccess: false,

      editDialog : false,
      editedIndex : -1,
      search:null,

      place: {
        id: null,
        name: null,
      },


    }
  },
  methods: {

    async savePlace(){
      try {
        if (this.editedIndex > -1){
          this.proccess = true;
          let response = await this.$axios.patch('api/places/'+ this.place.id, {
            name: this.place.name
          } )
          this.proccess = false;
          Object.assign(this.places[this.editedIndex], this.place);
          this.close();


        }
        else {
          this.proccess = true;
          let res = await this.$axios.post('api/places', {
            name: this.place.name
          });
          this.proccess = false;
          this.places.push(this.place);
          this.close();
        }

      }catch (err){


      }
    },

    deletePlace(item) {
      try {
        swall.confirm('ایا مایل به حذف مکان میباشید؟','warning', '').then((result) => {
          if (result.value){
            this.$axios.delete('api/places/' + item.id);
            let index = this.places.indexOf(item);
            this.places.splice(index, 1);

          }
        })
      }catch (err){

      }

    },
    editPlace(item){
      this.editedIndex = this.places.indexOf(item)
      this.place = Object.assign({}, item);
      this.editDialog = true;

    },

    close() {
      this.editDialog = false
      this.$nextTick(() => {
        this.place = Object.assign({}, [])
        this.editedIndex = -1
      });
    },

  },
  async asyncData({$axios}) {
    try {
      let response = await $axios.get('api/places');
      let places = response.data.data;


      return {
        places
      }
    }catch (err){

    }
  }
}
</script>

<style scoped>

</style>
