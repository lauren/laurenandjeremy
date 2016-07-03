$(document).ready(function () {

    var SPACE_KEY_CODE = 32;

    var videoButton = $('[data-action="toggle-video"]'),
        icon = videoButton.find('i'),
        videoElement = $('[data-ui="video"]')[0];

    var toggleVideoStatus = function () {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
        icon.toggleClass('fa-pause');
        icon.toggleClass('fa-play');
    };

    videoButton.on('click', function () {
        toggleVideoStatus();
    });

    $(window).on('keypress', function (event) {
        if (event.charCode === SPACE_KEY_CODE) {
            toggleVideoStatus();
        }
    });

});