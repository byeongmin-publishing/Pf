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

                //메인슬라이드 시작
                var $MainSlideBox = $('.main_slide_box'),
                    $MainSlideList = $MainSlideBox.find('.main_slide_list');

                $window.on('load', function (){
                    $MainSlideBox.addClass('on');
                });

                $MainSlideList.slick({
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true,
                    variableWidth : false,
                    slidesToShow : 1,
                    slidesToScroll : 1,
                    autoplay : true,
                    autoplaySpeed : 3000,
                    speed : 1000,
                    dots : false,
                    infinite : true,
                    arrows : true,
                    autoArrow : $MainSlideBox.find('.slick-arrow.auto'),
                    pauseText : '정지',
                    playText : '재생',
                    current : $MainSlideBox.find('.slick-text.current'),
                    total : $MainSlideBox.find('.slick-text.total'),
                    isRunOnLowIE: true,
                    pauseOnArrowClick : true,
                    pauseOnDirectionKeyPush : true,
                    pauseOnSwipe : true,
                    customState : function(state) {
                        //현재 슬라이드 위치가 10보다 작을 때
                        if(state.current < 10) {
                            state.current = '0' + state.current;
                        }
                        //슬라이드 갯수가 10보다 작을 때
                        if(state.total < 10) {
                            state.total = '0' + state.total;
                        }
                        return state;
                    }
                });
                //메인슬라이드 끝


                //운영안내팝업 시작
                $('.info_popup_wrap .open_btn .btn').on('click', function (){
                    var $InfoPopupWrap = $('.info_popup_wrap'),
                        $InfoPopupActive = $InfoPopupWrap.is('.active');

                    if (!$InfoPopupActive){
                        $InfoPopupWrap.addClass('active');
                    }else{
                        $InfoPopupWrap.removeClass('active');
                    }
                });
                $('.info_popup_wrap .close_btn').on('click', function (){
                    $('.info_popup_wrap').removeClass('active');
                })
                //운영안내팝업 끝


                //아쿠아리움 소식 시작
                var $NoticeSlideInner = $('.notice_slide_inner');

                $NoticeSlideInner.each(function(index, element){
                    var $this = $(this),
                        $scrollbar = $this.find('.notice_scrollbar');
                    $this.addClass('index-' + index);

                    var swiper = new Swiper('.index-' + index, {
                        direction: 'vertical',
                        loop: false,
                        mousewheel:true,
                        watchOverflow: true,
                        observer: true,
                        observeParents: true,
                        slidesPerView: 4,
                        slidesPerGroup: 2,
                        spaceBetween: 310,
                        watchSlidesVisibility : true,
                        scrollbar: {
                            el: $scrollbar,
                            draggable: false,
                            dragSize: 200
                        },
                        breakpoints : {
                            640 : {
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                                spaceBetween: 13,
                            },
                            1920 : {
                                slidesPerView: 4,
                                slidesPerGroup: 2,
                                spaceBetween: 310,
                            }
                        },
                        on: {
                            slideChange : function() {
                                var $NoticeSlideItem = $this.find('.notice_slide_item').last(),
                                    $NoticeSlideActive = $NoticeSlideItem.hasClass('swiper-slide-visible');

                                if ($NoticeSlideActive){
                                    $this.addClass('last');
                                }else{
                                    $this.removeClass('last');
                                }
                            },
                        }
                    });
                    $scrollbar.find('.swiper-scrollbar-drag').attr({
                        'tabindex': 0,
                        'title':'마우스 드래그 또는 키보드 방향키를 누르세요'
                    }).text('마우스 드래그 또는 키보드 방향키를 누르세요');
                    $NoticeSlideInner.keydown(function( event ) {
                        if ( event.which == 40 ) {
                            swiper.slideNext();
                        }
                        if ( event.which == 38 ) {
                            swiper.slidePrev();
                        }
                    });
                });


                $('.rowgroup2 .notice_tab_box .item_btn').on('click', function(){
                    var $thisBtn = $(this),
                        $MyParent = $thisBtn.parent('.notice_tab_item'),
                        IsActive = $MyParent.is('.active'),
                        $OtherParents = $MyParent.siblings('.notice_tab_item'),
                        $OtherBtns = $OtherParents.find('.item_btn'),
                        ParentsIndex = $MyParent.index();

                    if(!IsActive){
                        $MyParent.addClass('active');
                        $OtherParents.removeClass('active');
                        $thisBtn.attr('title', '선택됨');
                        $OtherBtns.removeAttr('title');
                        $NoticeSlideInner.eq(ParentsIndex).addClass('active').siblings().removeClass('active');
                        setTimeout(function (){
                            $NoticeSlideInner.eq(ParentsIndex).addClass('time_ani').siblings().removeClass('time_ani');
                        },1)
                        $NoticeSlideInner.eq(ParentsIndex).find('.notice_slide_list').slick('setPosition');
                    }
                });
                //아쿠아리움 소식 끝


                //푸터 시작
                $('.top_go .up_button').on('mouseover', function (){
                    $('#footer .footer_deco').addClass('active');
                })
                $('.top_go .up_button').on('mouseleave', function (){
                    $('#footer .footer_deco').removeClass('active');
                })
                //푸터 끝


                //스크롤 컨텐츠 시작
                var $window = $(window),
                    $scrollcontent = $('.scroll_content');

                $scrollcontent.each(function(){
                    var $this = $(this),
                        scrollTop = $window.scrollTop(),
                        scrollBottom = scrollTop + $window.height(),
                        contentOffset = $this.offset();
                    if(scrollBottom > contentOffset.top) {
                        $this.addClass('active');
                    };
                });

                $window.on('scroll', function(event) {

                    $scrollcontent.each(function(){
                        var $this = $(this),
                            scrollTop = $window.scrollTop(),
                            scrollBottom = scrollTop + $window.height(),
                            contentOffset = $this.offset();
                        if(scrollBottom > contentOffset.top) {
                            $this.addClass('active');
                        }else{
                            $this.removeClass('active');
                        };
                    });
                });
                //스크롤 컨텐츠 끝
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}