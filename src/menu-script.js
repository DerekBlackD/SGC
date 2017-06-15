+function ($) {
    'use strict';
    $('body').on('click', 'li.nav-first-level > span', function () {
        var $wrap = $('.menu-ul-nav-wrap'),
        $btn = $wrap.find('li.nav-first-level > span'),
        $content = $wrap.find('ul.nav-collapse');

        var $el = $(this),
        $elContent = $el.next('ul.nav-collapse');

        if ($elContent[0] != null){
            if (!$el.hasClass('active')) {
                $content.slideUp();
                $btn.removeClass('active');
                $el.addClass('active');
                $elContent.slideDown();
            } else {
                $el.removeClass('active');
                $elContent.slideUp();
            }
        }

        
    });

    $('body').on('click', 'li.nav-second-level > a', function () {
        var $wrap = $('.nav-collapse'),
        $btn = $wrap.find('li.nav-second-level > a'),
        $content = $wrap.find('ul.nav-collapse-sub');

        var $el = $(this),
        $elContent = $el.next('ul.nav-collapse-sub');

        if($elContent[0] != null){
            if (!$el.hasClass('activeSub')) {
                $content.slideUp();
                $btn.removeClass('activeSub');
                $el.addClass('activeSub');
                $elContent.slideDown();
            } else {
                $el.removeClass('activeSub');
                $elContent.slideUp();
            }
        }
        
    });
}(jQuery);