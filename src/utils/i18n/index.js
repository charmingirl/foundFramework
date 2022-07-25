import Vue from 'vue'
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import enMessage from "./en";
import zhMessage from "./zh";
 const messages = {
    ...enMessage,
    ...zhMessage,
    ja: {
        message: {
            hello: "こんにちは、世界",
        },
    },
};
// 通过选项创建 VueI18n 实例
export const i18n = new VueI18n({
    locale: "zh", // 设置地区
    messages, // 设置地区信息
});

/*
*
* 使用方法
* */
// this.$i18n.locale = 'en'
