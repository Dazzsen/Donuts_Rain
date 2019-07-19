class Obstacle2 {
  constructor(ctx, w, h, x, y, velocidadX){
    this.ctx=ctx

    //estos width y height se refieren al tamaño del canvas, que le pasamos por parametro como w y h
    this.CnWidth=w
    this.CnHeight=h
    
    // con esto creamos la imagen y luego le decimos la ruta
    this.image = new Image()
    this.image.src= "img/donut.png"

    //estos width y height se refieren al tamaño de la imagen
    this.width = 65
    this.height = 65 

    // ESTAS SON LAS POSICONES DEL DONUT (LA IMAGEN)
   
    this.posX = x
    this.posY = y
    //this.posY0 = this.CnHeight * 0.98 - this.height 
    
    
    // velocidad y gravedad de la imagen
    this.velX = velocidadX
    this.velY = .4
    this.gravity = .3

  
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  draw() {
  
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  move() {

   if (this.posY <= this.CnHeight){
    this.posX += this.velX
    this.velY += this.gravity
    this.posY += this.velY
    }else{
      this.posY = this.CnHeight - this.height
    }



    // REBOTE CON LAS PAREDES
    if(this.posY > window.innerHeight - this.height) { 
      this.posY = window.innerHeight - this.height
      this.velY *= -1 
    }
    if(this.posX > window.innerWidth - this.width) { 
      this.posX = window.innerWidth - this.width
      this.velX *= -1 
    }
    if(this.posX < 0) { 
      this.posX = 0
      this.velX *= -1
    } 
  }
  }

}

// move() {

//   let gravity = 0.4

//   if(this.posY <= this.posY0){          //COmprobamos que el player nunca sobrepase el suelo.

//     this.posY += this.velY
//     this.velY += gravity                
//   } else {                              //Si lo hace reseteamos posición y velocidad
//     this.velY = 1
//     this.posY = this.posY0
//   }