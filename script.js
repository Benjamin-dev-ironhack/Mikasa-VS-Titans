let canvas = document.querySelector('#gamePage')
let ctx = canvas.getContext('2d')

canvas.style.border = '2px solid black'

let intervalId = 0
let score = 0
let startBtn = document.getElementById('startButton')
let loadPage = document.getElementById('loadingPage')
let gameOverPage = document.getElementById('gameOver')
let restartBtn = document.getElementById('restartBtn')
let incrementPlayer = 8
let playerX = 199
let playerY = 630
let isLeftArrow = false;
let isRightArrow = false;
let isAttackKey = false;
//let isSpaceUp = false;

let swords1 = []
let titans = [{x: 50, y: -300}]
let titans2 = [{x: 200, y: -350}]

let welcomeImg = document.createElement('img')
welcomeImg.src = 'images/welcome1.jpg'

let gamePage = document.createElement('img')
gamePage.src = 'images/game pages.png'
let player = document.createElement('img')
player.src = 'images/Mikasa.png'

let titan1 = document.createElement('img')
titan1.src = 'images/titan1.png'
let titan2 = document.createElement('img')
titan2.src = 'images/titan2.png'

let sword = document.createElement('img')
sword.src = 'images/sword.png'



document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    isAttackKey = false
    //isSpaceUp = false
})

document.addEventListener('keydown', (event) => {
    if (event.keycode == 32 || event.code == "Space") {
       isAttackKey = true;
    }
   
    else if (event.keyCode == 39 || event.key == "ArrowRight"){
        isRightArrow = true;
        isLeftArrow = false;
    }
    else if (event.keycode == 37 || event.key == "ArrowLeft") {
        isRightArrow = false;
        isLeftArrow = true;
    }

})


function swords (){
    if (isAttackKey){
        swords1.push({x: playerX, y: playerY})
        isAttackKey = false
    }

    for (let i = 0; i < swords1.length; i++){
        ctx.drawImage(sword, swords1[i].x, swords1[i].y)
        swords1[i].y--
    }
}
setInterval(swords, 50)

function mikasa (){
    ctx.drawImage(player, playerX, playerY)

    if (isRightArrow && (playerX + player.width < canvas.width)) {
        playerX += incrementPlayer

    }
    else if (isLeftArrow && playerX > 0) {
        playerX -= incrementPlayer

    }

}

function titansFall () {

    for (let i = 0; i < titans.length; i++) {
        ctx.drawImage(titan1, titans[i].x, titans[i].y)
        //ctx.drawImage(titan2, titans[i].x + 100, titans[i].y)
        titans[i].y++
        if (titans[i].y == -100){
            titans.push({
                x: Math.floor(Math.random() * (canvas.width - titan1.width)),
                y: -300
            })
        }    
    }
}

function titansFall2 () {

    for (let i = 0; i < titans2.length; i++) {
        ctx.drawImage(titan2, titans2[i].x , titans2[i].y)
        titans2[i].y++
        if (titans2[i].y == -150){
            titans2.push({
                x: Math.floor(Math.random() * (canvas.width - titan2.width)),
                y: -350
            })
        }    
    }
}

//else if ((swords1[j].x > titans[i].x && swords1[j].x + sword.width < titans[i].x + titan1.width) && 
//            (titans[i].y + titan1.height > swords1[j].y) ){

function titansReach(){
    for (let i = 0; i < titans.length; i ++){
        if (titans[i].y + titan1.height > canvas.height){
            clearInterval(intervalId)
            //alert('game over')
            gameOver()
        }    
    }
}

function titansReach2(){
    for (let i = 0; i < titans2.length; i ++){
        if (titans2[i].y + titan2.height > canvas.height){
            clearInterval(intervalId)
            //alert('game over')
            gameOver()
        }    
    }
}


function titansCollision (){
    for (let i = 0; i < titans.length; i++){
        for (let j = 0; j < swords1.length; j++){
            if ((swords1[j].x > titans[i].x && swords1[j].x + sword.width < titans[i].x + titan1.width + titan1.height) && 
            (titans[i].y + titan1.height > swords1[j].y) ){
                titans.splice(i, 1)
                swords1.splice(j, 1)
                score ++
            }
        }
    }
    ctx.beginPath()
    ctx.font = '30px Verdana red'
    ctx.fillText('Titans killed: ' + score, 10, 30)
    ctx.fillStyle = '#571e1e'
    ctx.closePath()
}

function titansCollision2 (){
    for (let i = 0; i < titans2.length; i++){
        for (let j = 0; j < swords1.length; j++){
            if ((swords1[j].x > titans2[i].x && swords1[j].x + sword.width < titans2[i].x + titan2.width + titan2.height) && 
            (titans2[i].y + titan2.height > swords1[j].y) ){
                titans2.splice(i, 1)
                swords1.splice(j, 1)
                score ++
            }
        }
    }
}


function gamePlay (){
    ctx.drawImage(gamePage, 0, 0)
    titansFall()
    swords()
    mikasa()
    titansCollision()
    titansReach()
    titansFall2()
    titansCollision2()
    titansReach2()
}

function startGame(){
    canvas.style.display = 'block'
    startBtn.style.display = 'none' 
    loadPage.style.display = 'none'
    gameOverPage.style.display = 'none'
    intervalId = setInterval(() => {
        requestAnimationFrame(gamePlay)
    }, 15) 
}

function gameOver(){
    canvas.style.display = 'none'
    startBtn.style.display = 'none' 
    loadPage.style.display = 'none'
    gameOverPage.style.display = 'block'
    restartBtn.addEventListener('click', () => {
        location.reload();
    })
}

window.addEventListener('load', () => {
    loadPage.style.display = 'block'
    canvas.style.display = 'none'
    gameOverPage.style.display = 'none'

    startBtn.addEventListener('click', () => {
        startGame()
    })
})
