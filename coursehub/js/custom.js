"use strict";
$(document).ready(function() {
    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        AOS Animation Activation
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    AOS.init();
    window.addEventListener("load", AOS.refresh);

    if (jQuery(".testimonial-one").length > 0) {
        $('.testimonial-one').slick({
            autoplay: true,
            slidesToShow: 4,
            arrows: true,
            swipe: true,
            infinite: true,
            appendArrows: '.testimonial-one-button',
            prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-minimal-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon icon-minimal-right"></i></button>',
            dots: true,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 468,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    // Feature Section
    if (jQuery(".l3-feature-slider").length > 0) {
        $('.l3-feature-slider').slick({
            autoplay: true,
            autoplaySpeed: '3000',
            centerMode: true,
            centerPadding: '17%',
            slidesToShow: 3,
            arrows: false,
            touchMove: true,
            infinite: true,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1507,
                    settings: {
                        centerPadding: '8%',
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1366,
                    settings: {
                        centerPadding: '10px',
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        centerPadding: '80px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 1099,
                    settings: {
                        centerPadding: '180px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 1029,
                    settings: {
                        centerPadding: '80px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 849,
                    settings: {
                        centerPadding: '30%',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 830,
                    settings: {
                        centerPadding: '25%',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 719,
                    settings: {
                        centerPadding: '20%',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 570,
                    settings: {
                        centerPadding: '30px',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        centerPadding: '0px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Fancybox Support
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    $("a.video-btn").fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'overlayShow': false
    });
});


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      Counter Up Activation
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
$('.counter').counterUp({
    delay: 10,
    time: 1000
});
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      Preloader Activation
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

$(window).load(function() {
    setTimeout(function() {
        $("#loading").fadeOut(500);
    }, 1000);
    setTimeout(function() {
        $("#loading").remove();
    }, 2000);
});