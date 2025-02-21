"use strict";

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            $(function() {
                var $window = $(window),
                    $html = $('html'),
                    $container = $('#container'),
                    $footer = $('#footer');

                /*
                //패밀리사이트 시작
                $('.site_select_btn').on('click', function() {
                    var $this = $(this),
                        $Parent = $this.parent('.site_select_box'),
                        IsActive = $Parent.is('.active'),
                        $Layer = $this.siblings('.site_select_layer');
                    if(!IsActive){
                        $Parent.addClass('active');
                        $this.attr('title', '패밀리사이트 목록닫기');
                        $Layer.stop().slideDown();

                    } else{
                        $Parent.removeClass('active');
                        $this.attr('title', '패밀리사이트 목록열기');
                        $Layer.stop().slideUp();
                    };
                });
                //패밀리사이트 끝
                */

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}