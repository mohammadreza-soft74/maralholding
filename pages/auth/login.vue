<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <v-card class="elevation-12">

        <v-toolbar
          color="orange"
          dark
          flat
        >
          <v-toolbar-title>ورود</v-toolbar-title>
          <v-spacer></v-spacer>

        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
              label="نام کاربری"
              v-model="login.email"
              name="login"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>

            <v-text-field
              id="password"
              v-model="login.password"
              label="رمز عبور"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn  color="success"
                  type="submit"
                  v-on:click="userLogin"
                  :loading="$auth.$state.busy"
          >
            ورود
            <v-icon>mdi-login</v-icon>

          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  name: "login",
  // head() {
  //   return {
  //     title: 'ورود  ' + process.env.NAME,
  //     meta: [
  //       // hid is used as unique identifier. Do not use `vmid` for it as it will not work
  //       {
  //         hid: 'ورود',
  //         name: 'ورود',
  //         content: 'ورود'
  //       }
  //     ]
  //   }
  // },

  data(){
    return {
      login: {
        email: '',
        password: ''
      },

      proccess: this.$auth.$state.busy,
    }
  },
  methods:{
    async userLogin() {
      try {
       // this.proccess = !this.$auth.$state.busy;
        let response = await this.$auth.loginWith('local', {data: this.login})
       // this.proccess = this.$auth.$state.busy;

      } catch (err) {

      }


    }
  }
}
</script>

<style scoped>

</style>
