function getRandomUnitVector() {
    let x = getRandom(-1, 1);
    let y = getRandom(-1, 1);
    let length = Math.sqrt(x * x + y * y);
    if (length == 0) { // very unlikely
        x = 1; // point right
        y = 0;
        length = 1;
    } else {
        x /= length;
        y /= length;
    }
    return { x: x, y: y };
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//keys
let keys = {};

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

//for bullets
function cursorPosition(canvas, event){
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let coord = [x, y];
    return coord;
}

//http://www.jeffreythompson.org/collision-detection/circle-rect.php
//collision (applies to bullets and character)
function collide(cX, cY, cR, sX, sY, sW, sH) {
    let testX = cX;
    let testY = cY;

    //test left edge of boss
    if (cX < sX) {
        testX = sX;
    }
    //test right edge of boss
    else if (cX > sX + sW) {
        testX = sX + sW;
    }
    //test top edge of boss
    if (cY < sY) {
        testY = sY;
    }
    //test bottom edge of boss
    else if (cY > sY + sH) {
        testY = sY + sH;
    }

    let distX = cX - testX;
    let distY = cY - testY;
    let distance = Math.sqrt((distX*distX) + (distY*distY));

    if (distance <= cR) {
        //collides
        return true;
    }
    //doesn't collide
    return false;

}

//information added to canvas
function info(ctx, cHealth, bHealth, points, level)
    {
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";

        let cHealthText = "Your Health: " + cHealth;
        ctx.fillText(cHealthText, 5, 25);

        let bHealthText = "Boss's Health: " + bHealth;
        ctx.fillText(bHealthText, 5, 50);

        let levelText = "Level: " + level;
        ctx.fillText(levelText, 450, 25);

        let pointsText = "Points: " + points;
        ctx.fillText(pointsText, 450, 50);
    }


export { getRandomUnitVector, getRandom, keysDown, keysUp, keys, cursorPosition, collide, info };