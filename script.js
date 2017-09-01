$(document).ready(function () {

    var CONSTANTS = {
        NAV_PADDING: 10,
        PHRASES: [
            "convenience = MAX_INT",
            "romance = MAX_INT",
            "bargains = MAX_INT",
            "logistics = MAX_INT",
            "that's so convenient",
            "the most wedding",
            "it makes total sense",
            "it makes no sense",
            "BYO barf bag"
        ],
        // January is month 0, so September is 8. SIGH.
        WEDDING_DATE: new Date(2017, 8, 9),
        WEDDING_END_DATE: new Date(2017, 8, 9)
    };

    // wedding is at 4pm, 1600 hours
    CONSTANTS.WEDDING_DATE.setHours(16);
    // ends at 9:30pm, 2130
    CONSTANTS.WEDDING_END_DATE.setHours(21);
    CONSTANTS.WEDDING_END_DATE.setMinutes(30);

    var footerElement = $('[data-ui="footer-text"]'),
        countDownElement = $('[data-ui="countdown"]'),
        navLinks = $('[data-ui="nav-item"]'),
        navElement = $('[data-ui="nav"]'),
        topOfNav = navElement[0].offsetTop,
        navHeight = navElement[0].offsetHeight,
        windowElement = $(window),
        countdownInterval;

    var changeFooterText = function () {
        var phrasesIndex = Math.floor(Math.random() * CONSTANTS.PHRASES.length);
        footerElement.html(CONSTANTS.PHRASES[phrasesIndex]);
    };

    var updateCountdown = function () {
        var now = (new Date()).getTime(),
            weddingTimestamp = CONSTANTS.WEDDING_DATE.getTime(),
            weddingEndTimestamp = CONSTANTS.WEDDING_END_DATE.getTime(),
            millisecondsTillWedding = weddingTimestamp - now,
            countdownText = "We're already married!",
            secondsTillWedding,
            minutesTillWedding,
            hoursTillWedding,
            daysTillWedding,
            hoursLeft,
            minutesLeft,
            secondsLeft;

        if (millisecondsTillWedding > 0) {
            secondsTillWedding = millisecondsTillWedding / 1000,
            minutesTillWedding = secondsTillWedding / 60,
            hoursTillWedding = minutesTillWedding / 60,
            daysTillWedding = Math.floor(hoursTillWedding / 24),
            hoursLeft = Math.floor(hoursTillWedding - (daysTillWedding * 24)),
            minutesLeft = Math.floor(minutesTillWedding - (daysTillWedding * 24 * 60) - (hoursLeft * 60)),
            secondsLeft = Math.floor(secondsTillWedding - (daysTillWedding * 24 * 60 * 60) - (hoursLeft * 60 * 60) - (minutesLeft * 60)),
            countdownText = daysTillWedding;

            countdownText += daysTillWedding === 1 ? " day, " : " days, ";
            countdownText += hoursLeft;
            countdownText += hoursLeft === 1 ? " hours, " : " hours, ";
            countdownText += minutesLeft;
            countdownText += minutesLeft === 1 ? " minute, " : " minutes, ";
            countdownText += secondsLeft;
            countdownText += secondsLeft === 1 ? " second" : " seconds";
        }

        if ((weddingTimestamp < now) && (weddingEndTimestamp > now)) {
            countdownText = "IT'S HAPPENING!!!";
        }

        countDownElement.html(countdownText);
    };

    var resetNavClass = function () {
        if (windowElement.scrollTop() >= topOfNav) {
            navElement.addClass('nav-stuck');
        } else {
            navElement.removeClass('nav-stuck');
        }
    };

    windowElement.on('scroll', function () {
        resetNavClass();
    });

    navLinks.on('click', function (event) {
        var item = event.target.dataset.navItem,
            targetHeaderElement = $('[data-header-item="' + item + '"]')[0],
            targetY = targetHeaderElement.offsetTop - targetHeaderElement.offsetHeight - navHeight - CONSTANTS.NAV_PADDING;

        $('html, body').animate({
          scrollTop: targetY
        }, 1000);
    });

    changeFooterText();
    window.setInterval(function () {
        changeFooterText();
    }, 5000);

    updateCountdown();
    var countdownInterval = window.setInterval(function () {
        updateCountdown();
        if ((new Date()).getTime() > CONSTANTS.WEDDING_END_DATE.getTime()) {
            clearInterval(countdownInterval);
        }
    }, 1000);

});