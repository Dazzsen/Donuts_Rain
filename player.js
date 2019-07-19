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

    this.gravity = .4

    this.velX = 0

    this.velY = 0

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

  moveP(){
    this.posX < window.innerWidth + this.width ? this.velX = 0 : null

    if(this.keys.RIGHT_KEY.down && this.posX <= this.CWidth - this.width){
      this.posX += 15
      this.velX += 1
    }

    if(this.keys.LEFT_KEY.down && this.posX > 0) {
      this.posX -= 15
      this.velX -= 1
    }

    if(this.keys.SPACE.down)
      this.shoot()
  }
  

  setListeners() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {

          case this.keys.RIGHT_KEY.key:
            this.keys.RIGHT_KEY.down = true
          break;

          case this.keys.LEFT_KEY.key:
              this.keys.LEFT_KEY.down = true
            break;

          case this.keys.SPACE.key:
          this.shoot()
         break; 
          }
      } 

      document.onkeyup = (e) => {
        switch (e.keyCode){
          // case this.keys.TOP_KEY.key:
          //   this.keys.TOP_KEY.down = false
          // break;

          case this.keys.RIGHT_KEY.key:
            this.keys.RIGHT_KEY.down = false
          break;

          case this.keys.LEFT_KEY.key:
            this.keys.LEFT_KEY.down = false
          break;

         

          
        }
      }
    } 


    // setListeners2() {
    //   document.onkeydown = (e) => {
    //     switch (e.keyCode) {
  
    //         case 32:
    //         this.shoot()
    //         break; 
    //         }
    //     } 
    //   } 

    shoot() {

      //Instanciamos nuevas balas
      this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height, this.width))
      
    }
}
