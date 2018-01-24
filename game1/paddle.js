//挡板
var Paddle = function (game) {
    // var image = imageFromPath("paddle.png");

    var o = game.imageByName('paddle');
    o.x = 100;
    o.y = 250;
    o.speed = 5;

    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 5,
    // };

    o.move = function (x) {
        if (x < 0) {
            x = 0;
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width;
        }
        o.x = x
    };
    o.moveLeft = function () {
        o.move(o.x -= o.speed);
    };
    o.moveRight = function () {
        // o.x += o.speed;
        // if (o.x > 400 - o.image.width) {
        //     o.x = 400 - o.image.width;
        // }
        o.move(o.x += o.speed);
    };
    o.collide = function (ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true;
            }
        }

        return false;
    };

    return o;
};
