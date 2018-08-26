'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    var Uncover = function () {
        function Uncover(el, options) {
            _classCallCheck(this, Uncover);

            this.DOM = { el: el };
            this.options = {
                // initially covered.
                covered: true,
                // total number of slices.
                slicesTotal: 3,
                // slices color.
                slicesColor: '#fff',
                // 'vertical' || 'horizontal'.
                orientation: 'horizontal',
                // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
                // need to define for both show and hide methods.
                // e.g. animate the slices in from left and hide them to the right side (for a horizontal layout)
                slicesOrigin: {
                    show: 'left',
                    hide: 'left'
                }
            };
            Object.assign(this.options, options);
            this.isCovered = this.options.covered;
            this.layout();
            if (!this.isCovered) {
                this.show();
            }
        }

        _createClass(Uncover, [{
            key: 'layout',
            value: function layout() {
                this.DOM.el.classList.add('uncover');
                var inner = '';
                inner += '<div class="uncover__img" style=\'background-image: ' + this.DOM.el.style.backgroundImage + '\'></div>\n                      <div class="uncover__slices uncover__slices--' + this.options.orientation + '">';
                for (var i = 0; i <= this.options.slicesTotal - 1; ++i) {
                    inner += '<div class="uncover__slice" style="color:' + this.options.slicesColor + '"></div>';
                }
                inner += '</div>';
                this.DOM.el.innerHTML = inner;
                this.DOM.img = this.DOM.el.querySelector('.uncover__img');
                this.DOM.slices = Array.from(this.DOM.el.querySelectorAll('.uncover__slice'));
                this.slicesTotal = this.DOM.slices.length;
            }
        }, {
            key: 'show',
            value: function show() {
                var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var animationSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (!this.isCovered) return;
                return this.toggle(animation, animationSettings);
            }
        }, {
            key: 'hide',
            value: function hide() {
                var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var animationSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                if (this.isCovered) return;
                return this.toggle(animation, animationSettings);
            }
        }, {
            key: 'toggle',
            value: function toggle(animation, animationSettings) {
                var _this = this;

                this.isCovered = !this.isCovered;
                if (!animation) {
                    this.DOM.slices.forEach(function (slice) {
                        slice.style.transform = !_this.isCovered ? _this.options.orientation === 'vertical' ? 'translateY(100%)' : 'translateX(100%)' : 'none';
                    });
                } else {
                    var settings = {
                        slices: {
                            targets: this.DOM.slices,
                            duration: 800,
                            delay: function delay(_, i) {
                                return i * 80;
                            },
                            easing: 'easeInOutQuart',
                            translateX: this.options.orientation === 'vertical' ? '0%' : !this.isCovered ? this.options.slicesOrigin.show === 'right' ? '100%' : '-100%' : this.options.slicesOrigin.hide === 'right' ? ['100%', '0%'] : ['-100%', '0%'],

                            translateY: this.options.orientation === 'vertical' ? !this.isCovered ? this.options.slicesOrigin.show === 'bottom' ? '100%' : '-100%' : this.options.slicesOrigin.hide === 'bottom' ? ['100%', '0%'] : ['-100%', '0%'] : '0%'
                        },
                        image: {
                            targets: this.DOM.img
                        }
                    };
                    Object.assign(settings.slices, animationSettings.slices);
                    Object.assign(settings.image, animationSettings.image);

                    anime.remove(this.DOM.slices);
                    anime.remove(this.DOM.img);

                    var promises = [anime(settings.slices).finished];
                    if (settings.image.duration) {
                        promises.push(anime(settings.image).finished);
                    }
                    return Promise.all(promises);
                }
            }
        }]);

        return Uncover;
    }();

    window.Uncover = Uncover;
}