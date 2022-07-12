/**
 * 数据脱敏
 * @param {Object} e
 * @param {Object} start 前面保留几个字符串
 * @param {Object} end 后面保留几个字符串
 */
function mobileHidden(value, start = 10, end = 4) {
    const n = start + 4
    if (value) {
        const valueArray = value.split("");
        for (let i = start; i < valueArray.length - end; i++) {
            valueArray[i] = "."
            if (i > n) {
                valueArray[i] = ""
            }
        }
        return valueArray.join("")
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function formatTimeToStr(times, pattern) {
    // var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
    var d = new Date(times).Format("MM-dd hh:mm");
    if (pattern) {
        d = new Date(times).Format(pattern);
    }
    return d.toLocaleString();
}

function PrefixInteger(num, m=3) {
      return (Array(m).join(0) + num).slice(-m);
  }

  // 数字截取单位
function extractUnit(arg){
    arg = arg || 0
    let arg_length = parseInt(arg)
    if(arg_length.toString().length>=13){
        // return arg/1000000000000+"万亿"
        const volume= arg/1000000000000
        const realVal = parseFloat(volume).toFixed(2);
        return realVal+"万亿"

    }else if(arg_length.toString().length>=9){
        const volume= arg/100000000
        const realVal = parseFloat(volume).toFixed(2);
        return realVal+"亿"
    }else if(arg_length.toString().length>4){
        const volume= arg/10000
        const realVal = parseFloat(volume).toFixed(2);
        let remain = arg%10000
        if(!remain){
            return volume+"w"
        }
        return realVal+"w"
    }else if(arg_length.toString().length>3){
        const volume= arg/1000
        let remain = arg%1000
        if(!remain){
            return volume+"k"
        }
        const realVal = parseFloat(volume).toFixed(2);
        return realVal+"k"
    }else if(arg_length.toString().length<=3) {
        if(arg.toString().length>=5){
            return Number(arg).toFixed(2)
        }
        return arg
    }

}


export default {
  mobileHidden,
  formatTimeToStr,
  PrefixInteger,
    extractUnit
};
