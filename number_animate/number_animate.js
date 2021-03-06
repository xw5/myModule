function NumberAnimate (opt){
  var def = {
    start: 0, // 开始时的数字
    end: 0,
    speed: 400, // 总时间
    refreshTime: 16, // 刷新一次的时间
    decimals: 2, // 小数点后的位数，小数做四舍五入
    onUpdate: function () {}, // 更新时回调函数
    onComplete: function () {} // 完成时回调函数
  };
  this.opt = Object.assign(def, opt); // assign传入配置参数
  // this.opt.start = this.modifyFloatNumber(this.opt.start);
  // this.opt.end = this.modifyFloatNumber(this.opt.end);
  this.tempValue = this.opt.start; // 累加变量值
  if (this.hasDecimal(this.opt.start, this.opt.end)) {
    this.opt.decimals = 2;
    if (this.diff(this.opt.start, this.opt.end) < 0.2) {
      this.opt.speed = 100;
    }
  } else {
    this.opt.decimals = 0;
    if (this.diff(this.opt.start, this.opt.end) < 10) {
      this.opt.speed = 200;
    }
  }

  if (opt["speed"] != null) {
    this.opt.speed = opt["speed"];
  }

  this.loopCount = 0; // 循环次数计数
  this.loops = Math.ceil(this.opt.speed / this.opt.refreshTime); // 数字累加次数
  this.increment = ((this.opt.end - this.opt.start) / this.loops); // 每次累加的值
  console.log('increment', this.increment, this.opt.decimals);
  this.interval = null; // 计时器对象
  this.init();
}

NumberAnimate.prototype.init = function() {
  this.interval = setInterval(() => {
    this.updateTimer();
  }, this.opt.refreshTime);
}

NumberAnimate.prototype.destroy = function() {
  if (this.interval > 0) {
    clearInterval(this.interval);
    this.interval = 0;
  }
}

NumberAnimate.prototype.hasDecimal = function(start, end) {
  return (start.toString().indexOf(".") != -1) || (end.toString().indexOf(".") != -1);
}

NumberAnimate.prototype.modifyFloatNumber = function(param) {
  if (param) {
    let index = param.toString().indexOf(".");
    if (index != -1) {
      var y = param.toString().length - index - 1;
      if (y > 2) {
        return param.toFixed(2);
      }
    }
  }
  return param;
};

NumberAnimate.prototype.diff = function(start, end) {
  console.log(Math.abs(end - start));
  return Math.abs(end - start);
};

NumberAnimate.prototype.updateTimer = function() {
  this.loopCount++;
  if (this.opt.decimals >= 1) {
    this.tempValue = this.formatFloat(this.tempValue, this.increment).toFixed(this.opt.decimals);
    this.showValue = this.tempValue;
  } else {
    this.tempValue += this.increment;
    this.showValue = Math.floor(this.tempValue);
  }
  if (this.loopCount >= this.loops) {
    clearInterval(this.interval);
    this.tempValue = this.opt.end;
    if (this.opt.decimals >= 1) {
      this.showValue = this.tempValue;
    } else {
      this.showValue = Math.floor(this.tempValue);
    }
    this.opt.onComplete();
  } else {
    this.opt.onUpdate();
  }
};

// 解决0.1+0.2不等于0.3的小数累加精度问题
NumberAnimate.prototype.formatFloat = function(num1, num2) {
  let baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
};

module.exports = NumberAnimate;