class Life {
  constructor(ctx, anchoCanvas, altoCanvas, posX){
    this.ctx = ctx
    this.AnchoC = anchoCanvas
    this.AltoC = altoCanvas

    this.image = new Image()
    this.image.src= "img/homerL.png"

    this.width = 30
    this.height = 60

    this.posX = posX
    this.posY = 30
  }


  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

  }
}