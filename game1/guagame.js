var GuaGame = function(fps, images) {
  //images 是 array,里面是图片的名字
  var g = {
    actions: {},
    keydowns: {}
  };

  var canvas = document.querySelector("#id-canvas");
  var context = canvas.getContext("2d");
  g.canvas = canvas;
  g.context = context;

  //draw
  g.drawImage = function(guaImage) {
    g.context.drawImage(guaImage.image, guaImage.x, guaImage.y);
  };
  //events
  window.addEventListener("keydown", function(event) {
    g.keydowns[event.key] = true;
  });
  window.addEventListener("keyup", function(event) {
    g.keydowns[event.key] = false;
  });

  g.registerAction = function(key, cb) {
    g.actions[key] = cb;
  };

  window.fps = 30;

  var runloop = function() {
    //events
    var actions = Object.keys(g.actions);
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i];
      if (g.keydowns[key]) {
        //如果按键被按下，调用注册的action
        g.actions[key]();
      }
    }
    //update
    g.update && g.update();
    //clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    //draw
    g.draw && g.draw();
    //next run loop
    setTimeout(function() {
      runloop();
    }, 1000 / window.fps);
  };

  for (var i = 0; i < images.length; i++) {
    var path = images[i];
    var img = new Images();
    img.src = path;
    img.onload = function() {
        //所有图片都载入成功之后，调用run
    };
  }

  runloop();

  // //timer
  // setInterval(function () {
  //     //events
  //     var actions = Object.keys(g.actions);
  //     for (var i = 0; i < actions.length; i++) {
  //         var key = actions[i];
  //         if (g.keydowns[key]) {
  //             //如果按键被按下，调用注册的action
  //             g.actions[key]();
  //         }
  //     }
  //     //update
  //     g.update && g.update();
  //     //clear
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     //draw
  //     g.draw && g.draw();
  // }, 1000 / fps);

  return g;
};
