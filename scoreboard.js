const ScoreBoard = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "bold 50px chilanka"
  },
  
  update: function (score) {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(Math.floor(score), window.innerWidth / 2, 70);
  }
};