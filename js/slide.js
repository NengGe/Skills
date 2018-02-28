+function (window, undefined) {
    nengGe = {};
    //函数缓存,提升性能,减少dom操作。
    function getElements(str) {
        var name = str.match(/[a-z]+/g).join('');
        if (!getElements.ele) getElements.ele = {};
        return getElements.ele[name] = getElements.ele[name] || document.querySelectorAll(str);
    }
    nengGe.slide = {
        getInit: function (obj) {
            return new nengGe.slide.init(obj); //new出一个init对象是为了防止第二次使用插件覆盖前面的属性。
        },
        init: function (obj) {
            this.opt = {
                content: ['JAVASCRIPT', 'HTML', 'English', 'Chinese'],  //定制技能内容
                timerOut: 1,  //定制滑杠滑动时间
                value: [400, 400, 400, 400],  //定制你的技能值
                color: 'orange',//定制颜色
                number: 400,  //定制总技能值。
            }
            for (var key in obj) {
                this.opt[key] = obj[key];
            }
            //矫正输入数据 value
            for (var i = 0; i < this.opt.value.length; i++) {
                if (this.opt.value[i] >= this.opt.number) {
                    this.opt.value[i] = this.opt.number;
                }
                if (this.opt.value[i] <= 0) {
                    this.opt.value[i] = 0;
                }
            }
            this.showStyle();
        }
    };
    nengGe.slide.init.prototype.showStyle = function () {   //显示样式
        var str = '',
            oSlide = document.querySelector('.slide-effect'),
            len = this.opt.content.length;
        str += '<div class="slide-list">';
        for (var i = 0; i < len; i++) {
            str += ' <div class="slide">';
            str += ' <h3 class="skill">' + this.opt.content[i] + '</h3>';
            str += '<div class="slide-bar">';
            str += '<p class="bar"></p>';
            str += '<span class="icon-box">';
            str += '<span class="icon-val" value="' + this.opt.value[i] + '">' + this.opt.value[i] + '</span>';
            str += '<i class="icon-angel"></i>';
            str += '</span>';
            str += '</div>';
            str += '<div class="value">';
            str += '<p class="val1">0</p>';
            str += '<p class="val2">' + this.opt.number + '</p>';   
            str += '</div>';
            str += '</div>';
        }
        str += '</div>';
        oSlide.innerHTML = str;
    }

    nengGe.slide.init.prototype.slideAnimate = function () {
        this.setColor();
        var oSlide = document.querySelectorAll('.slide-bar'),
        divWidth = oSlide[0].offsetWidth, //得到总宽度
        aP = getElements('.slide-bar p'),
        aIconBox = getElements('.icon-box'),
        spanWidth = aIconBox[0].offsetWidth;
        // alert(typeof spanWidth);
        for (var i = 0; i < oSlide.length; i++) {
            var rate = this.opt.value[i] / this.opt.number; //个人技能值所占比例。
            aP[i].style['width'] = divWidth * rate + 'px';
            aIconBox[i].style.left = divWidth * rate - spanWidth / 2 + 'px';  //滑块滑动的最终位置。
        }
        this.setTime();
        return this;
    }

    nengGe.slide.init.prototype.setTime = function () {  //定制时间间隔
        var aIconBox = getElements('.icon-box'),
            aP = getElements('.slide-bar p');
        for (var i = 0; i < aP.length; i++) {
            var obj = {
                google: "-webkit-transition",
                opera: '-o-transition',
                ie: '-ms-transition',
                firefox:'-moz-transition',
                normal: "transition",
            }
            for (var key in obj) {
                aIconBox[i].style[obj[key]] = 'all ' + this.opt.timerOut + 's';
                aP[i].style[obj[key]] = 'all ' + this.opt.timerOut + 's';
            }
        }
    }
    nengGe.slide.init.prototype.setColor = function(){
        var aP = getElements('.slide-bar p');
        for(var i = 0;i < this.opt.content.length;i++){
            aP[i].style.background = this.opt.color;
        }
    }
    window.N = nengGe; //暴露接口
}(window)