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

// api 目录创建到根目录下
import teacherApi from '~/api/teacher'
export default {
  // async :支持await
  async asyncData() { // await: 同步执行
    const response = await teacherApi.getTeacherList()
    return {
      teacherList: response.data.items
    }
  }

//   asyncData() {
//     return teacherApi.getTeacherList().then(response => {
//       return {
//         teacherList: response.data.items
//       }
//     })
//   }
}
</script>
