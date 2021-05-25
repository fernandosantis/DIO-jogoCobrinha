
// Definição Background
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

//Cria Background
function criarBG() {
    context.fillStyle = "#C98A3B";
    context.fillRect(0,0, 16 * box, 64* box);
}


// Definição da Cobra
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//Cria Cobrinha
function criarCobrinha () {
   for(i=0; i<snake.length; i++) {
       context.fillStyle = "#F10879";
       context.fillRect(snake[i].x, snake[i].y, box, box);
   }
}

//Cria Comidinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function drawFood () {
    context.fillStyle = "#FFFCFC";
    context.fillRect(food.x, food.y, box, box);
}

// Captura movimentos do Teclado
document.addEventListener('keydown', update);
function update(event) {
    if (event.keyCode ==37 && direction != "right") direction = "left";
    if (event.keyCode ==38 && direction != "down") direction = "up";
    if (event.keyCode ==39 && direction != "left") direction = "right";
    if (event.keyCode ==40 && direction != "up") direction = "down";
}

let direction = "right";

var pts = 0;
var difi = 1;

function iniciarJogo () {
    
    


    // verifica limites do canvas
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 14 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 14 * box;
 
    /*
    if (snake[0].x > 15 * box && direction == "right") endgame();
    if (snake[0].x < 0 && direction == "left") endgame();
    if (snake[0].y > 15 * box && direction == "down") endgame();
    if (snake[0].y < 0 && direction == "up") endgame();
    */


    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            endgame();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood ();
    
    // Setar Posição Inicial
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Definir Movimentação
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    
if(snakeX != food.x || snakeY != food.y) {
    snake.pop();
} else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    pts++;
    document.getElementById("ponto").innerHTML = pts;
    document.getElementById("dificuldade").innerHTML = difi;
    if (snake.length > 10) {
        snake.length = 1;
        difi++;
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo,(200-(difi*20)));
    }
}

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo,200);

function endgame() {
    clearInterval(jogo);
    alert('Game Over: Você fez -' + pts + ' pontos!');
}