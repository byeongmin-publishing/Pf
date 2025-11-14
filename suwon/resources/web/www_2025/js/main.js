(function ($) {
	'use strict';

	var $window = $(window),
		$document = $(document),
		$html = $('html'),
		$head = $('head'),
		$screen = $.screen,
		$inArray = $.inArray;

	$(function () {

		//여기서부터 코드 작성해주세요

		/* header - 검색 */
		var $SearchOpenBtn = $('.search_area .search_btn'),
			$SearchOpenBtn2 = $('.menu_show .search_btn'),
			$SearchCloseBtn = $('.searchbox .close_box .close'),
			$SearchBox = $('.searchbox'),
			$TotalSearch = $('.total_search'),
			$SearchBoxActive = $SearchBox.is('.active');

		//open 클릭
		$SearchOpenBtn.on('click', function (){
			if (!$SearchBoxActive){
				$('.searchbox').addClass('active').stop().slideDown(500);
				setTimeout(function (){
					$TotalSearch.focus();
				},500);
			}else{
				$('.searchbox').removeClass('active').stop().slideUp(500);
			}
		});
		$SearchOpenBtn2.on('click', function (){
			if (!$SearchBoxActive){
				$('.searchbox').addClass('active').stop().slideDown(500);
				setTimeout(function (){
					$TotalSearch.focus();
				},500);
			}else{
				$('.searchbox').removeClass('active').stop().slideUp(500);
			}
		});
		$SearchOpenBtn.on('click', function (){
			if (!$SearchBoxActive){
				$('.searchbox').addClass('active').stop().slideDown(500);
				setTimeout(function (){
					$TotalSearch.focus();
				},500);
			}else{
				$('.searchbox').removeClass('active').stop().slideUp(500);
			}
		});
		//close 클릭
		$SearchCloseBtn.on('click', function () {
			$SearchBox.removeClass('active').stop().slideUp(500);
			setTimeout(function (){
				$SearchOpenBtn.focus();
			},500);
		});
		// Tab 키로 닫기
		$SearchCloseBtn.on('keydown', function (e) {
			if (e.key === 'Tab' || e.keyCode === 9) {
				$SearchBox.removeClass('active').stop().slideUp(500);
			}
		});
		// Shift + Tab 으로 닫기 (역방향 포커스 이동 시)
		$TotalSearch.on('keydown', function (e) {
			if (e.key === 'Tab' && e.shiftKey) {
				$SearchBox.removeClass('active').stop().slideUp(500);
				setTimeout(function () {
					$SearchOpenBtn.focus();
				}, 0);
			}
		});


		/* 새빛정책 - 펼쳐보기 */
		var $QuickSlideBox = $('.quick_slide_box'),
			$QuickLayerBox = $QuickSlideBox.siblings('.layerbox'),
			$QuickLayerList = $QuickLayerBox.find('.layerlist'),
			$QuickLayerClose = $QuickLayerBox.find('.close'),
			$QuickSlideList = $QuickSlideBox.find('.quick_slide_list');

		$QuickSlideBox.find('.quick_slide_item').each(function (index) {
			var classNumber = (index % 4) + 1; // 1 ~ 4 반복
			$(this).addClass('item' + classNumber);
			$(this).clone().appendTo($QuickLayerList);
		});

		$QuickSlideBox.find('.more_view').on('click', function (){
			$QuickLayerBox.fadeIn(500);
			$html.addClass('layer_open');
		});
		$QuickLayerClose.on('click', function (){
			$QuickLayerBox.fadeOut(500);
			$html.removeClass('layer_open');
		});


		/* 새빛정책 - 슬라이드 */
		$QuickSlideList.slick({
			draggable : true,
			swipe : true,
			swipeToSlide : true,
			variableWidth : false,
			slidesToShow : 2,
			slidesToScroll : 1,
			autoplay : true,
			autoplaySpeed : 3000,
			speed : 1000,
			dots : false,
			infinite : true,
			arrows : true,
			prevArrow : $QuickSlideBox.find('.slick_arrow.prev'),
			nextArrow : $QuickSlideBox.find('.slick_arrow.next'),
			autoArrow : $QuickSlideBox.find('.slick_arrow.auto'),
			pauseText : '정지',
			playText : '재생',
			isRunOnLowIE: true,
			pauseOnArrowClick : true,
			pauseOnDirectionKeyPush : true,
			pauseOnSwipe : true,
			responsive: [
				{
					breakpoint: 1001,
					settings: {
						variableWidth : true,
					}
				},
				{
					breakpoint: 801,
					settings: {
						variableWidth : true,
						slidesToShow : 1,
					}
				},
			],
		});


		/* 메인팝업 - 펼쳐보기 */
		var $MainSlideBox = $('.main_slide_box'),
			$MainLayerBox = $MainSlideBox.siblings('.layerbox'),
			$MainLayerList = $MainLayerBox.find('.layerlist'),
			$MainLayerClose = $MainLayerBox.find('.close'),
			$MainSlideList = $MainSlideBox.find('.main_slide_list');

		$MainSlideBox.find('.main_slide_item').each(function () {
			$(this).clone().appendTo($MainLayerList);
		});

		$MainSlideBox.find('.more_view').on('click', function (){
			$MainLayerBox.fadeIn(500);
			$html.addClass('layer_open');
		});
		$MainLayerClose.on('click', function (){
			$MainLayerBox.fadeOut(500);
			$html.removeClass('layer_open');
		});


		/* 메인팝업 - 슬라이드 */
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
			prevArrow : $MainSlideBox.find('.slick_arrow.prev'),
			nextArrow : $MainSlideBox.find('.slick_arrow.next'),
			autoArrow : $MainSlideBox.find('.slick_arrow.auto'),
			pauseText : '정지',
			playText : '재생',
			current : $MainSlideBox.find('.slick_text.current'),
			total : $MainSlideBox.find('.slick_text.total'),
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

		/* 수원은 지금 - 슬라이드 */
		var $BoardSlideInner = $('.board_box .board_inner');

		$BoardSlideInner.each(function () {
			var $this = $(this),
				$BoardSlideList = $this.find('.board_slide_list');

			$BoardSlideList.slick({
				draggable : true,
				swipe : true,
				swipeToSlide : true,
				variableWidth : false,
				slidesToShow : 4,
				slidesToScroll : 1,
				autoplay : false,
				speed : 800,
				dots : false,
				infinite : false,
				arrows : true,
				prevArrow : $this.find('.slick_arrow.prev'),
				nextArrow : $this.find('.slick_arrow.next'),
				responsive: [
					{
						breakpoint: 1501,
						settings: {
							slidesToShow : 3,
						}
					},
					{
						breakpoint: 1201,
						settings: {
							slidesToShow : 2,
						}
					},
					{
						breakpoint: 1001,
						settings: {
							variableWidth : true,
							slidesToShow : 2,
						}
					},
					{
						breakpoint: 785,
						settings: {
							variableWidth : true,
							slidesToShow : 1,
						}
					},
					{
						breakpoint: 641,
						settings: {
							variableWidth : true,
							slidesToShow : 2,
						}
					},
					{
						breakpoint: 560,
						settings: {
							variableWidth : true,
							slidesToShow : 1,
						}
					},
				],
			});
		});

		/* 수원은 지금 - 탭메뉴 */
		$('.board_tab_box .item_btn').on('click', function(){
			var $thisBtn = $(this),
				$MyParent = $thisBtn.parent('.board_tab_item'),
				IsActive = $MyParent.is('.active'),
				$OtherParents = $MyParent.siblings('.board_tab_item'),
				$OtherBtns = $OtherParents.find('.item_btn'),
				ParentsIndex = $MyParent.index();

			if(!IsActive){
				$MyParent.addClass('active');
				$OtherParents.removeClass('active');
				$thisBtn.attr('title', '선택됨');
				$OtherBtns.removeAttr('title');
				$BoardSlideInner.eq(ParentsIndex).addClass('active').siblings().removeClass('active');
				$BoardSlideInner.eq(ParentsIndex).find('.board_slide_list').slick('setPosition');
			}
		});
		/* 수원은 지금 - svg */
		$window.on('screen:wide', function() {
			$('.board_slide_item .border_svg').removeAttr('viewBox').attr('viewBox', '0 0 314 265');
			$('.board_slide_item .border_path').removeAttr('d').attr('d', 'M0,0 H287 A27,27 0 0 1 314,27 V265 H27 A27,27 0 0 1 0,238 Z');
		});
		$window.on('screen:medium', function() {
			$('.board_slide_item .border_svg').removeAttr('viewBox').attr('viewBox', '0 0 326 265');
			$('.board_slide_item .border_path').removeAttr('d').attr('d', 'M0,0 H299 A27,27 0 0 1 326,27 V265 H27 A27,27 0 0 1 0,238 Z');
		});
		$window.on('screen:web', function() {
			$('.board_slide_item .border_svg').removeAttr('viewBox').attr('viewBox', '0 0 405 245');
			$('.board_slide_item .border_path').removeAttr('d').attr('d', 'M0,0 H378 A27,27 0 0 1 405,27 V245 H27 A27,27 0 0 1 0,218 Z');
		});

		/* 자주찾는서비스·생활정보·맞춤복지·청년지원 */
		$('.service_tab_box .item_btn').on('click', function () {
			var $thisBtn = $(this),
				$MyParent = $thisBtn.parent('.service_tab_item'),
				IsActive = $MyParent.is('.active'),
				$OtherParents = $MyParent.siblings('.service_tab_item'),
				$OtherBtns = $OtherParents.find('.item_btn'),
				ParentsIndex = $MyParent.index();

			if (!IsActive) {
				$MyParent.addClass('active');
				$OtherParents.removeClass('active');
				$thisBtn.attr('title', '선택됨');
				$OtherBtns.removeAttr('title');
				$('.service_inner').eq(ParentsIndex).addClass('active').siblings().removeClass('active');
				$('.service_inner').find('.service_list_box').removeClass('active');
				$('.service_inner').eq(ParentsIndex).find('.service_list_box').addClass('active');

				updateSlideButtonVisibility($('.service_inner').eq(ParentsIndex));
			}
		});

		function updateSlideButtonVisibility($container) {
			var $SlideListBox = $container.find('.service_list_box'),
				$ActiveListInner = $SlideListBox.find('.service_list_inner.active'),
				$ActiveList = $ActiveListInner.find('.service_list.active'),
				$Items = $ActiveList.find('.service_item'),
				ItemHeight = $Items.first().outerHeight(),
				collapsedHeight = ItemHeight * 3;

			var showMoreNeeded = false;

			function disableFocusBelow(heightLimit) {
				$Items.each(function () {
					var itemTop = this.offsetTop;
					if (itemTop >= heightLimit) {
						$(this).find('.item_area').attr('tabindex', '-1');
					} else {
						$(this).find('.item_area').removeAttr('tabindex');
					}
				});
			}

			$Items.each(function () {
				if (this.offsetTop >= collapsedHeight) {
					showMoreNeeded = true;
					return false;
				}
			});

			var $BtnBox = $container.find('.slide_btn_box');

			if (showMoreNeeded) {
				$BtnBox.show();
				$SlideListBox.css('height', collapsedHeight + 'px');
				disableFocusBelow(collapsedHeight);
			} else {
				$BtnBox.hide();
				$SlideListBox.css('height', '');
				$Items.find('.item_area').removeAttr('tabindex');
			}

			$container.find('.slide_btn.open').show();
			$container.find('.slide_btn.close').hide();
		}

		function initializeServiceInner($this) {
			var $SlideBtnOpen = $this.find('.slide_btn.open'),
				$SlideBtnClose = $this.find('.slide_btn.close'),
				$SlideListBox = $this.find('.service_list_box'),
				$ActiveListInner = $SlideListBox.find('.service_list_inner.active'),
				$ActiveList = $ActiveListInner.find('.service_list.active'),
				$Items = $ActiveList.find('.service_item'),
				ItemHeight = $Items.first().outerHeight(),
				collapsedHeight = ItemHeight * 3,
				showMoreNeeded = false;

			// 아이템이 collapsedHeight 넘는지 확인
			$Items.each(function () {
				if (this.offsetTop >= collapsedHeight) {
					showMoreNeeded = true;
					return false;
				}
			});

			// 초기 상태 설정
			if (showMoreNeeded) {
				$SlideListBox.css({ height: collapsedHeight + 'px' });
			} else {
				$SlideListBox.css({ height: '' });
			}

			// 포커스 제어 함수들
			function disableFocusBelow(heightLimit) {
				$Items.each(function () {
					var itemTop = this.offsetTop;
					if (itemTop >= heightLimit) {
						$(this).find('.item_area').attr('tabindex', '-1');
					}
				});
			}

			function restoreFocus() {
				$Items.each(function () {
					$(this).find('.item_area').removeAttr('tabindex');
				});
			}

			if (showMoreNeeded) {
				disableFocusBelow(collapsedHeight);
			} else {
				restoreFocus();
			}

			updateSlideButtonVisibility($this);

			// Open 버튼 클릭
			$SlideBtnOpen.off('click').on('click', function () {
				var fullHeight = $SlideListBox.prop('scrollHeight');
				$SlideListBox.css('height', fullHeight + 'px');
				$SlideBtnOpen.hide();
				$SlideBtnClose.show();
				setTimeout(function () {
					$SlideBtnClose.focus();
				}, 0);
				restoreFocus();
			});

			// Close 버튼 클릭
			$SlideBtnClose.off('click').on('click', function () {
				$SlideListBox.css('height', collapsedHeight + 'px');
				$SlideBtnClose.hide();
				$SlideBtnOpen.show();
				setTimeout(function () {
					$SlideBtnOpen.focus();
				}, 0);
				disableFocusBelow(collapsedHeight);
			});
		}

		$('.service_inner').each(function () {
			initializeServiceInner($(this));
		});

		// 윈도우 리사이즈 시 collapsedHeight 재계산
		$(window).on('resize', function () {
			$('.service_inner').each(function () {
				initializeServiceInner($(this));
			});
		});

		$(document).on('focusin', 'a, button', function () {
			console.log($(this).text());
		})

		// 2차메뉴 클릭시
		$('.servicemenu_tab_box .item_btn').on('click', function () {
			var $thisBtn = $(this),
				$MyParent = $thisBtn.parent('.servicemenu_tab_item'),
				IsActive = $MyParent.is('.active'),
				$OtherParents = $MyParent.siblings('.servicemenu_tab_item'),
				$OtherBtns = $OtherParents.find('.item_btn'),
				ParentsIndex = $MyParent.index(),
				$ServiceMenuTabBox = $thisBtn.closest('.servicemenu_tab_box'),
				$ServiceInner = $thisBtn.closest('.service_inner'),
				$ServiceMenuBox = $ServiceMenuTabBox.siblings('.service_menu_box'),
				$ServiceListBox = $ServiceMenuTabBox.siblings('.service_list_box'),
				$ServiceListTitlebox = $ServiceMenuTabBox.siblings('.service_list_titlebox');

			if (!IsActive) {
				$MyParent.addClass('active');
				$OtherParents.removeClass('active');
				$thisBtn.attr('title', '선택됨');
				$OtherBtns.removeAttr('title');
				$('.servicemenu_tab_box').removeClass('item0_active item1_active');
				$('.servicemenu_tab_box').addClass('item' + ParentsIndex + '_active');
				$ServiceMenuBox.find('.service_menu_list').eq(ParentsIndex).addClass('active').siblings().removeClass('active');
				$ServiceListTitlebox.find('.service_list_title').eq(ParentsIndex).addClass('active').siblings().removeClass('active');
				$ServiceListBox.find('.service_list_inner').eq(ParentsIndex).addClass('active').siblings().removeClass('active');

				updateSlideButtonVisibility($ServiceInner);
			}
		});

		// 3차메뉴 클릭시
		$('.service_menu_box .item_btn').on('click', function () {
			var $thisBtn = $(this),
				$thisText = $thisBtn.find('.item_text').text(),
				$MyParent = $thisBtn.parent('.service_menu_item'),
				IsActive = $MyParent.is('.active'),
				$OtherParents = $MyParent.siblings('.service_menu_item'),
				$OtherBtns = $OtherParents.find('.item_btn'),
				ParentsIndex = $MyParent.index(),
				$ServiceMenuBox = $thisBtn.closest('.service_menu_box'),
				$ServiceListBox = $ServiceMenuBox.siblings('.service_list_box'),
				$ServiceListTitle = $ServiceMenuBox.siblings('.service_list_titlebox'),
				$ServiceInner = $ServiceMenuBox.closest('.service_inner');

			if (!IsActive) {
				$MyParent.addClass('active');
				$OtherParents.removeClass('active');
				$thisBtn.attr('title', '선택됨');
				$OtherBtns.removeAttr('title');
				$ServiceListTitle.find('.service_list_title.active').text($thisText);
				$ServiceListBox.find('.service_list_inner.active .service_list').eq(ParentsIndex).addClass('active').siblings().removeClass('active');

				updateSlideButtonVisibility($ServiceInner);
			}
		});
		$window.on('screen:web screen:tablet screen:phone', function() {
			$('.service_list').find('.item_area').removeAttr('tabindex');
		});


		/* 채용정보 */
		var $RecruitSlideBox = $('.recruit_box'),
			$RecruitSlideList = $RecruitSlideBox.find('.recruit_slide_list');

		//rows 때문에 오류나서 분기별로 꺰
		$window.on('screen:wide screen:medium screen:web', function() {
			$RecruitSlideList.slick('unslick');
			setTimeout(function (){
				$RecruitSlideList.slick({
					draggable : true,
					swipe : true,
					swipeToSlide : true,
					variableWidth : false,
					slidesToShow : 3,
					slidesToScroll : 1,
					autoplay : false,
					autoplaySpeed : 3000,
					speed : 1000,
					dots : false,
					infinite : false,
					arrows : true,
					prevArrow : $RecruitSlideBox.find('.slick_arrow.prev'),
					nextArrow : $RecruitSlideBox.find('.slick_arrow.next'),
					isRunOnLowIE: true,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
				});
			}, 10);
		});
		$window.on('screen:tablet', function() {
			$RecruitSlideList.slick('unslick');
			setTimeout(function (){
				$RecruitSlideList.slick({
					draggable : true,
					swipe : true,
					swipeToSlide : true,
					variableWidth : false,
					slidesToShow : 2,
					slidesToScroll : 1,
					autoplay : false,
					autoplaySpeed : 3000,
					speed : 1000,
					dots : false,
					infinite : false,
					arrows : true,
					prevArrow : $RecruitSlideBox.find('.slick_arrow.prev'),
					nextArrow : $RecruitSlideBox.find('.slick_arrow.next'),
					isRunOnLowIE: true,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
				});
			}, 10);
		});

		$window.on('screen:phone', function() {
			$RecruitSlideList.slick('unslick');
			setTimeout(function (){
				$RecruitSlideList.slick({
					draggable : true,
					swipe : true,
					swipeToSlide : true,
					variableWidth : false,
					rows : 2,
					slidesToShow : 1,
					slidesToScroll : 1,
					autoplay : false,
					autoplaySpeed : 3000,
					speed : 1000,
					dots : false,
					infinite : false,
					arrows : true,
					prevArrow : $RecruitSlideBox.find('.slick_arrow.prev'),
					nextArrow : $RecruitSlideBox.find('.slick_arrow.next'),
					isRunOnLowIE: true,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
				});
			}, 10);
		});

		/* 채용정보 - svg */
		$window.on('screen:wide', function() {
			$('.recruit_slide_item .border_svg').removeAttr('viewBox').attr('viewBox', '0 0 440 120');
			$('.recruit_slide_item .border_path').removeAttr('d').attr('d', ' M20,0 H420 A20,20 0 0 1 440,20 V100 A20,20 0 0 1 420,120 H20 A20,20 0 0 1 0,100 V20 A20,20 0 0 1 20,0 Z');
		});
		$window.on('screen:medium', function() {
			$('.recruit_slide_item .border_svg').removeAttr('viewBox').attr('viewBox', '0 0 354 120');
			$('.recruit_slide_item .border_path').removeAttr('d').attr('d', ' M0,20 A20,20 0 0 1 20,0 H334 A20,20 0 0 1 354,20 V100 A20,20 0 0 1 334,120 H20 A20,20 0 0 1 0,100 Z');
		});
		$window.on('screen:web', function() {
			$('.recruit_slide_item .border_svg').removeAttr('viewBox').attr('viewBox', '0 0 294 105');
			$('.recruit_slide_item .border_path').removeAttr('d').attr('d', ' M0,20 A20,20 0 0 1 20,0 H274 A20,20 0 0 1 294,20 V85 A20,20 0 0 1 274,105 H20 A20,20 0 0 1 0,85 Z');
		});

		/* 수원뉴스.모두의 사진 - 슬라이드 */
		var $NewsInner = $('.news_inner');

		$NewsInner.each(function () {
			var $this = $(this),
				$NewsSlideList = $this.find('.news_slide_list'),
				$PhotoSlideList = $this.find('.photo_slide_list');

			$NewsSlideList.slick({
				draggable: true,
				swipe: true,
				swipeToSlide: true,
				variableWidth: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				rows: 2,
				autoplay: false,
				speed: 800,
				dots: false,
				infinite: false,
				arrows: true,
				prevArrow: $this.find('.slick_arrow.prev'),
				nextArrow: $this.find('.slick_arrow.next'),
			});

			$PhotoSlideList.slick({
				draggable: true,
				swipe: true,
				swipeToSlide: true,
				variableWidth: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: false,
				speed: 800,
				dots: false,
				infinite: false,
				arrows: true,
				prevArrow: $this.find('.slick_arrow.prev'),
				nextArrow: $this.find('.slick_arrow.next'),
				responsive: [
					{
						breakpoint: 1501,
						settings: {
							slidesToShow : 2,
						}
					},
					{
						breakpoint: 1001,
						settings: {
							slidesToShow : 3,
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow : 3,
							variableWidth: true,
						}
					},
				],
			});
		});

		/* 수원뉴스.모두의 사진 - 탭메뉴 */
		$('.news_tab_box .item_btn').on('click', function(){
			var $thisBtn = $(this),
				$MyParent = $thisBtn.parent('.news_tab_item'),
				IsActive = $MyParent.is('.active'),
				$OtherParents = $MyParent.siblings('.news_tab_item'),
				$OtherBtns = $OtherParents.find('.item_btn'),
				ParentsIndex = $MyParent.index();

			if(!IsActive){
				$MyParent.addClass('active');
				$OtherParents.removeClass('active');
				$thisBtn.attr('title', '선택됨');
				$OtherBtns.removeAttr('title');
				$('.news_inner').eq(ParentsIndex).addClass('active').siblings().removeClass('active');
				$('.news_inner').eq(ParentsIndex).find('.bbs_slide_list').slick('setPosition');
			}
		});

		/* 행사와 축제 */
		var $FestivalSlideBox = $('.festival_slide_box'),
			$FestivalSlideList = $FestivalSlideBox.find('.festival_slide_list');

		$FestivalSlideList.slick({
			draggable: true,
			swipe: true,
			swipeToSlide: true,
			variableWidth: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			speed: 800,
			dots: false,
			infinite: false,
			arrows: true,
			prevArrow: $FestivalSlideBox.find('.slick_arrow.prev'),
			nextArrow: $FestivalSlideBox.find('.slick_arrow.next'),
		});


		/* quickmenu */
		var $swiperContainer = $('.swiperbox .swiper-container');
		var swiper = undefined;
		var $quicknavbox = $('.quickmenu .navbox');
		function initSwiper() {
			swiper = new Swiper('.swiperbox .swiper-container', {
				direction: 'vertical',
				loop: false,
				freeMode: false,
				mousewheel:false,
				watchOverflow: true,
				spaceBetween: 0,
				allowTouchMove: false,
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				watchSlidesVisibility : true,
				initialSlide: 0,
				navigation: {
					//nextEl: $NextBtn,
					//prevEl: $PrevBtn
				},
				scrollbar: {
					//el: $ScrollBar,
					draggable: true,
					dragSize: 405
				},
				on: {
					init: function() {

					},
					slideChange: function() {
						console.log('*** mySwiper.activeIndex', swiper.activeIndex);
						var $thisTab = $quicknavbox.find('li[data-menuanchor="'+swiper.activeIndex+'"]');
						$thisTab.addClass('active').siblings('li').removeClass('active').find('a').removeAttr('title');
						$thisTab.find('a').attr('title', '선택됨');
						setTimeout(function() {
							if (swiper.isEnd) {
								$('.swiper-container').addClass('end');
							} else{
								$('.swiper-container').removeClass('end');
							}
						}, 100);
					}
				},
				breakpoints: {
					1000: {
						slidesPerView: 1,
						allowTouchMove:true
					}
				}
			});
		}

		$window.on('screen:wide screen:web', function(event) {
			if(!$swiperContainer.is('.swiper-container-vertical')){
				//initSwiper();
			}
		});

		$window.on('screen:tablet screen:phone', function(event) {
			if($swiperContainer.is('.swiper-container-vertical')){
				swiper.destroy();
				swiper = undefined;
				$swiperContainer.removeClass('swiper-container-vertical');
				$('.swiper-wrapper .rowcontain').removeAttr('tabindex');
				$('.swiper-wrapper .rowcontain').find('a,button').not($('.slick-slide').children()).removeAttr('tabindex');
			}
		});

		function setTabindex(index){
			if(index==0){
				$boardItembox.each(function(){
					var $boardSlide = $(this).find('.slide_list');
					$boardSlide.find('.slide_item').not('.slick-active').find('a,button,input').attr('tabindex', '-1');
				});
			}
			if(index==1){
				$ServiceSlide.find('.slide_item').not('.slick-active').find('a').attr('tabindex', '-1');
				$newsItembox.each(function(){
					var $newsSlide = $(this).find('.slide_list');
					$newsSlide.find('.slide_item').not('.slick-active').find('a,button,input').attr('tabindex', '-1');
				});
				$eventSlide.find('.slide_item').not('.slick-active').find('a,button,input').attr('tabindex', '-1');
			}
		}
		var NowUrl = window.location.href,
			NowUrldefault = NowUrl.split('#')[0];
		$('.scrollbox .quickmenu .navbox ul li a').on('click', function(event){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				IsActive = $MyParent.is('.active'),
				ParentIndex = $MyParent.index(),
				menuanchor = $MyParent.attr('data-menuanchor'),
				$OtherParents = $MyParent.siblings('li'),
				$OtherBtns = $OtherParents.find('a'),
				scrollTop = $window.scrollTop(),
				rowgroup2Offset = $('.rowgroup2').offset(),
				$rowgroup2 = $('.rowgroup2'),
				IsShow = $rowgroup2.is('.show'),
				$swiperbox = $('.rowgroup2 .swiperbox');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtns.removeAttr('title');
				$MyParent.addClass('active');
				$this.attr('title', '선택됨');
				if(menuanchor=='home'){
					$('html, body').animate({
						scrollTop: $('body').offset().top
					}, 400, function(){
						$swiperbox.slideUp(function(){
							if(IsShow){
								$rowgroup2.removeClass('show').attr('data-show', 'N');
							}
						});
					});
					location.href = NowUrldefault+'#rowgroup1';
				} else{
					if(scrollTop == rowgroup2Offset.top){
						swiper.slideTo(menuanchor, 400, false);
						setTimeout(function(){
							setTabindex(menuanchor);
						}, 400);
					} else{
						$('html, body').animate({
							scrollTop: $('.rowgroup2').offset().top
						}, 400, function(){
							swiper.slideTo(menuanchor, 400, false);
							setTimeout(function(){
								setTabindex(menuanchor);
							}, 400);
						});
						if(!IsShow){
							$rowgroup2.addClass('show').attr('data-show', 'Y');
							$swiperbox.slideDown();
						}
					}
					if(menuanchor==1){
						$ServiceSlide.slick('setPosition');
						$newsItembox.each(function(){
							var $newsSlide = $(this).find('.slide_list');
							$newsSlide.slick('setPosition');
						});
						$eventSlide.slick('setPosition');
					}
					//location.href = NowUrldefault+'#rowgroup2';

				}
			};
			event.preventDefault();
		});

		$('.life .listbox ul li.item .itembox .tabbtn').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parents('li.item'),
				IsActive = $MyParent.is('.active'),
				$Layer = $this.siblings('.layer');
			$MyParent.addClass('active');
			$Layer.fadeIn();
		});
		$('.life .listbox ul li.item .itembox .layer .close').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parents('li.item'),
				IsActive = $MyParent.is('.active'),
				$Layer = $this.parents('.layer');
			$MyParent.removeClass('active');
			$Layer.fadeOut();
		});

		$('.quickmenubox .quickmenu_btn').on('click', function(){
			var $this = $(this),
				$wheellayer = $('.quickmenubox .wheellayer');
			$wheellayer.addClass('show').fadeIn();
		});
		$('.quickmenubox .wheellayer .shortcut_close').on('click', function(){
			var $this = $(this),
				$wheellayer = $('.quickmenubox .wheellayer');
			$wheellayer.removeClass('show').fadeOut();
		});
		$('.quickmenubox .wheellayer .curtain').on('click', function(){
			var $this = $(this),
				$wheellayer = $('.quickmenubox .wheellayer');
			$wheellayer.removeClass('show').fadeOut();
		});
		$('.wheellayer .tabbox .tabbtn').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				IsActive = $MyParent.is('.active'),
				ParentIndex = $MyParent.index(),
				$OtherParents = $MyParent.siblings('li'),
				$OtherBtns = $OtherParents.find('.tabbtn'),
				$TabContent = $this.parents('.tabbox').siblings('.tab_content'),
				$MyCon = $TabContent.find('.tabitem').eq(ParentIndex),
				$OtherCon = $MyCon.siblings('.tabitem');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtns.removeAttr('title');
				$MyParent.addClass('active');
				$this.attr('title', '선택됨');
				$OtherCon.removeClass('active');
				$MyCon.addClass('active');
			};
		});

		//슬라이더
		$.fn.rotatingSlider = function (options) {
			const rotatingSlider = {
				init: function (el) {
					this.$slider = $(el);
					this.$slideListContainer = this.$slider.children(".slide_list");
					this.$slideList = this.$slideListContainer.children(".slide_item");

					this.settings = $.extend(
						{
							slideHeight: "",
							slideWidth: "",
						},
						options
					);

					this.slideAngle = 360 / this.$slideList.length;
					this.markupIsValid = false;

					this.validateMarkup();
					if (this.markupIsValid) {
						this.renderSlider();
					}
				},

				renderSlider: function () {
					const halfAngleRadian = ((this.slideAngle / 2) * Math.PI) / 180;
					const innerRadius = ((1 / Math.tan(halfAngleRadian)) * this.settings.slideWidth) / 2;
					const outerRadius = Math.sqrt(
						Math.pow(innerRadius + this.settings.slideHeight, 2) + Math.pow(this.settings.slideWidth / 2, 2)
					);
					upperArcHeight = outerRadius - (innerRadius + this.settings.slideHeight);
					lowerArcHeight = innerRadius - innerRadius * Math.cos(halfAngleRadian);

					/* 슬라이더의 height, width 설정 */
					this.$slider.css("height", "auto");
					this.$slider.css("width", "auto");

					/* 컨테이너의 hieght, width 설정 */
					this.$slideListContainer.css("height", outerRadius * 2 + "px");
					this.$slideListContainer.css("width", outerRadius * 2 + "px");

					/* 컨테이너 transform, top 설정 */
					this.$slideListContainer.css("transform", "translateX(-50%)");
					this.$slideListContainer.css("left", "50%");
					/*this.$slideListContainer.css("top", "-" + upperArcHeight + "px");*/

					/* 각 슬라이드에 스타일 적용 */
					this.$slideList.each(
						function (i, el) {
							const $slide = $(el);
							/* 회전점으로부터의 거리 설정 */
							$slide.css("transform-origin", "center " + (innerRadius + this.settings.slideHeight) + "px");

							/* height, width 설정 */
							$slide.css("height", this.settings.slideHeight + "px");
							$slide.css("width", this.settings.slideWidth + "px");

							/* transform 설정 */
							$slide.css(
								"transform",
								"translateX(-50%) rotate(" + this.slideAngle * i + "deg) translateY(-" + upperArcHeight + "px)"
							);
						}.bind(this)
					);
				},

				validateMarkup: function () {
					if (
						this.$slider.hasClass("slide") &&
						this.$slideListContainer.length === 1 &&
						this.$slideList.length >= 2
					) {
						this.markupIsValid = true;
					} else {
						this.$slider.css("display", "none");
					}
				},
			};

			return this.each(function () {
				rotatingSlider.init(this);
			});
		}
	});
})(jQuery);