"use strict";

(function ($) {
  "use strict";

  $(document).ready(function () {
    initBackgroundVideo();
    initSliders();
    initProgressBar();
    initSvgInjection();
    initMobileMenu();
    initQuiz();
    initRangeSlider(); // $('.aweber-form input[name="name"]').val('Test name fdfdsfds');
    // $('.aweber-form input[name="email"]').val('test-emsdfdsfdsfail@mail.com');
    // $('.aweber-form .af-selectWrap select').val('Below budget');
    // $('body').on('click', function() {
    // 	$('.aweber-form input[type="submit"]').click();
    // });
    // $('.aweber-form input[type="submit"]').on('click', function(e){
    // 	e.stopPropagation();
    // });
  }); // INIT BACKGROUND VIDEOS

  function initBackgroundVideo() {
    var videoSettings = {
      containment: ".js-video-bg",
      startAt: 0,
      mute: true,
      ratio: "auto",
      showControls: false,
      autoPlay: true,
      loop: true,
      showYTLogo: false,
      stopMovieOnBlur: false
    };

    if ($("#youtube-video-block").length) {
      $("#youtube-video-block").YTPlayer(videoSettings);
    }

    if ($("#vimeo-video-block").length) {
      $("#vimeo-video-block").vimeo_player(videoSettings);
    }

    if ($("#html-video-block").length) {
      $("#html-video-block").bgVideo({
        showPausePlay: false,
        pauseAfter: 0
      });
    }
  } // INIT SLIDERS


  function initSliders() {
    $(".js-works-slider").slick({
      centerMode: true,
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "30px",
      mobileFirst: true,
      responsive: [{
        breakpoint: 575,
        settings: {
          centerPadding: "20%"
        }
      }]
    });
  } // INIT PROGRESS BAR


  function initProgressBar() {
    var initialTimerTime = $(".js-progress-bar-time").attr("data-time");

    function timer(time) {
      var initialTime = time,
          timeForTimer = time;
      progressBar(timeForTimer, initialTime);
      setInterval(function () {
        var timer = timeForTimer.split(":"),
            minutes = parseInt(timer[0], 10),
            seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (minutes >= 0) {
          $(".js-progress-bar-time").html(minutes + ":" + seconds);
        }

        timeForTimer = minutes + ":" + seconds;

        if (minutes < 0) {
          timeForTimer = initialTime;
          $(".js-progress-bar-time").html(timeForTimer);
        }

        progressBar(timeForTimer, initialTime);
      }, 1000);
    }

    function progressBar(currentTime, initialTime) {
      var currentTimeInSeconds = parseInt(currentTime.split(":")[0], 10) * 60 + parseInt(currentTime.split(":")[1], 10),
          initialTimeInSeconds = parseInt(initialTime.split(":")[0], 10) * 60 + parseInt(initialTime.split(":")[1], 10),
          progressBarWidth = currentTimeInSeconds / (initialTimeInSeconds / 100);
      $(".js-progress-bar").css("width", progressBarWidth + "%");
    }

    if ($(".js-progress-bar-time").length) {
      timer(initialTimerTime);
    }
  } // SVG INJECTION


  function initSvgInjection() {
    var mySVGsToInject = document.querySelectorAll(".js-svg-inject"),
        injectorOptions = {};
    SVGInjector(mySVGsToInject, injectorOptions, function () {
      initSvgAnimation();
    });
  } // SVG ANIMATION


  function initSvgAnimation() {
    function svgAnimation(svgItem, duration) {
      $(svgItem).addClass("-animation-init");
      new Vivus(svgItem, {
        duration: duration,
        type: "oneByOne"
      });
    }

    function svgAnimationOnScroll() {
      var svgItem = $(".js-svg-animation-item");

      if (svgItem.length) {
        svgItem.waypoint({
          handler: function handler() {
            if (!this.element.svgAnimationInit) {
              this.element.svgAnimationInit = true;
              svgAnimation(this.element, 100);
            }
          },
          offset: "80%"
        });
      }
    }

    svgAnimationOnScroll();
  } // MOBILE MENU


  function initMobileMenu() {
    $(".js-hamburger").click(function (e) {
      e.preventDefault();
      $(this).toggleClass("-active");
      $(".js-mobile-menu").slideToggle(300);
    });
  }

  function serialize(form) {
    var i,
        j,
        len,
        jLen,
        formElement,
        q = [];

    function urlencode(str) {
      // http://kevin.vanzonneveld.net
      // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
      // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
      return encodeURIComponent(str).replace(/!/g, "%21").replace(/%40/g, "@").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, " ");
    }

    function addNameValue(name, value) {
      q.push(urlencode(name) + ": " + urlencode(value));
    }

    if (!form || !form.nodeName || form.nodeName.toLowerCase() !== "form") {
      throw "You must supply a form element";
    }

    for (i = 0, len = form.elements.length; i < len; i++) {
      formElement = form.elements[i];

      if (formElement.name === "" || formElement.disabled) {
        continue;
      }

      switch (formElement.nodeName.toLowerCase()) {
        case "input":
          switch (formElement.type) {
            case "text":
            case "email":
            case "hidden":
            case "password":
            case "button": // Not submitted when submitting form manually, though jQuery does serialize this and it can be an HTML4 successful control

            case "submit":
              addNameValue(formElement.name, formElement.value);
              break;

            case "checkbox":
            case "radio":
              if (formElement.checked) {
                if (q.length > 0) {
                  var test = true;

                  for (j = 0; j < q.length; j++) {
                    var formElementName = q[j].split(':')[0];

                    if (formElementName === formElement.name) {
                      q[j] = q[j] + ", " + formElement.value;
                      test = false;
                    }
                  }

                  if (test) {
                    addNameValue(formElement.name, formElement.value);
                  }
                } else {
                  addNameValue(formElement.name, formElement.value);
                }
              }

              break;

            case "file":
              // addNameValue(formElement.name, formElement.value); // Will work and part of HTML4 "successful controls", but not used in jQuery
              break;

            case "reset":
              break;
          }

          break;

        case "textarea":
          addNameValue(formElement.name, formElement.value);
          break;

        case "select":
          switch (formElement.type) {
            case "select-one":
              addNameValue(formElement.name, formElement.value);
              break;

            case "select-multiple":
              for (j = 0, jLen = formElement.options.length; j < jLen; j++) {
                if (formElement.options[j].selected) {
                  addNameValue(formElement.name, formElement.options[j].value);
                }
              }

              break;
          }

          break;

        case "button":
          // jQuery does not submit these, though it is an HTML4 successful control
          switch (formElement.type) {
            case "reset":
            case "submit":
            case "button":
              addNameValue(formElement.name, formElement.value);
              break;
          }

          break;
      }
    }

    return q;
  } // INIT QUIZ


  function initQuiz() {
    var quizForm = $(".js-quiz-form");
    quizForm.validate({
      errorPlacement: function errorPlacement(error, element) {
        return true;
      },
      highlight: function highlight(element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element).closest("fieldset").addClass(errorClass);
      },
      unhighlight: function unhighlight(element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element).closest("fieldset").removeClass(errorClass);
      }
    });
    quizForm.children("div").steps({
      headerTag: "h3",
      bodyTag: "section",
      titleTemplate: '<span class="number">#index#</span>',
      transitionEffect: "slide",
      transitionEffectSpeed: 500,
      onStepChanging: function onStepChanging(event, currentIndex, newIndex) {
        quizForm.validate().settings.ignore = ":disabled,:hidden";
        $("html, body").animate({
          scrollTop: quizForm.offset().top - 100
        }, 500);
        return quizForm.valid();
      },
      onFinishing: function onFinishing(event, currentIndex) {
        quizForm.validate().settings.ignore = ":disabled";
        return quizForm.valid();
      },
      onFinished: function onFinished(event, currentIndex) {
        var formData = serialize(quizForm[0]).join("\n");
        $('.js-quiz-preloader').fadeIn();
        setTimeout(function () {
          $('.js-quiz-form-block').hide();
          $('.js-quiz-thanks-block').show();
        }, 2000);
        setTimeout(function () {
          $('.js-quiz-preloader').fadeOut();
        }, 3000);
        setTimeout(function () {
          alert(formData);
        }, 5000);
      }
    });
  } // INIT RANGE SLIDER


  function initRangeSlider() {
    $(".js-range-slider").ionRangeSlider({
      hide_min_max: true
    });
  }
})(jQuery);
//# sourceMappingURL=main.js.map
