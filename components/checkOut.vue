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
          small
          fab
          rounded
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-basket-minus</v-icon>
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
          <v-toolbar-title>خروج کالا</v-toolbar-title>
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

        <v-form>
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-text-field
                v-model="form.quantity"
                type="number"
                min="0"
                label="تعداد"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-text-field
                v-model="form.place"
                label="محل استفاده"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-text-field
                v-model="form.discription"
                label="توضیحات"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-text-field
                v-model="form.deliver"
                label="تحویل گیرنده"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-card-actions>
          <v-btn color="success"
                 @click="exiteItem"

          >خروج از انبار</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import swal from "../plugins/swall";

export default {
  name: "checkOut",
  props:['itemId'],

  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      process : false,

      form :{
        quantity : 0,
        discription :'',
        place: '',
        deliver : '',
        entry: 0,
        order_income : 0,
        order_id : '',
        item_id : this.itemId

      },
    }
  },

  methods: {
    async exiteItem() {

        let form = this.form;
        let order = await this.$axios.post('api/entry', form )
        swal.message('خروج کالا با موفقیت انجام شد')


    },


  }

}
</script>

<style scoped>

</style>
