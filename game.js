var start = false;
var gamepattern = [];
userClickedPattern = [];
var level = 0;

var buttonColor = ["red", "blue", "green", "yellow"];



$(document).keypress(function(e) {
    if (!start) {
        nextSquence();
        start = true;

    }
});
$(".btn").click(function(e) {
    var id = e.target.id
    animatePress(id);
    playSong(id)
    userClickedPattern.push(id);
    checkAnswer(userClickedPattern.length - 1);

});

function nextSquence() {
    var randomNumber = Math.floor(Math.random() * 4);
    gamepattern.push(buttonColor[randomNumber]);
    animatePress(buttonColor[randomNumber]);
    this.userClickedPattern = [];

    playSong(buttonColor[randomNumber]);
    level++;
    $("#level-title").text("level " + level);
}

function playSong(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(className) {
    $("#" + className).addClass('pressed');
    setTimeout(function() {
        $("#" + className).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentIndex) {
    if (gamepattern[currentIndex] === userClickedPattern[currentIndex]) {
        if (gamepattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSquence();
            }, 1000);
        }
    } else {

        playSong("wrong");
        $("body").addClass('game-over');
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamepattern = [];
    start = false
}