<template>
  <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @close="onCancel"
      @click="onCancel"
      @select="onSelect"
  >
  </van-action-sheet>
</template>

<script>
import Vue from 'vue';
import { ActionSheet } from 'vant';

Vue.use(ActionSheet);
export default {
  name: "sheet-template",
  props:{
    show:{
      type:Boolean,
      default:false
    },
    actions:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {

    };
  },
  methods: {
    onCancel() {
      this.$emit('close')
    },
    onSelect(item){
      this.$emit('onSelect',item)
    }
  },
}
</script>

<style scoped>

</style>