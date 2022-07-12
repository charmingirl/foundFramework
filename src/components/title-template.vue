<template>
  <div class="titleStyle flex-between">
    <slot />
    <slot name="right" />
  </div>

</template>

<script>
export default {
  name: "title-template"
}
</script>

<style scoped lang="less">
.titleStyle{
  padding-left: 8px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #333333;
  line-height: 20px;
}
</style>