
//Const vars and let for the number of clicks of the user
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const balls = [];
let num = 0;



class ball {
    
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        // Random number between -5 and 5
        this.speed_x = Math.random() < 0.5 ? -3 : 3;
        this.speed_y = Math.random() < 0.5 ? -3 : 3;
    }

};


function initBalls(){
    //avoiding the balls to be drawn on the same position
    var flag = true;
    while(flag){
        x = (Math.floor(Math.random() * (490 - 20) + 20));
        y = (Math.floor(Math.random() * (490 - 20) + 20));
        flag_repeat = false;
        for (let i = 0; i < balls.length; i++) {
            distance_square = ((x - balls[i].x) ** 2 + (y - balls[i].y) ** 2) ** 0.5;
            if(distance_square < 20 * 2){
                flag_repeat = true;
                break;
            }
        }
        if(flag_repeat == false){
            break;
        }
    }

    balls.push(new ball(x, y, 20));
    
}


//Recieve the click of the user
function inputFunction(){

    num++;
    
    initBalls();

    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        button.textContent= num; 
    });

};


//Draw the canvas
function drawCanva(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //fill the canva with the color white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

} 

//Draw the balls
function drawBalls(){
    
    //draw the ball
    for (let i = 0; i < balls.length; i++) {
        var img=new Image();
        img.src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
        img.onload=function(){
            var pattern = ctx.createPattern(this, "repeat");
            ctx.fillStyle = pattern;
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();

    }   

}

function updateBalls(){

    //check the collision of the balls on the canvas
    for (let i = 0; i < balls.length; i++) {

        //Update the speed of the balls
        balls[i].x += balls[i].speed_x;
        balls[i].y += balls[i].speed_y;


        if(balls[i].x + balls[i].radius > canvas.width || balls[i].x - balls[i].radius < 0){
            balls[i].speed_x *= -1;
        }

        if(balls[i].y + balls[i].radius > canvas.height || balls[i].y - balls[i].radius < 0){
            balls[i].speed_y *= -1;
        }

        for (let j = 0 ; j < balls.length; j++) {
            if(i != j){

                let distance_square = (balls[i].x - balls[j].x) ** 2 + (balls[i].y - balls[j].y) ** 2;
                //console.log(distance_square);
                let distance = distance_square ** 0.5;

                if (distance <= 40){
                    
                    var ball1_dvx = ((balls[i].speed_x - balls[j].speed_x) * (balls[i].x - balls[j].x) + (balls[i].speed_y - balls[j].speed_y) * (balls[i].y - balls[j].y)) * (balls[i].x - balls[j].x) / distance_square;
                    var ball1_dvy = ((balls[i].speed_x - balls[j].speed_x) * (balls[i].x - balls[j].x) + (balls[i].speed_y - balls[j].speed_y) * (balls[i].y - balls[j].y)) * (balls[i].y - balls[j].y) / distance_square;
                    var ball2_dvx = ((balls[j].speed_x - balls[i].speed_x) * (balls[j].x - balls[i].x) + (balls[j].speed_y - balls[i].speed_y) * (balls[j].y - balls[i].y)) * (balls[j].x - balls[i].x) / distance_square;
                    var ball2_dvy = ((balls[j].speed_x - balls[i].speed_x) * (balls[j].x - balls[i].x) + (balls[j].speed_y - balls[i].speed_y) * (balls[j].y - balls[i].y)) * (balls[j].y - balls[i].y) / distance_square;

                    balls[i].speed_x -= ball1_dvx;
                    balls[i].speed_y -= ball1_dvy;
                    balls[j].speed_x -= ball2_dvx;
                    balls[j].speed_y -= ball2_dvy;
                }
            }
        }

    }

}


//Loop of the mini-game
var loop = function(){
    drawCanva();
    updateBalls();
    drawBalls();
    //1000/60 represents the number of frames per second
    setTimeout(loop, 1000/60);
}

setTimeout(loop, 1000/60);



