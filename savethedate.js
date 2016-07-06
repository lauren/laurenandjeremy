$(document).ready(function () {

    var CONSTANTS = {
        SPACE_KEY_CODE: 32,
        PHRASES: [
            "convenience = MAX_INT",
            "romance = MAX_INT",
            "bargains = MAX_INT",
            "logistics = MAX_INT",
            "that's so convenient",
            "the most wedding",
            "it makes total sense",
            "it makes no sense"
        ]
    };

    var videoButton = $('[data-action="toggle-video"]'),
        icon = videoButton.find('i'),
        videoElement = $('[data-ui="video"]')[0],
        footerElement = $('[data-ui="footer-text"');

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

    videoButton.on('click', function () {
        toggleVideoStatus();
    });

    $(window).on('keypress', function (event) {
        if (event.charCode === CONSTANTS.SPACE_KEY_CODE) {
            toggleVideoStatus();
        }
    });

    changeFooterText();
    window.setInterval(function () {
        changeFooterText();
    }, 5000);

});