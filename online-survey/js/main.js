'use strict';

jQuery(function ($) {
	initViewportUnitsOnMobile();
	initSmoothAnchorLinks();
	initInputMask();
	initSurveyFunctionality();

	$(window).on('beforeunload', function () {
		$(window).scrollTop(0);
	});

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
				350).promise().done(function () {
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
		surveySubmitBtn = $('.js-survey-submit-btn'),
		formItems = '.js-text-input, .js-email-input, .js-phone-input, .js-textarea',
		formItemsExcludingPhoneInput = formItems.replace(', .js-phone-input', ''),
		scrollAnimationComplete = true;

		function scrollToElement(element) {
			var headerHeight = $('.js-header').length ? $('.js-header').outerHeight() : 0;

			if (scrollAnimationComplete && element.length) {
				scrollAnimationComplete = false;

				$('body, html').animate({
					scrollTop: element.offset().top - headerHeight },
				350).promise().done(function () {
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

			if (question.find('.js-checkbox-input').length) {
				typeOfQuestion = 'with-checkbox-input';
			} else if (question.find('.js-radio-input').length) {
				typeOfQuestion = 'with-radio-input';
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

		function validateQuestion(question) {
			var questionIsValid = false,
			typeOfQuestion = detectTypeOfQuestion(question);

			function validateCheckboxOrRadioQuestion(checkboxOrRadio) {
				var questionIsValid = false,
				hasAtLeastOneCheckedInput = false;

				checkboxOrRadio.each(function () {
					if ($(this).is(':checked')) {
						hasAtLeastOneCheckedInput = true;
					}
				});

				if (hasAtLeastOneCheckedInput) {
					questionIsValid = true;
				}

				return questionIsValid;
			}

			function validateTextInput(input) {
				var questionIsValid = false;

				if (input.val().length > 0) questionIsValid = true;

				return questionIsValid;
			}

			function validateEmailInput(input) {
				var questionIsValid = false,
				emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

				if (input.val().match(emailFormat)) questionIsValid = true;

				return questionIsValid;
			}

			function validatePhoneInput(input) {
				var questionIsValid = false;

				if (input.hasClass('valid')) questionIsValid = true;

				return questionIsValid;
			}

			function validateTextarea(textarea) {
				var questionIsValid = false;

				if (textarea.val().length > 20) questionIsValid = true;

				return questionIsValid;
			}

			switch (typeOfQuestion) {
				case 'with-checkbox-input':
					var checkboxInputs = question.find('.js-checkbox-input');

					questionIsValid = validateCheckboxOrRadioQuestion(checkboxInputs);

					break;
				case 'with-radio-input':
					var radioInputs = question.find('.js-radio-input');

					questionIsValid = validateCheckboxOrRadioQuestion(radioInputs);

					break;
				case 'with-text-input':
					var textInput = question.find('.js-text-input');

					questionIsValid = validateTextInput(textInput);

					break;
				case 'with-email-input':
					var emailInput = question.find('.js-email-input');

					questionIsValid = validateEmailInput(emailInput);

					break;
				case 'with-phone-input':
					var phoneInput = question.find('.js-phone-input');

					questionIsValid = validatePhoneInput(phoneInput);

					break;
				case 'with-textarea':
					var textarea = question.find('.js-textarea');

					questionIsValid = validateTextarea(textarea);

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

		function updateAnsweredQuestionsInfo() {
			$('.js-checkbox-input, .js-radio-input').on('change', function () {
				setAnsweredQuestionsInfo();
			});

			$(formItems).on('input', function () {
				setAnsweredQuestionsInfo();
			});
		}

		function goToNextQuestion(currentQuestion) {
			var currentQuestionIsValid = validateQuestion(currentQuestion);

			if (currentQuestionIsValid) {
				currentQuestion.addClass('answered');

				hideNextBtn(currentQuestion);

				var nextQuestion = currentQuestion.next();

				nextQuestion.addClass('active');
				scrollToElement(nextQuestion);
			}
		}

		function setOrRemoveValidStatus(question) {
			var questionIsValid = validateQuestion(question);

			if (questionIsValid) {
				question.addClass('valid');
				question.removeClass('not-valid');
			} else {
				question.removeClass('valid');
				question.addClass('not-valid');
			}
		}

		function showNextBtn(question) {
			question.find('.js-survey-next-question').removeClass('hide');
		}

		function hideNextBtn(question) {
			question.find('.js-survey-next-question').addClass('hide');
		}

		function setFocusetQuestion() {
			$('.js-checkbox-input, .js-radio-input').on('change', function (e) {
				var currentQuestion = $(this).closest('.js-survey-question-item');

				surveyQuestionItem.removeClass('focused');
				currentQuestion.addClass('focused');
			});

			$(formItems).on('focus', function (e) {
				var currentQuestion = $(e.currentTarget).closest('.js-survey-question-item');

				surveyQuestionItem.removeClass('focused');
				currentQuestion.addClass('focused');
			});
		}

		function formEvents() {
			$('.js-checkbox-input').on('change', function () {
				var question = $(this).closest('.js-survey-question-item');

				showNextBtn(question);
				setOrRemoveValidStatus(question);
				scrollToElement(question);
			});

			$('.js-radio-input').on('change', function () {
				var question = $(this).closest('.js-survey-question-item');

				setOrRemoveValidStatus(question);
				goToNextQuestion(question);
			});

			$(formItemsExcludingPhoneInput).on('input', function () {
				var question = $(this).closest('.js-survey-question-item');

				showNextBtn(question);
				setOrRemoveValidStatus(question);
			});

			$('.js-phone-input').on('input', function () {
				var question = $(this).closest('.js-survey-question-item');

				setOrRemoveValidStatus(question);
				goToNextQuestion(question);
			});
		}

		function nextButtonInit() {
			var button = $('.js-survey-go-to-next-question');

			button.on('click', function (e) {
				e.preventDefault();

				var currentQuestion = $(this).closest('.js-survey-question-item');

				goToNextQuestion(currentQuestion);
			});
		}

		function enterKeyPressListener() {
			$(formItems).keypress(function (e) {
				var key = e.which,
				currentQuestion = $(this).closest('.js-survey-question-item');

				if (key == 13) {
					goToNextQuestion(currentQuestion);
					setOrRemoveValidStatus(currentQuestion);

					return false;
				}
			});

			$('.js-checkbox-input').keypress(function (e) {
				var key = e.which,
				currentQuestion = $(this).closest('.js-survey-question-item');

				if (key == 13) {
					goToNextQuestion(currentQuestion);
					setOrRemoveValidStatus(currentQuestion);

					return false;
				}
			});
		}

		function finishSurvey() {
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

				$(window).scrollTop(0);
			}, 2000);

			setTimeout(function () {
				preloader.removeClass('active');
			}, 4000);
		}

		function surveySubmit() {
			$('.js-survey-form').on('submit', function (e) {
				e.preventDefault();

				var surveyIsValid = false;

				surveyQuestionItem.each(function () {
					var currentQuestion = $(this),
					questionIsValid = currentQuestion.is('.valid');

					if (questionIsValid) {
						surveyIsValid = true;
					} else {
						surveyIsValid = false;
					}
				});

				if (surveyIsValid) {
					finishSurvey();
				} else {
					surveyQuestionItem.each(function () {
						var currentQuestion = $(this),
						questionIsValidAndAnswered = currentQuestion.is('.answered.valid');

						if (!questionIsValidAndAnswered) {
							setOrRemoveValidStatus(currentQuestion);
							scrollToElement(currentQuestion);

							return false;
						}
					});
				}
			});
		}

		setTotalQuestionsCount();
		questionTitleScroll();
		setFormActiveOnBlur();
		updateAnsweredQuestionsInfo();
		formEvents();
		nextButtonInit();
		setFocusetQuestion();
		enterKeyPressListener();
		surveySubmit();
	}
});