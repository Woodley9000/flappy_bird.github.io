
//обьявление переменных для картинок и работы с ней
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/up.png";
pipeBottom.src = "img/down.png";

//звуковые файлы
//////////
/////////
////////
//счётчик
var score = 0;
// x и y  для перемещения обьектов и их позиции
var xPos = 10;
var yPos = 150;
//притяжение к земли
var grav = 1.5;
//позиция труб
var gap = 90;
//массив
var pipe = [];


//взаимодействие с клавишами
document.addEventListener("keydown", moveUp);
//высота рыжка
function moveUp(){
 
    yPos -=25;


}
pipe[0] = {
    x : cvs.width,
    y : 0
}

// рисовка перса на карте и взаимодействие обьекта с другими обьектами
function draw(){
    ctx.drawImage(bg, 0, 0);

for(var i = 0; i<pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;
//расстояние труб по горизонтали
    if(pipe[i].x == 125){
        pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
    }
    //перезагрузка
    if(xPos + bird.width >= pipe[i].x 
    && xPos <= pipe[i].x + pipeUp.width
&& (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y+ pipeUp.height + gap)
||yPos+bird.height >= cvs.height - fg.height){
    location.reload();
}
if(pipe[i].x == 5){
    score++;
}}



    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    //позиция счётчика на карте
    ctx.fillText("Счёт: "+ score, 10, cvs.height - 20)

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;