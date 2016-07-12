/**
 * Created by zhangzizhao on 16/7/9.
 */
var gamejs = require('gamejs');
var draw = require('gamejs/graphics');
var font = require('gamejs/font');
var audio = require('gamejs/audio');

UNIT_LENGTH = 48;
DIM_UP = 1;
DIM_RIGHT = 2;
DIM_DOWN = 3;
DIM_LEFT = 4;
var STATE_FALLING_1 = 5;
var STATE_FALLING_2 = 9;
var STATE_RUNNING = 6;
var STATE_WIN = 7;
var STATE_LOST = 8;
var STATE_FINISH = 10;
var G_STATE = STATE_RUNNING;
var G_BLOCKS = []; // all block's coordinate
var G_CAT
S = [];
IMG_CLAW = ['./img/claw_up.png', './img/claw_down.png', './img/claw_left.png', './img/claw_right.png'];
IMG_HEART = ['./img/heart1.png', './img/heart2.png', './img/heart3.png', './img/heart4.png'];
SOUND = ['./sound/56-E.wav', './sound/57-F.wav', './sound/59-G.wav', './sound/61-A.wav', './sound/63-B.wav', './sound/64-C.wav', './sound/66-D.wav', './sound/68-E.wav', './sound/69-F.wav', './sound/71-G.wav', './sound/73-A.wav', './sound/75-B.wav'];
IMG_BLOCK = [
    ['./img/block1.png', './img/block2.png', './img/block3.png', './img/block4.png', './img/block5.png', './img/block4.png', './img/block3.png', './img/block2.png', ],
    ['./img/block6.png', './img/block7.png', './img/block8.png', './img/block9.png', './img/block10.png', './img/block9.png', './img/block8.png', './img/block7.png', ],
    ['./img/block16.png', './img/block17.png', './img/block18.png', './img/block19.png', './img/block20.png', './img/block19.png', './img/block18.png', './img/block17.png', ],
    ['./img/block21.png', './img/block22.png', './img/block23.png', './img/block24.png', './img/block25.png', './img/block24.png', './img/block23.png', './img/block22.png', ],
    ['./img/block11.png', './img/block12.png', './img/block13.png', './img/block14.png', './img/block15.png', './img/block14.png', './img/block13.png', './img/block12.png', ],
    ['./img/block1.png', './img/block2.png', './img/block3.png', './img/block4.png', './img/block5.png', './img/block4.png', './img/block3.png', './img/block2.png', ],
    ['./img/block6.png', './img/block7.png', './img/block8.png', './img/block9.png', './img/block10.png', './img/block9.png', './img/block8.png', './img/block7.png', ],
    ['./img/block16.png', './img/block17.png', './img/block18.png', './img/block19.png', './img/block20.png', './img/block19.png', './img/block18.png', './img/block17.png', ],
];
IMG_BLOCK_LOSE = ['./img/block0.png'];
var G_LevelIndex = 0;
var G_MaxLevelIndex = 0;
var cat1 = null;
var cat2 = null;
var blocks = null;
var heart1 = null;
var heart2 = null;

LEVELS = [
    //level 0
    {
        cat1: [5, 8, 12],
        cat2: [14, 8, 12],
        blocks: [{
            coordinate: [6, 6],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0]
            ],
        }, {
            coordinate: [6, 8],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0]
            ],
        }],
        heart1: [7, 7],
        heart2: [12, 7],
    },
    //level 1
    {
        cat1: [5, 8, 10],
        cat2: [14, 7, 9],
        blocks: [{
            coordinate: [6, 6],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0]
            ],
        }, {
            coordinate: [6, 8],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0]
            ],
        }],
        heart1: [7, 5],
        heart2: [12, 7],
    },
    //level 2
    {
        cat1: [6, 9, 12],
        cat2: [14, 7, 12],
        blocks: [{
            coordinate: [5, 8],
            comp: [
                [1, 0],
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 2]
            ],
        }, {
            coordinate: [3, 5],
            comp: [
                [0, 0],
                [0, 1],
                [0, 2]
            ],
        }, {
            coordinate: [11, 5],
            comp: [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5],
                [0, 6],
                [0, 7],
            ],
        }, {
            coordinate: [13, 7],
            comp: [
                [0, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [2, 0]
            ],
        }],
        heart1: [11, 4],
        heart2: [3, 4],
    },
    //level 3
    {
        cat1: [8, 5, 12],
        cat2: [10, 5, 12],
        blocks: [{
            coordinate: [4, 2],
            comp: [
                [0, 0],
                [1, 0],
                [0, 1],
                [2, 0],
                [1, 1],
                [0, 2],
                [3, 0],
                [1, 2],
                [0, 3],
                [4, 0],
                [1, 3],
                [0, 4],
                [5, 0],
                [1, 4],
                [0, 5],
                [6, 0],
                [1, 5],
                [0, 6],
                [7, 0],
                [1, 6],
                [0, 7],
                [8, 0],
                [1, 7],
                [0, 8],
                [9, 0],
                [8, 1],
                [1, 8],
                [0, 9],
                [9, 1],
                [8, 2],
                [1, 9],
                [9, 2],
                [8, 3],
                [9, 3],
                [8, 4],
                [9, 4],
                [8, 5],
                [9, 5],
                [8, 6],
                [9, 6],
                [8, 7],
                [9, 7],
                [8, 8],
                [9, 8],
                [8, 9],
                [9, 9]
            ],
        }, {
            coordinate: [9, 5],
            comp: [
                [0, 0],
                [-1, 1],
                [0, 1],
                [-1, 2],
                [1, 1],
                [0, 2],
                [1, 2]
            ],
        }, {
            coordinate: [8, 10],
            comp: [
                [0, 0],
                [1, 0],
                [0, 1],
                [2, 0],
                [1, 1],
                [2, 1]
            ],
        }],
        heart1: [9, 4, 0],
        heart2: [9, 9, 1],
    },
    //level 4
    {
        cat1: [3, 6, 11],
        cat2: [15, 8, 11],
        blocks: [{
            coordinate: [4, 6],
            comp: [
                [0, 0]
            ],
        }, {
            coordinate: [14, 8],
            comp: [
                [0, 0]
            ],
        }],
        heart1: [4, 5],
        heart2: [14, 7],
    },
    //level 5
    {
        cat1: [3, 3, 12],
        cat2: [11, 8, 12],
        blocks: [{
            coordinate: [3, 3],
            comp: [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 0],
                [8, 0]
            ],
        }, {
            coordinate: [3, 6],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        }, {
            coordinate: [3, 8],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
            ],
        }, {
            coordinate: [8, 5],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [3, 1],
                [2, 1],
                [1, 1],
                [0, 1]
            ],
        }, {
            coordinate: [7, 8],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
        }],
        heart1: [6, 7],
        heart2: [9, 4],
    },
    //level 6
    {
        cat1: [6, 9, 12],
        cat2: [12, 9, 12],
        blocks: [{
            coordinate: [6, 3],
            comp: [
                [0, 0],
                [1, 0],
                [2, 0]
            ],
        }, {
            coordinate: [4, 6],
            comp: [
                [0, 0],
                [0, 1],
                [0, 2]
            ],
        }, {
            coordinate: [6, 8],
            comp: [
                [0, 0]
            ],
        }, {
            coordinate: [4, 10],
            comp: [
                [0, 0]
            ],
        }, {
            coordinate: [6, 10],
            comp: [
                [0, 0]
            ],
        }, {
            coordinate: [12, 10],
            comp: [
                [0, 0]
            ],
        }],
        heart1: [8, 2],
        heart2: [4, 9],
    },
    //level 7
    {
        cat1: [3, 7, 12],
        cat2: [11, 7, 12],
        blocks: [{
            coordinate: [3, 4],
            comp: [
                [0, 1],
                [0, 0],
                [1, 0],
                [2, 0],
                [2, 1],
                [1, 1],
                [1, 2],
                [1, 3],
                [2, 3],
                [3, 3],
                [1, 4],
                [0, 5],
                [2, 5]
            ],
        }, {
            coordinate: [9, 4],
            comp: [
                [0, 1],
                [0, 0],
                [1, 0],
                [2, 0],
                [2, 1],
                [1, 1],
                [1, 2],
                [1, 3],
                [0, 3],
                [-1, 3],
                [1, 4],
                [0, 5],
                [2, 5]
            ],
        }, {
            coordinate: [7, 2],
            comp: [
                [0, 0]
            ],
        }],
        heart1: [4, 3],
        heart2: [10, 3],
    },
]

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function getCookie(name) {
    var c_start, c_end;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=")
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return document.cookie.substring(c_start, c_end);
        }
    }
    return ""
}

//heart
function Heart(coordinate) {
    this.coordinate = [coordinate[0], coordinate[1]];
    this.position = [coordinate[0] * UNIT_LENGTH, coordinate[1] * UNIT_LENGTH];
    this.status = "static";
    this.count = 7;
    this.clock = 0;
}
Heart.fallRate = 0.1;
Heart.maxcount = 7;

Heart.prototype.draw = function(display) {
    var img = gamejs.image.load(IMG_HEART[this.clock]);
    display.blit(img, this.position);
}
Heart.prototype.drawOnLose = function(display) {
    var img = gamejs.image.load(IMG_HEART[0]);
    display.blit(img, this.position);
}
Heart.prototype.update = function() {
    if (this.count == Heart.maxcount) {
        this.count = 0;
        if (this.clock == 3)
            this.clock = 0;
        else
            this.clock++;
    } else
        this.count++;
}
Heart.prototype.updateOnFalling = function() {
    this.coordinate[1] += Heart.fallRate;
    this.position[1] += Heart.fallRate * UNIT_LENGTH;
    if (this.count == Heart.maxcount) {
        this.count = 0;
        if (this.clock == 3)
            this.clock = 0;
        else
            this.clock++;
    } else
        this.count++;
}
Heart.prototype.updateOnWin = function() {
    this.coordinate[1] -= Heart.fallRate;
    this.position[1] -= Heart.fallRate * UNIT_LENGTH;
    if (this.count == Heart.maxcount) {
        this.count = 0;
        if (this.clock == 3)
            this.clock = 0;
        else
            this.clock++;
    } else
        this.count++;
}
Heart.prototype.moveUp = function() {
    this.position[1] -= UNIT_LENGTH;
    this.coordinate[1] -= 1;
}
Heart.prototype.moveDown = function() {
    this.position[1] += UNIT_LENGTH;
    this.coordinate[1] += 1;
}
Heart.prototype.moveRight = function() {
    this.position[0] += UNIT_LENGTH;
    this.coordinate[0] += 1;
}
Heart.prototype.moveLeft = function() {
    this.position[0] -= UNIT_LENGTH;
    this.coordinate[0] -= 1;
}

//cat
function Cat(coordinate, dimension, maxlength) {
    this.startx = coordinate[0] * UNIT_LENGTH;
    this.starty = coordinate[1] * UNIT_LENGTH;
    this.position = [coordinate[0] * UNIT_LENGTH, coordinate[1] * UNIT_LENGTH];
    this.coordinate = [coordinate[0], coordinate[1]];
    this.dimension = dimension;
    this.path = [];
    G_CATS.push(coordinate[0] + ',' + coordinate[1]);
    this.maxLength = maxlength;
    this.length = 0;
}
Cat.prototype.draw = function(display) {
    if (this.path.length == 0)
        this.dimension = DIM_UP;
    else {
        var b = this.path[this.path.length - 1];
        this.dimension = b.dimension;
    }
    var img;
    var pos = [this.startx, this.starty];
    this.path.forEach(function(p) {
        var nextpos;
        switch (p.dimension) {
            case DIM_UP:
                img = gamejs.image.load(IMG_CLAW[0]);
                nextpos = [pos[0], pos[1] - UNIT_LENGTH];
                break;
            case DIM_DOWN:
                img = gamejs.image.load(IMG_CLAW[1]);
                nextpos = [pos[0], pos[1] + UNIT_LENGTH];
                break;
            case DIM_LEFT:
                img = gamejs.image.load(IMG_CLAW[2]);
                nextpos = [pos[0] - UNIT_LENGTH, pos[1]];
                break;
            case DIM_RIGHT:
                img = gamejs.image.load(IMG_CLAW[3]);
                nextpos = [pos[0] + UNIT_LENGTH, pos[1]];
                break;
        }
        display.blit(img, pos);
        pos = nextpos;
    })
    display.blit(gamejs.image.load('./img/cat.png'), this.position);
}
Cat.prototype.moveUp = function() {
    this.position[1] -= UNIT_LENGTH;
    this.coordinate[1] -= 1;
    if (this.path.length == 0) {
        this.path.push({
            dimension: DIM_UP,
        });
        G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
        this.length++;
        var sound = new audio.Sound(SOUND[this.length - 1]);
        sound.play();
    } else {
        var b = this.path.pop();
        if (b.dimension != DIM_DOWN) {

            var index = G_CATS.indexOf(this.coordinate[0] + ',' + this.coordinate[1]);
            if (index == -1 && this.length < this.maxLength) {
                G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
                this.path.push(b, { dimension: DIM_UP, });
                this.length++;
                var sound = new audio.Sound(SOUND[this.length - 1]);
                sound.play();
            } else {
                this.position[1] += UNIT_LENGTH;
                this.coordinate[1] += 1;
                this.path.push(b)
            }
        } else {
            var sound = new audio.Sound(SOUND[this.length - 1]);
            sound.play();
            this.length--;
            var index = G_CATS.indexOf(this.coordinate[0] + ',' + (this.coordinate[1] + 1));
            if (index > -1) G_CATS.splice(index, 1);

        }
    }
}
Cat.prototype.moveDown = function() {
    this.position[1] += UNIT_LENGTH;
    this.coordinate[1] += 1;
    if (this.path.length == 0) {
        this.path.push({
            dimension: DIM_DOWN,
        });
        G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
        this.length++;
        var sound = new audio.Sound(SOUND[this.length - 1]);
        sound.play();
    } else {
        var b = this.path.pop();
        if (b.dimension != DIM_UP) {

            var index = G_CATS.indexOf(this.coordinate[0] + ',' + this.coordinate[1]);
            if (index == -1 && this.length < this.maxLength) {
                G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
                this.path.push(b, { dimension: DIM_DOWN, });
                this.length++;
                var sound = new audio.Sound(SOUND[this.length - 1]);
                sound.play();
            } else {
                this.position[1] -= UNIT_LENGTH;
                this.coordinate[1] -= 1;
                this.path.push(b)
            }
        } else {
            var sound = new audio.Sound(SOUND[this.length - 1]);
            sound.play();
            this.length--;
            var index = G_CATS.indexOf(this.coordinate[0] + ',' + (this.coordinate[1] - 1));
            if (index > -1) G_CATS.splice(index, 1);

        }
    }
}
Cat.prototype.moveRight = function() {
    this.position[0] += UNIT_LENGTH;
    this.coordinate[0] += 1;
    if (this.path.length == 0) {
        this.path.push({
            dimension: DIM_RIGHT,
        });
        G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
        this.length++;
        var sound = new audio.Sound(SOUND[this.length - 1]);
        sound.play();
    } else {
        var b = this.path.pop();
        if (b.dimension != DIM_LEFT) {

            var index = G_CATS.indexOf(this.coordinate[0] + ',' + this.coordinate[1]);
            if (index == -1 && this.length < this.maxLength) {
                G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
                this.path.push(b, { dimension: DIM_RIGHT, });
                this.length++;
                var sound = new audio.Sound(SOUND[this.length - 1]);
                sound.play();
            } else {
                this.position[0] -= UNIT_LENGTH;
                this.coordinate[0] -= 1;
                this.path.push(b)
            }
        } else {
            var sound = new audio.Sound(SOUND[this.length - 1]);
            sound.play();
            this.length--;
            var index = G_CATS.indexOf((this.coordinate[0] - 1) + ',' + this.coordinate[1]);
            if (index > -1) G_CATS.splice(index, 1);

        }
    }
}
Cat.prototype.moveLeft = function() {
    this.position[0] -= UNIT_LENGTH;
    this.coordinate[0] -= 1;
    if (this.path.length == 0) {
        this.path.push({
            dimension: DIM_LEFT,
        });
        G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
        this.length++;
        var sound = new audio.Sound(SOUND[this.length - 1]);
        sound.play();
    } else {
        var b = this.path.pop();
        if (b.dimension != DIM_RIGHT) {
            var index = G_CATS.indexOf(this.coordinate[0] + ',' + this.coordinate[1]);
            if (index == -1 && this.length < this.maxLength) {
                G_CATS.push(this.coordinate[0] + ',' + this.coordinate[1]);
                this.path.push(b, { dimension: DIM_LEFT, });
                this.length++;
                var sound = new audio.Sound(SOUND[this.length - 1]);
                sound.play();
            } else {
                this.position[0] += UNIT_LENGTH;
                this.coordinate[0] += 1;
                this.path.push(b)
            }
        } else {
            var sound = new audio.Sound(SOUND[this.length - 1]);
            sound.play();
            this.length--;
            var index = G_CATS.indexOf((this.coordinate[0] + 1) + ',' + this.coordinate[1]);
            if (index > -1) G_CATS.splice(index, 1);

        }
    }
}

//block
//[[x1,y1],[x2,y2][x3,y3],...] relative position
function Block(coordinate, arg) {
    this.position = [coordinate[0] * UNIT_LENGTH, coordinate[1] * UNIT_LENGTH];
    this.coordinate = [coordinate[0], coordinate[1]];
    this.comp = arg;
    this.comp.forEach(function(a) {
        G_BLOCKS.push((coordinate[0] + a[0]) + ',' + (coordinate[1] + a[1]));
    });
    this.clock = 0;
    this.count = Math.round(Math.random() * IMG_BLOCK[G_LevelIndex].length) % IMG_BLOCK[G_LevelIndex].length;
}
Block.prototype.update = function() {
    if (this.clock == 30) {
        this.count = (this.count + 1) % IMG_BLOCK[G_LevelIndex].length;
        this.clock = 0;
    } else
        this.clock++;
}
Block.prototype.updateOnWin = function() {
    if (this.clock == 5) {
        this.count = (this.count + 1) % IMG_BLOCK[G_LevelIndex].length;
        this.clock = 0;
    } else
        this.clock++;
}
Block.prototype.draw = function(display) {
    var sx = this.position[0];
    var sy = this.position[1];
    var i = this.count;
    var img = gamejs.image.load(IMG_BLOCK[G_LevelIndex][i]);
    this.comp.forEach(function(a) {
        var x = sx + a[0] * UNIT_LENGTH;
        var y = sy + a[1] * UNIT_LENGTH;
        display.blit(img, [x, y]);
    })
}
Block.prototype.drawOnLost = function(display) {
    var sx = this.position[0];
    var sy = this.position[1];
    var img = gamejs.image.load(IMG_BLOCK_LOSE[0]);
    this.comp.forEach(function(a) {
        var x = sx + a[0] * UNIT_LENGTH;
        var y = sy + a[1] * UNIT_LENGTH;
        display.blit(img, [x, y]);
    })
}



function init(levelIndex) {
    G_BLOCKS = [];
    G_CATS = [];
    cat1 = new Cat([LEVELS[levelIndex].cat1[0], LEVELS[levelIndex].cat1[1]], DIM_UP, LEVELS[levelIndex].cat1[2]);
    cat2 = new Cat([LEVELS[levelIndex].cat2[0], LEVELS[levelIndex].cat2[1]], DIM_UP, LEVELS[levelIndex].cat2[2]);
    blocks = [];
    LEVELS[levelIndex].blocks.forEach(function(e) {
        blocks.push(new Block(e.coordinate, e.comp));
    });
    heart1 = new Heart([LEVELS[levelIndex].heart1[0], LEVELS[levelIndex].heart1[1]]);
    heart2 = new Heart([LEVELS[levelIndex].heart2[0], LEVELS[levelIndex].heart2[1]]);
}

function main() {
    // set resolution & title
    var display = gamejs.display.getSurface();
    gamejs.display.setCaption("Two Hearts");
    var s1 = getCookie("G_LevelIndex");
    if (s1 != "")
        G_LevelIndex = parseInt(s1);
    var s2 = getCookie("G_MaxLevelIndex");
    if (s2 != "")
        G_MaxLevelIndex = parseInt(s2);

    init(G_LevelIndex);
    var issame = function(a, b) {
        return a[0] == b[0] && a[1] == b[1];
    }

    function keyDownOnRunning(event) {
        if (event.key == gamejs.event.K_UP) {
            var cor = [cat2.coordinate[0], cat2.coordinate[1] - 1];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat2.moveUp();
            if (issame(heart1.coordinate, cor) && G_BLOCKS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && G_CATS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && cat2.length < cat2.maxLength) {
                heart1.moveUp();
                cat2.moveUp()
            }
            if (issame(heart2.coordinate, cor) && G_BLOCKS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && G_CATS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && cat2.length < cat2.maxLength) {
                heart2.moveUp();
                cat2.moveUp()
            }
        }
        if (event.key == gamejs.event.K_DOWN) {
            var cor = [cat2.coordinate[0], cat2.coordinate[1] + 1];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat2.moveDown();
        }
        if (event.key == gamejs.event.K_LEFT) {
            var cor = [cat2.coordinate[0] - 1, cat2.coordinate[1]];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat2.moveLeft();
            if (issame(heart1.coordinate, cor) && G_BLOCKS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && cat2.length < cat2.maxLength) {
                heart1.moveLeft();
                cat2.moveLeft()
            }
            if (issame(heart2.coordinate, cor) && G_BLOCKS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && cat2.length < cat2.maxLength) {
                heart2.moveLeft();
                cat2.moveLeft()
            }
        }
        if (event.key == gamejs.event.K_RIGHT) {
            var cor = [cat2.coordinate[0] + 1, cat2.coordinate[1]];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat2.moveRight();
            if (issame(heart1.coordinate, cor) && G_BLOCKS.indexOf([cor[0] + 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] + 1, cor[1]].toString()) == -1) {
                heart1.moveRight();
                cat2.moveRight()
            }
            if (issame(heart2.coordinate, cor) && G_BLOCKS.indexOf([cor[0] + 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] + 1, cor[1]].toString()) == -1) {
                heart2.moveRight();
                cat2.moveRight()
            }
        }
        if (event.key == gamejs.event.K_w) {
            var cor = [cat1.coordinate[0], cat1.coordinate[1] - 1];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat1.moveUp();
            if (issame(heart1.coordinate, cor) && G_BLOCKS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && G_CATS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && cat1.length < cat1.maxLength) {
                heart1.moveUp();
                cat1.moveUp()
            }
            if (issame(heart2.coordinate, cor) && G_BLOCKS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && G_CATS.indexOf([cor[0], cor[1] - 1].toString()) == -1 && cat1.length < cat1.maxLength) {
                heart2.moveUp();
                cat1.moveUp()
            }
        }
        if (event.key == gamejs.event.K_s) {
            var cor = [cat1.coordinate[0], cat1.coordinate[1] + 1];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat1.moveDown();
        }
        if (event.key == gamejs.event.K_a) {
            var cor = [cat1.coordinate[0] - 1, cat1.coordinate[1]];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat1.moveLeft();
            if (issame(heart1.coordinate, cor) && G_BLOCKS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && cat1.length < cat1.maxLength) {
                heart1.moveLeft();
                cat1.moveLeft()
            }
            if (issame(heart2.coordinate, cor) && G_BLOCKS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] - 1, cor[1]].toString()) == -1 && cat1.length < cat1.maxLength) {
                heart2.moveLeft();
                cat1.moveLeft()
            }
        }
        if (event.key == gamejs.event.K_d) {
            var cor = [cat1.coordinate[0] + 1, cat1.coordinate[1]];
            if (G_BLOCKS.indexOf(cor.toString()) == -1 && !issame(heart1.coordinate, cor) && !issame(heart2.coordinate, cor))
                cat1.moveRight();
            if (issame(heart1.coordinate, cor) && G_BLOCKS.indexOf([cor[0] + 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] + 1, cor[1]].toString()) == -1 && cat1.length < cat1.maxLength) {
                heart1.moveRight();
                cat1.moveRight()
            }
            if (issame(heart2.coordinate, cor) && G_BLOCKS.indexOf([cor[0] + 1, cor[1]].toString()) == -1 && G_CATS.indexOf([cor[0] + 1, cor[1]].toString()) == -1 && cat1.length < cat1.maxLength) {
                heart2.moveRight();
                cat1.moveRight()
            }
        }
        if (event.key == gamejs.event.K_r) {
            init(G_LevelIndex);
            G_STATE = STATE_RUNNING;
        }
    }

    function keyDownOnLost(event) {
        if (event.key == gamejs.event.K_r) {
            init(G_LevelIndex);
            G_STATE = STATE_RUNNING;
        }
    }

    function keyDownOnWin(event) {
        if (G_LevelIndex == LEVELS.length - 1)
            G_STATE = STATE_FINISH;
        else {
            init(++G_LevelIndex);
            G_STATE = STATE_RUNNING;
            if (G_MaxLevelIndex < G_LevelIndex) {
                G_MaxLevelIndex = G_LevelIndex;
                setCookie("G_MaxLevelIndex", G_MaxLevelIndex);
            }
            setCookie("G_LevelIndex", G_LevelIndex);
        }
    }

    function updateOnRunning(msDuration) {
        heart1.update();
        heart2.update();
        cat1.draw(display);
        cat2.draw(display);
        blocks.forEach(function(block) {
            block.update();
            block.draw(display);
        })
        heart1.draw(display);
        heart2.draw(display);
        //to check if there's anything underneath the heart
        var c1 = [heart1.coordinate[0], heart1.coordinate[1] + 1];
        var c2 = [heart2.coordinate[0], heart2.coordinate[1] + 1];
        if (G_BLOCKS.indexOf([c1[0], c1[1]].toString()) == -1 && G_CATS.indexOf([c1[0], c1[1]].toString()) == -1) {
            G_STATE = STATE_FALLING_1;
        }
        if (G_BLOCKS.indexOf([c2[0], c2[1]].toString()) == -1 && G_CATS.indexOf([c2[0], c2[1]].toString()) == -1) {
            G_STATE = STATE_FALLING_2;
        }
        if (heart1.coordinate[1] == heart2.coordinate[1] && Math.abs(heart1.coordinate[0] - heart2.coordinate[0]) == 1)
            G_STATE = STATE_WIN;
    }

    function updateOnWin(msDuration) {
        heart1.updateOnWin();
        heart2.updateOnWin();
        cat1.draw(display);
        cat2.draw(display);
        blocks.forEach(function(block) {
            block.updateOnWin();
            block.draw(display);
        })
        heart1.draw(display);
        heart2.draw(display);
        // Font object, create with css font definition
        var defaultFont = new font.Font("20px Verdana");
        // render() returns a white transparent Surface containing the text (default ARMcolor: black)
        var textSurface = defaultFont.render("PRESS ANY KEY TO CONTINUE", "#cccccc");
        display.blit(textSurface, [100, 600]);
    }

    function updateOnFinish(msDuration) {
        // Font object, create with css font definition
        var defaultFont = new font.Font("40px Verdana");
        // render() returns a white transparent Surface containing the text (default ARMcolor: black)
        var textSurface = defaultFont.render("WELL DONE!!!", "#ffffff");
        display.blit(textSurface, [200, 300]);
    }

    function updateOnLost(msDuration) {
        heart1.update();
        heart2.update();
        cat1.draw(display);
        cat2.draw(display);
        blocks.forEach(function(block) {
            block.drawOnLost(display);
        })
        heart1.draw(display);
        heart2.draw(display);
        // Font object, create with css font definition
        var defaultFont = new font.Font("20px Verdana");
        // render() returns a white transparent Surface containing the text (default ARMcolor: black)
        var textSurface = defaultFont.render("PRESS R TO RESTART", "#bbbbbb");
        display.blit(textSurface, [100, 600]);
    }

    function updateOnFalling1(msDuration) {
        heart1.updateOnFalling();
        heart2.update();
        cat1.draw(display);
        cat2.draw(display);
        blocks.forEach(function(block) {
            block.update();
            block.draw(display);
        })
        heart1.draw(display);
        heart2.draw(display);
        //to check if there's anything underneath the heart
        if (heart1.position[1] > display.getRect().height) G_STATE = STATE_LOST;
        var c1 = [Math.round(heart1.coordinate[0]), Math.round(heart1.coordinate[1] + 1)];
        if (G_BLOCKS.indexOf(c1.toString()) != -1 || G_CATS.indexOf(c1.toString()) != -1) {
            G_STATE = STATE_RUNNING;
            heart1.coordinate = [Math.round(heart1.coordinate[0]), Math.round(heart1.coordinate[1])]
            heart1.position = [heart1.coordinate[0] * UNIT_LENGTH, heart1.coordinate[1] * UNIT_LENGTH]
        }
    }

    function updateOnFalling2(msDuration) {
        heart1.update();
        heart2.updateOnFalling(msDuration);
        cat1.draw(display);
        cat2.draw(display);
        blocks.forEach(function(block) {
            block.update();
            block.draw(display);
        })
        heart1.draw(display);
        heart2.draw(display);
        //to check if there's anything underneath the heart
        if (heart2.position[1] > display.getRect().height) G_STATE = STATE_LOST;
        var c1 = [Math.round(heart2.coordinate[0]), Math.round(heart2.coordinate[1] + 1)];
        if (G_BLOCKS.indexOf(c1.toString()) != -1 || G_CATS.indexOf(c1.toString()) != -1) {
            heart2.coordinate = [Math.round(heart2.coordinate[0]), Math.round(heart2.coordinate[1])]
            heart2.position = [heart2.coordinate[0] * UNIT_LENGTH, heart2.coordinate[1] * UNIT_LENGTH]
            G_STATE = STATE_RUNNING;
        }
    }

    gamejs.event.onKeyDown(function(event) {
        switch (G_STATE) {
            case STATE_LOST:
                keyDownOnLost(event);
                break;
            case STATE_RUNNING:
                keyDownOnRunning(event);
                break;
            case STATE_WIN:
                keyDownOnWin(event);
            default:
                break;
        }

    })

    gamejs.event.onMouseUp(function(event) {
        if (G_LevelIndex > 0 && 50 < event.pos[0] && event.pos[0] < 82 && 40 < event.pos[1] && event.pos[1] < 72) {
            init(--G_LevelIndex);
            G_STATE = STATE_RUNNING;
            setCookie("G_LevelIndex", G_LevelIndex);
        }
        if (G_LevelIndex < G_MaxLevelIndex && 1000 < event.pos[0] && event.pos[0] < 1032 && 40 < event.pos[1] && event.pos[1] < 72) {
            init(++G_LevelIndex);
            G_STATE = STATE_RUNNING;
            setCookie("G_LevelIndex", G_LevelIndex);
        }
    })
    gamejs.onTick(function(msDuration) {
        display.clear();
        draw.rect(display, '#000000', display.getRect(), 0);
        if (G_LevelIndex > 0) display.blit(gamejs.image.load('./img/back.png'), [50, 40]);
        if (G_LevelIndex < G_MaxLevelIndex) display.blit(gamejs.image.load('./img/forward.png'), [1000, 40]);
        switch (G_STATE) {
            case STATE_RUNNING:
                updateOnRunning(msDuration);
                break;
            case STATE_FALLING_1:
                updateOnFalling1(msDuration);
                break;
            case STATE_FALLING_2:
                updateOnFalling2(msDuration);
                break;
            case STATE_LOST:
                updateOnLost(msDuration);
                break;
            case STATE_WIN:
                updateOnWin(msDuration);
                break;
            case STATE_FINISH:
                updateOnFinish(msDuration);
                break;
        }
    })
};

gamejs.preload([
        './img/heart1.png',
        './img/heart2.png',
        './img/heart3.png',
        './img/heart4.png',
        './img/block1.png',
        './img/block2.png',
        './img/block3.png',
        './img/block4.png',
        './img/block5.png',
        './img/block6.png',
        './img/block7.png',
        './img/block8.png',
        './img/block9.png',
        './img/block10.png',
        './img/block11.png',
        './img/block12.png',
        './img/block13.png',
        './img/block14.png',
        './img/block15.png',
        './img/block16.png',
        './img/block17.png',
        './img/block18.png',
        './img/block19.png',
        './img/block20.png',
        './img/block21.png',
        './img/block22.png',
        './img/block23.png',
        './img/block24.png',
        './img/block25.png',
        './img/block0.png',
        './img/cat.png',
        './img/claw_up.png',
        './img/claw_down.png',
        './img/claw_left.png',
        './img/claw_right.png',
        './img/back.png',
        './img/forward.png',
        './sound/56-E.wav',
        './sound/57-F.wav',
        './sound/59-G.wav',
        './sound/61-A.wav',
        './sound/63-B.wav',
        './sound/64-C.wav',
        './sound/66-D.wav',
        './sound/68-E.wav',
        './sound/69-F.wav',
        './sound/71-G.wav',
        './sound/73-A.wav',
        './sound/75-B.wav',
    ])
    // gamejs.ready will call your main function
    // once all components and resources are ready.
gamejs.ready(main);
