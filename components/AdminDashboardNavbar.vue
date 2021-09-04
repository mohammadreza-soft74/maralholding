<template>
<div>
  <v-navigation-drawer
    v-model="drawer"
    dark
    right
    app
    bottom
    class="display-1"

  >
    <v-list-item>
<!--      <v-list-item-avatar>-->
<!--        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>-->
<!--      </v-list-item-avatar>-->

      <v-list-item-content>
        <v-list-item-title v-if="$auth.user">{{$auth.user.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list shaped
            nav
    >
      <v-subheader>پنل مدیریتی</v-subheader>

      <v-list-item-group >

        <v-list-item
         :to="{name:'admin-item'}"
         nuxt
         exact
        >
          <v-list-item-icon>
            <v-icon>mdi-basket </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>کالا ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>



        <v-list-item
          :to="{name:'admin-order'}"
          nuxt
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-desktop-mac-dashboard </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>  سفارش ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

<!--     س-->





        <v-list-group>
          <template v-slot:activator>

            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>تنظیمات</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            :to="{name:'admin-person'}"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>پرسنل</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="{name:'admin-place'}"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>mdi-monitor</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>محل سفارش</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


        </v-list-group>


        <v-list-group>
          <template v-slot:activator>

            <v-list-item-icon>
              <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>گزارش</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            :to="{name:'admin-report-todayItems'}"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>mdi-white-balance-sunny</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>سفارشات امروز</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="{name:'admin-report-report'}"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>گزارش سفارش در بازه</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item
            :to="{name:'admin-report-checkout'}"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>گزارش کالای خروجی در بازه</v-list-item-title>
            </v-list-item-content>
          </v-list-item>





        </v-list-group>

      </v-list-item-group>
    </v-list>

  </v-navigation-drawer>

  <v-app-bar
    fixed
    dark
    rounded
    app
  >
    <v-app-bar-nav-icon v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title> انبار خدمات فنی شرکت محور سازان چیچست</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-chip color="orange" v-if="$auth.user">{{$auth.user.name}}</v-chip>

<!--    <UserStatus></UserStatus>-->


  </v-app-bar>

</div>
</template>

<script>
  //  import UserStatus from "@/components/UserStatus";
    export default {
        name: "AdminDashboardNavbar",
     // components: {UserStatus},
      data(){
          return{
            drawer:false,

          }
      },

    }
</script>

<style scoped>



</style>
