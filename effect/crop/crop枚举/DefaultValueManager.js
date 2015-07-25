declare(function () {
    /**
    模板参数默认值的管理类.
    @class DefaultValueManager
    @namespace UI.Template
    */
    return {
        name: 'DefaultValueManager',
        namespace: "Cpro.Template",
        /**    
        @param {Object} option 本次请求的参数
        @param {Number} [option.width]  广告宽度
        @param {Number} [option.height]  广告高度
        @param {String} [option.displayType]  广告展现类型
        @param {String} [option.stuffType]  广告物料类型
        @return {Object} 模板样式变量的默认值对象, key是fullName.
        */
        getDefaultValue: function (option) {
            var result = this.fastClone(this.globalDefaultValue);
            var keyArray = [];
            
            option.displayType = option.displayType ? option.displayType : "inlay";
            option.stuffType = option.stuffType ? option.stuffType : "text";
            
            keyArray.push(option.stuffType);
            keyArray.push(option.displayType);
            keyArray.push(option.displayType + "_" + option.stuffType);
            keyArray.push(option.displayType + "_" + option.stuffType + "_" + option.adRowCount + "_" + option.adColumnCount);
            keyArray.push(option.displayType + "_" + option.stuffType + "_" + option.templateWidth + "_" + option.templateHeight);
            keyArray.push(option.displayType + "_" + option.stuffType + "_" + option.templateWidth + "_" + option.templateHeight + "_" + option.adRowCount + "_" + option.adColumnCount);
            var tempKey = null;
            var tempObj = null;
            var ttkey = null;
            for (var i = 0, count = keyArray.length;
            i < count;
            i++) {
                tempKey = keyArray[i];
                tempObj = this[tempKey];
                if (tempKey && tempObj) {
                    for (ttkey in tempObj) {
                        if (ttkey && (tempObj[ttkey] !== null) && (typeof tempObj[ttkey] !== "undefined")) {
                            result[ttkey] = tempObj[ttkey];
                        }
                    }
                }
            }
            return result;
        },
        /**    
        @param {Object} option 需要克隆的对象
        @return {Object} 克隆后的对象
        */
        fastClone: function (source) {
            var temp = function () {};
            temp.prototype = source;
            return new temp();
        },
        /**
        Flash物料样式变量默认值
        @property {Object} 
        */
        flash: {
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            adRowCount: 1,
            adColumnCount: 1
        },
        /**
        Widget物料样式变量默认值
        @property {Object} 
        */
        widget: {
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            containerBorderTop: 1,
            containerBorderRight: 1,
            containerBorderBottom: 1,
            containerBorderLeft: 1,
            adRowCount: 1,
            adColumnCount: 1
        },
        /**
        图片物料样式变量默认值
        @param {Object} imageInlayDefaultValue 
        */
        image: {
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            adRowCount: 1,
            adColumnCount: 1
        },
        /**
        嵌入式-文字物料样式变量默认值
        */
        inlay_text: {
            containerPaddingRight: 8,
            containerBorderTop: 1,
            containerBorderRight: 1,
            containerBorderBottom: 1,
            containerBorderLeft: 1,
            containerBorderColor: "ffffff",
            titlePaddingBottom: 4,
            urlPaddingTop: 2
        },
        /**
        嵌入式-文字物料样式变量默认值
        */
        inlay_text_1_1: {
            titleFontSize: 20,
            descFontSize: 14,
            titleTextAlign: "center",
            descTextAlign: "center",
            urlTextAlign: "center",
            urlIsShow: 1
        },
        /**
        嵌入式-图文物料样式变量默认值
        */
        inlay_tuwen: {
            containerPaddingRight: 8
        },
        inlay_tuwen_1_1: {
            titleFontSize: 16
        },
        inlay_tuwen_1_4: {
            descFontSize: 12
        },
        /**
        嵌入式-LinkUnit1 样式变量默认值
        */
        inlay_linkunit1: {
            titleFontSize: 12,
            titleLineHeight: 15,
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            itemColumnSpace: 6,
            itemRowSpace: 4
        },
        inlay_linkunit1_120_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_160_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_180_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_200_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_468_15: {
            containerPaddingRight: 15,
            adRowCount: 1,
            adColumnCount: 5
        },
        inlay_linkunit1_728_15: {
            containerPaddingRight: 15,
            adRowCount: 1,
            adColumnCount: 6
        },
        /**
        嵌入式-文字-宽度960-高度90-横向广告数1-纵向广告数4 样式变量默认值
        @param {Object} inlay_text_960_90_1_4 
        */
        inlay_text_960_90_1_4: {
            descFontSize: 14,
            descLineHeight: 16,
            titlePaddingBottom: 3,
            urlPaddingTop: 2
        },
        /**
        嵌入式-文字-宽度468-高度60 样式变量默认值
        @param {Object} inlay_text_468_60 
        */
        inlay_text_468_60: {
            descFontSize: 12,
            descLineHeight: 14,
            titlePaddingBottom: 3,
            urlPaddingTop: 2,
            containerPaddingRight: 8,
            adRowCount: 1,
            adColumnCount: 2
        },

        /**
        嵌入式-图文-宽度468-高度60 样式变量默认值
        */
        inlay_tuwen_468_60: {
            descFontSize: 12,
            descLineHeight: 14,
            titlePaddingBottom: 3,
            urlPaddingTop: 2,
            adRowCount: 1,
            adColumnCount: 2
        },

        "float": {
            adRowCount: 1,
            adColumnCount: 1
        },


        float_linkunit1_120_270: {
            idPrefix: "lu_",
            containerShowLogo: 0,
            titleTextAlign: "left",
            titleFontColor: "666666",
            titleFontSize: 12,
            titleLineHeight: 14,
            titleShowUnderline: 0,
            containerPaddingLeft: 8,
            containerPaddingRight: 8,
            containerPaddingTop: 4,
            containerPaddingBottom: 4,
            containerBorderTop: 1,
            containerBorderRight: 1,
            containerBorderBottom: 1,
            containerBorderLeft: 1,
            containerBorderColor: "cccccc",
            itemColumnSpace: 6,
            itemRowSpace: 4,
            adRowCount: 2,
            adColumnCount: 1
        },


        /**
        全局样式变量默认值
        @param {Object} imageInlayDefaultValue 
        */
        globalDefaultValue: {
            "userChargingId": "",
            "templateWidth": 728,
            "templateHeight": 90,
            "adDataType": "text_tuwen",
            "adRowCount": 1,
            "adColumnCount": 4,
            "KeywordIsFlush": 4,
            "KeywordFlushColor": "e10900",
            "isShowUnrelated": 1,
            "isShowPublicAd": 1,
            "isGongyi": 0,
            "backupColor": "ffffff",
            "backupUrl": "",
            "displayType": "inlay",
            "stuffType": "image",
            "layout": "-1",
            "scale":"",
            "containerBorderColor": "ffffff",
            "containerBorderWidth": 1,
            "containerBorderTop": 0,
            "containerBorderRight": 0,
            "containerBorderBottom": 0,
            "containerBorderLeft": 0,
            "containerBorderStyle": "solid",
            "containerBackgroundColor": "ffffff",
            "containerPaddingLeft": 4,
            "containerPaddingRight": 4,
            "containerPaddingTop": 4,
            "containerPaddingBottom": 4,
			"containerMarginLeft": 0,
            "containerMarginRight": 0,
            "containerMarginTop": 0,
            "containerMarginBottom": 0,
            "containerOpacity": 0,
            "containerShowLogo": 1,
            "containerWidth": 0,
            "containerHeight": 0,
            "containerHideHeaderFooter": 0,
            "containerFloat": "none",
            "containerLogoStyle": "-1",
            "itemPaddingLeft": 0,
            "itemPaddingRight": 0,
            "itemPaddingTop": 0,
            "itemPaddingBottom": 0,
            "itemVerticalAlign": "-1",
            "itemColumnSpace": 20,
            "itemColumnBackgroundColor": "-1",
            "itemColumnBorderWidth": 0,
            "itemColumnBorderStyle": "solid",
            "itemColumnBorderColor": "-1",
            "itemColumnPaddingTop": 0,
            "itemColumnPaddingLeft": 0,
            "itemColumnPaddingRight": 0,
            "itemColumnPaddingBottom": 0,
            "itemColumnMarginTop" : 0,
            "itemColumnMarginLeft" : 0,
            "itemColumnMarginRight" : 0,
            "itemColumnMarginBottom" : 0,
            "itemRowSpace": 10,
            "itemRowBorderWidth": 0,
            "itemRowBorderStyle": "solid",
            "itemRowBorderColor": "-1",
            "itemRowPaddingTop": 0,
            "itemRowPaddingLeft": 0,
            "itemRowPaddingRight": 0,
            "itemRowPaddingBottom": 0,
            "itemRightImage" : 0,
            "itemRightImageSrc" : "",
            "itemRightImageWidth" : 0,
            "itemRightImageHeight" : 0,
            "itemRightImagePaddingTop" : 0,
            "itemRightImagePaddingLeft" : 0,
            "itemRightImagePaddingRight" : 0,
            "itemRightImagePaddingBottom" :0,
			
            "brandLogoPaddingLeft": 0,
            "brandLogoPaddingRight": 0,
            "brandLogoPaddingTop": 0,
            "brandLogoPaddingBottom": 0,
			
            "logoIsShow": 1,
            "logoPaddingLeft": 0,
            "logoPaddingRight": 4,
            "logoPaddingTop": 0,
            "logoPaddingBottom": 0,
            "titleFontColor": "0F0CBF",
            "titleFontFamily": "arial,simsun,sans-serif",
            "titleFontSize": 14,
            "titleLength": -1,
            "titleIsShowEllipsis": 0,
            "titleIsShow": 1,
            "titleRowCount": 1,
            "titlePaddingLeft": 0,
            "titlePaddingRight": 0,
            "titlePaddingTop": 0,
            "titlePaddingBottom": 5,
            "titleShowUnderline": 1,
            "titleLineHeight": -1,
            "titleWidth": -1,
            "titleFontWeight": "normal",
            "titleBackgroundColor": "-1",
            "titleHoverFontColor": "EE0000",
            "titleHoverShowUnderline": -1,
            "titleHoverBackgroundColor": "-1",
            "titleVisitedFontColor": "-1",
            "titleVisitedShowUnderline": -1,
            "titleVisitedBackgroundColor": "-1",
            "titleActiveFontColor": "-1",
            "titleActiveShowUnderline": -1,
            "titleActiveBackgroundColor": "-1",
            "titleTextAlign": "-1",
            "titleFrontIconSrc": "",
            "titleFrontIconWidth": 0,
            "titleFrontIconHeight": 0,
            "titleFrontIconPaddingRight": 0,
            "titleFrontIconPaddingLeft": 0,
            "descFontColor": "444444",
            "descFontFamily": "arial,simsun,sans-serif",
            "descFontSize": 14,
            "descLength": -1,
            "descIsShowEllipsis": 1,
            "descIsShow": 1,
            "descRowCount": -1,
            "descPaddingLeft": 0,
            "descPaddingRight": 0,
            "descPaddingTop": 0,
            "descPaddingBottom": 0,
            "descShowUnderline": 0,
            "descLineHeight": -1,
            "descWidth": -1,
            "descFontWeight": "normal",
            "descBackgroundColor": "-1",
            "descHoverFontColor": "EE0000",
            "descHoverShowUnderline": 1,
            "descHoverBackgroundColor": "-1",
            "descVisitedFontColor": "-1",
            "descVisitedShowUnderline": -1,
            "descVisitedBackgroundColor": "-1",
            "descActiveFontColor": "-1",
            "descActiveShowUnderline": -1,
            "descActiveBackgroundColor": "-1",
            "descTextAlign": "-1",
            "urlFontColor": "008000",
            "urlFontFamily": "arial,simsun,sans-serif",
            "urlFontSize": 11,
            "urlLength": -1,
            "urlIsShowEllipsis": 0,
            "urlIsShow": -1,
            "urlPaddingLeft": 0,
            "urlPaddingRight": 0,
            "urlPaddingTop": 3,
            "urlPaddingBottom": 0,
            "urlShowUnderline": 0,
            "urlRowCount": 0,
            "urlLineHeight": -1,
            "urlWidth": -1,
            "urlFontWeight": "normal",
            "urlBackgroundColor": "-1",
            "urlReplace": " ",
            "urlHoverFontColor": "EE0000",
            "urlHoverShowUnderline": 1,
            "urlHoverBackgroundColor": "-1",
            "urlVisitedFontColor": "-1",
            "urlVisitedShowUnderline": -1,
            "urlVisitedBackgroundColor": "-1",
            "urlActiveFontColor": "-1",
            "urlActiveShowUnderline": -1,
            "urlActiveBackgroundColor": "-1",
            "urlTextAlign": "-1"
        }
    }
});