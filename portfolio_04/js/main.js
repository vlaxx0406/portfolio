        $(function () {
            $('a[href="#"]').click(function (e) {
                e.preventDefault();
            });
            /*메뉴 1에 마우스를 올렸을떄 해당 서브메뉴가 보여짐*/
            $(".gnb > li").mouseover(function () {
                $(this).children(".sub").stop().slideDown();
            });
            $(".gnb > li").mouseout(function () {
                $(this).children(".sub").stop().slideUp();
            });



            $('.bxslider').bxSlider({
                mode: 'fade', // 가로 방향 수평 슬라이드
                speed: 2000, // 이동 속도를 설정
                pause: 3000,
                pager: true, // 현재 위치 페이징 표시 여부 설정
                moveSlides: 1, // 슬라이드 이동시 개수
                auto: true, // 자동 실행 여부
                autoHover: true, // 마우스 호버시 정지 여부
                infiniteLoop: true, // 이전 다음 버튼 노출 여부
                pagerCustom: '#bx-pager',
                nextSelector: '#nextBtn', //다음으로 넘길 객체
                prevSelector: '#prevBtn',
                prevText: '←',
                nextText: '→'
            });



            $('.bxslider_2').bxSlider({
                slideWidth: 620,
                maxSlides: 2,
                minSlides: 2,
                moveSlides: 1,
                speed: 1000,
                pause: 3000,
                auto: true,
                autoHover: true,
                autoControls: true,
                infiniteLoop: true,
                slideMargin: 60,
                pagerCustom: "#bx-pager_2",
                nextSelector: "#nextBtn_2",
                prevSelector: "#prevBtn_2",
                prevText: '〈',
                nextText: '〉'
            });


            $('.bxslider_3').bxSlider({
                slideWidth: 370,
                maxSlides: 3,
                minSlides: 3,
                moveSlides: 1,
                speed: 1000,
                pause: 3000,
                auto: true,
                autoHover: true,
                autoControls: true,
                infiniteLoop: true,
                slideMargin: 20,
                pagerCustom: "#bx-pager_3",
                nextSelector: "#nextBtn_3",
                prevSelector: "#prevBtn_3",
                prevText: '〈',
                nextText: '〉'
            });
        });


        
        $(function () {

            $(".p_btn").click(function () {
                var $this = $(this);
                var target = $this.prev();
                var num = parseInt(target.text());
                num++;
                if (num > 3) {
                    alert('객실은 최대 3개까지 선택 가능합니다. ');
                    num = 3;
                }
                target.text(num);
            });

            $(".m_btn").click(function () {
                var $this = $(this);
                var target = $this.next();
                var num = parseInt(target.text());
                num -= ((num === 1) ? 0 : 1); //1이하로는 못내려가게 한다 
                

                target.text(num);
            });
             $(".in_p_btn").click(function () {
                var $this = $(this);
                var target = $this.prev();
                var num = parseInt(target.text());
                num++;
                if (num > 4) {
                    alert('객실 1실당 성인과 소인 동반 시 최대 4인까지만 투숙이 가능합니다. ');
                    num = 4;
                }
                target.text(num);
            });

            $(".in_m_btn").click(function () {
                var $this = $(this);
                var target = $this.next();
                var num = parseInt(target.text());
                num -= ((num === 0) ? 0 : 1); //0이하로는 못내려가게 한다 
                

                target.text(num);
            });
        });
