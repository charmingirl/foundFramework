<template>
  <div>
    <template v-if="len">
      <div v-for="(item,index) in data" :key="index" class="boxStyle flex-col-center">
        <div style="width: 80%;" class="flex-between">
          <div class="flex-col-start" style="flex: 1">
            <div>
              <img style="vertical-align: bottom" class="img_18" src="../assets/supernode_@2x.png">
              <span class="color_999 font_12">线性解锁中</span>
            </div>
            <div style="font-size: 22px;font-weight: 600;margin-top: 10px;padding-left: 4px">{{ item.totalAmount - item.unlockedAmount }}</div>
          </div>
          <div class="flex-col-start" style="flex: 1;padding-left: 72px">
            <div>
              <img style="vertical-align: bottom" class="img_18" src="../assets/supernode_unlocked1@2x.png">
              <span class="color_999 font_12">已解锁</span>
            </div>
            <div style="font-size: 22px;font-weight: 600;margin-top: 10px;padding-left: 4px">{{ item.unlockedAmount }}</div>
          </div>
        </div>
        <div class="rowLine">
          <div class="verticalLine"></div>
        </div>
        <div style="width: 80%;" class="flex-between">
          <div class="flex-col-start" style="flex: 1">
            <div>
              <img style="vertical-align: bottom" class="img_18" src="../assets/time@2x.png">
              <span class="color_999 font_12">剩余天数</span>
            </div>
            <div style="font-size: 22px;font-weight: 600;margin-top: 10px;padding-left: 4px">{{ item.days }}</div>
          </div>
          <div class="flex-col-start" style="flex: 1;padding-left: 72px;">
            <div>
              <img style="vertical-align: bottom" class="img_18" src="../assets/supernode_income@2x.png">
              <span class="color_999 font_12">可提取</span>
            </div>
            <div style="font-size: 22px;font-weight: 600;margin-top: 10px;padding-left: 4px">{{ item.remainAmount }}</div>
          </div>
        </div>
        <button-self :disabled="true" :width="272" :margin-top="16">提取</button-self>
      </div>
    </template>
    <div v-else class="flex color_999 font_500">暂无映射记录</div>
  </div>
</template>

<script>
import ButtonSelf from "@/components/Button-self";

export default {
  name: "mapRecord-template",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    len: {
      type: Number,
      default: 0
    },
  },
  components: {ButtonSelf}
}
</script>

<style scoped lang="less">
.boxStyle {
  width: 306px;
  height: 227px;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px 0px rgba(212, 212, 212, 0.2);
  border-radius: 15px;
  margin-top: 10px;

  .rowLine {
    position: relative;
    width: 242px;
    height: 1px;
    background: #ECECEC;
    margin: 10px auto;

    .verticalLine {
      top: 50%;
      left: 50%;
      transform: translate(50%, -50%);
      position: absolute;
      width: 1px;
      height: 70px;
      background: #ECECEC;
    }
  }
}
</style>