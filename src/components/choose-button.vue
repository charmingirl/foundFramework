<template>
<div style="width: 100%;">

  <title-template>{{title}}
  <span class="font_500 color_999" v-if="balance" slot="right">余额：{{balance}}</span>
  </title-template>
  <div v-if="fakeButton" @click="click" class="chooseTokenStyle flex-between margin_bottom_24">
    <span class="color_333" v-if="isSelect">{{ choose }}</span>
    <div v-else class="flex">
      <img v-if="src" class="img_30" :src="src">
      <span style="margin-left: 6px" class="font_600 color_333">{{ choose }}</span></div>
    <van-icon name="arrow-down" :size="16"/>
  </div>
  <filed-template @input="onInput" :balance="balance" @click="clickInput" v-if="showInput"></filed-template>
</div>
</template>

<script>
import TitleTemplate from "@/components/title-template";
import FiledTemplate from "@/components/filed-template";
export default {
  name: "choose-button",
  components: {FiledTemplate, TitleTemplate},
  props:['title','choose','isSelect','fakeButton','showInput','src','balance'],
  methods:{
    click(){
      this.$emit('click')
    },
    clickInput(){
      this.$emit('clickInput')
    },
    onInput(value) {
      this.$emit('input',value)
    }
  }
}
</script>

<style scoped lang="less">

.chooseTokenStyle {
  padding: 14px 11px;
  width: 319px;
  height: 51px;
  background: #F6F6F6;
  border-radius: 12px;

  margin-top: 9px;
  margin-bottom: 22px;
  span{
    font-size: 14px;
    color: #999;
    font-weight: 600;
  }
}
</style>