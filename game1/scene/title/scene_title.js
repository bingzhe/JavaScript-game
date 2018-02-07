var SceneEnd = function(game) {
    var s = {
      game: game
    };
  
    s.draw = function() {
      game.context.fillText("按 k 开始游戏", 100, 290);
    };
  
    s.update = function() {};
    return s;
  };
  