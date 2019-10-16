

'use strict';

$(function() {






    $(".on-loading").velocity("fadeOut", {
        duration: 3000,
        complete: function () {
            $(this).remove();
        }
    });
 
    
    setTimeout(function () {
      
        $('.nav').addClass("is-ready");
    }, 20);
    setTimeout(function () {
        
        $('.nav').addClass('is-enter').removeClass("is-ready")
    }, 1500);


//fullpage控制代码

//  $.fn.fullpage.setAllowScrolling(false);
   
    $('#fullpage').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        menu: '#menu',
        css3: true,
        lazyLoading: true,
        normalScrollElements: '#map , .top-hero__slider-inner',
        responsiveWidth:787,
        
        afterLoad: function (anchorLink, index) {
            if (index == 1) {
                $(".menu-btn").show();
            }
            if (index == 5) {
                // clearInterval(autoplay);
            }

            $('.section').removeClass('current');
            // 延时100毫秒执行
            setTimeout(function () {
                $('.section').eq(index - 1).addClass('current');
            }, 100);
        },
        afterRender: function () {

        },
        onLeave: function (index, nextIndex, direction) {
            if(index ==  1 ){
              $(".menu-btn").hide();
            }
        }
    });


$(window).resize(function(){
   if($(window).width() <788){
    $("body").css("min-width","787px");
   }
});

//menu点击显示样式
    $('#menu  a').on("click", function ()
     {
        $('#menu li').removeClass('active');
        $(this).parent().addClass('active');
    });
    $(".next").on("click", function () {
        $.fn.fullpage.moveSectionDown();
    })
//第一页
    $('.menu-btn').on("click", function (){
        if( ! $('.menu-btn').hasClass('is-active')){
                $('.nav__list')
                .addClass('opacity')
                .find('li').first().addClass('up');
                

                $('.top-heading__title').addClass('opacity');

                 $('.nav__list li').click(function(){

                var index =$(this).index()+1;
                            $.fn.fullpage.moveTo(index);
              });
                  
        }
        else{
                 $('.nav__list')
                .removeClass('opacity')
                .find('li').first().removeClass('up');
                

                $('.top-heading__title').removeClass('opacity');

                $('.nav__list li').unbind();
            }
    })
  

    // 第二页
    $("#myCarousel").carousel('cycle');
    // $("#myCarousel")
    //     .carousel('cycle')
    //     .carousel({
    //         interval: 2000});


    // 第三页
 
    //第五页轮播图
  var flage =true;
    var slider = function(s,fun){
 

                   var don = $(".top-hero__slider-inner .top-hero__slider-unit");
        
            $('.top-hero__slider-inner .top-hero__slider-unit:not(:eq('+s+'))').stop()
            .animate(
                    {
                        opacity:0,
                    }
                );
            $('.top-hero__slider-inner .top-hero__slider-unit:eq('+s+')').stop().animate(
                {
                    opacity:1,
                },
                {
                    complete:function(){
                       
                        fun(s);
                    }
                }

                );

           
      

           

    }

    var brand =function(s){
        
       
         $('.brand').html('');
      
        switch (s) {
            case 0 : 
             $('.brand').html(' <h3 class=' + '"brand_en"' + '>BRAND CASE</h3><br>' +
                    '<h3 class=' + '"brand_zh">' + '品牌案例</h3>');
                 $('.top-hero__slider-inner>div>a').attr("href","brand.html").attr("target","_blank");
                break;

            case 1 :
                $('.brand').html(' <h3 class=' + '"brand_en"' + '>ORIGINAL IP</h3><br>' +
                    '<h3 class=' + '"brand_zh">' + '原创IP</h3>');
                  $('.top-hero__slider-inner>div>a').attr("href","brand.html").attr("target","_blank");
                break;
            case 2 :
                
                $('.brand').html(' <h3 class=' + '"brand_en"' + '>VEDIO CASE</h3><br>' +
                    '<h3 class=' + '"brand_zh">' + '视频案例</h3>');
                $('.top-hero__slider-inner>div>a').attr("href","brand.html").attr("target","_blank");
                break;
            // case 4 :
            // break;
            default:
                break;
             }
          
    }

    var slidenum = 1;

    var autoplay = function () {
        var s = slidenum ;
        slider(s,brand);
    
        slidenum++;
        if (slidenum > 2) {
            slidenum = 0;
        }
    }
    var sliderInterval = null;

     sliderInterval = setInterval(autoplay,3000);

    $('.top-hero__slider')
    .hover(function(){
           clearInterval(sliderInterval);
        },function(){
           clearInterval(sliderInterval);
           sliderInterval = setInterval(autoplay,3000);
        })
    .bind('mousewheel DOMMouseScroll', function(e) {
 
        e.preventDefault();
        if (e.type == 'mousewheel') {
            var scroll = e.originalEvent.wheelDelta ;
            if (scroll > 0) {
                 console.log('up'+scroll+'topage'+slidenum);
               if(slidenum>=0){
                    if(slidenum==0){
                        slider(2,brand);
                      
                        slidenum=2;
                    }
                    else{
                        slidenum--;
                        slider(slidenum,brand);
                        
                    }
         
                }
           
            }
        else{
            
            // var s = slidenum - 1;
         
                console.log('down'+scroll+'topage'+slidenum);
                if(slidenum<=2){
                     // var s = slidenum+1;
                    if(slidenum==2){
                        slider(0,brand);
                      
                        slidenum=0;
                    }
                    else{
                          slidenum++;
                        slider(slidenum,brand);
                     
                      
                    }
                    
                    

                    // slidenum = s - 1;
                }
              }
        // scrollTo = (e.originalEvent.wheelDelta * -1);
         console.log('topage'+slidenum);

    }
    else if (e.type == 'DOMMouseScroll') {
      //  scrollTo = 40 * e.originalEvent.detail;
         var scroll = e.originalEvent.detail;
         if (scroll > 0) {
                console.log('up'+scroll);
                var s = slidenum+1;
                if(s<=2){
                    if(s==2){
                        slider(s,brand);
                        s=0;
                    }
                    else{
                        slider(s,brand);
                    }
                    

                    slidenum = s + 1;
                }
           
            }
        else{
            console.log('down'+scroll)
            var s = slidenum - 1;
                if(s>=0){
                    if(s==0){
                        slider(s,brand);
                        s=2;
                    }
                    else{
                        slider(s,brand);
                    }
                    

                    slidenum = s - 1;
                }
              }

    }

    
    }); 

   




    //第6页
  

    $('#up').on('click', function () {       
         
                $.fn.fullpage.moveTo(1);
    })


    var height = $('.description-list').height();
  $('.line_white').height(height);

 $(window).resize(function() {
  var height = $('.description-list').height();
  $('.line_white').height(height);
});


})
