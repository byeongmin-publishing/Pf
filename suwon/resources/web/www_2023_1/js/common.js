// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(document).ready(function(){
	//이미지 롤오버 
	$('.overimg').mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));	
	}).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	});
});

function jsTotalSearch(kwd) {
    $('#total_search').val(kwd);
    $('#total_search').closest('form').submit();
}

$(document).ready(function(){
    jsSuwonWeather();
    jsSuwonFineDust10();

    if($('.population').length > 0){
        var setSuwonPopulation = {
            config : {
                css : ''
                , html : '#total# 명'
            }
            , format : function(x){
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            , viewSet : function(populationDataSet){
                var $this = this;
                try {
                    if(populationDataSet != null && populationDataSet != '') {
                        var populationData = $.parseJSON(populationDataSet);
                        var htmlTemplate = $this.config.html;
                        htmlTemplate = htmlTemplate.replace(/#total#/ig, $this.format(populationData.total));
                        $('head').append($this.config.css);
                        $('.population > em, .population_mobile > a > em').html(htmlTemplate).show();
                    }
                } catch(e) {
                    $.cookie('swpsd', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
                }
            }
            , init : function(){
                var $this = this;
                var populationDataSet = '';
                //$.cookie('swpsd', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
                if($.cookie('swpsd') != null && $.cookie('swpsd') != '') {
                    $this.viewSet($.cookie('swpsd')); 
                } else {
                    $.ajax({
                        type : 'get'
                        , dataType : 'json'
                        , url : '/component/dataApi/totalPopulation/data.do'
                        , success : function(res){
                            try {
                                if(res != null){
                                    res = $.parseJSON(res);
                                    if(typeof res.totalPopulation === 'number'){
                                        var totalCnt = res.totalPopulation;
                                        // 쿠키에 담을 데이터를 세팅
                                        populationDataSet = '{';
                                        populationDataSet += '"total": "' + $.trim(totalCnt) + '"';
                                        populationDataSet += '}';
                                        $this.viewSet(populationDataSet);
                                    }
                                }
                                // 24시간 쿠키설정
                                // 2017-01-12 12시간으로 변경
                                var ExpiresDate = new Date();
                                ExpiresDate.setTime(ExpiresDate.getTime() + (12 * 60 * 60 * 1000));
                                //$.cookie('swpsd', populationDataSet, {expires:ExpiresDate, path:'/', domain:'.suwon.go.kr', secure:false});
                                $.cookie('swpsd', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
                            } catch(e) {
                                $.cookie('swpsd', null, {expires:-1, path:'/', domain:'.suwon.go.kr', secure:false});
                            }
                        }
                        , error : function(){            
                        }
                    });
                }
            }
        };
        setSuwonPopulation.init();
    }
    $.ajax({
        url : '/web/search/ND_completeKeyword.do'
        , type : 'GET'
        , cache : false
        , data : {target:'rankings', domain_no:'4', max_count:'6'}
        , dataType : 'json'
        , success : function(response){
            if(response != null && typeof response === 'object'){
                var popularHTML = '<ul>';
                for(var i = 0; i < response.length; i++){
                    popularHTML += '<li><a href="#none" onclick="jsTotalSearch(\'' + response[i][0] + '\');">' + response[i][0] + '</a></li>';
                }
                popularHTML += '</ul>';
                $('.searchbox .search .popular .listbox').empty().append(popularHTML);
                $('.searchbox .search .popular .listbox ul li').off('mouseenter');
                $('.searchbox .search .popular .listbox ul li').on('mouseenter', function() {
                    $(this).siblings().children('a').removeClass('over');
                    $(this).children('a').addClass('over');
                    $('.searchbox .search').attr('data-key-idx', $(this).index());
                });
                
                if(typeof jsOptPageType === 'string'){
                    if(jsOptPageType == 'MAIN'){
                        var popularHTML_main = '<ul>';
                        if(typeof jsPopularKeywordFixedFirst === 'string'){
                            popularHTML_main += '<li>' + jsPopularKeywordFixedFirst + '</li>';
                        }
                        for(var i = 0; i < response.length; i++){
                            popularHTML_main += '<li><a href="#none" onclick="jsTotalSearch(\'' + response[i][0] + '\');">#' + response[i][0] + '</a></li>';
                        }
                        popularHTML_main += '</ul>';
                        $('.searchsection .search .popular .listbox').empty().append(popularHTML_main);
                    }
                }
            }
        }
    });
    $.ajax({
        type:"GET",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data:"bannerType=1361&domainCd=1",
        dataType:"json",
        async:false,
        url: "/web/main/ND_ajaxSeasonBanner.do",
        success:function(data){
            if(data != null){
                for(var i = 0; i < data.length; i++){
                    var dataVo = data[i];
                    $('#total_search').attr('placeholder', dataVo.title);
                    break;
                }
            }
        }, error: function(){
        }
    });
    $.ajax({
        type:"GET",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType:"json",
        async:false,
        url: "/getEtcSiteBanner.do",
        success:function(data){
            if(data != null){
                if(data.etcSiteBanner != null){
                    if(data.etcSiteBanner.length > 0){
                        var apdList = ['', '', '', '', '', ''];
                        for(var i = 0; i < data.etcSiteBanner.length; i++){
                            var dataVo = data.etcSiteBanner[i];
                            var listed = '<li><a href="' + dataVo.linkUrl + '" ' + (dataVo.linkType == '_blank' ? ' target="_blank" title="새창열림" ' : '') + '>' + dataVo.title + '</a></li>';
                            if(dataVo.bannerType == '201'){
                                apdList[0] += listed;
                            }else if(dataVo.bannerType == '202'){
                                apdList[1] += listed;
                            }else if(dataVo.bannerType == '203'){
                                apdList[2] += listed;
                            }else if(dataVo.bannerType == '204' || dataVo.bannerType == '1158' || dataVo.bannerType == '205' || dataVo.bannerType == '206' || dataVo.bannerType == '207' || dataVo.bannerType == '208'){
                                apdList[3] += listed;
                            }else if(dataVo.bannerType == '209' || dataVo.bannerType == '210'){
                                apdList[4] += listed;
                            }else if(dataVo.bannerType == '211'){
                                apdList[5] += listed;
                            }
                        }
                        $('.footer_site .list:eq(0) .layer').empty().append('<ul class="clearfix">' + apdList[0] + '</ul>'); //시민
                        $('.footer_site .list:eq(1) .layer').empty().append('<ul class="clearfix">' + apdList[1] + '</ul>'); //사업자
                        $('.footer_site .list:eq(2) .layer').empty().append('<ul class="clearfix">' + apdList[2] + '</ul>'); //관광객
                        $('.footer_site .list:eq(3) .layer').empty().append('<ul class="clearfix">' + apdList[3] + '</ul>'); //사업소/구청
                        $('.footer_site .list:eq(4) .layer').empty().append('<ul class="clearfix">' + apdList[4] + '</ul>'); //유관기관
                        $('.footer_site .list:eq(5) .layer').empty().append('<ul class="clearfix">' + apdList[5] + '</ul>'); //관련사이트
                    }
                }
            }
        }, error: function(){
        }
    });
});


/**
 * @author (주)한신정보기술 퍼블리셔팀
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie ie7';

    //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie ie8';

    //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie ie9';

    //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie ie10';

    //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie ie11';

    //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge MS';

	}else if(_browser.indexOf('edg/') > -1) {
		_browser = 'edge chromium_based';
    //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

    //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

    //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

    //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

	var browserName = (function (agent) {switch (true) {
            case agent.indexOf("edge") > -1: return "MS Edge";
            case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
            case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
            case agent.indexOf("trident") > -1: return "MS IE";
            case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
            case agent.indexOf("safari") > -1: return "Safari";
            default: return "other";
        }
    })(window.navigator.userAgent.toLowerCase());

    $(function() {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');
		
		
        $window.on('screen:wide screen:medium screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

		var nowZoom = 100;
		var ADD = 10;
		$('.zoombox .zoomin').on('click', function() {
			console.log(nowZoom);
			if(nowZoom==90){
				$body.removeClass('zoom').removeAttr('style');
				nowZoom = 100;
			} else{
				nowZoom = nowZoom+ADD;
				$body.addClass('zoom').css('transform', 'scale('+nowZoom/100+')').css('transform-origin', '0 0');
			}
		});
		$('.zoombox .zoomout').on('click', function() {
			if(nowZoom==110){
				$body.removeClass('zoom').removeAttr('style');
				nowZoom = 100;
			} else{
				nowZoom = nowZoom-ADD;
				$body.addClass('zoom').css('transform', 'scale('+nowZoom/100+')').css('transform-origin', '0 0');
			}
		});

        //lnb
        var $lnb = $header.find('.lnb'),
            $lnbShow = $header.find('.menu_show'),
            $lnbShowBtn = $lnbShow.find('.menu_button'),
            $lnbHide = $lnb.find('.menu_hide'),
            $lnbHideBtn = $lnbHide.find('.menu_button'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            $lnbSpy = $lnbMenu.find('.spy:last'),
            lnbHeight;

        $lnbSpy.parents('.depth_item').addClass('actived');

        function refreshLnbHeight() {
            lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';

            $lnbMenu.css('transition-property', '');
        }

        $lnbShowBtn.on('click', function(event) {
            //클래스 토글
            $html.toggleClass('lnb_show');
        });

        $lnbHideBtn.on('click', function(event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
        $('.lnb_curtain button').on('click', function(event) {
            $html.removeClass('lnb_show');
        });

        $lnbDepthItem.on('mouseover focusin', function(event) {
            if(mode === 'pc') {
                var $this = $(this),
                    $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

                if($lnbMenu.hasClass('pulldown')) {
                    var maxHeight = 0;

                    $lnbDepth2FirstChild.each(function(index, element) {
                        var $element = $(element),
                            outerHeight = $element.outerHeight(false) || 0;

                        //기존 값 보다 얻은 값이 초과일 때
                        if(outerHeight > maxHeight) {
                            maxHeight = outerHeight;
                        }
                    });

                    $lnbMenu.height(lnbHeight + maxHeight);
                }else if($lnbMenu.hasClass('eachdown')) {
                    $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight(false) || ''));
                }

                $html.addClass('lnb_open');
                $lnbDepthItem.removeClass('active');
                $this.addClass('active').parents('li').addClass('active');
            }
            event.stopPropagation();
        }).on('click', function(event) {
            if(mode === 'mobile') {
                var $this = $(this),
                    $depthText = $this.children('.depth_text'),
                    eventTarget = event.target;

                if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if($this.hasClass('depth1_item')) {
                        if($this.hasClass('active')) {
                            $html.removeClass('lnb_open');
                        }else{
                            $html.addClass('lnb_open');
                        }
                    }

                    if($this.children('.depth').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
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

        $lnbMenu.on('mouseleave', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });


        $lnb.find('.depth1_item:last-child .depth2 .depth2_list .depth2_item:last-child .depth2_text').on('focusout', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });
		var lnbmenuClone = $lnbMenu.clone();
		var $Menubox = $('.header_top .gnb_right .list.allmenubox .layerbox .layer .menubox');
		$Menubox.append(lnbmenuClone).attr('tabindex', '0');
		var AllmenuOffsetArray = [],
			$AllmenuTabbox = $('.header_top .gnb_right .list.allmenubox .layerbox .layer .tabbox');
		var $LnbDepth1text = $('#header .lnb .menu .depth1_text');
		$LnbDepth1text.each(function() {
			var $this = $(this),
				ThisHtml = $this.html(),
				ThisTag = '<div class="tabitem"><button type="button" class="tabbtn">'+ThisHtml+'</button></div>';
			$AllmenuTabbox.append(ThisTag);
		});
		$AllmenuTabbox.find('.tabitem:first-child').addClass('active').find('.tabbtn').attr('title', '선택됨');
		$('.header_top .gnb_right .list.allmenubox .allmenu_btn').on('click', function() {
			var $this = $(this),
				$Layer = $this.siblings('.layerbox'),
				IsOpen = $html.is('.allmenu_open');
			$Layer.fadeIn(function(){
				if(!IsOpen){
					$Menubox.animate({
						scrollTop: 0
					}, 0);
					$AllmenuTabbox.find('.tabitem').removeClass('active').find('.tabbtn').removeAttr('title');
					$AllmenuTabbox.find('.tabitem:first-child').addClass('active').find('.tabbtn').attr('title', '선택됨');
					AllmenuOffsetArray = [];
					$Menubox.find('.depth1_item').each(function() {
						var $this = $(this),
							ThisOffset = $this.offset().top;
						AllmenuOffsetArray.push(ThisOffset);
					});
				}
			});
			$html.addClass('allmenu_open');
		});
		$window.on('screen:wide screen:medium screen:web', function(event) {
			$Menubox.animate({
				scrollTop: 0
			}, 0);
			$AllmenuTabbox.find('.tabitem').removeClass('active').find('.tabbtn').removeAttr('title');
			$AllmenuTabbox.find('.tabitem:first-child').addClass('active').find('.tabbtn').attr('title', '선택됨');
			AllmenuOffsetArray = [];
			$Menubox.find('.depth1_item').each(function() {
				var $this = $(this),
					ThisOffset = $this.offset().top;
				AllmenuOffsetArray.push(ThisOffset);
			});
        });
		$('.header_top .gnb_right .list.allmenubox .layerbox .close').on('click', function() {
			var $this = $(this),
				$Layer = $this.parents('.layerbox');
			$html.removeClass('allmenu_open');
			$Layer.fadeOut();
		});
		/* 전체메뉴보기 메뉴 스크롤 */
		$('.header_top .gnb_right .list.allmenubox .layerbox .layer .menubox').scroll(function(){
			var scrT= $Menubox.scrollTop();
			if(scrT == $Menubox.find('.menu').height() - $Menubox.height()){
				$Menubox.addClass('end');
			} else {
				$Menubox.removeClass('end');
			}
		});
		$(document).on('click', '.gnb_right .list.allmenubox .layerbox .tabbox .tabitem .tabbtn', function() {
			var $this = $(this),
				$MyParent = $this.parent('.tabitem'),
				ParentIndex = $MyParent.index(),
				IsActive = $MyParent.is('.active'),
				$OtherParents = $MyParent.siblings('.tabitem'),
				$OtherBtns = $OtherParents.find('.tabbtn');
			if(!IsActive){
				var Offset = $Menubox.find('.depth1_item').eq(ParentIndex).offset().top;
				$Menubox.animate({
					scrollTop: AllmenuOffsetArray[ParentIndex]-251
				}, 400);
				$OtherParents.removeClass('active');
				$OtherBtns.removeAttr('title');
				$MyParent.addClass('active');
				$this.attr('title', '선택됨');
			}
		});

		//여기서부터 코드 작성해주세요
        $('.familybox .family_btn').on('click', function() {
            var $familybigbox = $('.familybigbox');
            $html.addClass('familybigbox_open');
            $familybigbox.fadeIn().find('a').first().focus();
            if($('.familybigbox .layerbox .hotissue .listbox ul').length == 0){
                $.ajax({
                    type:"GET",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data:"bannerType=6&domainCd=1",
                    dataType:"json",
                    async:false,
                    url: "/web/main/ND_ajaxSeasonBanner.do",
                    success:function(data){
                        var appendHTML = '';
                        if(data != null){
                            appendHTML += '<ul class="clearfix">';
                            for(var i = 0; i < data.length; i++){
                                var dataVo = data[i];
                                appendHTML += '<li>';
                                appendHTML += '    <a href="' + dataVo.linkUrl + '" target="_blank" title="새창">';
                                appendHTML += '        <span class="imagebox">';
                                appendHTML += '            <span class="inner_image" style="background-image:url(' + dataVo.filePath + ');"></span>';
                                appendHTML += '            <span class="image"><img src="' + dataVo.filePath + '" alt="' + dataVo.imgAlt + '" /></span>';
                                appendHTML += '        </span>';
                                appendHTML += '        <span class="textbox"><span>' + dataVo.title + '</span></span>';
                                appendHTML += '    </a>';
                                appendHTML += '</li>';
                            }
                            appendHTML += '</ul>';
                            $('.familybigbox .layerbox .hotissue .listbox').empty().append(appendHTML);
                        }
                    }, error: function(){
                    }
                });
            }
        });
        $('.familybigbox .close').on('click', function() {
            var $familybigbox = $('.familybigbox');
            $html.removeClass('familybigbox_open');
            $familybigbox.fadeOut();
            $('.familybox .family_btn').focus();
        });

        //language
        $('.header_top .language .lang_btn').on('click', function() {
            var $this = $(this),
                $Parent = $this.parent('.language'),
                IsActive = $Parent.is('.active'),
                $Layer = $this.siblings('.layer').find('ul');
            if(!IsActive){
                $Parent.addClass('active');
                $this.attr('title', '언어선택 닫기');
                $Layer.slideDown();
            } else{
                $Parent.removeClass('active');
                $this.attr('title', '언어선택 열기');
                $Layer.slideUp();
            };
        });

        //language-모바일
        $('.gnb_mobile .gnb_box .language .lang_btn').on('click', function() {
            var $this = $(this),
                $Parent = $this.parent('.language'),
                IsActive = $Parent.is('.active'),
                $Layer = $this.siblings('.layer');
            if(!IsActive){
                $Parent.addClass('active');
                $this.attr('title', '언어선택 닫기');
                $Layer.slideDown();
            } else{
                $Parent.removeClass('active');
                $this.attr('title', '언어선택 열기');
                $Layer.slideUp();
            };
        });

        //인기검색어
        $('.search_area .search_btn_m').on('click', function () {
            var $this = $(this),
                $btnParent = $this.parent('.search_area'),
                IsActive = $btnParent.is('.active');
            if(!IsActive){
                $btnParent.addClass('active');
            }
        })

        $('.searchbox .search .inputbox .total_search').on('focusin', function() {
            var $this = $(this),
                $popular = $('.searchbox .search .popular'),
                IsActive = $popular.is('.active');
            if(!IsActive){
                $popular.addClass('active').slideDown(400);
            }
            $('.searchbox .search').attr('data-key-idx', -1);
            $popular.find('.listbox ul li a').removeClass('over');
        });
        $('.searchbox .search').on('keydown', function() {
            var $this = $(this),
                $searchInput = $('.searchbox .search .inputbox .total_search'),
                $popular = $('.searchbox .search .popular'),
                $keyCode = event.keyCode || event.which,
                $keyIdx = $this.attr('data-key-idx');
            //console.log($keyCode);
            //console.log($keyIdx);
            // up:38, down:40, enter:13
            if($keyCode == 38 || $keyCode == 40){
                if($keyCode == 38){
                    if($keyIdx > 0){
                        $keyIdx--;
                    }else{
                        $keyIdx = $popular.find('.listbox ul li').length - 1;
                    }
                }else if($keyCode == 40){
                    if($keyIdx > $popular.find('.listbox ul li').length - 2){
                        $keyIdx = 0;
                    }else{
                        $keyIdx++;
                    }
                }
                $this.attr('data-key-idx', $keyIdx);
                $popular.find('.listbox ul li a').removeClass('over');
                $popular.find('.listbox ul li').eq($keyIdx).children('a').addClass('over');
                $searchInput.val($popular.find('.listbox ul li').eq($keyIdx).children('a').text());
                return false;
            }else{
                $this.attr('data-key-idx', -1);
                $popular.find('.listbox ul li a').removeClass('over');
            }
        });
        $('.searchbox .search .popular .listbox ul li').off('mouseenter');
        $('.searchbox .search .popular .listbox ul li').on('mouseenter', function() {
            $(this).siblings().children('a').removeClass('over');
            $(this).children('a').addClass('over');
            $('.searchbox .search').attr('data-key-idx', $(this).index());
        });
        $('.searchbox .search .popular .close').on('click', function() {
            var $this = $(this),
                $popular = $('.searchbox .search .popular');
            $popular.removeClass('active').slideUp(400);
            $('.population .conbox a').focus();
        });

        //footer_banner
        var $bannerSlide = $('.banner .banner_list'),
            bannerItemLength = $bannerSlide.find('.banner_item').length;
        $('.banner .total').text(bannerItemLength);

        $bannerSlide.slick({
            //기본
            autoplay : true,
            swipe : false,
            draggable : false,
            slidesToShow : 8,
            slidesToScroll: 1,
            variableWidth: false,
            infinite: true,
            arrows: true,
            prevArrow : $('.banner .banner_control .prev'),
            nextArrow : $('.banner .banner_control .next'),
            dots : false,
            //추가 기능
            autoArrow : $('.banner .banner_control .auto'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            pauseText : '정지',
            playText : '재생',
            //total : $('.banner .controlbox .count .total'),
            current : $('.banner .controlbox .count .current'),
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe:true,
                        draggable:true
                    }
                }]
        });
        $('.banner .more').on('click', function(){
            var $this = $(this),
                $Layer = $this.siblings('.layer');
            $Layer.slideDown();
            searchBanner('','');
        });
        $('.banner .layer .close').on('click', function(){
            var $this = $(this),
                $Layer = $this.parent('.layer');
            $Layer.slideUp();
            $('.banner .more').focus();
        });

        //footer_site
        $('.footer_site .link_btn').on('click', function() {
            var $this = $(this),
                $MyParent = $this.parent('li.list'),
                IsActive = $MyParent.is('.active'),
                $Layer = $this.siblings('.layer'),
                $OtherParents = $MyParent.siblings('li.list'),
                $OtherBtns = $OtherParents.find('.link_btn'),
                $OtherLayer = $OtherParents.find('.layer');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherLayer.slideUp(400);
                $OtherBtns.attr('title','목록 열기');
                $MyParent.addClass('active');
                $this.attr('title', '목록 닫기');
                $Layer.slideDown(400);
            } else{
                $MyParent.removeClass('active');
                $this.attr('title', '목록 열기');
                $Layer.slideUp(400);
            };
        });

        $window.on('screen:wide screen:medium screen:web', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
            }
        });

        $window.on('screen:tablet screen:phone', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
            }
        });
    });

    $document.on('ready', function(event) {
        /**
         * @link {https://github.com/JungHyunKwon/screen}
         */
        $.screen({
			state : [{
				name : 'wide',
				horizontal : {
					from : 9999,
					to : 1501
				}
			}, {
				name : 'medium',
				horizontal : {
					from : 1500,
					to : 1201
				}
			}, {
				name : 'web',
				horizontal : {
					from : 1200,
					to : 1001
				}
			}, {
				name : 'tablet',
				horizontal : {
					from : 1000,
					to : 641
				}
			}, {
				name : 'phone',
				horizontal : {
					from : 640,
					to : 0
				}
			}, {
				name : 'maxheight',
				vertical : {
					from : 9999,
					to : 945
				}
			}, {
				name : 'minheight',
				vertical : {
					from : 944,
					to : 0
				}
			}]
		});
    });

    $window.on('load', function(event) {

        $window.on('screen:resize', function(event) {
            
        }).triggerHandler('screen:resize');
    });
})(jQuery);