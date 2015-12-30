declare(function () {
    /**
    渲染引擎
    @class PaintEngine
    @namespace $baseName.UI.Template
    */
    return {
        name:'PaintEngine',
        namespace: 'Cpro.Template',
        idPrefix:"",
        /**
        需要添加px单位的样式属性
        @property pxStyle
        @type Object
        */
        pxStyle: {
            width: 1,
            height: 1,
            "line-height": 1,
            "padding-left": 1,
            "padding-right": 1,
            "padding-top": 1,
            "padding-bottom": 1,
            "border-width": 1,
            "font-size": 1,
            "margin-left": 1,
            "margin-right": 1,
            "margin-top": 1,
            "margin-bottom": 1,
            "border-left-width": 1,
            "border-right-width": 1,
            "border-top-width": 1,
            "border-bottom-width": 1
        },

        /**
        layoutObj中哪些属性是不需要paint的.
        @property excludeStyle
        @type Object
        */
        excludeStyle: {
            "outer-height": 1,
            "outer-width": 1
        },

        /**
        自动生成的a元素, 会继承哪些属性
        @property linkStyle
        @type Object
        */
        linkStyle: {
            "font-size": 1,
            "height": 1,
            "line-height": 1,
            "text-decoration": 1,
            "text-align": 1,
            "font-family": 1,
            "color": 1,
            "word-wrap": 1,
            "word-break" : 1,
            "text-overflow" : 1
        },

        /**
        生成样式时的全局数组对象
        @property globalGetStyleObj
        @type Object
        */
        globalGetStyleObj: {},

        /**
        全局的样式字符串cssString
        @property cssString
        @type {String}
        */
        cssString: "",

        /**
        全局ID记录器
        @property idRecorder
        @type {Object}
        */
        idRecorder: {},

        /**
        获取layoutObj的样式
        @method getStyle 
        */
        getStyle: function (cssClassName, o) {
            var result = "";
            if (this.globalGetStyleObj[cssClassName]) {
                return "";
            }
            else {
                this.globalGetStyleObj[cssClassName] = 1;
            }
            var style = o.style;
            if (style) {
                for (var key in style) {
                    if (this.excludeStyle[key]) {
                        continue;
                    }
                    result += key + ":" + style[key] + (this.pxStyle[key] ? "px;" : ";");
                }
            }
            result = "." + cssClassName + " {" + result + "} \n";
            return result;
        },

        /**
        获取layoutObj对应的a元素的样式
        @method getLinkStyle 
        */
        getLinkStyle: function (cssClassName, o) {
            var result = "";
            if (this.globalGetStyleObj[cssClassName]) {
                return "";
            }
            else {
                this.globalGetStyleObj[cssClassName] = 1;
            }
            var style = o.style;
            if (style) {
                for (var key in style) {
                    if (this.excludeStyle[key] || !this.linkStyle[key]) {
                        continue;
                    }
                    result += key + ":" + style[key] + (this.pxStyle[key] ? "px;" : ";");
                }
            }
            

            if (o.dataType === "flash") {
                result += "display:block; position:absolute; top:0px; left:0px; z-index:9; cursor:hand; opacity:0; filter:alpha(opacity=0); background-color:#FFFFFF; width:" + style["width"] + "px;";
            }

            result = "." + cssClassName + " {" + result + "} \n";
            
            if(o.styleHover){
                var tempOption = {};
                tempOption.style = o.styleHover;
                result += this.getLinkStyle(cssClassName+":hover", tempOption);
            }
            
            return result;
        },

        /**
        添加样式字符串
        @method addCssByStyle 
        */
        addCssByStyle: function (cssString) {
            var doc = document;
            var style = doc.createElement("style");
            style.setAttribute("type", "text/css");

            if (style.styleSheet) { // IE
                style.styleSheet.cssText = cssString;
            }
            else { // w3c
                var cssText = doc.createTextNode(cssString);
                style.appendChild(cssText);
            }

            var heads = doc.getElementsByTagName("head");
            if (heads.length) heads[0].appendChild(style);
            else doc.documentElement.appendChild(style);
        },


        /**
        根据layoutObj, 绘制dom元素
        @method drawDom 
        @return {Object} 
        */
        drawDom: function (layoutObj) {
            var cssName = layoutObj.cssName || layoutObj.dataKey;
            this.cssString += this.getStyle(cssName, layoutObj);
            var dom = document.createElement(layoutObj.domName);
            dom.className = cssName;
            for (var key in layoutObj.props) {
                dom[key] = layoutObj.props[key];
            }
            if (layoutObj.dataType != "layout") {
                this.idRecorder[layoutObj.dataKey+this.idPrefix] = this.idRecorder[layoutObj.dataKey+this.idPrefix] || 0
                var domId = this.idPrefix + layoutObj.dataKey + this.idRecorder[layoutObj.dataKey+this.idPrefix];
                var domLink = document.createElement("a");
                domLink.id = domId;
                domLink.target = "_blank";
                var cssNameLink = cssName + " a";
                this.cssString += this.getLinkStyle(cssNameLink, layoutObj);
                this.idRecorder[layoutObj.dataKey+this.idPrefix]++;

                //set default value of whether click or not is true
                var enableClick = layoutObj.enableClick !== undefined ? layoutObj.enableClick : 1;
                
                switch (layoutObj.dataType) {
                    case "text":
                        break;
                    case "image":
                        var domLinkImg = document.createElement("img");
                        domLinkImg.style.width = (layoutObj.style["width"]) + "px";
                        domLinkImg.style.height = (layoutObj.style["height"]) + "px";
                        domLink.style.display = "block";
                        domLink.appendChild(domLinkImg);
                        break;
                    case "flash":
                        var flashDiv = document.createElement("div");
                        flashDiv.style.width = (layoutObj.style["width"]) + "px";
                        flashDiv.style.height = (layoutObj.style["height"]) + "px";
                        flashDiv.id = domId + "Flash";
                        dom.appendChild(flashDiv);
                        break;
                    case "icon":
                        if(enableClick){
                            var domEmptyDv = document.createElement("div");
                            domEmptyDv.style.width = (layoutObj.style["width"]) + "px";
                            domEmptyDv.style.height = (layoutObj.style["height"]) + "px";
                            domLink.appendChild(domEmptyDv);
                        }
                        break;
                    default:
                        break;
                }
                if(enableClick){
                    dom.appendChild(domLink);
                }
            }

            if (layoutObj.content && layoutObj.content.length) {
                for (var i = 0, count = layoutObj.content.length; i < count; i++) {
                    for (var j = 0, ccount = layoutObj.content[i].count || 1; j < ccount; j++) {
                        dom.appendChild(this.drawDom(layoutObj.content[i]));
                    }
                }
            }
            return dom;
        },
        
        /**
        绘制logo
        @param {Object} option 参数对象集合
        @param {Object} [option.layoutObj] 布局对象
        */
        drawLogo: function(option){       
            option = option || {};
            var logoId = option.logoId || "logo";
            var logoDom = document.getElementById(logoId);
            if(!logoDom){
                logoDom = document.createElement("a");
            }            
  
            var isGongyi = false;
            if(typeof option.isGongyi === "undefined" && typeof window.isGongyi !== "undefined"){
                isGongyi = window.isGongyi;
            }
            else{
                isGongyi = option.isGongyi? true : false;
            }
            logoDom.innerHTML = "&nbsp;";
            logoDom.className=option.className||"bd-logo";
            logoDom.target="_blank";
            if(isGongyi){
                logoDom.href="http://gongyi.baidu.com/";
                logoDom.title="\u767e\u5ea6\u516c\u76ca";                
            }
            else{
                logoDom.href="http://wangmeng.baidu.com/";
                if(option.stuffType == "image" || option.stuffType == "flash" || option.stuffType == "widget"){
                    logoDom.title = "\u63A8\u5E7F\u7528\u6237 : "+option.title
                }else{
                    logoDom.title = "\u767e\u5ea6\u7f51\u76df\u63a8\u5e7f"
                }
            }
            
            var tempFunc = function () {
                logoDom.style.zoom = '1';
            };
            setTimeout(tempFunc, 100);
            return logoDom;
        },


        /**
        根据传入的layoutObject, 渲染页面
        @method paint
        @param {Object} option 参数对象集合
        @param {Object} [option.layoutObj] 布局对象
        */
        paint: function (option) {
            var result = [];
            var userConfig = option.userConfig;
            var fullConfig = option.fullConfig;
            var layoutObj = option.layoutObj;
            var data = option.data;
            
            var styleCssString = option.styleCssString || "";
            this.idPrefix=fullConfig.idPrefix || "";

            result = this.drawDom(layoutObj);
            this.cssString += styleCssString;
            this.addCssByStyle(this.cssString);

            if (window.ad) {
                window.ad.parentNode.removeChild(window.ad);
                window.ad = null;
            }

            if(option.dom){
                option.dom.appendChild(result)
            }else{
                window.loader = document.getElementById(this.idPrefix+"loader");
                window.ad = result;
                window.loader.parentNode.insertBefore(result, window.loader);
            }

            //<<a id="logo" class="logo" title="推广用户：www.tczlq.com" href="http://wangmeng.baidu.com/" target="_blank">&nbsp;</a>
            //添加推广logo
            if (fullConfig.containerShowLogo) { 
                var logoStyle = "bd-logo";
                if( userConfig.containerLogoStyle ){
                    //如果用户设置了, 则以用户设置的为准
                    logoStyle = userConfig.containerLogoStyle;
                }
                else{
                    //用户未设置, 并且编程未设置, 则自动计算
                    if(fullConfig.containerLogoStyle.toString() === "-1"){
                        if(fullConfig.stuffType==="linkunit1" || fullConfig.stuffType==="iconlinkunit"){
                            logoStyle = "bd-logo2";
                        }
                    }
                }

                var logoOption = { "className": logoStyle, "isGongyi" : fullConfig.isGongyi , title: data[0].surl, stuffType:fullConfig.stuffType};
                result.appendChild(this.drawLogo(logoOption));
            }
            window.loader = window.ad = result = null;

        }

    }
});