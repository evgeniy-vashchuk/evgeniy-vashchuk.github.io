'use strict';

jQuery(function ($) {
	initViewportUnitsOnMobile();
	initSmoothAnchorLinks();
	initInputMask();
	initSurveyFunctionality();

	// VIEWPORT UNITS ON MOBILE
	function initViewportUnitsOnMobile() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');

		$(window).on('resize', function () {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	}

	// SMOOTH ANCHOR LINKS
	function initSmoothAnchorLinks() {
		var animationComplete = true,
		smoothAnchorLinks = $('a[href*="#"]:not([href="#"]):not(.js-no-scroll)'),
		headerHeight = $(".js-header").length ? $(".js-header").outerHeight() : 0;

		function scrollToElement(element) {var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			if (animationComplete && element.length) {
				animationComplete = false;

				$("body, html").animate({
					scrollTop: element.offset().top - offset },
				500).promise().done(function () {
					animationComplete = true;
				});
			}
		}

		// link click scroll
		smoothAnchorLinks.on("click", function (e) {
			e.preventDefault();

			var idOfElement = $(this).attr("href").split("#")[1],
			element = $("#" + idOfElement);

			scrollToElement(element, headerHeight);
		});
	}

	// INPUT MASK
	function initInputMask() {
		var phoneInput = document.getElementsByClassName('js-phone-input'),
		phoneMaskOptions = {
			mask: '(000) 000-0000' };


		for (var i = 0; i < phoneInput.length; i++) {
			var phoneMask = IMask(phoneInput[i], phoneMaskOptions);

			phoneMask.on('accept', function (e) {
				e.srcElement.classList.remove('valid');
			});

			phoneMask.on('complete', function (e) {
				e.srcElement.classList.add('valid');
			});
		}
	}

	// SURVEY FUNCTIONALITY
	function initSurveyFunctionality() {
		var surveyQuestionItem = $('.js-survey-question-item'),
		nextQuestionBtn = $('.js-survey-go-to-next-question'),
		surveySubmitBtn = $('.js-survey-submit-btn'),
		formItems = '.js-text-input, .js-email-input, .js-phone-input, .js-textarea',
		scrollAnimationComplete = true;

		function scrollToElement(element) {
			var headerHeight = $('.js-header').length ? $('.js-header').outerHeight() : 0;

			if (scrollAnimationComplete && element.length) {
				scrollAnimationComplete = false;

				$('body, html').animate({
					scrollTop: element.offset().top - headerHeight },
				500).promise().done(function () {
					scrollAnimationComplete = true;

					if (element.hasClass('js-survey-question-item')) setFormFocus(element);
				});
			}
		}

		function setTotalQuestionsCount() {
			var totalCount = surveyQuestionItem.length;

			$('.js-total-questions-count').text(totalCount);
		}

		function questionTitleScroll() {
			$('.js-question-title').on('click', function () {
				var surveyQuestion = $(this.closest('.js-survey-question-item'));

				scrollToElement(surveyQuestion);
			});
		}

		function detectTypeOfQuestion(question) {
			var typeOfQuestion = '';

			if (question.find('.js-checkbox-radio-input').length) {
				typeOfQuestion = 'with-checkbox-or-radio';
			} else if (question.find('.js-text-input').length) {
				typeOfQuestion = 'with-text-input';
			} else if (question.find('.js-email-input').length) {
				typeOfQuestion = 'with-email-input';
			} else if (question.find('.js-phone-input').length) {
				typeOfQuestion = 'with-phone-input';
			} else if (question.find('.js-textarea').length) {
				typeOfQuestion = 'with-textarea';
			}

			return typeOfQuestion;
		}

		function setFormActiveOnBlur() {
			$(formItems).on('focus', function (e) {
				$(e.currentTarget).addClass('active');
			});

			$(formItems).on('blur', function (e) {
				if (e.currentTarget.value.length === 0) {
					$(e.currentTarget).removeClass('active');
				}
			});
		}

		function setQuestionIsNotValid(question) {
			var questionError = question.find('.js-error-text');

			scrollToElement(question);
			questionError.addClass('active');
		}

		function validateQuestion(question) {
			var questionIsValid = true,
			typeOfQuestion = detectTypeOfQuestion(question);

			switch (typeOfQuestion) {
				case 'with-checkbox-or-radio':
					var hasAtLeastOneCheckedInput = false;

					question.find('.js-checkbox-radio-input').each(function () {
						if ($(this).is(':checked')) {
							hasAtLeastOneCheckedInput = true;
						}
					});

					if (!hasAtLeastOneCheckedInput) {
						questionIsValid = false;
					}

					break;
				case 'with-text-input':
					var textInput = question.find('.js-text-input');

					if (textInput.val().length === 0) questionIsValid = false;

					break;
				case 'with-email-input':
					var emailInput = question.find('.js-email-input'),
					emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

					if (!emailInput.val().match(emailFormat)) questionIsValid = false;

					break;
				case 'with-phone-input':
					var phoneInput = question.find('.js-phone-input'),
					phoneIsValid = phoneInput.hasClass('valid');

					if (!phoneIsValid) questionIsValid = false;

					break;
				case 'with-textarea':
					var textareaInput = question.find('.js-textarea');

					if (textareaInput.val().length <= 20) questionIsValid = false;

					break;}


			return questionIsValid;
		}

		function getAnsweredQuestions() {
			var answeredQuestions = 0;

			surveyQuestionItem.each(function () {
				var question = $(this),
				questionIsValid = validateQuestion(question);

				if (questionIsValid) {
					answeredQuestions++;
				}
			});

			return answeredQuestions;
		}

		function setAnsweredQuestionsInfo() {
			var answeredQuestions = getAnsweredQuestions(),
			totalQuestions = surveyQuestionItem.length,
			percent = (answeredQuestions / totalQuestions * 100).toFixed(0);

			$('.js-answered-count').text(answeredQuestions);
			$('.js-completed-line').attr('data-completed', percent).css('width', percent + '%');

			if (answeredQuestions === totalQuestions) {
				surveySubmitBtn.addClass('with-pulsing');
			} else {
				surveySubmitBtn.removeClass('with-pulsing');
			}
		}

		function setFormFocus(question) {
			var typeOfQuestion = detectTypeOfQuestion(question);

			if (typeOfQuestion === 'with-text-input' || typeOfQuestion === 'with-email-input' || typeOfQuestion === 'with-phone-input' || typeOfQuestion === 'with-textarea') {
				question.find(formItems).focus();
			}
		}

		function goToNextQuestion() {
			nextQuestionBtn.on('click', function (e) {
				e.preventDefault();

				var currentQuestion = $(this).closest('.js-survey-question-item'),
				questionIsValid = validateQuestion(currentQuestion);

				if (questionIsValid) {
					currentQuestion.addClass('answered');
					currentQuestion.find('.js-error-text').removeClass('active');

					var nextQuestion = surveyQuestionItem.not('.answered').first();

					nextQuestion.addClass('active');
					scrollToElement(nextQuestion);
				} else {
					setQuestionIsNotValid(currentQuestion);
				}
			});
		}

		function clearErrorOnActive() {
			$('.js-checkbox-radio-input').on('change', function () {
				$(this).closest('.js-survey-question-item').find('.js-error-text').removeClass('active');
			});

			$(formItems).on('input', function () {
				$(this).closest('.js-survey-question-item').find('.js-error-text').removeClass('active');
			});
		}

		function updateAnsweredQuestionsInfo() {
			$('.js-checkbox-radio-input').on('change', function () {
				setAnsweredQuestionsInfo();
			});

			$(formItems).on('input', function () {
				setAnsweredQuestionsInfo();
			});
		}

		function showConfirmation() {
			var preloader = $('.js-preloader'),
			surveyBottomBar = $('.js-survey-bottom-bar'),
			starting = $('.js-starting'),
			survey = $('.js-survey'),
			confirmation = $('.js-confirmation');

			preloader.addClass('active');

			setTimeout(function () {
				surveyBottomBar.addClass('hide');
				starting.addClass('hide');
				survey.addClass('hide');
				confirmation.addClass('active');
			}, 2000);

			setTimeout(function () {
				preloader.removeClass('active');
			}, 4000);
		}

		function surveySubmit() {
			$('.js-survey-form').on('submit', function (e) {
				e.preventDefault();

				var allQuestions = $('.js-survey-question-item'),
				surveyIsValid = true;

				allQuestions.each(function () {
					var currentQuestion = $(this),
					questionIsValid = validateQuestion(currentQuestion);

					if (questionIsValid) {
						if (!currentQuestion.hasClass('answered')) {
							scrollToElement(currentQuestion);

							return false;
						}
					} else {
						setQuestionIsNotValid(currentQuestion);
						surveyIsValid = false;

						return false;
					}
				});

				if (surveyIsValid) {
					showConfirmation();
				}
			});
		}

		setTotalQuestionsCount();
		questionTitleScroll();
		setFormActiveOnBlur();
		goToNextQuestion();
		clearErrorOnActive();
		updateAnsweredQuestionsInfo();
		surveySubmit();
	}
});