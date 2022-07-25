<template>
  <div style="background-color:transparent; position: fixed;bottom:0;left: 0;right:0;">
    <van-grid class="wrap flex" :border="false">
      <van-grid-item @click="clickItem(item)" v-for="item in tabberList" :key="item.id" :to="item.router">
        <span :class="{activeStyle:currentActive === item.id}" class="flex">{{ item.text }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import Vue from "vue";
import {Grid, GridItem} from 'vant';

Vue.use(Grid);
Vue.use(GridItem);

export default {
  name: "tabber-self",
  props:{
    tabberList:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      currentActive: 0,
      // tabberList: [{text: '图表', id: 0, router: '/home'}, {text: '投票', id: 1, router: '/vote'}, {text: '治理', id: 2, router: '/home/government'}, {text: '挖矿', id: 3, router: '/mining'}]
    };
  },
  created() {
  },
  beforeDestroy() {
    this.$toast.clear();
  },
  methods: {
    async clickItem(item) {
     if(item.text === '挖矿'){
       this.$toast('挖矿暂未开放')
       return
     }
      this.currentActive = item.id

      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
    },
  },
};
</script>
<style scoped lang="scss">
.wrap {
  margin: 15px auto;
  overflow: hidden;
  width: 347px;
  height: 46px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 1px rgba(210, 210, 210, 0.28);
  border-radius: 12px;
  border: 1px solid #EEEEEE;
}

::v-deep .van-grid-item__text {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}

::v-deep .van-grid-item__content {
  padding: 0px !important;
}

.activeStyle {
  font-weight: 600;
  background: #F6F6F6;
  padding: 0 15px;
  height: 46px;
  border-radius: 10px;
}
</style>



