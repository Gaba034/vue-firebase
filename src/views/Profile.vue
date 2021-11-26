<template>
  <v-container class="container">
  <div class="pa-8 type" fluid>
    <h1 class="title">Your Profile</h1>
    <v-form>
    <div class="type" fluid max-widht>
      <v-text-field v-model="name" label="Name" dark></v-text-field>.
      <v-text-field v-model="surname" label="Surname" dark></v-text-field>
    </div>
    <div>
      <v-text-field v-model="birth" label="Birth (dd/mm/yyyy)" dark></v-text-field>
      <v-text-field v-model="country" label="Country" dark></v-text-field>
    </div>
    <v-btn class="btn2" @click="saveProfile">Save</v-btn>
    </v-form>
  </div>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      name: "",
      surname: "",
      birth:"",
      country:"",
      uid: "",
      hasProfile: false,
    };
  },
  async mounted() {
    this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get();
    if (userProfile.docs.length > 0) {
      this.hasProfile = true;
      const profile = userProfile.docs[0];
      this.profileId = profile.id;
      this.name = profile.data().name;
      this.surname = profile.data().surname;
      this.birth = profile.data().birth;
      this.country = profile.data().country;
    }
  },
  methods: {
    async saveProfile() {
      if (this.hasProfile) {
        await fb.profileCollection.doc(this.profileId).update({
          name: this.nome,
          surname: this.surname,
          birth: this.birth,
          country: this.country,
        });
      } else {
        await fb.profileCollection.add({
          uid: this.uid,
          name: this.name,
          surname: this.surname,
          birth: this.birth,
          country: this.country,
        });
      }
    },
  },
};
</script>

<style>
.type{ 
  display: flex;
  justify-content:space-around;
  background:rgb(0, 0, 0);
  margin:0px;
  padding:10px;
  }
.title{
  color:rgb(255, 255, 255);
  
}
.btn2{
  display:flex;
  justify-content:space-around;
  border:white solid 2px;
  border-radius:20px;
  border-bottom-color:black;
  border-top-color:black;
  color:white;
}

</style>