
(function ($) {

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //여기서부터 코드 작성해주세요
        /* 메인슬라이드 - 시작 */
        var $MainSlideBox = $('.main_slide_box'),
            $MainSlideList = $MainSlideBox.find('.main_slide_list');

        $MainSlideList.slick({
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 500,
            cssEase: 'linear',
            dots : false,
            arrows : true,
            infinite : true,
            fade : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            //추가 기능
            prevArrow: $MainSlideBox.find('.slick-arrow.prev'),
            nextArrow: $MainSlideBox.find('.slick-arrow.next'),
            //autoArrow : $MainSlideBox.find('.slick-arrow.auto'),
            isRunOnLowIE : true,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
        });
        /* 메인슬라이드 - 끝 */
        /* 메인슬라이드 컨트롤 - 시작 */
        $MainSlideBox.find('.slick-arrow.pause').on('click', function (){
            $MainSlideList.slick('slickPause');
            $(this).hide();
            $(this).siblings('.slick-arrow.play').show();
        });
        $MainSlideBox.find('.slick-arrow.play').on('click', function (){
            $MainSlideList.slick('slickPlay');
            $(this).hide();
            $(this).siblings('.slick-arrow.pause').show();
        });
        /* 메인슬라이드 컨트롤 - 끝 */


        /* 알림마당 탭메뉴 - 시작 */
        $('.notice_box .notice_tab_item .item_area').on('click', function(){
            var $thisBtn = $(this),
                $MyParent = $thisBtn.parent('.notice_tab_item'),
                IsActive = $MyParent.is('.active'),
                $OtherParents = $MyParent.siblings('.notice_tab_item'),
                $OtherBtns = $OtherParents.find('.item_area'),
                ParentsIndex = $MyParent.index(),
                $NoticeInner = $('.notice_box .notice_inner');

            if(!IsActive){
                $MyParent.addClass('active');
                $OtherParents.removeClass('active');
                $thisBtn.attr('title', '선택됨');
                $OtherBtns.removeAttr('title');
                $NoticeInner.eq(ParentsIndex).addClass('active').siblings().removeClass('active');
            }
        });
        /* 알림마당 탭메뉴 - 끝 */


        /* 팝업슬라이드 - 시작 */
        var $PopupSlideBox = $('.popup_slide_box'),
            $PopupSlideList = $PopupSlideBox.find('.popup_slide_list');

        $PopupSlideList.slick({
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 500,
            cssEase: 'linear',
            dots : true,
            appendDots: '.popup_slide_dots',
            customPaging: function (slider, i) {
                return '<button type="button" class="dots_btn">'+'슬라이드'+i+'</button>';
            },
            current : $PopupSlideBox.find('.slick-text.current'),
            total : $PopupSlideBox.find('.slick-text.total'),
            arrows : true,
            infinite : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            slidesPerRow : 2,
            //추가 기능
            prevArrow: $PopupSlideBox.find('.slick-arrow.prev'),
            nextArrow: $PopupSlideBox.find('.slick-arrow.next'),
            isRunOnLowIE : true,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = state.total;
                }
                return state;
            },
	        responsive: [
		        {
			        breakpoint: 801,
			        settings: {
				        slidesPerRow : 1,
			        },
		        },
	        ]
        });
        /* 팝업슬라이드 - 끝 */
        /* 팝업슬라이드 컨트롤 - 시작 */
        $PopupSlideBox.find('.slick-arrow.pause').on('click', function (){
            $PopupSlideList.slick('slickPause');
            $(this).hide();
            $(this).siblings('.slick-arrow.play').show();
        });
        $PopupSlideBox.find('.slick-arrow.play').on('click', function (){
            $PopupSlideList.slick('slickPlay');
            $(this).hide();
            $(this).siblings('.slick-arrow.pause').show();
        });
        /* 팝업슬라이드 컨트롤 - 끝 */


        /* 전시·주요행사·교육 - 시작 */
        var $EventSlideBox = $('.event_slide_box'),
            $EventSlideInner = $EventSlideBox.find('.event_slide_inner');

        $EventSlideInner.each(function (){
            var $this = $(this),
                $EventSlideList = $this.find('.event_slide_list');

            $EventSlideList.slick({
                swipe : false,
                swipeToSlide : false,
                draggable : false,
                autoplay : false,
                autoplaySpeed : 5000,
                speed : 500,
                cssEase: 'linear',
                dots : false,
                arrows : false,
                infinite : false,
                slidesToShow : 4,
                slidesToScroll : 1,
                //추가 기능
                isRunOnLowIE : true,
                pauseOnFocus: true,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                responsive: [
                    {
                        breakpoint: 1001,
                        settings: {
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth: true,
                        },
                    },
                    {
                        breakpoint: 976,
                        settings: {
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth: true,
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 721,
                        settings: {
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth: true,
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 472,
                        settings: {
                            swipe : true,
                            swipeToSlide : true,
                            draggable : true,
                            variableWidth: true,
                            slidesToShow: 1,
                        },
                    }
                 ],
            });
        });
        /* 전시·주요행사·교육 - 끝 */
        /* 전시·주요행사·교육 탭메뉴 - 시작 */
        $('.event_slide_box .event_tab_item .item_area').on('click', function(){
            var $thisBtn = $(this),
                $MyParent = $thisBtn.parent('.event_tab_item'),
                IsActive = $MyParent.is('.active'),
                $OtherParents = $MyParent.siblings('.event_tab_item'),
                $OtherBtns = $OtherParents.find('.item_area'),
                ParentsIndex = $MyParent.index(),
                $NoticeInner = $('.event_slide_box .event_slide_inner');

            if(!IsActive){
                $MyParent.addClass('active');
                $OtherParents.removeClass('active');
                $thisBtn.attr('title', '선택됨');
                $OtherBtns.removeAttr('title');
                $NoticeInner.eq(ParentsIndex).addClass('active').siblings().removeClass('active');
                $NoticeInner.eq(ParentsIndex).find('.event_slide_list').slick('setPosition');
            }
        });
        /* 전시·주요행사·교육 탭메뉴 - 끝 */


        /* 추모의 글 스크롤 포커스 - 시작 */
        var $MemoriesSlideBox = $('.memories_slide_box'),
            $MemoriesSlideList = $MemoriesSlideBox.find('.memories_slide_list');

        $MemoriesSlideList.on("init reInit afterChange", function(event, slick, currentSlide) {
            var $SlideArea = $MemoriesSlideList.find(".slick-active .item_text"),
                $SlideAreaHeight = $SlideArea.height(),
                $SlideText = $SlideArea.find('em'),
                $SlideTextHeight = $SlideText.height();

            $MemoriesSlideList.find(".item_text").attr("tabindex", "-1");
            if ($SlideAreaHeight < $SlideTextHeight){
                $MemoriesSlideList.find(".slick-active .item_text").attr("tabindex", "0");
            }
        });
        /* 추모의 글 스크롤 포커스 - 끝 */
        /* 추모의 글 슬라이드 - 시작 */
        $MemoriesSlideList.slick({
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            variableWidth: true,
            autoplay : false,
            speed : 500,
            cssEase: 'cubic-bezier(.16,.48,.36,1)',
            dots : false,
            arrows : true,
            current : $MemoriesSlideBox.find('.slick-text.current'),
            total : $MemoriesSlideBox.find('.slick-text.total'),
            infinite : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            //추가 기능
            prevArrow: $MemoriesSlideBox.find('.slick-arrow.prev'),
            nextArrow: $MemoriesSlideBox.find('.slick-arrow.next'),
            isRunOnLowIE : true,
            pauseOnFocus: true,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            customState : function(state) {
                //현재 슬라이드 위치가 10보다 작을 때
                if(state.current < 10) {
                    state.current = state.current;
                }
                //슬라이드 갯수가 10보다 작을 때
                if(state.total < 10) {
                    state.total = state.total;
                }
                return state;
            },
            responsive: [
                {
                    breakpoint: 801,
                    settings: {
                        variableWidth: false,
                    },
                },
            ]
        });
        /* 추모의 글 슬라이드 - 끝 */
        /* 추모의 글 컨트롤 - 시작 */
        $MemoriesSlideBox.find('.slick-arrow.pause').on('click', function (){
            $MemoriesSlideList.slick('slickPause');
            $(this).hide();
            $(this).siblings('.slick-arrow.play').show();
        });
        $MemoriesSlideBox.find('.slick-arrow.play').on('click', function (){
            $MemoriesSlideList.slick('slickPlay');
            $(this).hide();
            $(this).siblings('.slick-arrow.pause').show();
        });
        /* 추모의 글 컨트롤 - 끝 */
    });
})(jQuery);