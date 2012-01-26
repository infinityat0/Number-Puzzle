/******************************************************************************
   Document   : Puzzle ;
   Created on : Oct 12, 2009, 6:40:15 PM ;
   Author     : Sunny_Gujjaru ;
 ******************************************************************************/
var playerName = "" ;
var isGameEnded ;
var boardLength = 4 ; 
/******************************************************************************/
$(document).ready(function(){
            /* On hover, fades out and fades in. */
            $("td.cell").hover(function(){$(this).fadeOut(100);$(this).fadeIn(300);});

            $("td.cell").click(move($(this)));

            $("#start").click(function(){startGame()});

            $("#end").click(function(){endGame()});
         });
/******************************************************************************/
function startGame()
{
    isGameEnded     = false ;
    if(playerName == ""){
        playerName      = prompt ("What's your name ? ","Cris Angel");
        if(playerName == null){
            playerName = "Cris Angel" ;
        }
        $("#message").text(" Welcome, "+playerName);
    }
    /* Place the board at random for both computer and player */
    placeBoard();
}
/******************************************************************************/
function endGame()
{
    $("#message").html(" Gave up??? It's ok "+playerName+".<br/> Its' not everyones cup of cake.");
    isGameEnded = true ;
}
/******************************************************************************/
/**
 * Places the board
 */
function placeBoard() {
    var number ;
    /* Go from 0 -15 with random numbers 0 -15. No repitetions. */
    for(var i = 0 ; i < boardLength ; i++) {
        for(var j = 0 ; j < boardLength ; j++){
            $("#"+i+j).text(getRandomNumber()) ;
        }
    }
}
/******************************************************************************/
function getRandomNumber()
{
    /* Even 99.99 on floor will result in 99. Max number here would be 15 */
    return Math.floor(Math.random()*boardLength*boardLength) ;
}
/******************************************************************************/
function move(element){

}
/******************************************************************************/