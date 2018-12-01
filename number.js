(function( $ ) {

    $.fn.number = function(customOptions) {

        var options = {

            'containerClass' : 'number-style',
            'minus' : 'number-minus',
            'plus' : 'number-plus',
            'containerTag' : 'div',
            'btnTag' : 'span'

        };

        options = $.extend(true, options, customOptions);

        var input = this;
        var min = input.attr('min');
        var max = input.attr('max');
        var step = (input.attr('step')) ? +input.attr('step') : 1;

        input.wrap('<' + options.containerTag + ' class="' + options.containerClass + '">');
        var wrapper = input.closest('.' + options.containerClass);

        wrapper.prepend('<' + options.btnTag + ' class="' + options.minus + '"></' + options.btnTag + '>');
        var minus = wrapper.find('.' + options.minus);

        wrapper.append('<' + options.btnTag + ' class="' + options.plus + '"></' + options.btnTag + '>');
        var plus = wrapper.find('.' + options.plus);

        if(!changeExtrem('minus')) minus.addClass('disabled');
        if(!changeExtrem('plus')) plus.addClass('disabled');

        // Обрабатываем события
        minus.on('click', {direction: 'minus'}, changeInput);
        plus.on('click', {direction: 'plus'}, changeInput);

        // Проверяем является ли значение input экстремальным
        function changeExtrem(direction) {
            var val = input.val();
            if(direction === 'plus' && max){
                return (val !== max);
            } else if(direction === 'minus' && min){
                return (val !== min);
            } else {
                return true;
            }

        }

        // Меняем значение input
        function changeInput(event){
            var value = Number(input.val());

            if(!changeExtrem(event.data.direction)) return;

            if(event.data.direction === 'minus'){
                input.val(value - step);
                if(!changeExtrem('minus')) minus.addClass('disabled');
                if(changeExtrem('plus')) plus.removeClass('disabled');
            } else {
                input.val(value + step);
                if(!changeExtrem('plus')) plus.addClass('disabled');
                if(changeExtrem('minus')) minus.removeClass('disabled');
            }

            // Триггерим событие изменения на input
            input.trigger('change');

        }

    };

})(jQuery);