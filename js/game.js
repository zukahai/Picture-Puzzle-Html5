let game_W = 20;
let game_H = 20;
let WW = 0;
const size = 3;
let II = size - 1, JJ = size - 1;
let xStart = -1, yStart = -1, xEnd = -1, yEnd = -1;
let win = false;
var bg = new Image();
bg.src="images/background.jpg";

im = [];
var rd = Math.floor((Math.random() * 3) + 1);

for (var i = 0; i <= 9; i++) {
    im[i] = new Image();
    im[i].src="images/Data/" + rd + "/" + i + ".jpg";
}

var data = [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]];

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();

        do {
            this.initMatrix();
        } while (this.checkWin());
        
        this.loop();

        this.listenKeyboard();
        this.listenTouch();
    }

    initMatrix() {
        for (var N = 0; N < 2 * size * size; N++) {
            var x1, x2, y1, y2;
            do {
                x1 = Math.floor(Math.random() * (size - 1));
                y1 = Math.floor(Math.random() * (size - 1));
            } while(x1 == size - 1 && y1 == size - 1);

            do {
                x2 = Math.floor(Math.random() * (size - 1));
                y2 = Math.floor(Math.random() * (size - 1));
            } while((x2 == size - 1 && y2 == size - 1) || (x2 == x1 && y2 == y1));
            console.log(x1,' ', y1, ' ', x2, ' ', y2);

            var temp = data[x1][y1];
            data[x1][y1] = data[x2][y2];
            data[x2][y2] = temp;
        }
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            if (evt) evt = window.event;
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
            x -= (game_W - WW) / 2;
            y -= (game_H - WW) / 2;
            xEnd = Math.floor(3 * y / WW);
            yEnd = Math.floor(3 * x / WW);
            if (xEnd == II && yEnd == JJ)
                this.solove();
        })

        document.addEventListener("touchstart", evt => {
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
            x -= (game_W - WW) / 2;
            y -= (game_H - WW) / 2;

            xStart = Math.floor(3 * y / WW);
            yStart = Math.floor(3 * x / WW);
        })
    }

    solove() {
        if (Math.abs(xStart - xEnd) + Math.abs(yStart - yEnd) == 1) {
            console.log('swap');
            II = xStart;
            JJ = yStart;
            var temp = data[xStart][yStart];
            data[xStart][yStart] = data[xEnd][yEnd];
            data[xEnd][yEnd] = temp;
            console.log(data);
        }
    }

    checkWin() {
        for (var i = 0; i < size; i++)
            for (var j = 0; j < size; j++)
                if (data[i][j] != i * size + j + 1)
                    return false;
        return true;
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        if (win)
            return;
        this.render();
        if (this.checkWin() == true) {
            win = true;
            window.alert("You Win");
            location.reload();
        }
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;
        WW = 0.7 * Math.min(game_W, game_H);
    }

    draw() {
        this.clearScreen();
        this.context.drawImage(bg, 0, 0, game_W, game_H);
        for (var  i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                if (data[i][j] != size * size) {
                    var y = i * WW / 3 + (game_H - WW) / 2;
                    var x = j * WW / 3 + (game_W - WW) / 2;
                    this.context.drawImage(im[data[i][j]], x, y, WW / 3, WW / 3);
                }
        for (var j = 0; j <= 3; j++) {
            var y = 0 * WW / 3 + (game_H - WW) / 2;
            var x = j * WW / 3 + (game_W - WW) / 2;
            
            this.context.beginPath();
            this.context.strokeStyle  = "#33FFFF";
            this.context.lineWidth = 8;
            this.context.moveTo(x, y - 4);
            this.context.lineTo(x, y + WW + 4);
            this.context.stroke();

            y = 0 * WW / 3 + (game_W - WW) / 2;
            x = j * WW / 3 + (game_H - WW) / 2;
            this.context.beginPath();
            this.context.strokeStyle  = "#33FFFF";
            this.context.lineWidth = 8;
            this.context.moveTo(y, x);
            this.context.lineTo(y + WW, x);
            this.context.stroke();
        }
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, game_W, game_H);
    }
}

var g = new game();
