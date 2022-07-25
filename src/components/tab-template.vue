<template>
  <van-tabs :line-width="33" :line-height="3" @change="change" title-active-color="#6DB5FB" title-inactive-color="#999" v-model="active">
    <van-tab :key="index" v-for="(item,index) in list" :title="item.title">
      <slot :name="item.slot" />
    </van-tab>
  </van-tabs>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
export default {
  name: "tab-template",
  props:{
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      active: 2,
    };
  },
  methods:{
    change(index){
      this.$emit('change',index)
    }
  }
}
</script>

<style scoped lang="less">

</style>