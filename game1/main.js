
var loadLevel = function (n) {
    n = n - 1;
    var level = levels[n];
    var blocks = [];
    for (var i = 0; i < level.length; i++) {
        var p = level[i];
        var b = Block(p);

        blocks.push(b);
    }
    return blocks;
}

var blocks = [];

//debugger
var enableDebugMode = function (enable) {
    if (!enable) {
        return
    }

    window.paused = false;

    window.addEventListener('keyup', function (event) {
        var k = event.key;

        if (k == 'p') {
            //暂停功能
            window.paused = !window.paused;
        } else if ("12345".includes(Number(k))) {
            //临时加入载入关卡
            blocks = loadLevel(Number(k));
        }
    }, false);
    //控制素的
    document.querySelector("#id-input-speed").addEventListener("input", function (event) {
        var input = event.target;
        // log(event);
        window.fps = Number(input.value);
    }, false)
};

var __main = function () {
    enableDebugMode(true);

    var score = 0;

    var game = GuaGame(30);
    var paddle = Paddle();
    var ball = Ball();

    var paused = false;

    // var blocks = loadLevel(1);

    game.registerAction('a', function () {
        paddle.moveLeft();
    });
    game.registerAction('d', function () {
        paddle.moveRight();
    });
    game.registerAction('f', function () {
        ball.fire();
    });

    // window.addEventListener('keyup', function (event) {
    //     var k = event.key;

    //     if (k == 'p') {
    //         //暂停功能
    //         paused = !paused;
    //     } else if ("12345".includes(Number(k))) {
    //         //临时加入载入关卡
    //         blocks = loadLevel(Number(k));
    //     }
    // }, false);


    game.update = function () {
        if (window.paused) {
            return
        }

        ball.move();

        //判断相撞
        if (paddle.collide(ball)) {
            ball.speedY *= -1;
        }

        //ball and block相撞
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];

            if (b.collide(ball)) {
                log("相撞");
                b.kill();
                //反弹
                ball.rebound();

                //更新分数
                score += 10;
            }
        }

    };
    game.draw = function () {
        //draw 背景
        game.context.fillStyle = "#2ac8e4";
        game.context.fillRect(0, 0, 400, 300);

        //draw
        game.drawImage(paddle);
        game.drawImage(ball);

        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if (b.alive) {
                game.drawImage(b);
            }
        }

        //draw labels
        game.context.fillText("分数 " + score, 10, 290);

    };

};

__main();