<template>
  <div>
    <el-form :model="form" @submit.prevent="handleSubmit">
      <el-form-item>
        <el-input v-model="form.title" placeholder="title" size="large" @keyup.enter="handleSubmit" />
      </el-form-item>
      <el-date-picker v-model="form.time" type="date" placeholder="Select date" @change="handleDateChange"
        @keyup.enter="handleSubmit" />
      <el-button class="submit-btn" @click.stop="handleSubmit" type="primary">Save</el-button>
    </el-form>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElDatePicker } from 'element-plus';

export default {
  name: 'TodoForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
    ElDatePicker,

  },
  data() {
    return {
      form: {
        title: '',
        time: '',
        isDone: false
      }
    }
  },
  computed: {
    todoStatuses() {
      return todoStatuses;
    }
  },
  methods: {
    handleDateChange(date) {
      if (date) {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1;
        const year = formattedDate.getFullYear();
        this.form.time = `${year}/${day}/${month}`
      }
    },
    handleSubmit() {
      this.$emit('setTodoItems', this.form)
      this.form.title = ''
      this.form.time = ''
    }
  }
}
</script>

<style scoped>
.submit-btn {
  margin-left: 20px;
}
</style>