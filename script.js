const player = document.querySelector(".player");
const ball = document.querySelector(".ball");
const hoop_1 = document.querySelector(".hoop_1");
const hoop_2 = document.querySelector(".hoop_2");

let textEl = document.getElementById("text-el");

ball.classList.add("dribble");

let p = {
    vel : 25,
    pos_x : 300,
    pos_y : 300,
    vel_x_left : 0,
    vel_x_right : 0,
};

let o = {
    vel : 25,
    pos_x : 1300,
    pos_y : 300,
    vel_x_left : -10,
    vel_x_right : 0,
};

let o_score = 0;
let p_score = 0;

let o_has_ball = false;
let p_has_ball = true;

let opponent = player.cloneNode();
player.after(opponent);

opponent.style.background = "red";

function animate(){

    p.pos_x += p.vel_x_left;
    p.pos_x += p.vel_x_right;

    o.pos_x += o.vel_x_left;
    o.pos_x += o.vel_x_right;
    
    player.style.position = "absolute";
    player.style.left = p.pos_x + "px";
    player.style.top = p.pos_y + "px";

    opponent.style.position = "absolute";
    opponent.style.left = o.pos_x + "px";
    opponent.style.top = o.pos_y + "px";

    hoop_1.style.position = "absolute";
    hoop_1.style.width = "431px";
    hoop_1.style.height = "407px";
    hoop_1.style.left = "-50px";

    hoop_2.style.position = "absolute";
    hoop_2.style.width = "431px";
    hoop_2.style.height = "407px";
    hoop_2.style.left = "1300px";

    let ball_pos_x = p.pos_x + 75;

    if (p_has_ball == true){
        ball.style.position = "absolute";
        ball.style.left = ball_pos_x + "px";
        ball.style.top = p.pos_y + "px";
        o_has_ball = false;
    }
    
    if (player.style.left == "1350px" && jumping == true){
        p_has_ball = true;
        p_score += 1;
    };
    if (opponent.style.left == player.style.left && p_has_ball == true){
        o_has_ball = true;   
        p_has_ball = false;  
    };
    if (o_has_ball == true){
        ball.style.position = "absolute";
        ball.style.left = o.pos_x + "px";
        ball.style.top = o.pos_y + "px";
        
        ball.classList.remove("jump"); 

        if (opponent.style.left == "250px"){
            o_jumping = true;
        };

        if (o_jumping == true){
            opponent.classList.add("jump");
        };
        if (opponent.style.left == "200px"){
            ball.classList.remove("dribble")
            ball.classList.add("jump");
        }
        if (opponent.style.left == "50px" && o_jumping == true){
            o_score += 1;
            ball.classList.add("dribble");
        };
    };

    if (p.pos_x <= 0){
        p.pos_x = 1500;
    };
    if (p.pos_x >= 1700){
        p.pos_x = 0;
    };
    if (o.pos_x <= 0){
        o.pos_x = 1500;
        p_has_ball = true;
    };
    if (o.pos_x >= 1700){
        o.pos_x = 0;
        
    };
    textEl.innerText = "Your score: " + p_score;

    requestAnimationFrame(animate);
};

let jumping = false;
let o_jumping = false;

addEventListener("keydown", (e) => {
    switch (e.code){
        case "KeyD":
            p.vel_x_right = p.vel;
            break;
        case "KeyA":
            p.vel_x_left = -p.vel;
            break;
        case "Space":
            jumping = true;
            player.classList.add("jump");
            ball.classList.remove("dribble");
            ball.classList.add("jump");
            break;
    };
});

addEventListener("keyup", (e) => {
    switch (e.code){
        case "KeyD":
            p.vel_x_right = 0;
            break;
        case "KeyA":
            p.vel_x_left = 0;
            break;
        case "Space":
            jumping = false;
            player.classList.remove("jump");
            ball.classList.remove("jump");
            ball.classList.add("dribble");
            break;
    };
});

animate();

console.log("Hello world");