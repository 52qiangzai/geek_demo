<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artObj.title }}</span>
        <!-- 单图 -->
        <img
          v-if="artObj.cover.type === 1"
          class="thumb"
          v-lazy="artObj.cover.images[0]"
          alt=""
        />
      </div>
      <!-- 多图 -->
      <div class="thumb-box" v-if="artObj.cover.type > 1">
        <img
          v-for="(imgUrl, index) in artObj.cover.images"
          :key="index"
          class="thumb"
          v-lazy="imgUrl"
          alt=""
        />
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artObj.aut_name }}</span>
          <span>{{ artObj.comm_count }}评论</span>
          <span>{{ artObj.pubdate }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click.stop="show = true" />
        <!-- <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
          @cancel="cancelFn"
          @close="closeFn"
          :cancel-text="bottomText"
          get-container="body"
        /> -->
      </div>
    </template>
  </van-cell>

  <!-- 反馈面板 -->
</template>

<script>
export default {
  props: {
    artObj: Object, // 文章对象,
  },
  data() {
    return {
      show: false,
      // actions: firstActions,
      bottomText: "取消",
    };
  },
};
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
border-radius: 5px;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
