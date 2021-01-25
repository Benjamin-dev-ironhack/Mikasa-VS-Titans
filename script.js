let canvas = document.querySelector('#welcomePage')
let ctx = canvas.getContext('2d')

canvas.style.border = '2px solid black'

let intervalId = 0
let score = 0
let start = document.createElement('button')
let playing = false
let incrementPlayer = 8
let playerX = 199
let playerY = 630
let isLeftArrow = false;
let isRightArrow = false
/*let titan1X = 100
let titan1Y = 10
let titan2X = 300
let titan2Y = 10
let titan2Increment = 5 */
titan1Increment = 4
let isSpaceBar = false;
let swordY = 650
let swordX = 199
let incrementSword = 8
let titans = [{x: 50, y: 0}]
let titansIncrement = 5

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

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39 || event.key == "ArrowRight"){
        isRightArrow = true;
        isLeftArrow = false;
    }
    else if (event.keycode == 37 || event.key == "ArrowLeft") {
        isRightArrow = false;
        isLeftArrow = true;
    }
})

document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
})

document.addEventListener('mousedown', () => {
    incrementSword = -8
})

function swords (){
    ctx.drawImage(sword, swordX, swordY)

    if (isRightArrow && (swordX + sword.width < canvas.width)) {
        swordX += incrementSword

    }
    else if (isLeftArrow && swordX > 0) {
        swordX -= incrementSword

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

    let constant = titan1.width + 100
    for (let i = 0; i < titans.length; i++) {
        ctx.drawImage(titan1, titans[i].x, titans[i].y)
        //ctx.drawImage(titan2, titans[i].x + constant, titans[i].y)
        titans[i].y++
        if (titans[i].y == canvas.height - player.height){
            titans.push({
                x: Math.floor(Math.random() * canvas.width),
                y: -50
            })
        }
    }



    //ctx.drawImage(titan1, titan1X, titan1Y)
    //ctx.drawImage(titan2, titan2X, titan2Y)

    //titan1Y += titan1Increment
    //titan2Y += titan2Increment
}



function titansCollision1 (){

}



function gamePlay (){
    ctx.drawImage(gamePage, 0, 0)
    titansFall()
    swords()
    mikasa()
    swords()
    titansCollision1()
    
}




/*
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

function startButton (){
    start('/images/start.png', 120, 120)
}
*/


intervalId = setInterval(() => {
    //requestAnimationFrame(draw)
    //requestAnimationFrame(text)
    requestAnimationFrame(gamePlay)
    //requestAnimationFrame(swords)
    //requestAnimationFrame(mikasa)
    //requestAnimationFrame(titansFall)
    //requestAnimationFrame(titansCollision1)
}, 50) 