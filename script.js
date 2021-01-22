let canvas = document.querySelector('#welcomePage')
let ctx = canvas.getContext('2d')

canvas.style.border = '2px solid black'

let intervalId = 0
let score = 0

let welcomeImg = document.createElement('img')
welcomeImg.src = '/images/welcome1.jpg'

ctx.drawImage(welcomeImg, 0, 0)