"use strict";

(function ($) {
  "use strict";

  $(document).ready(function () {
    initBackgroundVideo();
    initSliders();
    initProgressBar();
    initSvgAnimation();
  }); // INIT BACKGROUND VIDEOS

  function initBackgroundVideo() {
    var videoSettings = {
      containment: ".js-video-bg",
      startAt: 0,
      mute: true,
      ratio: 'auto',
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
      $('#html-video-block').bgVideo({
        showPausePlay: false,
        pauseAfter: 0
      });
    }
  } // INIT SLIDERS


  function initSliders() {
    $('.js-works-slider').slick({
      centerMode: true,
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "50px",
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
    var initialTimerTime = $('.js-progress-bar-time').attr('data-time');

    function timer(time) {
      var initialTime = time,
          timeForTimer = time;
      progressBar(timeForTimer, initialTime);
      setInterval(function () {
        var timer = timeForTimer.split(':'),
            minutes = parseInt(timer[0], 10),
            seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (minutes >= 0) {
          $('.js-progress-bar-time').html(minutes + ':' + seconds);
        }

        timeForTimer = minutes + ':' + seconds;

        if (minutes < 0) {
          timeForTimer = initialTime;
          $('.js-progress-bar-time').html(timeForTimer);
        }

        progressBar(timeForTimer, initialTime);
      }, 1000);
    }

    function progressBar(currentTime, initialTime) {
      var currentTimeInSeconds = parseInt(currentTime.split(':')[0], 10) * 60 + parseInt(currentTime.split(':')[1], 10),
          initialTimeInSeconds = parseInt(initialTime.split(':')[0], 10) * 60 + parseInt(initialTime.split(':')[1], 10),
          progressBarWidth = currentTimeInSeconds / (initialTimeInSeconds / 100);
      $('.js-progress-bar').css("width", progressBarWidth + "%");
    }

    if ($('.js-progress-bar-time').length) {
      timer(initialTimerTime);
    }
  } // SVG ANIMATION


  function initSvgAnimation() {
    function svgAnimation(svgItem, duration) {
      $(svgItem).addClass('-animation-init');
      new Vivus(svgItem, {
        duration: duration,
        type: 'oneByOne'
      });
    }

    function svgAnimationOnScroll() {
      var svgItem = $('.js-svg-animation-item');

      if (svgItem.length) {
        svgItem.waypoint({
          handler: function handler() {
            if (!this.element.svgAnimationInit) {
              this.element.svgAnimationInit = true;
              svgAnimation(this.element, 100);
            }
          },
          offset: '80%'
        });
      }
    }

    svgAnimationOnScroll();
  }
})(jQuery);
//# sourceMappingURL=main.js.map
