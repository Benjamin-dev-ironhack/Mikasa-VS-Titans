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
let isMeleeAttackLeft = false;
let isMeleeAttackRight = false;


let swords1 = []
let titans = [{x: 50, y: -400}]
let titans2 = [{x: 200, y: -450}]
let dy1 = 2
let dx = -4

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

let swordLeft = document.createElement('img')
swordLeft.src = 'images/sword melee L.png'

let swordRight = document.createElement('img')
swordRight.src = 'images/sword melee R.png'


document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    isAttackKey = false;
    isMeleeAttackLeft = false;
    isMeleeAttackRight = false;
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
    else if (event.keycode == 38 || event.key == "ArrowUp"){
        isMeleeAttackLeft = true;
    }
    else if (event.keycode == 40 || event.key == "ArrowDown"){
        isMeleeAttackRight = true;
    }

})

function alwaysTitans(){
    if (titans.length === 0){
        titans.push({
            x: Math.floor(Math.random() * (canvas.width - titan1.width)),
            y: -400
        })
    } 
}

function alwaysTitans2(){
    if (titans2.length === 0){
        titans2.push({
            x: Math.floor(Math.random() * (canvas.width - titan1.width)),
            y: -450
        })
    } 
}

function swords(){
    if (isAttackKey){
        swords1.push({x: playerX, y: playerY})
        isAttackKey = false
    }

    for (let i = 0; i < swords1.length; i++){
        ctx.drawImage(sword, swords1[i].x, swords1[i].y)
        swords1[i].y += dx
    }
}

function meleeAttackLeft(){
    if (isMeleeAttackLeft){
        ctx.drawImage(swordLeft, playerX -30, playerY)
        isMeleeAttackLeft = true
    }
}

function meleeAttackRight(){
    if (isMeleeAttackRight){
        ctx.drawImage(swordRight, playerX + 40, playerY)
        isMeleeAttackRight = true
    }
}

function mikasa(){
    ctx.drawImage(player, playerX, playerY)

    if (isRightArrow && (playerX + player.width < canvas.width)) {
        playerX += incrementPlayer

    }
    else if (isLeftArrow && playerX > 0) {
        playerX -= incrementPlayer

    }

}

function titansFall() {

    for (let i = 0; i < titans.length; i++) {
        ctx.drawImage(titan1, titans[i].x, titans[i].y)
        //ctx.drawImage(titan2, titans[i].x + 100, titans[i].y)
        titans[i].y += dy1
        if (titans[i].y == -100){
            titans.push({
                x: Math.floor(Math.random() * (canvas.width - titan1.width)),
                y: -400
            })
        }   
    }
}

function titansFall2() {

    for (let i = 0; i < titans2.length; i++) {
        ctx.drawImage(titan2, titans2[i].x, titans2[i].y)
        titans2[i].y++ 
        if (titans2[i].y == -100){
            titans2.push({
                x: Math.floor(Math.random() * (canvas.width - titan1.width)),
                y: -450
            }) * 2
        }  
    }
}

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

function titansCollision2(){
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

function swordLeftCollision(){
    for (let i = 0; i < titans.length; i++){
            if ((swordLeft.x + swordLeft.width <= titans[i].x && swordLeft.x <=  titan1.width )&& 
            (swordLeft.y <= titans.y + titan1.height)){
                titans.splice(i, 1)
                score ++
            }
    }
}

function swordRightCollision(){
    for (let i = 0; i < titans.length; i++){
        if ((swordRight.x > titans[i].x && swordRight.x + swordRight.width < titans[i].x + titan1.width + titan1.height) && 
        (titans[i].y + titan1.height > swordRight.y) ){
            titans.splice(i, 1)
            score ++
        }
    }
}


function gamePlay (){
    ctx.drawImage(gamePage, 0, 0)
    titansFall2()
    titansFall()
    swords()
    meleeAttackLeft()
    meleeAttackRight()
    mikasa()
    titansCollision()
    titansReach()
    titansCollision2()
    titansReach2()
    alwaysTitans()
    swordLeftCollision()
    swordRightCollision()
}

function startGame(){
    canvas.style.display = 'block'
    startBtn.style.display = 'none' 
    loadPage.style.display = 'none'
    gameOverPage.style.display = 'none'
    intervalId = setInterval(() => {
        requestAnimationFrame(gamePlay)
    }, 30) 
}

function gameOver(){
    canvas.style.display = 'none'
    startBtn.style.display = 'none' 
    loadPage.style.display = 'none'
    gameOverPage.style.display = 'block'
    restartBtn.addEventListener('click', () => {
        location.reload();
    })
    document.querySelector('#total-kill span').innerHTML = score
}

window.addEventListener('load', () => {
    loadPage.style.display = 'block'
    canvas.style.display = 'none'
    gameOverPage.style.display = 'none'

    startBtn.addEventListener('click', () => {
        startGame()
    })
})
