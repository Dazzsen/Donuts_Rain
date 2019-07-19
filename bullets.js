

//     this.image = new Image()
//     this.image.src = "/img/bullet.png"


//   draw(){
//     this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)


// class Bullet {
//   constructor( ctx, x, y) {
//     this.ctx = ctx
//     this.posX = x + 40  // posicion desde conde salen las balas
//     this.posY = y +120
//     this.radius = 5    //tamaño de la bala
//     this.velY = 10
//   }

//   draw() {        
//     this.ctx.beginPath()
//     this.ctx.fillStyle = "blue";
//     this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
//     this.ctx.fill();
//     this.ctx.closePath();
//   }
// ///////////////////////////////////////////////////////////////
//   move() {
//     this.posY -= this.velY
//   }
// }



class Bullet {
  constructor( ctx, x, y) {
    this.ctx = ctx
    this.posX = x + 28  // posicion desde conde salen las balas
    this.posY = y +120
    this.height= 500
    this.width = 6  //tamaño de la bala
    this.velY = 10
  }

  draw() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
///////////////////////////////////////////////////////////////
  move() {
    this.posY -= this.velY
  }
}
