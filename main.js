
(function(){
    self.Board = function(width,height){
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
    this.playing = false;
  }

  self.Board.prototype = {
    get elements(){
      var elements = this.bars.map(function(bar){return bar;});
      elements.push(this.ball);
      return elements;
    }
  }
})(); 

(function(){
  self.Ball = function(x,y,radius,board){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_x = 0;
    this.speed_y = 3;
    this.board = board;
    this.direction = 1;

    board.ball = this;
    this.kind = "circle";
  }
  self.Ball.prototype = {
    move: function(){
      this.x += (this.speed_x * this.direction);
      this.y += (this.speed_y);
    }
  }

})();

(function(){
  self.Bar = function(x,y,width,height,board){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 20;
  }

  self.Bar.prototype = {
    down: function(){
      this.y += this.speed;
    },

    up: function(){
      this.y -= this.speed;
    },
    toString: function(){
      return "x: " + this.x + "y:" + this.y;
    }
  }

  
})();

(function(){
  self.BoardView = function(canvas,board){
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.contexto = canvas.getContext("2d");
  }

self.BoardView.prototype = {
  clean: function(){
    this.contexto.clearRect(0,0,this.board.width,this.board.height);
  },

  draw: function(){
    for (var i = this.board.elements.length - 1; i>=0; i--){
      var el = this.board.elements[i];

      draw(this.contexto,el);
    };
  },
  play: function(){
   
    if(this.board.playing){
      this.clean();
      this.draw();
      this.board.Ball.move();
    }
  }
}

function draw(contexto,element){


  switch(element.kind){
     case "rectangle":
      contexto.fillRect(element.x,element.y,element.width,element.height)
    break;
    case "circle":
      contexto.beginPath();
      contexto.arc(element.x,element.y,element.radius,0,7);
      contexto.fill();
      contexto.closePath();
      break;
  }
}

})();

var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar_2 = new Bar(735,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new Ball(350, 100,10, board);



//esto es para manejar las bars (ubicación)  
document.addEventListener("keydown",function(ev){

  if(ev.keyCode == 38){
    ev.preventDefault();
    bar.up();
  }
  else if(ev.keyCode == 40){
    ev.preventDefault();
    bar.down();
  }

  if(ev.keyCode == 87){
    ev.preventDefault();
    bar_2.up();
  }
  else if(ev.keyCode == 83){
    ev.preventDefault();
    bar_2.down();
  }
  else if(ev.keyCode === 32){
    ev.preventDefault();
    board.playing = !board.playing;
  }
});

board_view.draw();

window.requestAnimationFrame(controller);

//control del cuadro para jugar Ping Pong
function controller(){
  board_view.play(); 
  window.requestAnimationFrame(controller);
}