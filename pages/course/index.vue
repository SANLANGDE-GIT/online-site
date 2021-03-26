<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <!-- 一级类别 开始-->
              <ul class="clearfix">
                <li
                  :class="{current:!$route.query.subjectParentId}">
                  <a
                    title="全部"
                    href="javascript:void(0);"
                    @click="searchSubjectLevelOne('')">全部</a>
                </li>
                <li
                  v-for="item in subjectNestedList"
                  :key="item.id"
                  :class="{current:$route.query.subjectParentId===item.id}">
                  <a
                    :title="item.title"
                    href="javascript:void(0);"
                    @click="searchSubjectLevelOne(item.id)">{{ item.title }}</a>
                </li>
              </ul>
              <!-- /一级类别 结束-->
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"/>
            </dt>
            <dd class="c-s-dl-li">
              <!-- 二级类别 开始-->
              <ul v-if="$route.query.subjectParentId" class="clearfix">
                <li :class="{current:!$route.query.subjectId}">
                  <a
                    title="全部"
                    href="javascript:void(0);"
                    @click="searchSubjectLevelTwo('')">全部</a>
                </li>
                <li
                  v-for="item in subSubjectList"
                  :key="item.id"
                  :class="{current:$route.query.subjectId===item.id}">
                  <a
                    :title="item.title"
                    href="javascript:void(0);"
                    @click="searchSubjectLevelTwo(item.id)">{{ item.title }}</a>
                </li>
              </ul>
              <!-- /二级类别 结束-->
            </dd>
          </dl>
          <div class="clear"/>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <!-- 排序 开始-->
            <ol class="js-tap clearfix">
              <li :class="{'current bg-green': $route.query.buyCountSort}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                  <span>↓</span>
                </a>
              </li>
              <li :class="{'current bg-green': $route.query.publishTimeSort}">
                <a title="最新" href="javascript:void(0);" @click="searchPublishTime()">最新
                  <span>↓</span>
                </a>
              </li>
              <li :class="{'current bg-green': $route.query.priceSort}">
                <a v-if="!$route.query.type || $route.query.type == 1" title="价格" href="javascript:void(0);" @click="searchPrice(2)">价格
                  <i>↑</i>
                </a>

                <a v-if="$route.query.type == 2" title="价格" href="javascript:void(0);" @click="searchPrice(1)">价格
                  <i>↓</i>
                </a>
              </li>
            </ol>
            <!-- /排序 结束-->
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="courseList.length===0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表 开始-->
          <article v-else class="comm-course-list">
            <ul id="bna" class="of">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :alt="course.title" :src="course.cover" class="img-responsive">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i v-if="course.price===0" class="c-fff fsize12 f-fA">免费</i>
                      <i v-else class="c-fff fsize12 f-fA">{{ course.price }}</i>
                    </span>
                    <!-- <span class="fr jgTag ">
                      <i class="c-orange fsize12 f-fA"> ￥99</i>
                    </span> -->
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.viewCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">{{ course.buyCount }}人购买</i>
                    </span>
                  </section>
                </div>
              </li>

            </ul>
            <div class="clear"/>
          </article>
          <!-- /数据列表 结束-->
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>
import courseApi from '~/api/course'

import queryString from 'querystring' // url 参数拼接工具

export default {
  async asyncData(cxt) {
    const queryInfo = {}

    // 从url地址栏中获取查询参数
    const query = cxt.route.query
    queryInfo.subjectParentId = query.subjectParentId || ''
    queryInfo.subjectId = query.subjectId || ''
    queryInfo.buyCountSort = query.buyCountSort || ''
    queryInfo.publishTimeSort = query.publishTimeSort || ''
    queryInfo.priceSort = query.priceSort || ''
    queryInfo.type = query.type || '' // 1：正序，2：倒序

    // 课程分类数据
    const subjectListResponse = await courseApi.getNestedList()
    const subjectNestedList = subjectListResponse.data.items
    // 创建子分类列表
    let subSubjectList = []
    subjectNestedList.forEach(items => {
      if (items.id === queryInfo.subjectParentId) {
        subSubjectList = items.children
      }
    })
    // 课程列表
    const courseResponse = await courseApi.getCourseList(queryInfo)
    return {
      courseList: courseResponse.data.items, // 课程列表
      subjectNestedList, // 一级分类列表
      subSubjectList, // 二级分类列表
      queryInfo // 查询条件
    }
  },
  methods: {
    searchSubjectLevelOne(subjectParentId) {
      window.location = '/course?subjectParentId=' + subjectParentId
    },
    searchSubjectLevelTwo(subjectId) {
      const obj = {
        subjectParentId: this.queryInfo.subjectParentId,
        subjectId: subjectId
      }
      const querys = queryString.stringify(obj)
      window.location = '/course?' + querys
      // 手动拼接
      // window.location = '/course?subjectParentId=' + obj.subjectParentId + '&subjectId=' + subjectId
    },
    searchBuyCount() {
      const obj = {
        subjectParentId: this.queryInfo.subjectParentId,
        subjectId: this.queryInfo.subjectId,
        buyCountSort: 1
      }
      const querys = queryString.stringify(obj)
      window.location = '/course?' + querys
    },
    searchPublishTime() {
      const obj = {
        subjectParentId: this.queryInfo.subjectParentId,
        subjectId: this.queryInfo.subjectId,
        publishTimeSort: 1
      }
      const querys = queryString.stringify(obj)
      window.location = '/course?' + querys
    },
    searchPrice(type) {
      const obj = {
        subjectParentId: this.queryInfo.subjectParentId,
        subjectId: this.queryInfo.subjectId,
        priceSort: 1,
        type: type
      }
      const querys = queryString.stringify(obj)
      window.location = '/course?' + querys
    }
  }
}
</script>
