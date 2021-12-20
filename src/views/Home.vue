<template>
  <section>
  <section class="games">
            <article class="cards">
            <div class="title1">
              <v-icon class="icon" dark>mdi-information-outline</v-icon>
              <router-link to="bf" class="gamelink">Blox Fruit</router-link>
            </div>
            <img src="https://tr.rbxcdn.com/d5212353fef614a85dfe4bf6570a2087/768/432/Image/Png" height="340px" alt="BF">
            
        </article>
            <article class="cards">
            <div class="title1">
              <v-icon class="icon" dark>mdi-information-outline</v-icon>
              <router-link to="gpo" class="gamelink">Grand Piece Online</router-link>
            </div>
            <img src="https://tr.rbxcdn.com/8f38cf38e4164d00edc15d3b371c0440/768/432/Image/Png" height="340px" alt="GPO">
            
        </article>
            <article class="cards">
              <div class="title1">
                <v-icon class="icon" dark>mdi-information-outline</v-icon>
                <router-link to="astd" class="gamelink">All star tower defense</router-link>
              </div>
              <img src="https://tr.rbxcdn.com/7cc55efd2738987ff4a121e83c6d2202/768/432/Image/Png" height="340px" alt="ASTD">
            
        </article>
            <article class="cards">
            <div class="title1">
              <v-icon class="icon" dark>mdi-information-outline Shindo Life</v-icon>
              <router-link to="sl2" class="gamelink">Shindo Life 2</router-link>
            </div>
            <img src="https://tr.rbxcdn.com/b114c593ffe2f44b318e8554b5031ced/768/432/Image/Png" height="340px" alt="SF2">
            
        </article>
    </section>
    <div>

    </div>
    </section>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      games:[
        {title:"Blox Fruit",to:"/bf"},
        {title:"Grand Piece Online",to:"/gpo"},
        {title:"All star tower defense",to:"/astd"},
        {title:"Shindo Life 2 ",to:"/sl2"},
      ]
    };
  },
  
}
</script>

<style>
body{
  padding: 0px;
  margin: 0px;
}
main{
  padding: 0px;
}
.games {
    display: flex;
    padding: 0px;
    margin: 0px;
}
.cards {
    position: relative;
    width: calc(100% / 4);
    height: 400px;
    transition: all .3s;
    overflow: hidden;
    transition: all .7s;
    justify-content: space;
    background:rgba(0, 0, 0, 0.863);
}
.cards:hover {
    width: 500px;
    height: 400px;
    transition: all .3s;
}
.cards:hover{
    left: 0px;
}

.img {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.card-img img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.title1{
  background: black;
  height: 10%;
  transition:0.2s;
  align-content: center;
  color: black;
  text-align: center;
  padding: 10px;
  margin: 10px;
  font-size:0px;
}
.title1:hover{
  filter: opacity(1);
  height: 100px;
  width: 100%;
  background:rgba(0, 0, 0, 0.144);
  transition: all 1s;
  transition: all 0.7s;
  color: white;
  font-size:25px;
}
.gamelink{
  text-decoration:none;
  outline: none;
  color: antiquewhite;
}
.icon{
  filter: opacity(1);
}
.title .icon:hover{
  filter: opacity(0);
}
.a{
  width:100%;
  height:20%;
  background-color: rgb(93, 10, 160);
  display: flex;
  justify-content:space-between;
  flex-direction:column;
  flex-wrap:nowrap 100px;
  }
.container{ 
  display: flex;
  justify-content:space-around;
  background:rgb(0, 0, 0);
  margin:0px;
  padding:0px;
  flex-wrap: wrap;
}

h1{
  color:white;
}
html{
  overflow-y: hidden;
}

</style>



<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      newTask: "",
      tasks: [],
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.taskskintheServer();
  },
  methods: {
    async taskskintheServer() {
      this.tasks = [];
      const logTasks = await fb.tasksCollection.where('owner','==',this.uid)
        .where("owner", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.tasks.push({
          id: doc.id,
          title: doc.data().title,
        });
      }
    },
    async addTask() {
      await fb.tasksCollection.add({
        title: this.newTask,
        dateSave: new Date().toISOString().slice(0, 10),
        owner: this.uid,
      });
      this.newTask = "";
      this.taskskintheServer();
    },
  },
};
</script>