<template>
  <div>
    <div v-if="len===0" class="flex color_999 font_500">暂无充值记录</div>
    <template v-else>
      <div v-for="(item,index) in data" :key="index" class="itemStyle flex-start-start">
        <div class="img_30">
          <img src="../assets/pledge_exchange@2x.png">
        </div>
        <div class="infoStyle">
          <div class="numberStyle">
            <span>{{ item.fromAmount }} {{ item.fromSymbol }}</span><span class="font_600"> → </span><span>{{ item.toAmount }} {{ item.toSymbol }}</span>
          </div>
          <div class="margin_top_4 tipStyle font_500">
            Hash: {{ item.hash | mobileHidden(14,8) }}
          </div>
          <div class="margin_top_4 tipStyle font_500">
            充值时间: {{ item.createdAt |  formatTimeToStr("yyyy-MM-dd hh:mm:ss") }}
          </div>
        </div>
      </div>
      <div class="line"></div>
    </template>
  </div>
</template>

<script>
export default {
  name: "recordItem-template",
  props:['len',"data"],
  created() {
    console.log('len:',this.len)
  },
}
</script>

<style scoped lang="less">
.itemStyle {
  padding: 14px 10px;
  width: 100%;
  height: 88px;

  .infoStyle {
    margin-left: 8px;

    .numberStyle {
      span {
        font-size: 15px;
        font-family: DIN-Medium, DIN;
        font-weight: 600;
        color: #333333;
      }
    }

    .tipStyle {
      span {
        font-size: 13px;
        color: #4D4D4D;
        font-weight: 500;
      }
    }
  }
}

.line {
  width: 98%;
  height: 1px;
  background-color: #eee;
  margin: 12px auto 0;
}
</style>