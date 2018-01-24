//球
var Ball = function(game) {

  var o = game.imageByName("paddle");
  o.x = 100;
  o.y = 100;
  o.speedX = 5;
  o.speedY = 5;
  o.fired = false;

  o.fire = function() {
    o.fired = true;
  };

  o.move = function() {
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
  };
  o.rebound = function() {
    o.speedY *= -1;
  };
  return o;
};
