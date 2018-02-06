var Scene = function(game) {
  var s = {
    game: game
  };

  //初始化
  var paddle = Paddle(game);
  var ball = Ball(game);
  var score = 0;
  var blocks = loadLevel(game, 1);

  game.registerAction("a", function() {
    paddle.moveLeft();
  });
  game.registerAction("d", function() {
    paddle.moveRight();
  });
  game.registerAction("f", function() {
    ball.fire();
  });

  s.draw = function() {
    // draw 背景
    game.context.fillStyle = "#9ac6de";
    game.context.fillRect(0, 0, 400, 300);
    // draw
    game.drawImage(paddle);
    game.drawImage(ball);

    // draw blocks
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.alive) {
        game.drawImage(block);
      }
    }
    // draw labels
    game.context.fillText("分数: " + score, 10, 290);
  };

  s.update = function() {
    if (window.paused) {
      return;
    }

    ball.move();
    //判断相撞
    if (paddle.collide(ball)) {
      ball.speedY *= -1;
    }

    //判断游戏结束
    if (ball.y > paddle.y) {
      var end = SceneEnd(game);
      game.replaceScene(end);
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

  //mouse event
  var enableDrag = false;
  game.canvas.addEventListener(
    "mousedown",
    function(event) {
      var x = event.offsetX;
      var y = event.offsetY;

      if (ball.hasPoint(x, y)) {
        enableDrag = true;
      }
    },
    false
  );
  //mouse event
  game.canvas.addEventListener(
    "mousemove",
    function(event) {
      var x = event.offsetX;
      var y = event.offsetY;
      //检查是否点中了ball
      if (enableDrag) {
        ball.x = x;
        ball.y = y;
      }
    },
    false
  );
  //mouse event
  game.canvas.addEventListener(
    "mouseup",
    function(event) {
      var x = event.offsetX;
      var y = event.offsetY;
      enableDrag = false;
    },
    false
  );
  return s;
};
