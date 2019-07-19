class Obstacle {
  constructor(ctx, w, h){
    this.ctx=ctx

    //estos width y height se refieren al tamaño del canvas, que le pasamos por parametro como w y h
    this.CnWidth=w
    this.CnHeight=h
    
    // con esto creamos la imagen y luego le decimos la ruta
    this.image = new Image()
    // this.image.src= "img/personaje3.png"
    this.image.src= "img/donut.png"

    //estos width y height se refieren al tamaño de la imagen
    this.width = 130
    this.height = 130

    // ESTAS SON LAS POSICONES DEL DONUT (LA IMAGEN)
    // la posicion por la que saldrá el donut será random
    this.posX = Math.random() * ((this.CnWidth - this.width) - 0) + 0;
    //this.posX = 0
    //this.posX = this.CnWidth / 2 - this.width / 2
    //this.posY0 = this.CnHeight - this.height  //Guardamos la posicion original para usarla como suelo
    this.posY = -60

    this.velX = 4
    this.velY = .4
    this.gravity = .40
    
  
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX += this.velX
    this.velY += this.gravity
    this.posY += this.velY


    this.posY > window.innerHeight - this.height ? this.velY *= -1 : null
    this.posX > window.innerWidth - this.width ? this.velX *= -1 : null
    this.posX < 0 ? this.velX *= -1 : null
  }

}