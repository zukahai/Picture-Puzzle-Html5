let game_W = 20;
let game_H = 20;
let WW = 0;

var bg = new Image();
bg.src="images/bg.jpg";

var kh = new Image();
kh.src="images/kh.png";

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
        

        this.loop();

        this.listenKeyboard();
        this.listenMouse();
        this.listenTouch();
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            if (evt) evt = window.event;
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
        })

        document.addEventListener("touchstart", evt => {
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
        })

        document.addEventListener("touchend", evt => {
            xIM2 = this.getWidth() * 2.5;
            yIM2 = game_H - this.getWidth() * 4.5;
            this.draw();
            rm = false;
        })
    }

    listenMouse() {
        document.addEventListener("mousemove", e => {
            if (!e) e = window.event;
            var x = e.offsetX==undefined?e.layerX:e.offsetX;
            var y = e.offsetY==undefined?e.layerY:e.offsetY;

        }) 
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 300);
    }

    update() {
        this.render();
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;
        WW = 0.7 * Math.min(game_W, game_H);
        console.log(WW);
    }

    draw() {
        this.clearScreen();
        this.context.drawImage(bg, 0, 0, game_W, game_H);
        this.context.drawImage(kh, (game_W - WW) / 2, (game_H - WW) / 2, WW, WW);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, game_W, game_H);
    }
}

var g = new game();
