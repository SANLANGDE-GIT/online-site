<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程详情 开始 -->
    <section class="container">

      <!-- 课程所属分类 开始 -->
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">课程列表</a>
        \
        <a href="#" class="c-333 fsize14">{{ course.subjectParentTitle }}</a>
        \
        <a href="#" class="c-333 fsize14">{{ course.subjectTitle }}</a>
      </section>
      <!-- /课程所属分类 结束 -->

      <!-- 课程基本信息 开始 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section id="videoPlay" class="p-h-video-box">
            <img :alt="course.title" :src="course.cover" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲：{{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span v-if="isCollect" class="ml10 vam sc-end">
                <em class="icon18 scIcon"/>
                <a
                  style="cursor:pointer"
                  class="c-fff vam"
                  title="取消收藏"
                  @click="removeCollect(course.id)">已收藏</a>
              </span>
              <span v-else class="ml10 vam">
                <em class="icon18 scIcon"/>
                <span
                  style="cursor:pointer"
                  class="c-fff vam"
                  title="收藏"
                  @click="addCollect(course.id)" >收藏</span>
              </span>
            </section>
            <section class="c-attr-mt">
              <a v-if="isBuy" href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
              <a v-else title="立即购买" class="comm-btn c-btn-3" @click="createOrder">立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"/>
      </div>
      <!-- /课程基本信息 结束 -->

      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">

                <!-- 课程详情介绍 开始 -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body" v-html="course.description">
                      <!-- 将内容中的html翻译过来 -->
                      <!-- {{ course.description }} -->
                    </section>
                  </div>
                </div>
                <!-- /课程详情介绍 结束 -->

                <!-- 课程大纲 开始-->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="chapter in course.chapterVos" :key="chapter.id" class="lh-menu-stair">
                            <a :title="chapter.title" href="javascript: void(0)" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"/>{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li v-if="isBuy" class="lh-menu-second ml30">
                                <a v-for="video in chapter.children" :key="video.id" :title="video.title" :href="'/player/'+video.videoSourceId">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">{{ video.free===0?'':'免费试听' }}</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                  <span>{{ video.videoOriginalName }}</span>
                                </a>
                              </li>

                              <li v-else class="lh-menu-second ml30">
                                <a v-for="video in chapter.children" :key="video.id" :title="video.title" @click="buyCourse">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">{{ video.free===0?'':'免费试听' }}</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                  <span>{{ video.videoOriginalName }}</span>
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                  <!-- /课程大纲 结束 -->
                </div>
                <!-- 课程评论开始 -->
                <div class="mt50 commentHtml"><div>
                  <h6 id="i-art-comment" class="c-c-content c-infor-title">
                    <span class="commentTitle">课程评论</span>
                  </h6>
                  <section class="lh-bj-list pr mt20 replyhtml">
                    <ul>
                      <li class="unBr">
                        <aside class="noter-pic">
                          <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
                        </aside>
                        <div class="of">
                          <section class="n-reply-wrap">
                            <fieldset>
                              <textarea id="commentContent" v-model="comment.content" name="" placeholder="输入您要评论的文字"/>
                            </fieldset>
                            <p class="of mt5 tar pl10 pr10">
                              <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"/></span>
                              <input type="button" value="回复" class="lh-reply-btn" @click="addComment()">
                            </p>
                          </section>
                        </div>
                      </li>
                    </ul>
                  </section>
                  <section class="">
                    <section class="question-list lh-bj-list pr">
                      <ul class="pr10">
                        <li v-for="(comment,index) in data.records" :key="index">
                          <aside class="noter-pic">
                            <img :src="comment.avatar" width="50" height="50" class="picImg">
                          </aside>
                          <div class="of">
                            <span class="fl">
                              <font class="fsize12 c-blue">
                                {{ comment.nickname }}</font>
                            <font class="fsize12 c-999 ml5">评论：</font></span>
                          </div>
                          <div class="noter-txt mt5">
                            <p>{{ comment.content }}</p>
                          </div>
                          <div class="of mt5">
                            <span class="fr"><font class="fsize12 c-999 ml5">{{ comment.gmtCreate }}</font></span>
                          </div>
                        </li>

                      </ul>
                    </section>
                  </section>

                  <!-- 公共分页 开始 -->
                  <div class="paging">
                    <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                    <a
                      :class="{undisable: !data.hasPrevious}"
                      href="#"
                      title="首页"
                      @click.prevent="gotoPage(1)">首</a>
                    <a
                      :class="{undisable: !data.hasPrevious}"
                      href="#"
                      title="前一页"
                      @click.prevent="gotoPage(data.current-1)">&lt;</a>
                    <a
                      v-for="page in data.pages"
                      :key="page"
                      :class="{current: data.current == page, undisable: data.current == page}"
                      :title="'第'+page+'页'"
                      href="#"
                      @click.prevent="gotoPage(page)">{{ page }}</a>
                    <a
                      :class="{undisable: !data.hasNext}"
                      href="#"
                      title="后一页"
                      @click.prevent="gotoPage(data.current+1)">&gt;</a>
                    <a
                      :class="{undisable: !data.hasNext}"
                      href="#"
                      title="末页"
                      @click.prevent="gotoPage(data.pages)">末</a>
                    <div class="clear"/>
                  </div>
                  <!-- 公共分页 结束 -->
                </div>
                </div>
                <!-- 课程评论结束 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!-- 主讲讲师 开始-->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+course.teacherId" target="_blank">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl" target="_blank">{{ course.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.level===0?'尚硅谷高级讲师':'尚硅谷首席讲师' }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!-- /主讲讲师 结束 -->
          </div>
        </aside>
        <div class="clear"/>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import courseApi from '~/api/course'
import collectApi from '~/api/collect'
import tradeApi from '~/api/trade'
import comment from '~/api/commonedu'
import cookie from 'js-cookie'

export default {
  async asyncData(cxt) {
    const courseResponse = await courseApi.getCourseDetail(cxt.route.params.id)
    const course = courseResponse.data.item
    // console.log(course)
    return {
      course,
      courseId: cxt.route.params.id

    }
  },
  data() {
    return {
      isBuy: false,
      isCollect: false,
      data: {},
      page: 1,
      limit: 4,
      total: 10,
      comment: {
        content: '',
        courseId: ''
      }
    }
  },
  created() {
    // this.initCourseInfo()
    this.initComment()
  },
  mounted() {
    // 如果cookie中token不存在，则显示立即购买
    if (cookie.get('guli_token')) {
      tradeApi.getOrderStatus(this.$route.params.id).then(response => {
        this.isBuy = response.data.status
      })
    }

    collectApi.isCollectCourse(this.$route.params.id).then(response => {
      this.isCollect = response.data.isCollect
    })
  },
  methods: {
    // 创建订单
    createOrder() {
      tradeApi.createOrder(this.$route.params.id).then(response => {
        this.$router.push({ 'path': '/order/' + response.data.orderNo })
      })
    },
    // 课程购买状态
    buyCourse() {
      this.$message.warning('请购买课程')
    },
    // 添加收藏
    addCollect(courseId) {
      collectApi.addCollect(courseId).then(response => {
        this.isCollect = true
        this.$message.success('添加收藏成功！')
      })
    },
    // 取消收藏
    removeCollect(courseId) {
      collectApi.remove(courseId).then(response => {
        if (response.success) {
          this.isCollect = false
          this.$message.success('取消收藏成功！')
        } else {
          this.$message.error('取消失败！')
        }
      })
    },
    // 初始化评论列表
    initComment() {
      comment.getPageList(this.page, this.limit, this.courseId).then(response => {
        this.data = response.data.pages
      })
    },
    addComment() {
      this.comment.courseId = this.courseId
      this.comment.teacherId = this.course.teacherId
      comment.addComment(this.comment).then(response => {
        if (response.data.success) {
          this.comment.content = ''
          this.initComment()
        }
      })
    },
    gotoPage(page) {
      comment.getPageList(page, this.limit, this.courseId).then(response => {
        this.data = response.data.pages
      })
    }
  }
}
</script>
