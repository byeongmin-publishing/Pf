function searchBanner(startVal,endVal){
    $.ajax({
        type:"GET",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data:"startVal="+encodeURIComponent(startVal)+"&endVal="+encodeURIComponent(endVal),
        dataType:"html",
        async:false,
        url: "/web/main/bannerSearch.do",
        success:function(data){
            $('.banner .layer .listbox').empty().append(data);
        }, error: function(){
        }
    });
};

'use strict';

try {
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//태그객체
			var $window = $(window),
				$html = $('html');
			var fullPageCreated = false;
			$html.attr('data-fpenabled', false);
			function createFullpage() {
				if (fullPageCreated === false) {
					fullPageCreated = true;
					$('.container').fullpage({
						menu: '.navbox',
						autoScrolling:true,
						scrollHorizontally: true,
						keyboardScrolling: true,
						animateAnchor: true,
						recordHistory: true,
						lazyLoading : true,
						anchors : ['firstPage', 'secondPage', '3rdPage', '4thPage'],
						verticalCentered : false,
						scrollOverflow : false,
						scrollingSpeed : 500,
						css3 : false,
						responsiveWidth : 1001,
						afterResponsive: function(isResponsive){
						
						},
						//easing : 'easeInOutExpo',
						//loopHorizontal : true,
						dragAndMove : true,
						sectionSelector: $('.container').children('.rowgroup')
					});
					//$.fn.fullpage.setAllowScrolling(false);
					$html.attr('data-fpenabled', true);
				}
			}
			$(function() {
				var $body = $('body'),
					$wrapper = $('#wrapper'),
					$container = $('#container'),
					$header = $('#header'),
					$lnb = $header.find('.lnb');
				$window.on('screen:wide screen:web', function(event) {
					var NowStatevertical = $.screen.settings.state[1];
					if(NowStatevertical=='maxheight'){
						//createFullpage();
					}
				});
				$window.on('screen:tablet screen:phone', function(event) {
					if(fullPageCreated == true){
						fullPageCreated = false;
						$.fn.fullpage.destroy('all');
						$html.attr('data-fpenabled', false);
					}
				});
				$window.on('screen:wide screen:web', function(event) {
					window.mode = 'pc';
				});

				$window.on('screen:tablet screen:phone', function(event) {
					window.mode = 'mobile';
				});
				$window.on('screen:maxheight', function(event) {
					window.Hmode = 'MaxHeight';
					$wrapper.attr('data-hsize', 'maxheight');
					var NowStatehorizontal = $.screen.settings.state[0];
					if(NowStatehorizontal=='wide' || NowStatehorizontal=='web'){
						//createFullpage();
					}
				});
				$window.on('screen:minheight', function(event) {
					window.Hmode = 'MinHeight';
					$wrapper.attr('data-hsize', 'minheight');
					if(fullPageCreated == true){
						fullPageCreated = false;
						$.fn.fullpage.destroy('all');
						$html.attr('data-fpenabled', false);
					}
				});
				setTimeout(function(){
					if(Hmode === 'MinHeight') {
						$wrapper.attr('data-hsize', 'minheight');
					} else if(Hmode === 'MaxHeight'){
						$wrapper.attr('data-hsize', 'maxheight');
					}
				}, 1);

				var scrollType = '3'; // 1:메뉴 바로 생김, 2:검색영역지날때 메뉴 생김, 3:첫페이지 넘김
				var scrollTop = $window.scrollTop(),
					ContainerOffset = $container.offset(),
					wrapperOffset = $wrapper.offset(),
					rowgroup2Offset = $('.rowgroup1 .rowbox2').offset(),
					searchsecOffset = $('.searchsection .containbox').offset(),
					$rowgroup = $('[data-section]'),
					$quicknav = $('.quicknav'),
					IsZoom = $body.is('.zoom'),
					IsFamilybigbox = $html.is('.familybigbox_open'),
					IsVisualallbox = $html.is('.visualallbox_open'),
					scrollBottom = scrollTop + $window.height();
				if(!IsZoom && !IsFamilybigbox && !IsVisualallbox){
    				if(scrollTop == ContainerOffset.top){
    					$html.attr('data-nowtop', 'top');
    					//$lnb.fadeOut(250);
    				} else{
    				    if(scrollType == '1'){
        					$html.attr('data-nowtop', 'nontop');
                            //$lnb.fadeIn(250);
    				    }else{
    				        if(scrollTop >= searchsecOffset.top-40) {
    	                        $html.attr('data-nowtop', 'nontop');
                                //$lnb.fadeIn(250);
    	                    } else {
    	                        $html.attr('data-nowtop', 'top');
                                //$lnb.fadeOut(250);
    	                    }
    				    }
    				}
				}
				setTimeout(function(){
					$rowgroup.each(function(){
						var $this = $(this),
							ThisOffset = $this.offset(),
							ThisIndex = $this.attr('data-section');
						if(scrollTop+130 > ThisOffset.top) {
							$this.attr('data-active', 'Y');
							$wrapper.attr('data-row', ThisIndex);
							$quicknav.find('li').eq(ThisIndex).addClass('active').find('.navbtn').attr('선택됨');
							$quicknav.find('li').eq(ThisIndex).siblings('li').removeClass('active').find('.navbtn').removeAttr('title');
						} else{
							$this.attr('data-active', 'N');
						}
					});			
				}, 50);

				var beforeScroll = $window.scrollTop(),
                    scrollFlag = true,
                    moveFlag = false;
                if(beforeScroll >= rowgroup2Offset.top-110){
                    scrollFlag = false;
                }
				$window.on('scroll', function(event) {
					var scrollTop = $window.scrollTop(),
						ContainerOffset = $container.offset(),
						wrapperOffset = $wrapper.offset(),
						rowgroup2Offset = $('.rowgroup1 .rowbox2').offset(),
						searchsecOffset = $('.searchsection .containbox').offset(),
						headerIsActive = $html.is('[data-nowtop="nontop"]'),
						IsZoom = $body.is('.zoom'),
						IsFamilybigbox = $html.is('.familybigbox_open'),
						IsVisualallbox = $html.is('.visualallbox_open'),
						scrollBottom = scrollTop + $window.height();
					
					if(mode === 'pc') {
					    if(!IsZoom && !IsFamilybigbox && !IsVisualallbox){
							/*
    					    // 한페이지 스크롤 시작
                            if(scrollType == '3'){
                                if(scrollTop === 0) {
                                    scrollFlag = true;
                                }else if(scrollTop > rowgroup2Offset.top-110){
                                    scrollFlag = false;
                                }
                                if(scrollTop > 0 && scrollTop < rowgroup2Offset.top-110){
                                    if(beforeScroll < scrollTop && scrollFlag === true && moveFlag === false){
                                        scrollFlag = false;
                                        moveFlag = true;
                                        $('html').animate({scrollTop: rowgroup2Offset.top-110}, function(){
                                            moveFlag = false;
                                        });
                                    }else if(beforeScroll > scrollTop && scrollFlag === false && moveFlag === false){
                                        scrollFlag = true;
                                        moveFlag = true;
                                        $('html').animate({scrollTop: 0}, function(){
                                            moveFlag = false;
                                        });
                                    }
                                }
                                beforeScroll = scrollTop;
                            }
                            // 한페이지 스크롤 끝
							*/
    						if(scrollTop == ContainerOffset.top){
    							$html.attr('data-nowtop', 'top');
    	                        //$lnb.fadeOut(250);
    						} else{
    						    if(scrollType == '1'){
        							$html.attr('data-nowtop', 'nontop');
      		                        //$lnb.fadeIn(250);
    						    }else{
    						        if(scrollTop >= searchsecOffset.top-40) {
                                        $html.attr('data-nowtop', 'nontop');
                                        //$lnb.fadeIn(250);
    	                            } else {
    	                                $html.attr('data-nowtop', 'top');
                                        //$lnb.fadeOut(250);
    	                            }
    						    }
    						}
					    }
					}
					
					$rowgroup.each(function(){
						var $this = $(this),
							ThisOffset = $this.offset(),
							ThisIndex = $this.attr('data-section');
						if(scrollTop+130 > ThisOffset.top) {
							$this.attr('data-active', 'Y');
							$wrapper.attr('data-row', ThisIndex);
							$quicknav.find('li').eq(ThisIndex).addClass('active').find('.navbtn').attr('선택됨');
							$quicknav.find('li').eq(ThisIndex).siblings('li').removeClass('active').find('.navbtn').removeAttr('title');
						} else{
							$this.attr('data-active', 'N');
						}
					});
				});
				var Nowurlfull = window.location.href,
					Nowurl = Nowurlfull.split('#');
				$('.quicknav .scroll_nav ul li .navbtn').on('click', function(event){
					var $this = $(this),
						$MyParent = $this.parent('li'),
						ParentIndex = $MyParent.index(),
						thisanchor = $this.attr('data-id'),
						IsActive = $MyParent.is('.active');
					event.preventDefault();
					if(!IsActive){
					    moveFlag = true;
						$('html').animate({
							scrollTop: $('[data-section="'+ParentIndex+'"]').offset().top-110
						}, 400, function(){
							location.href = '#'+thisanchor;
							$('html').animate({
								scrollTop: $('[data-section="'+ParentIndex+'"]').offset().top-110
							}, 0);
							moveFlag = false;
						});
					}
				});

				//비주얼
				var $visualItembox = $('.visual .tabitem'),
					visualList = [];
				$visualItembox.each(function(){
					var $visualSlide = $(this).find('.slide_list'),
						SlideHtml = $visualSlide.html(),
						$SlideControl = $(this).find('.slide_control'),
						$Page = $(this).find('.page');
					visualList.push(SlideHtml);
					$visualSlide.slick({
						//기본
						/*autoplay : true,
						autoplaySpeed : 5000,*/
					    autoplay : (typeof mainSlideAutoplay === 'boolean') ? mainSlideAutoplay : true,
					    autoplaySpeed : (typeof mainSlideAutoplaySpeed === 'number') ? mainSlideAutoplaySpeed : 5000,
						fade : false,
						dots : false,
						swipe : false,
						draggable : false,
						slidesToShow : 1,
						slidesToScroll: 1,
						variableWidth: false,
						infinite: true,
						zIndex : 5,
						prevArrow : $SlideControl.find('.prev'),
						nextArrow : $SlideControl.find('.next'),

						//추가 기능
						autoArrow : $SlideControl.find('.auto'),
						isRunOnLowIE : false,
						pauseOnArrowClick : true,
						pauseOnDirectionKeyPush : true,
						pauseOnSwipe : true,
						pauseOnDotsClick : true,
						pauseText : '정지',
						playText : '재생',
						total : $Page.find('.total'),
						current : $Page.find('.current'),
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
						},
						responsive: [
						{
						  breakpoint: 1001,
						  settings: {
							swipe : true,
							draggable : true
						  }
						}]
					});
				});
				//비주얼 tab버튼
				$('.visual .tabbox ul li .tabbtn').on('click', function(){
					var $this = $(this),
						$MyParent = $this.parent('li'),
						IsActive = $MyParent.is('.active'),
						ParentIndex = $MyParent.index(),
						$OtherParents = $MyParent.siblings('li'),
						$OtherBtns = $OtherParents.find('.tabbtn'),
						$Tabbox = $this.parents('.tabbox'),
						$TabContent = $this.parents('.tabbox').siblings('.tab_content'),
						$MyCon = $TabContent.find('.tabitem').eq(ParentIndex),
						$MySlide = $MyCon.find('.slide_list'),
						$OtherCon = $MyCon.siblings('.tabitem');
					if(!IsActive){
						$Tabbox.attr('data-active', ParentIndex);
						$OtherParents.removeClass('active');
						$OtherBtns.removeAttr('title');
						$MyParent.addClass('active');
						$this.attr('title', '선택됨');
						$OtherCon.removeClass('active');
						$MyCon.addClass('active');
						$MySlide.slick('setPosition');
					};
				});
				//더보기
				$('.visual .controlbox .more').on('click', function(){
					var $this = $(this),
						$MyParent = $this.parents('.tabitem'),
						ParentIndex = $MyParent.index(),
						$Layer = $('.visual .layerbox'),
						$LsyerList = $('.visual .layerbox .layer .layerlist');
					$LsyerList.empty().append(visualList[ParentIndex]);
					$Layer.addClass('active').fadeIn();
					$LsyerList.find('.slide_item a').first().focus();
					$html.addClass('visualallbox_open');
				});
				$('.visual .layerbox .close').on('click', function(){
					var $this = $(this),
						$Layer = $('.visual .layerbox'),
						$LsyerList = $('.visual .layerbox .layer .layerlist');
					$Layer.removeClass('active').fadeOut(function(){
						$LsyerList.empty();
					});
					var activeVisual = $this.parents('.visual').find('.visualbox .tabitem.active');
					activeVisual.find('.more').focus();
					$html.removeClass('visualallbox_open');
				});
				
				//만민광장
				var $manminSlide = $('.manmin .slidebox .slide_list');
				$manminSlide.slick({
					autoplay : false,
					dots:false,
					slidesToShow: 5,
					slidesToScroll: 1,
					variableWidth: false,
					infinite: false,
					fade: false,
					arrows: false,
					pauseOnDotsHover : true,
					adaptiveHeight: false,
					swipe:false,
					draggable:false,
					responsive: [
					{
					  breakpoint: 1001,
					  settings: {
						swipe:true,
						draggable:true,
						variableWidth: true,
						swipeToSlide: true
					  }
					},
					{
					  breakpoint: 641,
					  settings: {
						swipe:true,
						draggable:true,
						variableWidth: true,
						swipeToSlide: true
					  }
					},
					{
					  breakpoint: 621,
					  settings: {
						swipe:true,
						draggable:true,
						variableWidth: true,
						swipeToSlide: true,
						slidesToShow: 4
					  }
					},
					{
					  breakpoint: 491,
					  settings: {
						swipe:true,
						draggable:true,
						variableWidth: true,
						swipeToSlide: true,
						slidesToShow: 3
					  }
					},
					{
					  breakpoint: 391,
					  settings: {
						swipe:true,
						draggable:true,
						variableWidth: true,
						swipeToSlide: true,
						slidesToShow: 2
					  }
					}]
				});

				//수원은지금 공통롤링
				var $boardItembox = $('.board .tabitem');
				$boardItembox.each(function(){
					var $boardSlide = $(this).find('.slide_list'),
						$SlideItem = $boardSlide.find('.slide_item'),
						ItemLength = $SlideItem.length,
						$SlideControl = $(this).find('.controlbox');
					$boardSlide.slick({
						autoplay : false,
						dots:false,
						slidesToShow: 4,
						slidesToScroll: 1,
						variableWidth: true,
						infinite: false,
						prevArrow : $SlideControl.find('.prev'),
						nextArrow : $SlideControl.find('.next'),
						pauseOnDotsHover : true,
						swipe:false,
						draggable:false,
						responsive: [
						{
						  breakpoint: 1501,
						  settings: {
							slidesToShow: 3
						  }
						},
						{
						  breakpoint: 1201,
						  settings: {
							slidesToShow: 2
						  }
						},
						{
						  breakpoint: 1001,
						  settings: {
							swipe:true,
							draggable:true,
							swipeToSlide: true,
							slidesToShow: 2
						  }
						},
						{
						  breakpoint: 801,
						  settings: {
							swipe:true,
							draggable:true,
							swipeToSlide: true,
							slidesToShow: 1
						  }
						},
						{
						  breakpoint: 641,
						  settings: {
							swipe:true,
							draggable:true,
							swipeToSlide: true,
							slidesToShow: 2
						  }
						},
						{
						  breakpoint: 548,
						  settings: {
							swipe:true,
							draggable:true,
							swipeToSlide: true,
							slidesToShow: 1
						  }
						}]
					});
				});
				//수원은지금 tab버튼
				$('.board .tabbox ul li button.tabbtn').on('click', function(){
					var $this = $(this),
						$MyParent = $this.parent('li'),
						IsActive = $MyParent.is('.active'),
						ParentIndex = $MyParent.index(),
						$OtherParents = $MyParent.siblings('li'),
						$OtherBtns = $OtherParents.find('.tabbtn'),
						$TabContent = $this.parents('.tabbox').siblings('.tab_content'),
						$MyCon = $TabContent.find('.tabitem').eq(ParentIndex),
						$MySlide = $MyCon.find('.slide_list'),
						$OtherCon = $MyCon.siblings('.tabitem');
					if(!IsActive){
						$OtherParents.removeClass('active');
						$OtherBtns.removeAttr('title');
						$MyParent.addClass('active');
						$this.attr('title', '선택됨');
						$OtherCon.removeClass('active');
						$MyCon.addClass('active');
						$MySlide.slick('setPosition');
					};
				});
				
				var $ServiceSlide = $('.services .slide_list');
				$ServiceSlide.slick({
					autoplay : false,
					dots:false,
					slidesToShow: 8,
					slidesToScroll: 1,
					variableWidth: false,
					infinite: false,
					prevArrow : $('.services .controls .prev'),
					nextArrow : $('.services .controls .next'),
					pauseOnDotsHover : true,
					swipe:false,
					draggable:false,
					responsive: [
					{
					  breakpoint: 1001,
					  settings: {
						swipe:true,
						draggable:true,
						swipeToSlide: true,
						slidesToShow: 6
					  }
					},
					{
					  breakpoint: 641,
					  settings: {
						swipe:true,
						draggable:true,
						swipeToSlide: true,
						slidesToShow: 4
					  }
					},
					{
					  breakpoint: 441,
					  settings: {
						swipe:true,
						draggable:true,
						swipeToSlide: true,
						slidesToShow: 3
					  }
					}]
				});

				//수원뉴스 공통롤링
				var $newsItembox = $('.news .tabitem');
				$newsItembox.each(function(){
					var $newsSlide = $(this).find('.slide_list'),
						$SlideItem = $newsSlide.find('.slide_item'),
						ItemLength = $SlideItem.length;
					$newsSlide.slick({
						autoplay : false,
						dots:false,
						slidesToShow: 3,
						slidesToScroll: 1,
						variableWidth: false,
						infinite: false,
						arrows: false,
						pauseOnDotsHover : true,
						swipe:false,
						draggable:false,
						responsive: [
						{
						  breakpoint: 1001,
						  settings: {
							swipe:true,
							draggable:true,
							swipeToSlide: true,
							slidesToShow: 2
						  }
						},
						{
						  breakpoint: 641,
						  settings: {
							swipe:true,
							draggable:true,
							swipeToSlide: true,
							variableWidth: true,
							slidesToShow: 2
						  }
						}]
					});
				});
				//수원뉴스 tab버튼
				$('.news .tabbox ul li button.tabbtn').on('click', function(){
					var $this = $(this),
						$MyParent = $this.parent('li'),
						IsActive = $MyParent.is('.active'),
						ParentIndex = $MyParent.index(),
						$OtherParents = $MyParent.siblings('li'),
						$OtherBtns = $OtherParents.find('.tabbtn'),
						$TabContent = $this.parents('.tabbox').siblings('.tab_content'),
						$MyCon = $TabContent.find('.tabitem').eq(ParentIndex),
						$MySlide = $MyCon.find('.slide_list'),
						$OtherCon = $MyCon.siblings('.tabitem');
					if(!IsActive){
						$OtherParents.removeClass('active');
						$OtherBtns.removeAttr('title');
						$MyParent.addClass('active');
						$this.attr('title', '선택됨');
						$OtherCon.removeClass('active');
						$MyCon.addClass('active');
						$MySlide.slick('setPosition');
					};
				});
				
				//행사
				var $eventSlide = $('.event .slide_list');
				$eventSlide.slick({
					autoplay : false,
					dots:false,
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
					infinite: true,
					prevArrow : $('.event .controls .prev'),
					nextArrow : $('.event .controls .next'),
					pauseOnDotsHover : true,
					swipe:false,
					draggable:false,
					responsive: [
					{
					  breakpoint: 1001,
					  settings: {
						swipe:true,
						draggable:true
					  }
					}]
				});
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

				//바로가기
				/*gsap.config({ nullTargetWarn: false }); //gsap 플로그인 경고표시 무시
				var $wheelTabItems = $('.wheellayer .tabitem');
				$wheelTabItems.each(function(){
					var $this = $(this),
						ThisIndex = $this.index(),
						$ShortCut = $this.find('.shortcut');
					const $slideList = document.querySelector('.wheellayer .tabitem[data-index="'+ThisIndex+'"] .shortcut .slide .slide_list'); //jquery 선택시 gsap 선택자 에러뜸
					const $slideItem = $('.wheellayer .tabitem[data-index="'+ThisIndex+'"] .slide_item');
					const $slideInner = $('.wheellayer .tabitem[data-index="'+ThisIndex+'"] .inner');
					const $slideItemLength = $slideItem.length;
					const oneAngle = 360 / $slideItem.length;
					let currentIndex = 0; //슬라이더에서 index 값으로 이용
					var btnwidth = 62;
					if($slideItemLength==4){
						btnwidth = 88.6;
					}
					if($slideItemLength==5){
						btnwidth = 79.6;
					}
					if($slideItemLength==6){
						btnwidth = 72.6;
					}
					if($slideItemLength==7){
						btnwidth = 66.8;
					}

					if($slideItemLength>=4){
						$this.addClass('slider_initialized').attr('data-length', $slideItemLength);
						$this.find('.slide').rotatingSlider({
							slideHeight: Math.min(btnwidth, window.innerWidth),
							slideWidth: Math.min(btnwidth, window.innerWidth),
						});
					}

					function changeNegative(x) { //음수로 변환 함수
						return x * -1;
					}
					if($slideItemLength>=4){
						$slideInner.each(function (i, v) { //초기 inner rotate 셋팅
							gsap.set(v, { rotation: changeNegative(i * oneAngle) });
						});
					}

					function findApproximateValue(i, currentAngle) {  //근사값 추출
						const a = currentAngle + oneAngle * (currentIndex - i);
						const b = a + 360;
						const c = a - 360;
						const arr = [a, b, c];

						return arr.reduce(function (prev, curr) {
							return (Math.abs(curr - currentAngle) < Math.abs(prev - currentAngle) ? curr : prev);
						});
					}
					function fallIntoPlace(currentRotate) { //실시간 inner 각도 재배치
						$slideInner.each(function (i, v) {
							gsap.set(v, { rotation: changeNegative(currentRotate + i * oneAngle) });
						});
					}
					if($slideItemLength>=4){
						Draggable.create($slideList, {
							type: "rotation",
							inertia: true,
							allowContextMenu:true,
							dragClickables:true,
							allowEventDefault:true,
							onClick: function() {
								
							},
							onDrag: function () {
								fallIntoPlace(this.rotation);
							},
							onDragEnd: function () {
								const roundAngle = Math.round((this.rotation / (oneAngle))) * (oneAngle); //개당 각도 단위로 반올림
								gsap.to($slideList, { duration: 0.1, rotation: roundAngle }); //타임 및 rotation 셋팅
								fallIntoPlace(roundAngle);
								if (roundAngle <= 0) {
									currentIndex = Math.abs((roundAngle / oneAngle) % $slideItemLength);
								} else {
									//현재 roate가 양수 일 경우 45º(도씨)의 currentIndex 값이 7이 나오게 하라면 360도를 빼주면 됨.
									const cycle = parseInt(roundAngle / 360 + 1);
									currentIndex = ((cycle * 360 - roundAngle) / oneAngle) % $slideItemLength;
								}
								$slideItem.eq(currentIndex).addClass('active').siblings().removeClass('active');
							}
						});
					}
				});*/

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
				


			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}

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
};