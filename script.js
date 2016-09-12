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
        MONTH_DAYS: {
            0:  31, // Jan
            1:  28, // Feb
            2:  31, // March
            3:  30, // April
            4:  31, // May
            5:  30, // June
            6:  31, // July
            7:  31, // August
            8:  30, // September
            9:  31, // October
            10: 30, // November
            11: 31 // December
        }
    };

    // wedding is at 4pm, 1600 hours
    CONSTANTS.WEDDING_DATE.setHours(16);

    var videoButton = $('[data-action="toggle-video"]'),
        icon = videoButton.find('i'),
        videoElement = $('[data-ui="video"]')[0],
        footerElement = $('[data-ui="footer-text"]'),
        countDownElement = $('[data-ui="countdown"]'),
        navLinks = $('[data-ui="nav-item"]'),
        navElement = $('[data-ui="nav"]'),
        topOfNav = navElement[0].offsetTop,
        navHeight = navElement[0].offsetHeight,
        windowElement = $(window);

    var toggleVideoStatus = function () {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
        icon.toggleClass('fa-pause');
        icon.toggleClass('fa-play');
    };

    var changeFooterText = function () {
        var phrasesIndex = Math.floor(Math.random() * CONSTANTS.PHRASES.length);
        footerElement.html(CONSTANTS.PHRASES[phrasesIndex]);
    };

    var updateCountdown = function () {
        var now = new Date(),
            countdownText = '',
            secondsTill = 60 - now.getSeconds(),
            minutesTill = 60 - now.getMinutes(),
            currentHourRoundedUp = now.getHours() + 1,
            hoursTill = (currentHourRoundedUp > CONSTANTS.WEDDING_DATE.getHours())
                ? ((24 + CONSTANTS.WEDDING_DATE.getHours()) - currentHourRoundedUp)
                : CONSTANTS.WEDDING_DATE.getHours() - currentHourRoundedUp,
            currentDayRoundedUp = now.getDate() + 1,
            currentMonth = now.getMonth(),
            daysInCurrentMonth = CONSTANTS.MONTH_DAYS[currentMonth],
            daysTill = (currentDayRoundedUp > CONSTANTS.WEDDING_DATE.getDate())
                ? ((daysInCurrentMonth - currentDayRoundedUp) + CONSTANTS.WEDDING_DATE.getDate())
                : CONSTANTS.WEDDING_DATE.getDate() - now.getDate(),
            currentMonthRoundedUp = currentMonth + 1,
            monthsTill = currentMonthRoundedUp > CONSTANTS.WEDDING_DATE.getMonth()
                ? ((12 + CONSTANTS.WEDDING_DATE.getMonth()) - currentMonthRoundedUp)
                : CONSTANTS.WEDDING_DATE.getMonth() - currentMonthRoundedUp;

        countdownText += monthsTill;
        countdownText += monthsTill === 1 ? " month, " : " months, ";
        countdownText += daysTill;
        countdownText += daysTill === 1 ? " day, " : " days, ";
        countdownText += hoursTill;
        countdownText += hoursTill === 1 ? " hours, " : " hours, ";
        countdownText += minutesTill;
        countdownText += minutesTill === 1 ? " minute, " : " minutes, ";
        countdownText += secondsTill;
        countdownText += secondsTill === 1 ? " second" : " seconds";

        countDownElement.html(countdownText);
    };

    var resetNavClass = function () {
        if (windowElement.scrollTop() >= topOfNav) {
            navElement.addClass('nav-stuck');
        } else {
            navElement.removeClass('nav-stuck');
        }
    };

    videoButton.on('click', function () {
        toggleVideoStatus();
    });

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
    window.setInterval(function () {
        updateCountdown();
    }, 1000);

    console.log("Yes, Lauren really did the month math.");

});