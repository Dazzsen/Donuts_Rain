class Background {
  constructor(ctx, w, h){
    this.ctx = ctx
    this.widthC = w  // la w sera la anchura del canvas que aqui la llamamos this.widthC
    this.heightC = h

    this.image = new Image()
    this.image.src = "img/casa2.jpg"
  

    this.width =  this.widthC     // tamañp horizontal fondo
    this.height = this.heightC   // tamaño vertical fondo

    // this.width = 1200
    // this.height = 800


   // la posicioneX es = la anchura del canvas entre dos, menos la anchura de la imagen entre dos
    this.posX =  this.widthC/2 - this.width /2
    // this.posY = this.heightC / 2 - this.height / 2

    //this.posX = 0
    this.posY = 0


  }
  
  draw () {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

  }
}