<template>
  <v-container>
    <v-card>
      <v-toolbar color="orange">
        <v-toolbar-title>پرسنل</v-toolbar-title>
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
              <v-toolbar-title > پرسنل </v-toolbar-title>
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
                        v-model="person.name"
                        type="text"
                        label="نام"
                        prepend-icon="mdi-account"
                        @keypress.enter.prevent="savePerson"
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
                @click="savePerson"
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
        :items="persons"
        :items-per-page="10"
        :loading="proccess"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.operation="{ item }">
          <v-btn fab small color="red">
            <v-icon v-on:click="deletePerson(item)">mdi-delete</v-icon>
          </v-btn>

          <v-btn fab small color="primary">
            <v-icon v-on:click="editPerson(item)">mdi-pen</v-icon>
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
      title: 'افزودن پرسنل ' + process.env.NAME,
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

      person: {
        id: null,
        name: null,
      },


    }
  },
  methods: {

    async savePerson(){
      try {
        if (this.editedIndex > -1){
          this.proccess = true;
          let response = await this.$axios.patch('api/men/'+ this.person.id, {
            name: this.person.name
          } )
          this.proccess = false;
          Object.assign(this.persons[this.editedIndex], this.person);
          this.close();


        }
        else {
          this.proccess = true;
          let res = await this.$axios.post('api/men', {
            name: this.person.name
          });
          this.proccess = false;
          this.persons.push(this.person);
          this.close();
        }

      }catch (err){


      }
    },

    deletePerson(item) {
      try {
        swall.confirm('ایا مایل به حذف شخص مورد نطر میباشید؟','warning', '').then((result) => {
          if (result.value){
            this.$axios.delete('api/men/' + item.id);
            let index = this.persons.indexOf(item);
            this.persons.splice(index, 1);

          }
        })
      }catch (err){

      }

    },
    editPerson(item){
      this.editedIndex = this.persons.indexOf(item)
      this.person = Object.assign({}, item);
      this.editDialog = true;

    },

    close() {
      this.editDialog = false
      this.$nextTick(() => {
        this.person = Object.assign({}, [])
        this.editedIndex = -1
      });
    },

  },
  async asyncData({$axios}) {
    try {
      let response = await $axios.get('api/men');
      let persons = response.data.data;


      return {
        persons
      }
    }catch (err){

    }
  }
}
</script>

<style scoped>

</style>
