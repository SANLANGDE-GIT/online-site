<template>
  <div>
    <ul>
      <li v-for="teacher in teacherList" :key="teacher.id">
        <p>{{ teacher.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import teacherApi from '~/api/teacher'
export default {
  asyncData() {
    const response = teacherApi.getTeacherList()
    return {
      teacherList: response.data.itmes
    }
  }
}
</script>
