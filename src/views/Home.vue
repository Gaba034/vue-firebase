<template class="container"> 
  <v-container fluid class="container">
    <h1>To do List</h1>
    <v-form dark>
      <v-text-field label="New" v-model="newTask" dark>
        <v-icon slot="append" @click="addTask" dark>mdi-arrow-right-bold-hexagon-outline</v-icon>
      </v-text-field>
    </v-form>
    <v-list dark>
      <v-list-item-group dark class="a">
          <v-list-item v-for="tasks of tasks" :key="tasks.id" class="a">
            {{tasks.title}}
          </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

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

<style>
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