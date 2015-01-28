(function($){
    var defaults = {
        minValue:1,
        maxValue:100,
        step:1,
        containerSelectro:'.b-spinner',
        decSelector:'.b-spinner__control.m-down',
        incSelector:'.b-spinner__control.m-up',
        inputSelector:'.b-spinner__input'

    };
    var options = {};

    $.fn.spinner = function(opts){
        opts = opts||{};
        options = $.extend(defaults,opts);
        console.log($(options.incSelector));
        $(options.incSelector).on('click',function(e){
            e.preventDefault();
            var
                _this       = $(e.currentTarget),
                container   = _this.parents(options.containerSelectro),
                input = container.find(options.inputSelector),
                value = parseInt(input.val())
                ;

            value = value+options.step;
            if(value<=options.maxValue){
                input.val(value);
                input.trigger('change');
            }

        })

        $(options.decSelector).on('click',function(e){
            e.preventDefault();
            var
                _this       = $(e.currentTarget),
                container   = _this.parents(options.containerSelectro),
                input = container.find(options.inputSelector),
                value = parseInt(input.val())
                ;

            value = value-options.step;
            if(value>=options.minValue){
                input.val(value);
                input.trigger('change');
            }

        })
    }
})(jQuery)