declare(function () {
    /**
    嵌入式-文字 布局引擎
    @class TextLayoutEngine
    @namespace $baseName.UI.Template
    */
    return TextLayoutEngine = {
        name:'Text',
        namespace:'Cpro.Template.LayoutEngine',
        
        /**
        布局, 生成布局对象
        @method layout
        @return {Object} layoutObject布局对象
        */
        layout: function (option) {
            var userConfig = option.userConfig;
            var fullConfig = option.fullConfig;
            var isRecursion = option.isRecursion;

            /* 全局控制区域 */
            var isShowUrl = true; //是否显示url, 如果desc的内容显示小于两行, 则不显示url
            var layoutIndex = {}; //索引器
            var engine = using("Cpro.Template.LayoutEngine.Base");
            
            //container
            var containerWidth = fullConfig.templateWidth;
            var containerHeight = fullConfig.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, fullConfig);          

            //item
            var itemWidth = Math.floor((container.style["width"] - fullConfig.itemColumnSpace * (fullConfig.adColumnCount - 1)) / fullConfig.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - fullConfig.itemRowSpace * (fullConfig.adRowCount - 1)) / fullConfig.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, fullConfig);

            //title
            var titleLayout = engine.calculateTitle(item.style["width"], item.style["height"], fullConfig);
            //由于title，url,desc是浮动定位，而rightimage是绝对定位，故在IE6下会产生bug，解决方案是rightimage和title的宽度小于item的宽度-3
            var titleWidth = fullConfig.itemRightImage?titleLayout.width-3:titleLayout.width;
            var titleHeight = titleLayout.height;
            var title = engine.layoutTitle(titleWidth, titleHeight, fullConfig);
            layoutIndex[title.dataKey] = title;

            //url
            var urlLayout = engine.calculateUrl(item.style["width"], item.style["height"], fullConfig);
            var urlWidth = fullConfig.itemRightImage?urlLayout.width-3:urlLayout.width;
            var urlHeight = urlLayout.height;
            var url = engine.layoutUrl(urlWidth, urlHeight, fullConfig);
            layoutIndex[url.dataKey] = url;

            //desc
            var descWidth = fullConfig.itemRightImage?item.style["width"]-3:item.style.width;
            var descHeight = item.style["height"] - titleHeight - urlHeight;
            var tempDescRowCount = engine.calculateDescRowCount(descHeight, fullConfig);
            if(typeof userConfig.urlIsShow === "undefined"){
                if( tempDescRowCount<1 || (tempDescRowCount<2 && descWidth<450) ){
                    //如果用户指定不显示url, 则在上述两种情况下不显示url
                    isShowUrl = false;
                    descHeight = item.style["height"] - titleHeight;
                }
            }
            
            //对于非用户设置, 不显示url的情况, 如果用户没有设置行间距, 则缩小默认的行间距, 重新进行探测
            if( !isRecursion && (typeof userConfig.urlIsShow === "undefined") &&  !isShowUrl &&  (typeof userConfig.itemRowSpace === "undefined")){
                fullConfig.itemRowSpace = 4;
                if( typeof userConfig.titlePaddingBottom === "undefined" ){
                    fullConfig.titlePaddingBottom = 1;
                }
                fullConfig.titlePadding
                option.isRecursion = true;
                return this.layout( option );
            }


            var desc = engine.layoutDesc(descWidth, descHeight, fullConfig);
            layoutIndex[desc.dataKey] = desc;

            //组装item
            if (fullConfig.titleIsShow) {
                item.content.push(title);
            }
            if (fullConfig.descIsShow) {
                item.content.push(desc);
            }
            if (fullConfig.urlIsShow > 0 || (fullConfig.urlIsShow === -1 && isShowUrl)) {
                item.content.push(url);
            }
            if(fullConfig.itemRightImage){
                var rightImage = engine.layoutRightImage(fullConfig.itemRightImageWidth, fullConfig.itemRightImageHeight, item.style.width, item.style.height, fullConfig);
                item.content.push(rightImage)
            }
            //行间距元素和列间距元素
            var columnSpace = engine.layoutColumnSpace(fullConfig.itemColumnSpace, itemHeight, fullConfig);
            var rowSpace = engine.layoutRowSpace(itemWidth, fullConfig.itemRowSpace, fullConfig);

            //组装container, 添加间距元素
            container = engine.layoutSpace(container, item, fullConfig);
            container.layoutIndex = layoutIndex;
            
            return container;
        }
    };
});