<template>
  <v-container>
    <v-card >
      <v-card-title style="background-color: orange">
        <v-row>
          <v-col cols="12"
                 md="3"
          >
            <!-- search in table-->
            <v-text-field
              v-model="search"

              append-icon="mdi-magnify"
              label="جستجو"
              single-line
              hide-details
            ></v-text-field>
          </v-col>

<!--          <v-col cols="12"-->
<!--                 md="2"-->
<!--          >-->
<!--            <custom-report-picker append-to="body"-->
<!--                                placeholder= 'از سال'-->
<!--                                format= 'YYYY-MM-DD'-->
<!--                                display-format="jYY/jMM/jDD"-->
<!--                                :clearable="true"-->
<!--                                @change="selectedBasket=''"-->
<!--                                v-model="year.from"-->
<!--            />-->
<!--          </v-col>-->

<!--          <v-col cols="12"-->
<!--                 md="2"-->
<!--          >-->
<!--            <custom-report-picker append-to="body"-->
<!--                                :clearable="true"-->
<!--                                placeholder= 'تا سال'-->
<!--                                format= 'YYYY-MM-DD'-->
<!--                                display-format="jYY/jMM/jDD"-->
<!--                                :min="year.from"-->
<!--                                :disabled="!year.from"-->
<!--                                @change="rangeSearch"-->
<!--                                v-model="year.to"-->
<!--            />-->
<!--          </v-col>-->
<!--          -->

          <v-col cols="12"
                 md="3"
                 align="center"
          >
            <v-btn @click="print" color="success">
              <v-icon>mdi-printer</v-icon>
            </v-btn>

          </v-col>

        </v-row>

        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text id="detail">
        <v-data-table
          hide-default-footer
          items-per-page="10"
          loading-text="در حال دریافت اطلاعات"
          :loading="proccess"
          :headers="headers"
          :items="entries"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >


          <template v-slot:item.date="{ item }">
            <v-chip color="success">{{convertToPersianDate(item.date)}}</v-chip>
          </template>


          <template
            v-slot:footer
          >
            <v-divider></v-divider>


          </template>

          <template
            v-slot:no-data
          >
            هیچ نتیجه ای یافت نشد
          </template>


        </v-data-table>
      </v-card-text>


    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "todayItems",
  layout:'adminDashboardLayout',

  data() {
    return {
      headers: [
        {
          text: 'شناسه',
          value: 'id',
        },
        {
          text: 'نام',
          value: 'name',
        },
        {
          text: 'سفارش دهنده',
          value: 'orderMan',
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
          text: 'تحویل به',
          value: 'deliver',
        },
        {
          text: 'تاریخ سفارش',
          value: 'created',
        },
      ],
      search:null,

      year:{
        from: null,
        to: null
      },
      proccess : false,
      basket: [],
      selectedBasket : '',
    }
  },

  async asyncData({$axios}) {
    try{
      let response = await $axios.get('api/report/todayentries');
      let entries = response.data.data;

      return{
        entries
      }
    }catch (err){

    }


  },

  methods: {
    print()
    {
      this.$htmlToPaper('detail');
    },
  },
}
</script>

<style scoped>

</style>
