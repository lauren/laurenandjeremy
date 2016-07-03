$(document).ready(function () {

    var playButton = $('[data-action="play"]'),
        pauseButton = $('[data-action="pause"]'),
        videoElement = $('[data-ui="video"]')[0];

    playButton.on('click', function () {
        videoElement.play();
        playButton.addClass('hidden');
        pauseButton.removeClass('hidden');
    });

    pauseButton.on('click', function () {
        videoElement.pause();
        playButton.removeClass('hidden');
        pauseButton.addClass('hidden');
    });

});