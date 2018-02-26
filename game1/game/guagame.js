var GuaGame = function(fps, images, runCallback) {
  //images 是 对象,里面是图片的名字
  var g = {
    scene: null,
    actions: {},
    keydowns: {},
    images: {}
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

  // update
  g.update = function() {
    g.scene.update();
  };
  // draw
  g.draw = function() {
    g.scene.draw();
  };

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

  var loads = [];
  //载入所有图片
  var names = Object.keys(images);
  for (var i = 0; i < names.length; i++) {
    let name = names[i];
    var path = images[name];
    let img = new Image();
    log(img);
    img.src = path;
    img.onload = function() {
      //存入g.images中
      g.images[name] = img;
      //所有图片都载入成功之后，调用run
      loads.push(1);
      if (loads.length === names.length) {
        // g.run();
        g.__start();
      }
    };
  }

  g.imageByName = function(name) {
    var img = g.images[name];
    var image = {
      w: img.width,
      h: img.height,
      image: img
    };
    return image;
  };

  g.runWithScene = function(scene) {
    g.scene = scene;

    // 开始运行程序
    setTimeout(function() {
      runloop();
    }, 1000 / fps);
  };


  //场景替换
  g.replaceScene = function(scene) {
    g.scene = scene;
  };
  g.__start = function(scene) {
    runCallback(g);
  };

  return g;
};
