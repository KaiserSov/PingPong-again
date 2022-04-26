
(function(){
    self.Board = function(width,height){
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
  }
})(); 

self.Board.prototype = {
  get elements(){
    var elements = this.bars;
    elements.push(ball);
  }
}

function main(){

}