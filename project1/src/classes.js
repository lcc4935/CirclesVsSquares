class Character {
    constructor(x = 0, y = 0, span = 8, fwd = { x: 1, y: 0 }, speed = 0, color = "black", health = 2) {
        this.x = x;
        this.y = y;
        this.span = span;
        this.fwd = fwd;
        this.speed = speed;
        this.color = color;
        this.health = health;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.span, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    //based on keys
    moveUp() {
        this.y = this.y - this.speed;
    }
    moveDown() {
        this.y = this.y + this.speed;
    }
    moveRight() {
        this.x = this.x + this.speed;
    }
    moveLeft() {
        this.x = this.x - this.speed;
    }
}

class Boss {
    constructor(x = 0, y = 0, span = 30, fwd = { x: 1, y: 0 }, speed = 0, color = "black", health = 10) {
        this.x = x;
        this.y = y;
        this.span = span;
        this.fwd = fwd;
        this.speed = speed;
        this.color = color;
        this.health = health;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(-this.span / 2, -this.span / 2, this.span, this.span);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.fwd.x * this.speed;
        this.y += this.fwd.y * this.speed;
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    }
}

class Bullet {
    constructor(x = 0, y = 0, x2 = 1, y2 = 1, span = 5, fwd = { x: 1, y: 0 }, speed = 0, color = "#AAA") {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.span = span;
        this.fwd = fwd;
        this.speed = speed;
        this.color = color;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.span / 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.fwd.x * this.speed;
        this.y += this.fwd.y * this.speed;
    }

}

export { Character, Boss, Bullet };