$(function () {
    $('ul.tab li').click(function () {
        var i = $(this).attr('data-tab');
        $('ul.tab li').removeClass('on');
        $('.tab_menu').removeClass('on');
        $(this).addClass('on');
        $('#' + i).addClass('on');
    })
});


$(function () {
    var on_off = false;
    $(".gnb_btn").click(function () {
        on_off = !on_off

        if (on_off) { // 참일 경우
            
            $("nav ul").animate({opacity: "1"}, 500, "easeOutExpo");
            $("nav").animate({right: "0",opacity: "0.98" }, 1000, "easeOutExpo");
            $(".bar_1").animate({top: "35px"}, 300, "easeOutExpo").animate({rotate: "45deg"}, 300, "easeOutExpo");
            $(".bar_2").animate({top:"20px",height:"35px",opacity:"0" }, 0, "easeOutExpo");
            $(".bar_3").animate({top: "35px"}, 300, "easeOutExpo").animate({rotate: "-45deg"}, 300, "easeOutExpo");
            

        } else {
            $(".menu_banner").animate({opacity: "1"}, 1000, "easeOutExpo");
            $("nav ul").delay(500).animate({opacity: "0"}, 500, "easeOutExpo");
            $("nav").animate({right: "-100%",opacity: "0"}, 1000, "easeOutExpo");
            $(".gnb_btn span").animate({rotate: "0"}, 200, "easeOutExpo");
            $(".bar_1").animate({top: "20px"}, 100, "easeOutExpo");
            $(".bar_2").animate({height:"3px",top:"35px",opacity:"1"}, 0, "easeOutExpo");
            $(".bar_3").animate({top: "50px"}, 100, "easeOutExpo");
        }
    });
});



$(function () {
    var on_off = false;
$(".m_gnb_btn").click(function () {
        on_off = !on_off

        if (on_off) { // 참일 경우
            
            $("nav ul").animate({opacity: "1"}, 500, "easeOutExpo");
            $("nav").animate({right: "0",opacity: "0.98" }, 1000, "easeOutExpo");
            $(".m_bar_1").animate({top: "18px"}, 300, "easeOutExpo").animate({rotate: "45deg"}, 300, "easeOutExpo");
            $(".m_bar_2").animate({top:"18px",height:"20px",opacity:"0" }, 0, "easeOutExpo");
            $(".m_bar_3").animate({top: "18px"}, 300, "easeOutExpo").animate({rotate: "-45deg"}, 300, "easeOutExpo");
            

        } else {
            $(".menu_banner").animate({opacity: "1"}, 1000, "easeOutExpo");
            $("nav ul").delay(500).animate({opacity: "0"}, 500, "easeOutExpo");
            $("nav").animate({right: "-100%",opacity: "0"}, 1000, "easeOutExpo");
            $(".m_gnb_btn span").animate({rotate: "0"}, 200, "easeOutExpo");
            $(".m_bar_1").animate({top: "10px"}, 100, "easeOutExpo");
            $(".m_bar_2").animate({height:"2px",top:"18px",opacity:"1"}, 0, "easeOutExpo");
            $(".m_bar_3").animate({top: "26px"}, 100, "easeOutExpo");
        }
    });
});


$(function() {
    var slider = $(".bxslider").bxSlider({
        auto: true,
        controls: false,
        pagerCustom: '.bx-pager'
       });
    $(document).on('click', '.bx-pager a', function() {
        slider.stopAuto();
        slider.startAuto();
    });
});
    