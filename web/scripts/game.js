/******************************************************************************/
var playerName ;
var statusMessage ;

var hitOnPlayer     = false;
var destroyedPlayer = true ;
var isRandom        = true ;
var gotOrder        = false;
var proximitiy        = [ [-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1] ] ;
var order           = [] ;
var proximityIndex  = 1 ;

var isPlayersTurn   = false;
var isGameEnded     = true ;
var hitColor        = "#FFCD19" ;
var missColor       = "#999999" ;
var normalColor     = "#E3E3E3" ;
var friendColor     = "#99B3CC" ;
/******************************************************************************/
var board1 = [  [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ]
             ];
var board2 = [  [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1 ]
             ];
/******************************************************************************/
var AircraftCarrier1= { name : "Aircraft Carrier", width : 5, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var Bomber1         = { name : "Bomber", width : 4, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var PatrolBoat1     = { name : "PatrolBoat", width : 2, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var Submarine1      = { name : "Submarine", width : 3, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var Destroyer1      = { name : "Destroyer", width : 3, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var vessels1 = [ AircraftCarrier1, Bomber1, PatrolBoat1, Submarine1, Destroyer1 ];

var AircraftCarrier2= { name : "Aircraft Carrier", width : 5, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var Bomber2         = { name : "Bomber", width : 4, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var PatrolBoat2     = { name : "PatrolBoat", width : 2, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var Submarine2      = { name : "Submarine", width : 3, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var Destroyer2      = { name : "Destroyer", width : 3, x1 : -1, x2: -1, y1: - 1, y2: -1 } ;
var vessels2 = [ AircraftCarrier2, Bomber2, PatrolBoat2, Submarine2, Destroyer2 ];
/******************************************************************************/
function getGrid(id)
{
    var grid = "<table cellpadding=\"1\" cellspacing=\"1\" id = \"table\""+
                                    id+" class = \"table\">";
    for(var i = 0 ; i < 10 ; i++)
    {
        grid = grid + "<tr>" ;
        for(var j = 0 ; j < 10 ; j++)
        {
            grid = grid +"<td id = box"+id+i+j+" class = \"box\" "
                            + "onClick = clicked("+i+","+j+","+id+")> </td>"
        }
        grid = grid + "</tr>" ;
    }
    grid = grid+ "</table>" ;
    return grid;
}
/******************************************************************************/
function Draw()
{
    // alert("here.. ");
    document.getElementById('grid1').innerHTML = getGrid(1) ;
    document.getElementById('grid2').innerHTML = getGrid(2) ;
}
/******************************************************************************/
/**
*
*
* Function to start the game.
*/
function startGame()
{
    // alert("The last straw ");

    isGameEnded     = false ;
    playerName      = prompt ("What's your name ? ","Paul Tibbets");
    statusMessage   = "Welcome, "+playerName+"!" ;
    updateStatusMessage(statusMessage, 1) ;
    document.getElementById("name1").innerHTML = playerName+"'s Caption" ;
    /* Empty the board contents */
    emptyBoard();

    /* Place the board at random for both computer and player */
    placeBoard();

    statusMessage   = "Hit me with your best shot, "+playerName;
    updateStatusMessage(statusMessage, 2) ;

}
/******************************************************************************/
function emptyBoard()
{
    var boxID ;
    for(var k = 0 ; k < 10 ; k++)
    {
        for(var l = 0 ; l < 10 ; l++)
        {
            board2[k][l] = -1 ;
            boxID = "box"+"1"+k+""+l ;
            document.getElementById(boxID).style.backgroundColor = normalColor ;
            document.getElementById(boxID).innerHTML = "";
            boxID = "box"+"2"+k+""+l ;
            document.getElementById(boxID).style.backgroundColor = normalColor ;
            document.getElementById(boxID).innerHTML = "";
            board1[k][l] = -1 ;
        }
    }
}
/******************************************************************************/
function endGame()
{
    statusMessage   = "You lost, "+playerName;
    updateStatusMessage(statusMessage, 2) ;
    for(var i = 0 ; i < 9 ; i++)
    {
        for(var j = 0 ; j < 9 ; j++)
        {
            
        }
    }
}
/******************************************************************************/
function placeBoard()
{
    var i ;
    // alert("placing started");
    for(i = 0 ; i < 5 ; i++){
        
        vessels1[i] = placeShip(vessels1[i], board1);
        drawShip(vessels1[i]);
        /* alert("painting "+vessels1[i].name) */
    }
    for(i = 0 ; i < 5 ; i++){
        vessels2[i] = placeShip(vessels2[i], board2);
        /* alert("painting "+vessels2[i].name) */
    }
    /*
    for(i = 0 ; i < 9 ; i++)
    {
        for(var j = 0 ; j < 9 ; j++)
        {
            if(board1[i][j] == 1)
            {
                var boxID = "box1"+i+""+j ;
                // Update the background color of the box
                document.getElementById(boxID).style.backgroundColor = friendColor ;
                document.getElementById(boxID).innerHTML= "<img src = 'images/centerH.png' />";
            }
        }
    }*/
    // alert("placing done");
}

/**
 * This is for drawing the ship
 */
function drawShip(ship) {
    // name : "Aircraft Carrier", width : 5, x1 : -1, x2: -1, y1: - 1, y2: -1
    var first, center, last ;
    var boxID = "box1";
    if(ship.x1 == ship.x2)
    {
        // Ship palcement is horizontal
        first = "images/left.png" ;
        last  = "images/right.png" ;
        center= "images/centerH.png" ;
        document.getElementById(boxID+ship.x1+ship.y1).style.backgroundColor = friendColor ;
        document.getElementById(boxID+ship.x1+ship.y1).innerHTML= "<img src = '"+first+"' class = 'pLeft' />";
        for(var j = (ship.y1+1) ; j < ship.y2 ; j++ )
        {
            document.getElementById(boxID+ship.x1+j).style.backgroundColor = friendColor ;
            document.getElementById(boxID+ship.x1+j).innerHTML= "<img src = '"+center+"' />";
        }
        document.getElementById(boxID+ship.x1+ship.y2).style.backgroundColor = friendColor ;
        document.getElementById(boxID+ship.x1+ship.y2).innerHTML= "<img src = '"+last+"' />";
    }
    else
    {
        first = "images/top.png" ;
        last  = "images/bottom.png" ;
        center= "images/centerV.png" ;
        document.getElementById(boxID+ship.x1+ship.y1).style.backgroundColor = friendColor ;
        document.getElementById(boxID+ship.x1+ship.y1).innerHTML= "<img src = '"+first+"' />";
        for(j = (ship.x1+1) ; j < ship.x2 ; j++ )
        {
            document.getElementById(boxID+j+ship.y1).style.backgroundColor = friendColor ;
            document.getElementById(boxID+j+ship.y1).innerHTML= "<img src = '"+center+"' />";
        }
        document.getElementById(boxID+ship.x2+ship.y1).style.backgroundColor = friendColor ;
        document.getElementById(boxID+ship.x2+ship.y1).innerHTML= "<img src = '"+last+"' />";
    }
   //  alert("Placed "+ship.name);
}
/**
 * This function places the ship. This is a dangerous method since we use recursion.
 * Faulty coding might lead to infinite recursion
 */
function placeShip(ship, board)
{    
    var rNum = getRandomNumber();
    var rX   = Math.floor(rNum/10) ;
    var rY   = rNum%10 ;
    var dir  = rNum%2  ;  // If rNum is even => horizontal else vertical.
    /*Get the inclusive final co-ordinate .. not exclusive.*/
    var rX1  = (dir==0)? (rX+ship.width -1) : (rX) ;
    var rY1  = (dir==1)? (rY+ship.width -1) : (rY) ;
    var retry= false;
    var i, j ;
    /* If ships new positions cross boudaries */
    if((dir == 0 && (ship.width + rX) > 9)||(dir == 1 && (ship.width + rY) > 9))
    {
        // alert("peice goes out of arena ");
        retry = true ;
    }
    /* If ship overlaps with a present ship.*/
    else
    {
        for(i = rX ; i <= rX1 ; i++)
        {
            for(j = rY ; j <= rY1 ; j++)
            {
                // alert("peice overlaps with another ");
                retry = (board[i][j]==1)? true : false ;
            }
        }
    }
    if(retry)
    {
        // alert("going recursion ");
        /* Go recursively until you find a right place */
        placeShip(ship, board);
    }
    else
    {
        // alert("peicing the board");
        for(i = rX ; i <= rX1 ; i++)
        {
            for(j = rY ; j <= rY1 ; j++)
            {
                board[i][j] = 1 ;
            }
        }
        ship.x1 = rX ; ship.y1 = rY ; ship.x2 = rX1 ; ship.y2 = rY1 ;
        // alert("placed "+ship.name+" at x1 = "+rX+" ; y1 = "+rY+" ; x2 = "+
        //                         rX1+" ; y2 = "+rY1+" ; width = "+ship.width );
    }
    return ship ;
}
/******************************************************************************/
/**
* This function gets random numbers from 0-limit.
*/
function getRandomNumber1(limit)
{
    var randomNumber = Math.floor(Math.random()*10) ;
    if(randomNumber == 0 || randomNumber > limit)
    {
        randomNumber = getRandomNumber1(limit);
    }
    return randomNumber ;
}
/******************************************************************************/
/**
 * Function returns random number form 0 - 99
 */
function getRandomNumber()
{
    /* Even 99.99 on floor will result in 99 */
    return Math.floor((Math.random()*100)) ;
}
/******************************************************************************/
/**
 * Checks if the vessel has sunk
 * 
 */
function checkIfVesselSunk(x,y,isPlayersTurn) {

    // alert("checkIfVesselSunk");
    var board = isPlayersTurn? board2 : board1 ;

    var ship = getTargetVessel(x, y, isPlayersTurn) ;
    // alert("checking vessel | vessel is "+ship.name);
    var count = 0 ;
    if(ship)
    {
        for(var i = ship.x1 ; i <= ship.x2 ; i++)
        {
            for(var j = ship.y1 ; j <= ship.y2 ; j++)
            {
                if(board[i][j] ==0)
                {
                    count++ ;
                }
            }
        }
        return (count==ship.width) ? ship.name : false ;
    }
    return false;
}
/******************************************************************************/
/**
 * This gets the vessel in which the bomb was dropped.
 */
function getTargetVessel(x, y, isPlayersTurn) {
    /*Is players turn then check enemies vessels*/
    var vessels = isPlayersTurn ? vessels2 : vessels1 ;
    var ship ;
    for(var i = 0 ; i < vessels.length ; i++)
    {
        ship = vessels[i];
        if(x >=  ship.x1 && x <= ship.x2 && y >= ship.y1 && y <= ship.y2)
        {
            return ship ;
        }
    }
    /*I dont come here ever... */
    return false;
}
/******************************************************************************/
/**
 * This is the main computers game. Logic decides computers intelligence.
 */
function dodgeEnemies()
{
    /* Change the players turn */
    isPlayersTurn = false ;

    /* If its random go do random hit */
    if(isRandom)
    {
        var rNum = getRandomNumber();
        var x   = Math.floor(rNum/10) ;
        var y   = rNum%10 ;
        if(checkIfMessileDropped(x,y,isPlayersTurn))
        {
            /* if messile was already dropped there then i'll try again */
            dodgeEnemies();
        }
        else
        {
            var isHit     = checkHitOrMiss(x,y,isPlayersTurn) ;
            /*I'll now check if its a hit.. If miss then go random again. */
            if(isHit)
            {
                // Drop the bomb since it is a HIT. 
                // This will only be a first hit.. so never vessel sinks
                board1[x][y] = 0 ;

                // Next time dont go on random shots.
                isRandom = false ;

                // Create proximity for the next attack
                establishProximity(x,y) ;
                
                /* Put this as the base of order*/
                order           = [[x,y]] ;

                /* Safety purpose got order is false */
                gotOrder        = false; 

                // Say fire in the hole
                statusMessage   = "Fire in the hole." ;
                updateStatusMessage(statusMessage, 2) ;
            }
            /* I missed it. */
            else
            {
                // Its a miss.. still update..and go merry on random ..
                board1[x][y] = 0 ;
                // alert("Its a miss") ;
                // emptyStatusMessage(2) ;
            }
            /* Update the arena. If hit, then red else cross. */
            updateArena(isHit, isPlayersTurn, x, y );
        }
    }
    else
    {
        if(gotOrder)
        {
            var orderLastIndex = order.length - 1;
            var dx = order[orderLastIndex][0] - order[orderLastIndex -1 ][0] ;
            var dy = order[orderLastIndex][1] - order[orderLastIndex -1 ][1] ;
            
            if(dx == 0 && dy == 0 )
            {
                /* Coding flaw .. */
                isRandom = true;

                dodgeEnemies();
                return ; 
            }
            /* xy is the next "predicted" target. If xy doesn't exist in board?*/
            x = order[orderLastIndex][0] + dx;
            y = order[orderLastIndex][1] + dy;
            if(x<0 || x>9 || y<0 || y>9 || checkIfMessileDropped(x,y,isPlayersTurn))
            {
                /* The order point is invalid. Increase the proximity and run again */
                proximityIndex++ ;

                /* Now, since the predicted is not present/already hit then
                 * declare order is lost. and revert back the order to base element. */
                gotOrder = false ;
                
                /* Order has now the base element only. */
                order = [order[0]];
                
                /* Next point comes in recursion */
                dodgeEnemies();
            }
            /* Prediction point is un touched */
            else
            {
                /* Check if the prediction hits */
                isHit     = checkHitOrMiss(x,y,isPlayersTurn) ;
                if(isHit)
                {
                    /* hit mein bhi update the board */
                    board1[x][y] = 0 ;
                    
                    statusMessage = "Fire in the hole";
                    updateStatusMessage(statusMessage, 2) ;
                    
                    var sunk = checkIfVesselSunk(x,y,isPlayersTurn) ;
                    if(sunk)
                    {
                        statusMessage = "Enemy desroyed our "+sunk;
                        updateStatusMessage(statusMessage, 1) ;
                        
                        /* Vessel is sunk. Our prediction completed. Go back to random mode. */
                        isRandom = true ;                        
                    }
                    else
                    {
                        /* our prediction resulted in a hit but didn't sink up the ship.
                         * So, add it to the successfull order lists */
                        order.push([x,y]);
                    }
                }
                /* Missed the prediction shot. prediction is wrong.*/
                else
                {
                    /* Miss mein bhi update the board */
                    board1[x][y] = 0 ;

                    /* Next element of proximity array will be my next target. */
                    proximityIndex++ ;

                    /* I haven't found order of ship yet. */
                    gotOrder = false ;

                    /* Order has now the base element only. */
                    order = [order[0]];
                }
                /* Hit ho ya miss.. update the arena.. */
                updateArena(isHit, isPlayersTurn, x, y );
            }
        }
        else
        {
            x = proximitiy[proximityIndex][0] ;
            y = proximitiy[proximityIndex][1] ;

            /* Check if the point is outside the boundaries */
            /* Or by some random shot we already touched this [x,y] */
            if(x<0 || x>9 || y<0 || y>9 || checkIfMessileDropped(x,y,isPlayersTurn))
            {
                /* The proximity point is invalid. Move on to next point. */
                proximityIndex++ ;
                
                /* Next point comes in recursion */
                dodgeEnemies();
            }
            isHit     = checkHitOrMiss(x,y,isPlayersTurn) ;
            if(isHit)
            {
                
                statusMessage = "Fire in the hole";
                updateStatusMessage(statusMessage, 2) ;

                board1[x][y] = 0 ;
                sunk = checkIfVesselSunk(x,y,isPlayersTurn) ;                
                if(sunk)
                {
                    // alert("Vessel destroyed ") ;
                    /* Vessel has sunk */
                    statusMessage = "Enemy desroyed our "+sunk;
                    updateStatusMessage(statusMessage, 1) ;

                    /* check if game over. */
                    if(checkIfGameOver(isPlayersTurn))
                    {
                        statusMessage   = "I win.. " ;
                        isGameEnded = true ;
                        updateStatusMessage(statusMessage, 2) ;
                        return ; 
                    }
                    else
                    {
                        /* Vessel sunk but game is not over. So, go back to random mode. */
                        isRandom = true ;
                    }
                }
                /*Vessel is not sunk and it's a hit => I've got the order. */
                else
                {
                    /* Hit pe hit.. => order is known. */
                    gotOrder = true ;
                    
                    /* Order will now have the order of successfull hits. */
                    order.push(proximitiy[proximityIndex]);
                }       
            }
            /* Missed from the proximity shot. => go for the next shot of proximity*/
            else
            {
                /* Miss mein bhi update the board */
                board1[x][y] = 0 ;
                
                /* Next element of proximity array will be my next target. */
                proximityIndex++ ;

                /* I haven't found order of ship yet. */
                gotOrder = false ;
            }
            
            /* Hit ho ya miss.. update the arena.. */            
            updateArena(isHit, isPlayersTurn, x, y ); 
        }
        /**/
    }
}
/**
 *
 * This creates the proximity for the next attack
 */
function establishProximity(x,y)
{
    proximitiy[0] = [x,y];
    proximitiy[1] = [x+1,y];
    proximitiy[2] = [x-1,y];
    proximitiy[3] = [x,y+1];
    proximitiy[4] = [x,y-1];
    
    /* When proximity is established, set the index too. */
    proximityIndex = 1 ; 
}
/******************************************************************************/
/**
 * This function gets the co-ordinates of the target where missile is launched.
 *
 */
function clicked(x,y, boxID)
{
    // alert("checking ");
    isPlayersTurn = true ;
    if(isGameEnded)
    {
        statusMessage   = "War is over. Save your bullets for the next war!" ;
        updateStatusMessage(statusMessage, 2) ;
        return true;
    }
    if(boxID == 1)
    {
        statusMessage   = "This is our zone. Aim for the enemy waters. " ;
        updateStatusMessage(statusMessage, 1) ;
        return true;
    }
    if(checkIfMessileDropped(x,y,isPlayersTurn))
    {
        // alert("Another missile is already there");
        statusMessage   = "Area is already hit. Let's bomb another place." ;
        updateStatusMessage(statusMessage, 1) ;
        return true;
    }
    else
    {
        var isHit     = checkHitOrMiss(x,y,isPlayersTurn) ;
        if(isHit)
        {
            // Drop the bomb since it is a HIT and check if this bomb sinks the vessel
            board2[x][y] = 0 ;

            statusMessage   = "Fire in the hole." ;
            updateStatusMessage(statusMessage, 1) ;
            var sunk = checkIfVesselSunk(x,y,isPlayersTurn) ;
            // alert("Sunk is "+sunk);
            if(sunk)
            {
                // alert("Vessel destroyed ") ;
                /* Vessel has sunk */
                statusMessage = "You desroyed my "+sunk;
                updateStatusMessage(statusMessage, 2) ;

                /* check if game over. */
                if(checkIfGameOver(isPlayersTurn))
                {
                    statusMessage   = "We won.. " ;
                    isGameEnded = true ;
                    updateStatusMessage(statusMessage, 1) ;
                }
            }
        }
        else
        {
            /* Its a miss. Update that missile is dropped[0] at (x,y). */
            board2[x][y] = 0 ;

            // alert("Its a miss") ;
            emptyStatusMessage(1) ;
            emptyStatusMessage(2) ;
        }
        /* Update the arena. If hit, then red else cross. */
        updateArena(isHit, isPlayersTurn, x, y );

        /* Now, its turn of computer to play.. this is more complex than it appears. */
        dodgeEnemies();
        return true;
    }
}
/******************************************************************************/
/**
 * Check if the missileis dropped already.
 */
function checkIfMessileDropped(x,y,isPlayersTurn) {

    var board = isPlayersTurn? board2 : board1 ;

    /* board[x][y] has 0 then missile is dropped already */
    // alert(x+","+y+"["+board[x][y]+"]");
    return (board[x][y] == 0)? true: false ;
}
/******************************************************************************/
/**
 * Checks if the missile hit the target or missed.
 * Works for both computer and player.
 */
function checkHitOrMiss(x, y, isPlayersTurn)
{
    var board = isPlayersTurn? board2 : board1 ;

    /* board[x][y] has -1 then there's nothing there. Its a miss*/
    // alert(x+","+y+"["+board[x][y]+"]");
    return (board[x][y] == -1)?false : true ;
}
/******************************************************************************/
/**
 * Updates the arena with hit or miss.
 */
function updateArena(isHit,isPlayersTurn, x, y ) {

    /* Get the box ID. It will be something like box143 */
    /* If its player's turn hit the second box.. not hte first. */
    var boxID = "box"+(isPlayersTurn?"2":"1")+x+""+y ;

    /* Update the background color of the box */
    document.getElementById(boxID).style.backgroundColor = isHit?hitColor:missColor ;

}
/******************************************************************************/
/**
 * Checks if the game is over.
 */
function checkIfGameOver(isPlayersTurn) {

    var board = isPlayersTurn? board2 : board1 ;

    for(var k = 0 ; k < 10 ; k++)
    {
        for(var l = 0 ; l < 10 ; l++)
        {
            /* The cell is 1 means the game is not yet over.
             * There's some part of some vessel standing. */
            if(board[k][l] ==1)
            {
                return false;
            }
        }
    }
    return true ;
}
/******************************************************************************/
/**
*
*
*/
function updateStatusMessage(message, i)
{
    document.getElementById('message'+i).innerHTML = message ;
    document.getElementById('box'+i).style.backgroundImage = "url(images/ballon.png)" ;
}
/******************************************************************************/
/**
*
*
*/
function emptyStatusMessage(i)
{
    // alert("background image is made none ");
    document.getElementById('message'+i).innerHTML = "";
    document.getElementById('box'+i).style.backgroundImage = "none" ;
    // alert("background image is none ");
}
/******************************************************************************/