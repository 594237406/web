declare(function () {
    /**
    模板参数管理类
    @class TemplateVariableManager
    @namespace UI.Template
    */
    return {
        name: 'TemplateVariableManager',
        namespace: 'Cpro.Template',

        /**
        获取参数的全名
        @method getFullName
        */
        getFullName: function (shortName) {
            return this.nameMapping[shortName];
        },

        /**
        获取转换为了全名参数的配置文件
        返回一个用作mapping的object. 这个object有两个作用. 一个是编程时使用fullName获取到用户的设置值, 
        还以判断用户是否传递了参数,以便在需要的时候决定是否使用默认值.
        @method getFullNameConfig
        */
        getFullNameConfig: function (userConfig) {
            var result = {};
            var paramFullName;
            var paramValue;
            var lowerCaseConfig = {};
            for (key in userConfig) {
                if (!key || (typeof userConfig[key] === "undefined")) {
                    continue;
                }

                paramFullName = this.getFullName(key.toLowerCase());
                paramValue = userConfig[key];

                //对于string类型, 一般是颜色参数要特殊处理, 去掉"#"号
                if (typeof paramValue === "string") {
                    paramValue = decodeURIComponent(paramValue).replace("#", "");
                }

                if (paramFullName) {
                    result[paramFullName] = paramValue;
                }
                else {
                    //未定义参数, 不进行名字转换
                    result[key] = paramValue;
                }

                lowerCaseConfig[key.toLowerCase()] = paramValue;
            }
            userConfig = lowerCaseConfig;

            //特殊处理hn和wn参数
            if (!userConfig.column && userConfig.wn) {
                result.adColumnCount = parseInt(userConfig.wn);
            }
            if (!userConfig.row && userConfig.hn) {
                result.adRowCount = parseInt(userConfig.hn);
            }

            //特殊处理容器宽高
            if (userConfig.conw && userConfig.conw > 0) {
                result.templateWidth = userConfig.conw;
            }
            if (userConfig.conh && userConfig.conh > 0) {
                result.templateHeight = userConfig.conh;
            }

            //特殊处理容器边框
            if (typeof result.containerBorderWidth !== "undefined") {
                result.containerBorderTop = parseInt(result.containerBorderWidth);
                result.containerBorderRight = parseInt(result.containerBorderWidth);
                result.containerBorderBottom = parseInt(result.containerBorderWidth);
                result.containerBorderLeft = parseInt(result.containerBorderWidth);
            }
            
            return result;
        },


        /**
        获取所有参数列表
        @method getFullName
        @static
        */
        getVariables: function (userConfig) {
            var fullConfig = {};
            var defaultValueManager = using("Cpro.Template.DefaultValueManager");

            //从defaultValueManager类中, 根据当前用户的请求配置, 获取本次请求的默认值. 
            var defaultValue = defaultValueManager.getDefaultValue(userConfig);

            //使用用户设置的值替换默认值 
            var paramValue;
            for (key in userConfig) {
                if (key && (typeof userConfig[key] !== "undefined")) {
                    paramValue = userConfig[key];
                    if (typeof paramValue === "string") {
                        paramValue = decodeURIComponent(paramValue).replace("#", "");
                    }
                    if (paramValue !== "") {
                        defaultValue[key] = userConfig[key];
                    }
                }
            }

            return defaultValue;
        },
        /**
        保存参数"缩写"->"全名"的映射关系
        @property nameMapping
        @type Obejct    
         */
        nameMapping: {
            "n": "userChargingId",
            "rsi0": "templateWidth",
            "rsi1": "templateHeight",
            "at": "adDataType",
            "row": "adRowCount",
            "column": "adColumnCount",
            "rsi5": "keywordIsFlush",
            "rss6": "keywordFlushColor",
            "rad": "isShowUnrelated",
            "cad": "isShowPublicAd",
            "isgongyi": "isGongyi",
            "rss7": "backupColor",
            "aurl": "backupUrl",
            "displaytype": "displayType",
            "stufftype": "stuffType",
            "layout": "layout",
            "scale":"scale",
            "rss0": "containerBorderColor",
            "conbw": "containerBorderWidth",
            "conbt": "containerBorderTop",
            "conbr": "containerBorderRight",
            "conbb": "containerBorderBottom",
            "conbl": "containerBorderLeft",
            "conbs": "containerBorderStyle",
            "rss1": "containerBackgroundColor",
            "conpl": "containerPaddingLeft",
            "conpr": "containerPaddingRight",
            "conpt": "containerPaddingTop",
            "conpb": "containerPaddingBottom",
			"conml": "containerMarginLeft",
            "conmr": "containerMarginRight",
            "conmt": "containerMarginTop",
            "conmb": "containerMarginBottom",
            "conop": "containerOpacity",
            "consl": "containerShowLogo",
            "conw": "containerWidth",
            "conh": "containerHeight",
            "conhhf": "containerHideHeaderFooter",
            "conf": "containerFloat",
            "conls": "containerLogoStyle",
            "itepl": "itemPaddingLeft",
            "itepr": "itemPaddingRight",
            "itept": "itemPaddingTop",
            "itepb": "itemPaddingBottom",
            "iteva": "itemVerticalAlign",
            "itecs": "itemColumnSpace",
            "itecb": "itemColumnBackgroundColor",
            "itecbw": "itemColumnBorderWidth",
            "itecbs": "itemColumnBorderStyle",
            "itecbc": "itemColumnBorderColor",
            "itecpt": "itemColumnPaddingTop",
            "itecpl": "itemColumnPaddingLeft",
            "itecpr": "itemColumnPaddingRight",
            "itecpb": "itemColumnPaddingBottom",
            "itecmt": "itemColumnMarginTop",
            "itecml": "itemColumnMarginLeft",
            "itecmr": "itemColumnMarginRight",
            "itecmb": "itemColumnMarginBottom",
            "iters": "itemRowSpace",
            "iterbw": "itemRowBorderWidth",
            "iterbs": "itemRowBorderStyle",
            "iterbc": "itemRowBorderColor",
            "iterpt": "itemRowPaddingTop",
            "iterpl": "itemRowPaddingLeft",
            "iterpr": "itemRowPaddingRight",
            "iterpb": "itemRowPaddingBottom",
            "iteri": "itemRightImage",
            "iteris": "itemRightImageSrc",
            "iteriw": "itemRightImageWidth",
            "iterih": "itemRightImageHeight",
            "iteript": "itemRightImagePaddingTop",
            "iteripl": "itemRightImagePaddingLeft",
            "iteripr": "itemRightImagePaddingRight",
            "iteripb": "itemRightImagePaddingBottom",
            "logis": "logoIsShow",
            "logpl": "logoPaddingLeft",
            "logpr": "logoPaddingRight",
            "logpt": "logoPaddingTop",
            "logpb": "logoPaddingBottom",
            "blogpl": "brandLogoPaddingLeft",
            "blogpr": "brandLogoPaddingRight",
            "blogpt": "brandLogoPaddingTop",
            "blogpb": "brandLogoPaddingBottom",
            "rss2": "titleFontColor",
            "titff": "titleFontFamily",
            "titfs": "titleFontSize",
            "titl": "titleLength",
            "titse": "titleIsShowEllipsis",
            "titis": "titleIsShow",
            "titrc": "titleRowCount",
            "titpl": "titlePaddingLeft",
            "titpr": "titlePaddingRight",
            "titpt": "titlePaddingTop",
            "titpb": "titlePaddingBottom",
            "titsu": "titleShowUnderline",
            "titlh": "titleLineHeight",
            "titw": "titleWidth",
            "titfw": "titleFontWeight",
            "titbc": "titleBackgroundColor",
            "tithfc": "titleHoverFontColor",
            "tithsu": "titleHoverShowUnderline",
            "tithbc": "titleHoverBackgroundColor",
            "titvfc": "titleVisitedFontColor",
            "titvsu": "titleVisitedShowUnderline",
            "titvbc": "titleVisitedBackgroundColor",
            "titafc": "titleActiveFontColor",
            "titasu": "titleActiveShowUnderline",
            "titabc": "titleActiveBackgroundColor",
            "titta": "titleTextAlign",
            "titfis": "titleFrontIconSrc",
            "titfiw": "titleFrontIconWidth",
            "titfih": "titleFrontIconHeight",
            "titfil": "titleFrontIconPaddingLeft",
            "titfip": "titleFrontIconPaddingRight",
            "iconbh":"iconBackgroundColorHig",
            "iconbl":"iconBackgroundColorLow",
            "rss3": "descFontColor",
            "desff": "descFontFamily",
            "desfs": "descFontSize",
            "desl": "descLength",
            "desse": "descIsShowEllipsis",
            "desis": "descIsShow",
            "desrc": "descRowCount",
            "despl": "descPaddingLeft",
            "despr": "descPaddingRight",
            "despt": "descPaddingTop",
            "despb": "descPaddingBottom",
            "dessu": "descShowUnderline",
            "deslh": "descLineHeight",
            "desw": "descWidth",
            "desfw": "descFontWeight",
            "desbc": "descBackgroundColor",
            "deshfc": "descHoverFontColor",
            "deshsu": "descHoverShowUnderline",
            "deshbc": "descHoverBackgroundColor",
            "desvfc": "descVisitedFontColor",
            "desvsu": "descVisitedShowUnderline",
            "desvbc": "descVisitedBackgroundColor",
            "desafc": "descActiveFontColor",
            "desasu": "descActiveShowUnderline",
            "desabc": "descActiveBackgroundColor",
            "desta": "descTextAlign",
            "rss4": "urlFontColor",
            "urlff": "urlFontFamily",
            "urlfs": "urlFontSize",
            "urll": "urlLength",
            "urlse": "urlIsShowEllipsis",
            "urlis": "urlIsShow",
            "urlpl": "urlPaddingLeft",
            "urlpr": "urlPaddingRight",
            "urlpt": "urlPaddingTop",
            "urlpb": "urlPaddingBottom",
            "urlsu": "urlShowUnderline",
            "urlrc": "urlRowCount",
            "urllh": "urlLineHeight",
            "urlw": "urlWidth",
            "urlfw": "urlFontWeight",
            "urlbc": "urlBackgroundColor",
            "urlre": "urlReplace",
            "urlhfc": "urlHoverFontColor",
            "urlhsu": "urlHoverShowUnderline",
            "urlhbc": "urlHoverBackgroundColor",
            "urlvfc": "urlVisitedFontColor",
            "urlvsu": "urlVisitedShowUnderline",
            "urlvbc": "urlVisitedBackgroundColor",
            "urlafc": "urlActiveFontColor",
            "urlasu": "urlActiveShowUnderline",
            "urlabc": "urlActiveBackgroundColor",
            "urlta": "urlTextAlign"
        }
    };
});