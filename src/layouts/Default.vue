<template>
  <v-app>
    <v-app-bar-nav-icon @click.stop ="aside = !aside" class="hide"></v-app-bar-nav-icon>
    <v-app-bar app color="secondary" elevation="1" v-model= "aside">
      <v-list-item v-for="item of items" :key="item.title" link :to="item.to" class="sup"> 
          <v-list-item-icon>
            <v-icon color="primary">
            </v-icon>
          </v-list-item-icon>
          <v-btn  dark icon big>
          <v-list-item-content dark>
            {{ item.title }}
          </v-list-item-content>
          </v-btn>
        </v-list-item>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      </v-main>
    <v-footer app color="secondary" ></v-footer>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      aside:true,
      items:[
        {title:"Home",to:"/"},
        {title:"Profile",to:"/profile"},
        {title:"Quit",to:"/login"},
      ]
    };
  },
};
</script>

<style>
.hide{
  background: black;
  align-self: center;
}
.sup{
  justify-content: center;
}
</style>