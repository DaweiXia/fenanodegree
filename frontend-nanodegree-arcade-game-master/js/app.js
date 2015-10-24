// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initLocation();
    this.initSpeed();
};

Enemy.prototype.initLocation = function() {
    //Different vehicles should have different locations
    this.x = -100;
    this.y = 50 + (Math.floor(Math.random() * 10) % 3) * 83;
};

Enemy.prototype.initSpeed = function() {
    //Different vehicles should have different speed
    this.speed = (Math.random() + 0.5) * 300;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //Calculate the distance between a player and vehicles
    distance = Math.sqrt(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2));

    //If vehicles move off screen, reset its location and speed,
    //or if the collide with player, reset game
    if(this.x > 606){
        this.initLocation();
        this.initSpeed();
    }else if(distance < 50){
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.direction = "stay"
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    //According to the move direction to update player's location
    if(this.direction === "left"){
        this.x = this.x - 101;
    }else if(this.direction === "right") {
        this.x = this.x + 101;
    }else if(this.direction === "up") {
        this.y = this.y - 83;
    }else if(this.direction === "down") {
        this.y = this.y + 83;
    }

    //If player move off screen, reset it.
    if(this.x >= 500|| this.x <= -5 || this.y <= 0 || this.y >= 483){
        this.reset();
    }

    //After update, reset direction to keep player stay
    this.direction = "stay";
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    this.direction = direction;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 4; i++){
    var e = new Enemy();
    allEnemies.push(e);
}
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
