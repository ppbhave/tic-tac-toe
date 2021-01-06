// declaratoins

let cross='x';
let circle='o';
let circleTurn
const winningMessageText=document.querySelector('[data-winning-announcement-text]')
const winning_combinations=
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let winnerDisplay=document.getElementById('winnerFlex')
let turnInstr=document.getElementsByClassName("instructions")
const cells=document.querySelectorAll('[data-cell]')
let restartButton = document.getElementById('restartButton')
restartButton.addEventListener('click', startgame)
startgame()
function startgame()
{
// turn is of X
//board is clear

cells.forEach(cell => {
    cell.classList.remove(cross)
    cell.classList.remove(circle)
    cell.addEventListener('click',handleClicck,{once:true})
})
//winningMessageText.classList.remove('show')
winnerDisplay.style.display="none"
circleTurn=false;
instructionHandler()
}

function instructionHandler()
{
    if(circleTurn)
    turnInstr.innerText= 'X\'s turn...' 
    else 
    turnInstr.innerText= 'O\'s turn...'
}
function handleClicck(e)
{
    //place mark,
    const cell=e.target;
    const currentClass=circleTurn ? circle :cross;
    placemark(cell,currentClass)
    //change turn
    console.log(circleTurn)
    //evaluate winning condition
    if(checkWin(currentClass))
    {
        console.log('Decision point reached !!!')
        endgame(false)
    }
    else if (checkDraw())
    {
        endgame(true)
    }

    circleTurn= !circleTurn;
    instructionHandler()
}
function checkDraw()
{
    console.log('checkdraw called')
    return [...cells].every(cell =>
       { return cell.classList.contains(cross) || cell.classList.contains(circle)})
}
function endgame(draw)
{
    console.log('endgame called')
    if(draw)
    {
        winningMessageText.innerText="Its a Draw !!"
    }
    else{
        if(circleTurn)
        {winningMessageText.innerText="Player O Wins!!!"}
        else {winningMessageText.innerText="Player X Wins!!!"}
    }
   // winningMessageText.classList.add('show');
   winnerDisplay.style.display="flex"


}
function placemark(cell,currentClass)
{
    cell.classList.add(currentClass);
    return;
}

function checkWin(currentClass)
{
    console.log('checkwin called')
    return winning_combinations.some(combinations =>
        {
            return combinations.every(index => {
                return cells[index].classList.contains(currentClass);
            })
        })
}
