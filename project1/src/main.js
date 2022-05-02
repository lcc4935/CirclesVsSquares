import * as utils from "./utils.js";
import * as classes from "./classes.js";


//Variables
let ctx, canvas
const canvasWidth = 600, canvasHeight = 400;
let cColor = "white";
let boss;
let bullets = [];
let characters = [];
let clicked = false;
let currentCoord = [1, 2];
let points = 0;
let level = 1;
let bH;
let cH;


function init() {
    //creating canvas
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");

    //getting the keys to move the character
    window.onkeydown = utils.keysDown;
    window.onkeyup = utils.keysUp;

    //creating character and boss
    let character = createCharacter(classes.Character);
    characters.push(character);
    boss = createBoss(classes.Boss);

    //setting up the health
    cH = 2;
    bH = boss.health;

    //other functions
    setupUI();
    loop();
}

function loop() {
    requestAnimationFrame(loop);

    //background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    //drawing everything
    moveAndDrawCharacter(ctx);
    moveAndDrawBoss(ctx);
    moveAndDrawBullets(ctx);

    //making more difficult based on the level (when boss dies)
    if (boss.health == 0) {
        level++;

        bH += 2;
        boss.speed += .2;

        points += 3;
        boss.health = bH;
    }
    if (cH == 0) { //losing points when character dies, same level
        points -= 2;
        cH = 2;
    }

    //putting up the infromation onto the canvas
    utils.info(ctx, cH, boss.health, points, level);
}

function setupUI() {
    //changing the color of the character
    let radioButtons = document.querySelectorAll("input[type=radio][name=color]");
    for (let r of radioButtons) {
        r.onchange = function (e) {
            cColor = e.target.value;
            characters[0].color = cColor;
        }
    }

    //shooting bullets on click
    canvas.addEventListener('mousedown', function (e) {
        currentCoord = utils.cursorPosition(canvas, e);
        clicked = true;
        bullets.push(createBullet(currentCoord[0], currentCoord[1]));
    });

    //using points
    buttons();
}


function createBullet(xClick, yClick) {
    let x = characters[0].x;
    let y = characters[0].y;
    let span = 5;
    let fwd = { x: xClick - x, y: yClick - y };
    let speed = .05;
    let color = "#AAA";
    let bullet = new classes.Bullet(x, y, xClick, yClick, span, fwd, speed, color);

    return bullet;
}

function createBoss(classRef = Boss) {

    let x = Math.random() * (canvasWidth - 100) + 50;
    let y = Math.random() * (canvasHeight - 100) + 50;
    let span = 30;
    let fwd = utils.getRandomUnitVector();
    let speed = 3;
    let color = "white";
    let health = 10;

    let boss = new classRef(x, y, span, fwd, speed, color, health);

    return boss;
}

function createCharacter(classRef = Character) {
    let x = 20;
    let y = 200;
    let span = 8;
    let fwd = { x: 1, y: 0 };
    let speed = 5;
    let color = cColor;
    let health = 2;

    let character = new classRef(x, y, span, fwd, speed, color, health);

    return character;
}

function wsadAndArrows() {
    //up W || arrowUP
    if (utils.keys["87"] || utils.keys["38"]) {
        if (characters[0].y >= 0 + characters[0].span) {
            characters[0].moveUp();
        }
    }

    //down S || arrowDown
    if (utils.keys["83"] || utils.keys["40"]) {
        if (characters[0].y <= canvasHeight - characters[0].span) {
            characters[0].moveDown();
        }
    }

    //right D || arrowRight
    if (utils.keys["68"] || utils.keys["39"]) {
        if (characters[0].x <= canvasWidth - characters[0].span) {
            characters[0].moveRight();
        }
    }

    //left A || arrowLeft
    if (utils.keys["65"] || utils.keys["37"]) {
        if (characters[0].x >= 0 + characters[0].span) {
            characters[0].moveLeft();
        }
    }

}

function moveAndDrawCharacter(ctx) {
    ctx.save();

    wsadAndArrows();

    characters[0].draw(ctx);
    ctx.restore();
}

function moveAndDrawBoss(ctx) {
    ctx.save();
    boss.move();

    // check sides and bounce
    if (boss.x <= boss.span / 2 || boss.x >= canvasWidth - boss.span / 2) {
        boss.reflectX();
        boss.move();
    }
    if (boss.y <= boss.span / 2 || boss.y >= canvasHeight - boss.span / 2) {
        boss.reflectY();
        boss.move();
    }

    boss.draw(ctx);
    ctx.restore();

    //reseting character if collision (loses health)
    if (utils.collide(characters[0].x, characters[0].y, characters[0].span, boss.x, boss.y, boss.span, boss.span) && cH > 0) {
        cH--;
        characters.pop();
        characters.push(createCharacter(classes.Character));
    }

}

function moveAndDrawBullets() {
    ctx.save();
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(ctx);
        bullets[i].move(ctx);

        //remove bullet from array if collision
        if (utils.collide(bullets[i].x, bullets[i].y, bullets[i].span, boss.x, boss.y, boss.span, boss.span) && boss.health > 0) {
            boss.health--;
            bullets.pop();
        }
    }

    ctx.restore();
}

function buttons() {
    //character
    document.querySelector("#yourHealth").onclick = function () {
        if (points > 0) {
            points--;
            cH++;
        }
    }

    document.querySelector("#yourSpeed").onclick = function () {
        if (points > 0) {
            points--;
            characters[0].speed += .2;
        }
    }

    //boss
    document.querySelector("#bossHealth").onclick = function () {
        if (points > 0) {
            if (boss.health > 1) {
                points--;
                bH--;
                boss.health--;
            }
        }
    }
    document.querySelector("#bossSpeed").onclick = function () {
        if (points > 0) {
            if (boss.speed > 1) {
                points--;
                boss.speed -= .2;
            }
        }
    }

}

export { init };