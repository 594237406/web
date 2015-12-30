/**
 * Created by lihongji on 2015/6/13.
 */
var BaseModule = (function() {

    var defalutOptions={       //默认参数
            sty:"update"       //绘制策略：修改
        },
        drawStrategy={
            add:function(id,html){
                _u.id(id).innerHTML+=html;
            },
            update:function(id,html){
                _u.id(id).innerHTML=html;
            }
        }
 

    function BaseModule(options) {
        var options=this.validParameter(options); 
        this.dispatchEvent(); 
    }

    var fn=BaseModule.prototype;

    /*
        检查参数是否正确
    */
    fn.validParameter=(function(){
        var errorFn=function(){
            var msg=_a.shift.call(arguments);
            throw new Error(msg);
        },
        errorMsg={
            arg_typeerror:"argument type error",
            nodom:"dom not found",
            notemplate:"template not found",
            tmpl_typeerror:"template dom must by script",
        };

        return function(options){
            typeof options !='object' && errorFn.call(this,errorMsg.arg_typeerror);

            options=_u.mix(defalutOptions,options);            
            !_u.id(options.containerId)&&errorFn.call(this,errorMsg.nodom);
            !_u.id(options.templateId) &&errorFn.call(this,errorMsg.notemplate);
            !(_u.id(options.templateId).tagName=='SCRIPT')&&errorFn.call(this,errorMsg.tmpl_typeerror);


            this.options=options;               
            this.events=options.events||{}; 
            return options;
        }
    })();

    /*
        加载数据函数
    */
    fn.run=function(options){
        arguments=_a.slice.call(arguments);
        var options=_a.shift.call(arguments);
        var callback=_a.shift.call(arguments);

        this.render(options.data);      
        this.draw(this.options.sty);       

        typeof callback=="function"?callback.apply(this,arguments):void(0);        
    }; 

    /*
        获得模板内容函数
    */
    fn.render=function(){
        var data=_a.shift.call(arguments);
        this.html = template(this.options.templateId, data);
    };

    /*
        绘制函数
    */
    fn.draw=function(){
        var strategy=_a.shift.call(arguments);
        var drawMethod=drawStrategy[strategy];  
        drawMethod(this.options.containerId,this.html);
    };    

    /*
        分配事件
    */
    fn.dispatchEvent = function() {
        var container=_u.id(this.options.containerId);
        for (var evt in this.events) {
            var doms = this.events[evt];    
            for(var dom in doms){
                $(container).on(evt,dom,doms[dom]);
            }            
        }
    };

    return BaseModule;
})();