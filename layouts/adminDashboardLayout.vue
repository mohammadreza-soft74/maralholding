<template>
  <v-app light>
    <AdminDashboardNavbar></AdminDashboardNavbar>
    <v-main>
      <v-container>
        <v-speed-dial
          direction="top"
          transition="slide-x-reverse-transition"
          fixed
          bottom
          right
          v-if="!$device.isMobile"
        >
          <template v-slot:activator>
            <v-btn
              color="error"
              fab
              small
              :to="{name:'admin-dashboard'}"

            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </template>

        </v-speed-dial>
        <nuxt />
          <v-bottom-navigation
            horizontal
            dark
            fixed
            app
            scroll-threshold=""
            v-if="$device.isMobile"
          >
            <v-spacer></v-spacer>

            <v-btn icon  :to="{name:'admin-order'}">
              <v-icon color="indigo">mdi-desktop-mac-dashboard</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon  :to="{name:'admin-item'}">
              <v-icon color="success" >mdi-basket</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon  @click="$router.back()">
              <v-icon color="error">mdi-arrow-left-bold</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
          </v-bottom-navigation>

      </v-container>
    </v-main>

  </v-app>
</template>

<script>
    import AdminDashboardNavbar from "../components/AdminDashboardNavbar";
   // import swal from "@/plugins/alert";
    //import myPusher from "@/plugins/myPusher";
    export default {
        name: "adminDashboardLayout",
      components: {AdminDashboardNavbar},
      middleware:['auth'],

      mounted() {
       // myPusher.newInstance();
       // myPusher.subscribe()
      }
    }
</script>

<style scoped>

</style>
