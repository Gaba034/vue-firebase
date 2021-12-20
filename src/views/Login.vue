<template>
  <v-container fill-height fluid>
      <v-container>
        <v-col>
          <h1>Welcome! Identify yourself.</h1>
        </v-col>
        <v-col>
          <v-snackbar dark v-model="errorLogin" timeout = "1500">Wrong info</v-snackbar>
          <v-text-field label="E-mail" v-model="user.email" dark></v-text-field>
          <v-text-field label="Password" v-model="user.password" 
          dark
          :type="show ? 'text' : 'password' "
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off' "
          @click:append="show = !show"></v-text-field>
          <v-btn @click="login" dark>login</v-btn>
        </v-col>
        <v-dialog v-model="account" persistent max-width="300">
      <v-card>
        <v-card-title>User not found.</v-card-title>
        <v-card-text>
          Create new account?
        </v-card-text>
        <v-card-actions dark>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="newAccount">Yes</v-btn>
          <v-btn color="red" text @click="account = false">No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-container>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      account: false,
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    async loginGoogle() {
        await fb.auth.signInWithPopup(fb.googleProvider)
        this.$router.push({ name: "Home" });
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.account = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async newAccount() {
      this.account = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style>



</style>