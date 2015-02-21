(function($){
    var fnull = function(){};

    var defaults = {
        minValue:1,
        maxValue:100,
        step:1,
        cssClass:'b-spinner'
    };


    $.extend(defaults,{
        htmlWrapper:'<div class="{cssClass}"></div>',
        htmlControls:'<a class="{cssClass}__control m-up"></a><a class="{cssClass}__control m-down"></a>'
    });


    function getDataValue(dom,attributes){
        var result = {};
        for(var i =0; i<attributes.length;i++){
            if(dom.data(attributes[i].toLowerCase())!=undefined){
                result[attributes[i]] = dom.data(attributes[i].toLowerCase());
            }
        }
        return result;
    }


    var Spinner = function(options){
        this.init(options);
    }


    var proto = {

        init:function(options){
            options = options||{};
            options = $.extend({},defaults,options,getDataValue(options['input'],['maxValue','minValue']));
            var input = options['input'];
            delete options['input'];

            var cssClass = defaults.cssClass;
            input
                .prop('readonly',true)
                .addClass(cssClass)
                .wrap(options.htmlWrapper.replace(/\{cssClass\}/,cssClass))
                .parent().append(options.htmlControls.replace(/\{cssClass\}/g,cssClass));

            var wrapper = input.parent();

            wrapper.find('.m-up').on('click', $.proxy(function(e){
                e.preventDefault();
                this.up();
            },this));
            wrapper.find('.m-down').on('click', $.proxy(function(e){
                e.preventDefault();
                this.down();
            },this));
            this.input = input;
            this.options  =  options;//$.extend(defaults,options);

        },
        up:function(){
            var
                value = parseInt(this.input.val()),
                newValue = value+1
            ;

            if(newValue>this.options.maxValue){
                return;
            }
            this.input.val(newValue).trigger('change',[this.options]);
        },
        down:function(){
            var
                value = parseInt(this.input.val()),
                newValue = value-1
                ;

            if(newValue<this.options.minValue){
                return;
            }
            this.input.val(newValue).trigger('change',[this.options]);
        }
    };

    Spinner.prototype = proto;



    $.fn.spinner = function(options){
        options = options ||{};

        this.each(function(){
            options['input']  = $(this);
            var spinner = new Spinner(options);
            $(this).data('spinner',spinner);
        });
        return this;
    }

    $.spinner = {
        defaults:defaults
    };
})(jQuery)