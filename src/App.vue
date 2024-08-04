<template class="body">
  <el-container>
    <el-header class="title">To Do</el-header>
    <el-main>
      <el-row :gutter='24'>
        <el-col :span="24">
          <TodoForm @setTodoItems="handleSetTodoItems" />
        </el-col>
        <el-col v-for="(item, index) in todoItems" :span="24" :key="item.id">
          <div class="wrapper">
            <div slot="header" class="clearfix">
              <p :class="{ done: item.isDone }">{{ item.time }} {{ item.title }} </p>
            </div>
            <div class="text item">
              <el-button type="danger" @click="handleRemoveTodoItem(item, index)">Remove</el-button>
              <el-button type="success" @click="toggleDone(item, index)">Done</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
import { ElHeader, ElMain, ElContainer, ElRow, ElCol, ElCard, ElButton } from "element-plus"
import TodoForm from "./components/TodoForm.vue";
import storage from "./functions/LStorage";
export default {
  components: {
    ElHeader,
    ElMain,
    ElContainer,
    ElRow,
    ElCol,
    ElCard,
    ElButton,
    TodoForm,

  },
  data() {
    return {
      todoItems: [],
    }
  },
  methods: {
    handleSetTodoItems(data) {
      const savedItems = storage.savedItem(data)
      this.todoItems.push(savedItems);
    },
    handleRemoveTodoItem(itemData, index) {
      storage.removeItem(itemData.id);
      this.todoItems.splice(index, 1);
    },
    toggleDone(item) {
      storage.doneTask(item.id)
      item.isDone = !item.isDone
    }
  },
  created() {
    this.todoItems = storage.getItems();
  }

}
</script>

<style>
html {
  background-color: #282828;
}

.el-col {
  margin-bottom: 20px;
}

.el-col:last-child {
  margin-bottom: 0;
}

p {

  position: relative;
}

p::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  height: 40px;
  width: 5px;
  background-color: gray;
  border-radius: 3px;
}

.done {
  text-decoration: line-through;
}


.done::before {
  background-color: #67c23a;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
  color: white;
  padding: 0 20px;
  border-radius: 25px;
  box-shadow: 1px 1px 10px -2px rgb(155, 142, 142);
}

.clearfix {
  padding: 10px;
}

.title {
  color: white;
  font-weight: bold;
  font-size: 36px;
}
</style>