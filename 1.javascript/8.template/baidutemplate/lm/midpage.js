(function (w) {
    // private
    var cproJsStatus = "unload";
    var modules = {};

    // anti
    function AntiListener() {
        this.a = -1, this.b = -1, this.c = -1, this.d = -1, this.e = -1, this.f = -1, this.g = -1, this.h = -1, this.i = -1, this.j = [];
    }

    AntiListener.prototype = {
        k  : function (b) {
            return document.getElementById(b)
        },
        l  : function (b) {
            return document.getElementsByTagName(b)
        },
        m  : function (b) {
            return b || window.event
        },
        n  : function (b) {
            var b = this.m(b);
            return b.target || b.srcElement
        },
        o  : function (b, c, d) {
            if (window.addEventListener) {
                b.addEventListener(c, d, false)
            } else {
                b.attachEvent('on' + c, d)
            }
        },
        p  : function (b) {
            var c = this.m(b);
            var d = this.n(b);
            while (d.tagName.toLowerCase() != 'a') {
                d = d.parentNode;
            }
            if (d.href.indexOf('&ck') != -1) return;
            this.v(c);
            this.u();
            this.w(d);
            this.x(d)
        },
        q  : function () {
            return new Date().getTime()
        },
        r  : function (b) {
            if (this.h == -1) this.h = 0;
            this.h++
        },
        s  : function (b) {
            if (b.type == "mousedown") this.e = this.q();
            else this.e = this.q() - this.e
        },
        t  : function (b) {
            this.c == -1 ? this.c = b.clientX : this.c = this.c;
            this.d == -1 ? this.d = b.clientY : this.d = this.d
        },
        u  : function () {
            if (this.f == -1) this.f = this.q();
            this.g = this.q() - this.f
        },
        v  : function (b) {
            this.a = b.clientX;
            this.b = b.clientY
        },
        w  : function (b) {
            this.i = 0;
            var c = /\.php\?(url=)?([0-9a-zA-Z_-]*)\./.exec(b.href);
            c = c[2];
            var d = /.*(\d+)/.exec(b.id);
            d = d[1];
            var e = this.j[d];
            var f;
            for (var g = 0; g < (((this.h * e) % 99) + 9); g++) {
                var h = (this.e * g) % c.length;
                this.i += c.charCodeAt(h)
            }
        },
        x  : function (b) {
            var c = b.innerHTML;
            b.href += '&ck=' + this.i + '.' + this.h + '.' + this.e + '.' + this.a + '.' + this.b + '.' + this.c + '.' + this.d + '.' + this.g;
            if ((c.match(/(www\.)|(.*@.*)/i) != null) && document.all) {
                c.match(/\<.*\>/i) == null ? b.innerHTML = c : b.innerTEXT = c
            }
        },
        y  : function (b, c, d) {
            var e = b;
            var f = c;
            return function () {
                if (d && d.length) {
                    return e.apply(f || {}, d)
                } else {
                    return e.apply(f || {}, arguments)
                }
            }
        },
        run: function (obj) {
            var Dishs = obj.getElementsByTagName('a');
            this.o(obj, 'mouseover', this.y(this.t, this));
            this.o(obj, 'mouseover', this.y(this.u, this));
            for (var i = 0; i < Dishs.length; i++) {
                if (/\.php\?(url=)?([0-9a-zA-Z_-]*)\./.test(Dishs[i].href)) {
                    this.o(Dishs[i], 'mousedown', this.y(this.s, this));
                    this.o(Dishs[i], 'mouseup', this.y(this.s, this));
                    this.o(Dishs[i], 'click', this.y(this.p, this));
                    this.o(Dishs[i], 'mouseover', this.y(this.r, this));
                }
            }
        }
    };

    var cpro = {
        name            : "",
        type            : "cpro",
        param           : {},
        containerID     : "",
        templateID      : "",
        antiListener    : {},
        display         : function () {
            return true;
        },
        init            : function () {
        },
        setCproAdParam  : function (param) {
            return param;
        },
        //判断传入进来的是哪一个module
        getCproAd       : function (module) {
            if (module.name === "wendaModule") {
                return;
            }
            if (module.name === "aspSTOneModule") {
                return;
            }
            if (module.name === "aspSDModule") {
                return;
            }
            if (module.name === "aspSTModule" && (uiParam.cpro_st.wd_exp_flag & 16 || uiParam.cpro_st.expflag & 256)) {
                return;
            }
            if (module.name === "aspPicModule") {
                return;
            }
            function tmp() {
            }

            tmp.prototype = module.param;
            var cproParam = new tmp();
            cproParam['func'] = 'MidPageCallBack_' + module.name;//判短moudel执行的是哪一个回调函数
            window[cproParam['func']] = function (ads) {
                var aspads = ads;
                if (module.name === "aspModule" && uiParam.cpro_wd.display) {
                    aspads = [];
                    var wdads = [];
                    for (var i in ads) {
                        if (ads[i].cmatch === 281) {
                            wdads.push(ads[i]);
                        } else if (ads[i].cmatch === 112) {
                            aspads.push(ads[i]);
                        }
                    }
                    w.midpage.getModule("wendaModule").render(wdads);
                }
                if (module.name === "aspModule" && uiParam.cpro_st.display && (uiParam.cpro_st.wd_exp_flag & 16)) {
                    aspads = [];
                    var stads = [];
                    for (var i in ads) {
                        if (ads[i].cmatch === 112) {
                            aspads.push(ads[i]);
                        } else if (ads[i].cmatch === 286) {

                            stads.push(ads[i]);
                        }
                    }
                    w.midpage.getModule("aspSTModule").render(stads);
                }
                if (module.name == 'aspModule' && uiParam.cpro_st.wd_exp_flag & 512) {
                    for (var i in ads) {
                        if (ads[i].w_picurl) {
                            var tmp = ads[0];
                            ads[0] = ads[i];
                            ads[i] = tmp;
                            w.midpage.getModule("aspPicModule").render(ads);
                            return;
                        }
                    }
                }

                if (module.name === "aspModule" && uiParam.cpro_st.display && (uiParam.cpro_st.expflag & 256)) {
                    aspads = [];
                    var stads = [],
                        stoneads;
                    for (var i in ads) {
                        if (ads[i].cmatch === 112) {
                            aspads.push(ads[i]);
                        } else if (ads[i].cmatch === 286) {
                            stads.push(ads[i]);
                        }
                    }
                    stoneads = stads[0];
                    var flag = stoneads.w_picurl && stoneads.sturl.length && stoneads.desc;
                    if (flag) {
                        w.midpage.getModule("aspSTOneModule").render(stoneads);
                    }
                    if (!(flag && stads.length == 1)) {
                        w.midpage.getModule("aspSTModule").render(stads);
                    }

                }
                if (module.name = "aspSTModule") {
                    var stads = [],
                        sdads = [];
                    for (var i in ads) {
                        if (ads[i].st_mt == '3207') {
                            sdads.push(ads[i]);
                        } else {
                            stads.push(ads[i]);
                        }
                    }
                    if (sdads.length > 0) {
                        w.midpage.getModule("aspSTModule").render(stads);
                        w.midpage.getModule("aspSDModule").render(sdads);
                        return;
                    }
                }
                if (module.name === "aspModule") {
                    module.render(aspads);

                }
                else
                    module.render(ads);
            };
            window.arrBaiduCproConfig = [];
            window.arrBaiduCproConfig = this.setCproAdParam(cproParam);
            if (window.__bdcpro__displayTypeCounter &&
                window.__bdcpro__displayTypeCounter["ui"] &&
                window.__bdcpro__displayTypeCounter["ui"] > 20) {
                window.__bdcpro__displayTypeCounter["ui"] = 20;
            }
            var script = document.createElement('script');
            var request = window.f_u();
            request = this.beforeRequest(request);
            script.src = request;
            var ref_script = document.getElementsByTagName('script')[0];
            ref_script.parentNode.insertBefore(script, ref_script);
        },
        beforeRender    : function (ads) {
        },
        render          : function (ads) {
            if (this.templateID === '' || this.containerID === '' || ads == null || ads.length == 0)
                return;
            this.beforeRender(ads);
            var template = baidu.template(this.templateID);
            page.dom.find(this.containerID).innerHTML = template(this.setTemplateParam(ads));
            page.dom.find(this.containerID).style.display = "block";
            this.initAnti(ads, this.containerID);
            this.initEvent();
        },
        beforeRequest   : function (request) {
            return request;
        },
        setTemplateParam: function (ads) {
        },
        initEvent       : function () {
        },
        initAnti        : function (ads, containerID) {
            this.antiListener = new AntiListener();
            for (var i = 0, len = ads.length; i < len; i++) {
                this.antiListener.j.push(ads[i].mid);
            }
            this.antiListener.run(page.dom.find(containerID));
        }
    };

    var zhixin = {
        name            : "",
        type            : "zhixin",
        param           : {},
        containerID     : "",
        templateID      : "",
        pageElementID   : "",
        antiListener    : {},
        display         : function () {
            return true;
        },
        init            : function () {
        },
        setCproAdParam  : function (param) {
            return param;
        },
        getCproAd       : function (module) {
            function tmp() {
            }

            tmp.prototype = this.param;
            var cproParam = new tmp();
            cproParam['func'] = 'MidPageCallBack_' + this.name;
            window[cproParam['func']] = function (obj) {
                module.render(obj);
            };
            window.arrBaiduCproConfig = [];
            window.arrBaiduCproConfig = this.setCproAdParam(cproParam);
            if (window.__bdcpro__displayTypeCounter &&
                window.__bdcpro__displayTypeCounter["ui"] &&
                window.__bdcpro__displayTypeCounter["ui"] > 20) {
                window.__bdcpro__displayTypeCounter["ui"] = 20;
            }
            var script = document.createElement('script');
            var request = window.f_u();
            request = this.beforeRequest(request);
            script.src = request;
            var ref_script = document.getElementsByTagName('script')[0];
            ref_script.parentNode.insertBefore(script, ref_script);
        },
        showPage        : function (h, m) {
            var l = function (o, n) {
                var i = /{(.*?)}/g;
                return o.replace(i, function (r, q, p, t) {
                    return n[q] || ""
                });
            };
            var element = page.dom.find(this.pageElementID);
            element.className = 'ad_pagenation_area';
            element.style.display = "block";
            element.innerHTML = "";
            var c = document.createElement("div");
            c.className = 'ad_pagenation';
            var a = '<a href="###" target="_self" class="left" page_index={page_index} module_name="' + this.name + '">&lt;</a>';
            var j = '<a href="###" target="_self" class="left" page_index={page_index} module_name="' + this.name + '">&gt;</a>';
            var b = '<a href="###" target="_self" class="left" page_index={page_index} module_name="' + this.name + '">{page_index}</a>';
            var d = '<a href="###" target="_self" class="left" style="background:#FF7F00;color:white;" page_index={page_index}  module_name="' + this.name + '">{page_index}</a>';
            var k = '<div class="ad_pagenation_more left">...</div>';
            var g = "";
            var f = m > 4 ? 4 : m;
            if (h > 1) {
                g += l(a, {
                    page_index: h - 1
                });
            }
            if (h + 1 > m) {
                if (h - 3 > 0) {
                    g += l(b, {
                        page_index: h - 3
                    });
                    f--;
                }
            }
            if (h - 2 > 0) {
                g += l(b, {
                    page_index: h - 2
                });
                f--;
            }
            if (h - 1 > 0) {
                g += l(b, {
                    page_index: h - 1
                });
                f--;
            }
            for (var e = 0; e < f; e++) {
                if (e == 0) {
                    g += l(d, {
                        page_index: h + e
                    });
                } else {
                    g += l(b, {
                        page_index: h + e
                    });
                }
            }
            if (h < m) {
                g += l(j, {
                    page_index: h + 1
                });
            }
            g += "共" + m + "页";
            c.innerHTML = g;
            element.appendChild(c);
            element.innerHTML += '<style>.ad_pagenation_area{width:920px;height:40px;line-height:30px;overflow:hidden;position:relative;text-align:center;padding-bottom:10px;display:none}.ad_pagenation{height:30px;line-height:30px;display:inline-block;margin-top:10px;*display:inline;*zoom:1}.ad_pagenation a{width:30px;height:30px;line-height:30px;border:1px solid #e2e2e2;background-color:#fcfcfc;font-size:16px;color:#797979;margin-left:2px;margin-right:2px;text-align:center;_display:inline}.ad_pagenation a:hover{background-color:#ffe7ba}.ad_pagenation_more{width:30px;height:30px;line-height:30px;font-size:16px;color:#797979;margin-left:2px;margin-right:2px;text-align:center;_display:inline}.ad_pagenation_area{width:920px;height:40px;line-height:30px;overflow:hidden;position:relative;text-align:center;padding-bottom:10px;display:none}.ad_pagenation{height:30px;line-height:30px;display:inline-block;margin-top:10px;*display:inline;*zoom:1}.ad_pagenation a{width:30px;height:30px;line-height:30px;border:1px solid #e2e2e2;background-color:#fcfcfc;font-size:16px;color:#797979;margin-left:2px;margin-right:2px;text-align:center;_display:inline}.ad_pagenation a:hover{background-color:#ffe7ba}.ad_pagenation_more{width:30px;height:30px;line-height:30px;font-size:16px;color:#797979;margin-left:2px;margin-right:2px;text-align:center;_display:inline}</style>';
        },
        render          : function (obj) {
            if (this.templateID === '' || this.containerID === '' || obj == null)
                return;
            var template = baidu.template(this.templateID);
            var templateObj = this.setTemplateParam(obj);
            page.dom.find(this.containerID).innerHTML = template(templateObj);
            page.dom.find(this.containerID).style.display = "block";
            this.initAnti(obj, this.containerID);
            this.initEvent();
            this.showPage(templateObj.pageIndex, Math.ceil(templateObj.total / templateObj.pageSize));
            page.eventUtil.click(page.dom.find(this.pageElementID), function (e) {
                var element = e.target ? e.target : e.srcElement;
                if (element.getAttribute("page_index") == undefined ||
                    element.getAttribute("page_index") == null ||
                    element.getAttribute("page_index") == "") {
                    return;
                }
                var cur_index = parseInt(element.getAttribute("page_index"));
                var module_name = element.getAttribute("module_name");
                midpage.getModule(module_name).pageIndex = cur_index;
                midpage.runModule(module_name);
            });
        },
        beforeRequest   : function (request) {
            return request + '&pgin=' + this.pageIndex;
        },
        setTemplateParam: function (obj) {
        },
        initEvent       : function () {
        },
        initAnti        : function (obj, containerID) {
            this.antiListener = new AntiListener();
            for (var i = 0, len = obj.ads.length; i < len; i++) {
                this.antiListener.j.push(obj.mid);
            }
            this.antiListener.run(page.dom.find(containerID));
        }
    };

    var widget = {
        name            : "",
        type            : "widget",
        containerID     : "",
        templateID      : "",
        display         : function () {
            return true;
        },
        init            : function () {
        },
        render          : function () {
            if (this.templateID === '' || this.containerID === '')
                return;
            var template = baidu.template(this.templateID);
            page.dom.find(this.containerID).innerHTML = template(this.setTemplateParam());
            this.initEvent();
        },
        setTemplateParam: function () {
        },
        initEvent       : function () {
        }
    };

    // public
    w.midpage = {
        init    : function () {
            for (var key in w.uiParam.cpro_param) {
                if (w.uiParam.cpro_param.hasOwnProperty(key)) {
                    cpro.param[key] = w.uiParam.cpro_param[key];
                    zhixin.param[key] = w.uiParam.cpro_param[key];
                }
            }
        },
        register: function (module) {
            if (module.name === '') {
                return;
            }
            switch (module.type) {
                case 'cpro':
                function cproModule() {
                };
                    cproModule.prototype = cpro;
                    var obj = new cproModule();
                    for (var key in module) {
                        if (module.hasOwnProperty(key)) {
                            obj[key] = module[key];
                        }
                    }
                    modules[obj.name] = obj;
                    break;
                case 'zhixin':
                function zhixinModule() {
                };
                    zhixinModule.prototype = zhixin;
                    var obj = new zhixinModule();
                    for (var key in module) {
                        if (module.hasOwnProperty(key)) {
                            obj[key] = module[key];
                        }
                    }
                    modules[obj.name] = obj;
                    break;
                case 'widget':
                function widgetModule() {
                };
                    widgetModule.prototype = widget;
                    var obj = new widgetModule();
                    for (var key in module) {
                        if (module.hasOwnProperty(key)) {
                            obj[key] = module[key];
                        }
                    }
                    modules[obj.name] = obj;
                    break;
                default:
                    break;
            }
        },

        runModule : function (moduleName) {
            var module = modules[moduleName];
            if (module == null) {
                return;
            }
            //判断moudel是什么类型执行哪块功能呢个函数
            switch (module.type) {
                case 'zhixin':
                case 'cpro':
                    switch (cproJsStatus) {
                        //根据ajax的返回值判断
                        case 'unload':
                            cproJsStatus = 'loading';
                            page.html.loadJs('http://cpro.baidustatic.com/cpro/ui/ui.js', function () {
                                cproJsStatus = 'loaded';
                                midpage.runModule(moduleName);
                            });
                            break;
                        case 'loading':
                            setTimeout(function () {
                                midpage.runModule(moduleName);
                            }, 10);
                            break;
                        case 'loaded':
                            module.init();
                            //初始化进行声明
                            module.getCproAd(module);
                            break;
                        default:
                            break;
                    }
                    break;
                case 'widget':
                    module.init();
                    module.render();
                    break;
                default:
                    break;
            }
        },
        run       : function () {
            for (var m in modules) {
                //遍历所有的模块
                if (modules.hasOwnProperty(m)) {
                    modules[m].display() && this.runModule(m);
                    //如果模块有display属性的话就在runModule里面跑一遍
                }
            }
        },
        getModule : function (moduleName) {
            if (moduleName === '')
                return;
            return modules[moduleName];
        },
        modFactory: function (p, moduleName) {
            midpage.register((function () {
                var t = {};
                var baseMoudule = midpage.getModule(moduleName);
                for (var prop in baseMoudule) {
                    t[prop] = baseMoudule[prop];
                }
                for (var prop in p) {
                    t[prop] = p[prop];
                }
                return t;
            })());
        },
        modModify : function (p, moduleName) {
            var t = {};
            var baseModule = midpage.getModule(moduleName);
            if (p["name"]) {
                b[p["name"]] = baseModule;
                delete b[baseModule["name"]];
                baseModule = b[p["name"]];
            }
            if (baseModule) {
                for (var prop in p) {
                    baseModule[prop] = p[prop];
                }
            }
        }
    };

    // construction
    midpage.init();
})(window);