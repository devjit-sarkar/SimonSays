var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var level = 0;
// var safeguard = 0;
function newSequence(){
    userClickedPattern = [];
    $("h1").text("Level: "+level);
    var randomNumber =  Math.floor((Math.random()*4));
    //console.log(randomNumber);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("."+randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);
    level++;
} 

// $(randomChosenColor).fadeOut().fadeIn();
// var audio = new Audio("./"+randomChosenColor+".mp3");
// audio.play()
$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor)
    if(userClickedPattern.length == level)
    {
        checkAnswer(userClickedPattern.length);
    }
})

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play()
}
function animatePress(currentColor){
    //console.log(typeof(currentColor));
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")
    },100);
}

$(document).on("keypress", function(){
    level = 0;
    newSequence();
});

// if(safeguard == 0)
// {
//     $(document).on("keypress", newSequence);
//     safeguard = -1;
//     console.log(safeguard);
// }

// $(".btn").on("click",function(){
//     animatePress("h1");
// })
function checkAnswer(index){
    console.log(index);
    for(var i = 0; i<index; i++)
    {
        if(userClickedPattern[i] != gamePattern[i])
        {
            console.log(userClickedPattern[i],gamePattern[i]);
            console.log("incorrect");
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            startOver();
            return;
        }
    }
    console.log(userClickedPattern[i],gamePattern[i]);
    console.log("correct");
    setTimeout(newSequence, 1000);
    
}
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    // safeguard = 0;
}