var buttonColors = ["green" , "red", "yellow" ,  "blue"];
var gamePattern =[];
var userClickedPattern = [];
var level = -1;
var firstTime = true;

function resetGame()
{
    gamePattern =[];
    level=-1;
    firstTime = true;
}

function playSound(id)
{
    var audio=new Audio("sounds/"+id+".mp3");
    audio.play();
}
function nextSequence()
{
    level++;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    var randomNum = Math.floor(Math.random()*4);
    console.log(randomNum);
    var block = buttonColors[randomNum];
    var object = document.querySelector("#"+block);
    
    $("#"+block).fadeOut(100).fadeIn(100);
    animatePress(block);
    playSound(block);
    gamePattern.push(block);
}

$(".btn").click(function(){
    var obj = $(this).attr("id");
    userClickedPattern.push(obj);
    $(this).fadeOut(100).fadeIn(100);
    animatePress(obj);
    playSound(obj);
    compare(userClickedPattern.length-1);
});

function animatePress(currentColor)
{
    $("#"+currentColor).click(function() {
       $(this).addClass("pressed"); 
    });
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function compare(index)
{
    if(gamePattern[index] === userClickedPattern[index])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        resetGame();
    }
}

$(document).keydown(function(){
    if(firstTime)
    {
        nextSequence();
        firstTime=false;
    }
});
