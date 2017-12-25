//球
var Ball = function () {
    var image = imageFromPath("ball.png");

    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 5,
        speedY: 5,
        fired: false
    };

    o.fire = function () {
        o.fired = true;
    }

    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX *= -1;
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY *= -1;
            }

            //move
            o.x += o.speedX;
            o.y += o.speedY;
        }
    }
    o.rebound = function () {
        o.speedY *= -1;
    }
    return o;
};