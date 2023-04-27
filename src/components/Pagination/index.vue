<template>
  <div class="pagination">
    <button @click="jumpPage(pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>

    <!-- 要同时满足总页数比连续分页数大和当前页数大于 continues - Number.parseInt(continues / 2))才能够显示 -->
    <!-- 这个显示隐藏表达式现只适用于连续分页为5或者7，9不行 -->
    <button
      v-show="
        !(totalPages <= continues) &&
        !(pageNo <= continues - Number.parseInt(continues / 2))
      "
      :class="{ active: pageNo == 1 }"
      @click="jumpPage(1)"
    >
      1
    </button>
    <button
      v-show="!(pageNo < continues - (Number.parseInt(continues / 2) - 2))"
    >
      ···
    </button>

    <!-- 中间遍历的连续页 -->
    <button
      v-show="num > StartEnd.start - 1"
      v-for="(num, index) in StartEnd.end"
      :key="index"
      :class="{ active: pageNo == num }"
      @click="jumpPage(num)"
    >
      {{ num }}
    </button>

    <button v-show="pageNo < totalPages - Number.parseInt(continues / 2) - 1">
      ···
    </button>

    <!-- 要同时满足总页数比连续分页数大和当前页数小于 totalPages - 2才能够显示 -->
    <button
      v-show="
        !(totalPages <= continues) &&
        pageNo < totalPages - Number.parseInt(continues / 2)
      "
      :class="{ active: pageNo == totalPages }"
      @click="jumpPage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <!-- 下一页 -->
    <button
      @click="jumpPage(pageNo + 1)"
      :disabled="pageNo == totalPages || totalPages == 0"
    >
      下一页
    </button>

    <!-- 输入框跳转 -->
    <input
      type="text"
      v-model.number="jumpNum"
      style="width: 30px; margin-top: 5px; margin-left: 10px"
    />
    <button @click="jump" :disabled="totalPages == 0">跳转</button>
    <button style="margin-left: 30px">共 {{ totalPages }} 页</button>
  </div>
</template>

<script>
// 使用本组件需要传入4个参数：当前页、每页数目、总数、连续页数
// 使用时需要在本组件上添加 jump自定义事件，传出参数为跳转的页数
export default {
  name: "Pagination",
  data() {
    return {
      jumpNum: "",
    };
  },
  // 接收传入的分页四要素 当前页、每页数目、总数、连续页数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算一共分几页
    totalPages() {
      // 总页数向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算连续的起始页和结束页
    StartEnd() {
      // 先进行计算，后面再分不同情况讨论，如果下面三种情况都不是则正常输出
      let start = this.pageNo - Number.parseInt(this.continues / 2);
      let end = this.pageNo + Number.parseInt(this.continues / 2);

      // 如果起始页小于1，因为最低为第一页没有第零页
      if (start < 1) {
        start = 1;
        end = this.continues;
      }
      // 如果末页大于总页数
      if (end > this.totalPages) {
        start = this.totalPages - this.continues + 1;
        end = this.totalPages;
      }
      // 如果总页数比连续页数少
      if (this.totalPages < this.continues) {
        start = 1;
        end = this.totalPages;
      }
      return { start, end };
    },
  },

  methods: {
    // 输入框跳转页面
    jump() {
      if (this.jumpNum == "") return;
      this.$emit("jump", this.jumpNum);
      this.jumpNum = "";
    },
    // 普通点击跳页
    jumpPage(num) {
      this.$emit("jump", num);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  .active {
    background-color: deepskyblue;
  }
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
</style>
