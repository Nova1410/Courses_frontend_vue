<template>
  <q-layout class="body" id="Login">
    <div class="layout-padding container-login">
        <div class="container-bg-login"></div>
      <q-header>
        <q-toolbar class="bg-primary" />
      </q-header>
      <div class="row">
        <div class="col-1">
        </div>
        <div class="col-9">
          <q-card inline class="q-ma-sm card" style="width: 400px;" color="white" text-color="blue-10" >
            <q-card-section>
              <div class="row justify-center">
                <div class="text-h6">LOGIN</div>
                <div class="text-h6 q-ml-md"> <q-icon class="" name="verified_user" color="black" /> </div>
              </div>
              <q-input bottom-slots :error="errors.username" :error-message="errors.username2" v-model="username" label="Username" required="True">
                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input bottom-slots :error="errors.password" :error-message="errors.password2" v-model="password" label="Password" type="password" @keyup.enter="validate()">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>
              </q-input>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center">
              <q-btn align="left" label="Login" color="blue-10" rounded @click="validate()" icon="keyboard_arrow_right"/>
            </q-card-actions>
           </q-card>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: null,
      password: null,
      errors: {
        username: false,
        password: false,
        username2: null,
        password2: null,
        error: []
      }
    }
  },
  created() {
    // If the user is already loged, send the user to the courses page
    if (localStorage.getItem('token') !== null){
      this.$router.push('courses')
    }
  },
  methods: {
    // Function to validate the fields
    validate() {
      this.errors.username = false
      this.errors.username2 = null
      this.errors.password = false
      this.errors.password2 = null
      if (this.username === null && this.password === null) {
        this.errors.username = true
        this.errors.username2 = "This field cannot be blank"
        this.errors.password = true
        this.errors.password2 = "This field cannot be blank"
        this.$q.notify({
          message: 'Please, fill the fields.',
          color: 'blue-10',
          icon: 'error',
          actions: [
            {
              icon: 'cancel',
              color: 'white'
            }
          ]
        })
      } else if (this.username === null) {
          this.errors.username = true
          this.errors.username2 = 'This field cannot be blank'
          this.$q.notify({
            message: 'Please, fill the username field',
            color: 'blue-10',
            icon: 'error',
            actions: [
              {
                icon: 'cancel',
                color: 'white'
              }
            ]
          })
      } else if (this.password === null) {
          this.errors.password = true
          this.errors.password2 = 'This field cannot be blank'
          this.$q.notify({
            message: 'Please, fill the password field',
            color: 'blue-10',
            icon: 'error',
            actions: [
              {
                icon: 'cancel',
                color: 'white'
              }
            ]
          })
      } else {
        this.login()
      }
    },
    // Function to login the user and get the token
    login() {
      this.$axios.post('users/login/', {username: this.username, password: this.password}).then(response => {
        // Put the username and the token in the localstorage
        localStorage.setItem('username',response.data.username)
        localStorage.setItem('token', response.data.token)
        // Send the user to the courses page
        this.$router.push('courses')
      }).catch(error => {
        this.$q.notify({
          message: error.response.data.error,
          color: 'blue-10',
          icon: 'error',
          actions: [
            {
              icon: 'cancel',
              color: 'white'
            }
          ]
        })
      })
    }
  }
}
</script>

<style>
.card {
  margin-top: 15%;
}
.inputs:hover {
  color: #6CB6C2;
}
#Login .container-login {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
}
#Login .container-login .container-bg-login {
    width: 50%;
    height: 100%;
    padding: 50px;
    padding-bottom: 10%;
    margin-top: 10px;
    float: right;
    /* background-image: url('../../statics/bg-login.png'); */
    background-size: cover;
    background-position: center left;
}
</style>