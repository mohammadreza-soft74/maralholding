<template>
  <v-container>
    <v-card >
      <v-card-title style="background-color: orange">
        <v-row>
<!--          <v-col cols="12"-->
<!--                 md="3"-->
<!--          >-->
<!--            &lt;!&ndash; search in table&ndash;&gt;-->
<!--            <v-text-field-->
<!--              v-model="search"-->

<!--              append-icon="mdi-magnify"-->
<!--              label="جستجو"-->
<!--              single-line-->
<!--              hide-details-->
<!--            ></v-text-field>-->
<!--          </v-col>-->


          <v-col cols="12"
                 md="2"
                    >
            <custom-date-picker append-to="body"
                                :clearable="true"
                                placeholder= 'از تاریخ'
                                format= 'YYYY-MM-DD'
                                display-format="jYY/jMM/jDD"

                                @change="rangeSearch"
                                v-model="year.from"
            />
                    </v-col>

          <v-spacer></v-spacer>

          <v-col cols="12"
                           md="2"
                    >
                      <custom-date-picker append-to="body"
                                          :clearable="true"
                                          placeholder= 'تا تاریخ'
                                          format= 'YYYY-MM-DD'
                                          display-format="jYY/jMM/jDD"

                                          @change="rangeSearch"
                                          v-model="year.to"
                      />


                    </v-col>

          <v-spacer></v-spacer>
          <v-col cols="12"
                 md="2"
          >

           <v-btn color="success" @click="print">
             <v-icon>mdi-printer</v-icon>
           </v-btn>


          </v-col>


<!--          <v-col cols="12"-->
<!--                 md="3"-->
<!--                 align="center"-->
<!--          >-->
<!--            <v-btn @click="print" color="success">-->
<!--              <v-icon>mdi-printer</v-icon>-->
<!--            </v-btn>-->

<!--          </v-col>-->

        </v-row>

        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text id="detail">
        <v-data-table

          items-per-page="10"
          loading-text="در حال دریافت اطلاعات"
          :items="entries.data"
          :headers="headers"

          :items-per-page="30"
          class="elevation-1"
        >




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

      <v-pagination v-model="entries.meta.current_page"
                    :length="entries.meta.last_page"
                    circle
                    dark
                    prev-icon="mdi-arrow-left"
                    next-icon="mdi-arrow-right"
                    @input="changePage"
      >
      </v-pagination>


    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "index",
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
    // let response = await $axios.get('api/report/apples');
    let entries = await $axios.get('api/report/entrysearch');

    entries = entries.data
    // let report = response.data;

    return{
      // report,
      entries,

      // chartData: [
      //   ['سال','ورود سیب', 'خروج سیب'],
      //   ['1399',report.totalAppleIn, report.totalAppleOut],
      //
      // ],
      // chartOptions: {
      //   chart: {
      //     title: 'نمودار میوه های سردخانه',
      //     //subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      //   }
      // }
    }
  },


  methods: {
    async rangeSearch() {
      this.proccess = true;
      let response = await this.$axios.get('api/report/entrysearch', {
        params:{
          from : this.year.from,
          to : this.year.to
        }
      })
      this.entries = response.data
      this.proccess = false;
    },

    async changePage() {
      let response = await this.$axios.get('api/report/entrysearch?page=' + this.entries.meta.current_page)
      this.entries = response.data
    },

    print() {
      this.$htmlToPaper('detail');
    },
  },
}
</script>

<style scoped>

</style>
