<template>
  <v-app>
    <v-app-bar app color="secondary" elevation="1" v-model= "aside">
      <h1>TITLE</h1>
      <v-list-item v-for="item of items" :key="item.title" link :to="item.to" class="sup"> 
          <v-btn  icon>
          <v-list-item-content dark class="titletext">
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
header{
  margin: 0px;
  padding: 0px;
}
.sup{
  background: rgb(163, 206, 209);
  padding: 0px ;
  justify-content: center;
}
.sup:hover{
  animation-name: barcolor;
  background:"" ;
  padding: 0px ;
  justify-content: center;
  animation-duration: 1s;
  animation-delay: 0.4s;
  animation-iteration-count: infinite;
}
@keyframes barcolor{
  0%{
    background: rgb(163, 206, 209);
  }
  50%{
    background: rgb(137, 220, 226);
  }
  100%{
    background: rgb(163, 206, 209);
  }
} 

</style>