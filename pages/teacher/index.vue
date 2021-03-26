<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">名师团队</span>
        </h2>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section v-if="teacherList.length===0|| !teacherList" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- /数据列表 开始-->
          <article v-else class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in teacherList" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                      <img :alt="teacher.name" :src="teacher.avatar" width="142">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span v-if="teacher.level===0" class="fsize14 c-999" >尚硅谷高级讲师</span>
                    <span v-if="teacher.level===1" class="fsize14 c-999" >尚硅谷首席讲师</span>
                    <span v-else class="fsize14 c-999" >尚硅谷教学总监</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.intro }}</p>
                  </div>
                </section>
              </li>

            </ul>
            <div class="clear"/>
          </article>
          <!-- /数据列表 结束-->
        </div>
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>

<script>

import teacherApi from '~/api/teacher'

export default {
  async asyncData() {
    const response = await teacherApi.getTeacherList()
    return {
      teacherList: response.data.items
    }
  }
}
</script>
