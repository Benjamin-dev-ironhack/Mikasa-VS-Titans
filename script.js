let canvas = document.querySelector('#gamePage')
let ctx = canvas.getContext('2d')

canvas.style.border = '2px solid black'

let intervalId = 0
let score = 0
let startButton = document.querySelector('#StartButton')
let loadPage = document.querySelector('#loadingPage')
let playing = false
let incrementPlayer = 8
let playerX = 199
let playerY = 630
let isLeftArrow = false;
let isRightArrow = false;
let isAttackKey = false;
//let isSpaceUp = false;

let swords1 = []
let titans = [{x: 50, y: 100}]
for (let i = 0; i < titans.length; i++){
    titans[i] = {x: 50, y: -100, status: 1}
}


let welcomeImg = document.createElement('img')
welcomeImg.src = '/images/welcome1.jpg'

let gamePage = document.createElement('img')
gamePage.src = '/images/game pages.png'
let player = document.createElement('img')
player.src = '/images/Mikasa.png'

let titan1 = document.createElement('img')
titan1.src = '/images/titan1.png'
let titan2 = document.createElement('img')
titan2.src = '/images/titan2.png'

let sword = document.createElement('img')
sword.src = '/images/sword.png'



document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
    isAttackKey = false
    //isSpaceUp = false
})

document.addEventListener('keydown', (event) => {
    if (event.keycode == 32 || event.code == "Space") {
       isAttackKey = true;
       console.log('attack')
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
    }

    for (let i = 0; i < swords1.length; i++){
        ctx.drawImage(sword, swords1[i].x, swords1[i].y)
        swords1[i].y--
    }
}

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

    //let constant = titan1.width + 100
    for (let i = 0; i < titans.length; i++) {
        ctx.drawImage(titan1, titans[i].x, titans[i].y)
        //ctx.drawImage(titan2, titans[i].x + constant, titans[i].y)
        titans[i].y++
        if (titans[i].y == canvas.height / 3){
            titans.push({
                x: Math.floor(Math.random() * (canvas.width - titan1.width)),
                y: -50
            })
        }
    }
}



/*function titansCollision1 (){
    for (let i = 0; i < titans.length; i++){
        if (titans[i].y + titansCollision1.height == canvas.height){
            clearInterval(intervalId);
            alert('gameover');
        }
    }
}*/

function loadingPage(){
    ctx.loadPage
    ctx.startButton
    draw()
    text()
}

function draw (){
    ctx.drawImage(welcomeImg, 0, 0)
}

function text (){
    ctx.beginPath()
    ctx.font = 'bold 45px Verdana red'
    ctx.fillText('MIKASA VS TITANS', 35, 80)
    ctx.fillStyle = '#571e1e'
    ctx.closePath()
    
    ctx.beginPath()
    ctx.font = '25px Verdana red'
    ctx.fillText('In this game you will help Mikasa to ', 60,  150)
    ctx.fillText('protect the wall !', 160, 175 )
    ctx.closePath()

    ctx.beginPath()
    ctx.font = 'bold 25px Verdana red'
    ctx.fillText('INSTRUCTIONS', 160,  550)
    ctx.closePath()

    ctx.beginPath()
    ctx.font = '25px Verdana red'
    ctx.fillText('Arrow left --> you go left', 120, 575)
    ctx.fillText('Arrow right --> you go right', 120, 595)
    ctx.fillText('Space --> you launch sword', 120, 615)
    ctx.fillText('Mouse Click --> melee attack', 120, 635)
    ctx.closePath()
}


function gamePlay (){
    ctx.drawImage(gamePage, 0, 0)
    titansFall()
    swords()
    mikasa()
}



intervalId = setInterval(() => {
    //requestAnimationFrame(draw)
    //requestAnimationFrame(text)
    requestAnimationFrame(gamePlay)
    //requestAnimationFrame(swords)
    //requestAnimationFrame(mikasa)
    //requestAnimationFrame(titansFall)
    //requestAnimationFrame(titansCollision1)
}, 200) 