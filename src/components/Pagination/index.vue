<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo === 1" @click="previousPage">上一页</button>
    <button
      v-if="startAndEnd[0] > 1"
      @click="sendPageNo(1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startAndEnd[0] > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(number, index) in startAndEnd"
      :key="index"
      @click="sendPageNo(number)"
      :class="{ active: pageNo === number }"
    >
      {{ number }}
    </button>

    <!-- 下 -->
    <button v-if="startAndEnd[continues - 1] < totalPages - 1">···</button>
    <button
      v-if="startAndEnd[continues - 1] < totalPages"
      @click="sendPageNo(totalPages)"
      :class="{ active: pageNo === totalPages }"
    >
      {{ totalPages }}
    </button>
    <button :disabled="pageNo === total" @click="nextPage">下一页</button>

    <button style="margin-left: 30px">{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues", "totalPages"],
  computed: {
    startAndEnd() {
      const { pageNo, totalPages, continues } = this;
      let start = 0,
        end = 0;
      if (continues >= totalPages) {
        start = 1;
        end = totalPages;
      } else {
        if (pageNo - parseInt(continues / 2) <= 0) {
          start = 1;
          end = continues;
        } else if (pageNo + parseInt(continues / 2) > totalPages) {
          end = totalPages;
          start = totalPages - continues + 1;
        } else {
          start = pageNo - parseInt(continues / 2);
          end = pageNo + parseInt(continues / 2);
        }
      }
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }

      return arr;
    },
  },
  methods: {
    previousPage() {
      this.$emit("getPageNo", this.pageNo - 1);
    },
    nextPage() {
      this.$emit("getPageNo", this.pageNo + 1);
    },
    sendPageNo(pageNo) {
      this.$emit("getPageNo", pageNo);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
