

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//여기서부터 코드 작성해주세요
		$('.path li.list button').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtn.attr('title', '목록열기');
				$OtherLayer.slideUp();
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
		});

		//sns
		$('.pathbox .sharebox .share_btn').on('click', function(){
			var $this = $(this),
				$share = $this.parent('.share'),
				$layer = $this.siblings('.layer'),
				OnOff = $share.is('.active');
			if(!OnOff){
				$share.addClass('active');
				$this.attr('title', 'sns 공유 닫기');
				$layer.slideDown();
			} else{
				$share.removeClass('active');
				$this.attr('title', 'sns 공유 열기');
				$layer.slideUp();
			};
		});
		$('.sharebox .layer .close').on('click', function(){
			var $this = $(this),
				$share = $this.parents('.share'),
				$layer = $this.parent('.layer'),
				$share_btn = $('.pathbox .sharebox .share_btn');
			$share.removeClass('active');
			$layer.slideUp();
			$share_btn.attr('title', 'sns 공유 열기').focus();
		});

		$('.path_all_m .menu_trigger').bind('click', function(){
			if($('.sub_visual .pathbox .path_all_m').hasClass('active')){
				$('.sub_visual .pathbox .path_all_m').removeClass('active');
				$('.sub_visual .pathbox .path').slideUp(function(){
					$(this).removeAttr('style');
				});
			}else{
				$('.sub_visual .pathbox .path_all_m').addClass('active');
				$('.sub_visual .pathbox .path').slideDown();
			}
		});

		//모바일탭메뉴
		$('.tab_menu_box .tab_menu_button').on('click', function() {
			var $this = $(this),
				$Layer = $this.siblings('.tabmenu'),
				LayerIsActive = $Layer.is('.active');
			if(!LayerIsActive){
				$Layer.addClass('active').slideDown();
			} else{
				$Layer.removeClass('active').slideUp();
			};
		});

		$('.tabmenu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).children('ul').find('li').length;
			$(this).addClass('divide'+li_length);
		});

		$('table.table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});

		$('.tab_menu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).children('ul').find('li').length;
			$(this).addClass('divide'+li_length);
		});

		$('table.table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});
		
		if($('.privacy_cardbox').length > 0){
            var $slide = $('.privacy_cardbox .slidebox .slide_list');
            $slide.slick({
                autoplay : false,
                dots:false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                prevArrow : $('.privacy_cardbox .slidebox .slide_control .prev'),
                nextArrow : $('.privacy_cardbox .slidebox .slide_control .next'),
                pauseOnDotsHover : true,
                swipe:false,
                draggable:false,
                //추가 기능
                autoArrow : $('.privacy_cardbox .slidebox .slide_control .auto'),
                //isRunOnLowIE : false,
                pauseOnArrowClick : true,
                pauseOnDirectionKeyPush : true,
                pauseOnSwipe : true,
                pauseOnDotsClick : true,
                pauseText : '정지',
                playText : '재생',
                responsive: [
                {
                  breakpoint: 1001,
                  settings: {
                    swipe:true,
                    draggable:true
                  }
                }]
            });

            $('.privacy_cardbox .info_btn').on('click', function() {
                $('.privacy_cardbox .cardbox').addClass('active');
                $('.privacy_cardbox .cardbox .close_btn').focus();
                //$('.privacy_cardbox .cardbox button').removeAttr('tabindex');
            });
            $('.privacy_cardbox .cardbox .close_btn').on('click', function() {
                $('.privacy_cardbox .cardbox').removeClass('active');
                $('.privacy_cardbox .info_btn').focus();
                //$('.privacy_cardbox .cardbox button').attr('tabindex', '-1');
            });
        }

        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);