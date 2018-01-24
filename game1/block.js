//砖块
var Block = function(game, position) {
  //positin [0,0]格式
  var p = position;
  //   var image = imageFromPath("block.png");
  var img = game.imageByName("block");

  var o = {
    image: image,
    x: p[0],
    y: p[1],
    w: 50,
    h: 20,
    alive: true,
    lifes: p[2] || 1
  };
  
  o.image = img.image;
  o.w = img.w;
  o.h = img.h;

  o.kill = function() {
    o.lifes--;
    if (o.lifes < 1) {
      o.alive = false;
    }
  };

  o.collide = function(ball) {
    return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o));
  };

  return o;
};
