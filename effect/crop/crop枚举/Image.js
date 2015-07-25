declare(function () {
    /**
    嵌入式-图片 布局引擎
    @class TextLayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name: 'Image',
        namespace: 'Cpro.Template.LayoutEngine',
        /**
        布局, 生成布局对象
        @method layout
        @return {Object} layoutObject布局对象
        */
        layout: function (option) {
            var userConfig = option.userConfig;
            var fullConfig = option.fullConfig;

            /* 全局控制区域 */
            var isShowUrl = true; //是否显示url, 如果desc的内容显示小于两行, 则不显示url
            var layoutIndex = {}; //索引器
            var engine = using("Cpro.Template.LayoutEngine.Base");

            //container
            var containerWidth = fullConfig.templateWidth;
            var containerHeight = fullConfig.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, fullConfig);
            if (fullConfig.adRowCount == 1 && fullConfig.adColumnCount == 1) {
                container.style["text-align"] = "center";
            }

            //item
            var itemWidth = Math.floor((container.style["width"] - fullConfig.itemColumnSpace * (fullConfig.adColumnCount - 1)) / fullConfig.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - fullConfig.itemRowSpace * (fullConfig.adRowCount - 1)) / fullConfig.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, fullConfig);

            //image
            var imageLayout = engine.calculateImage(item.style["width"], item.style["height"], fullConfig);
            var imageHeight = imageLayout.height;
            var imageWidth = imageLayout.width;
            var image = engine.layoutImage(imageWidth, imageHeight, fullConfig);
            layoutIndex[image.dataKey] = image;


            //组装item
            item.content.push(image);


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