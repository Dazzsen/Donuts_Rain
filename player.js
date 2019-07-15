class Player {
  constructor(ctx, w, h, keys){
    this.ctx=ctx

    //estos width y height se refieren al tamaño del canvas, que le pasamos por parametro como w y h
    this.CWidth=w
    this.CHeight=h
    
    // con esto creamos la imagen y luego le decimos la ruta
    this.image = new Image()
    this.image.src= "img/personaje4.png"


    //estos width y height se refieren al tamaño de la imagen
    
    this.width = 60
    this.height = 120
    //medidas del personaje de pang
    // this.width = 110
    // this.height = 120

    // estos son posiciones del personaje (la imagen)
    this.posX = this.CWidth / 2 - this.width / 2
    this.posY0 = this.CHeight - this.height  //Guardamos la posicion original para usarla como suelo
    this.posY = this.CHeight - this.height

    
    this.keys= keys

    this.bullets = []


    this.setListeners()
  }



  //******************************************     METODOS       *******************************************************************

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    // el jugador dibujara las balas
    this.bullets.forEach(bullet => bullet.draw()) 
  }

  move(){
    this.bullets.forEach( bullet => bullet.move())
  }
  

  setListeners() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
    
          // case 38: 
          // this.posY -= 10               // FUNCION MOVER EN TODAS DIRECCIONES
          // break;

          // case 40: 
          // this.posY +=10
          // break;

          case 37: 
          if(this.posX>0){
            this.posX -=  25
          }

          break;

          case 39:
            if(this.posX<this.CWidth - this.width){
              this.posX += 25
            }
          break;

          case 32:
          this.shoot()
          break; 
          }
      } 
    } 

    shoot() {

      //Instanciamos nuevas balas
      this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height, this.width))
      
    }
}
