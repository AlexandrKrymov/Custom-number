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

        input.wrap('<' + options.containerTag + ' class="' + options.containerClass + '">');

        var wrapper = input.parent();

        wrapper.prepend('<' + options.btnTag + ' class="' + options.minus + '"></' + options.btnTag + '>');

        var minus = wrapper.find('.' + options.minus);

        wrapper.append('<' + options.btnTag + ' class="' + options.plus + '"></' + options.btnTag + '>');

        var plus = wrapper.find('.' + options.plus);

        var min = input.attr('min');

        var max = input.attr('max');

        if(input.attr('step')){

            var step = +input.attr('step');

        } else {

            var step = 1;

        }

        if(+input.val() <= +min){

            minus.addClass('disabled');

        }

        if(+input.val() >= +max){

            plus.addClass('disabled');

        }

        minus.click(function () {

            var input = $(this).parent().find('input');

            var value = input.val();

            if(+value > +min){

                input.val(+value - step);

                if(+input.val() === +min){

                    input.prev('.' + options.minus).addClass('disabled');

                }

                if(input.next('.' + options.plus).hasClass('disabled')){

                    input.next('.' + options.plus).removeClass('disabled')

                }

            } else if(!min){

                input.val(+value - step);

            }

        });

        plus.click(function () {

            var input = $(this).parent().find('input');

            var value = input.val();

            if(+value < +max){

                input.val(+value + step);

                if(+input.val() === +max){

                    input.next('.' + options.plus).addClass('disabled');

                }

                if(input.prev('.' + options.minus).hasClass('disabled')){

                    input.prev('.' + options.minus).removeClass('disabled')

                }

            } else if(!max){

                input.val(+value + step);

            }

        });

    };

})(jQuery);