const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,


  fps: 60,
  obstacles: [],
  framesCounter: 0,


  keys : {
    LEFT_KEY : 37,
    RIGHT_KEY : 39,
    SPACE: 32
  },




  init: function() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.width = window.innerWidth * .98
    this.height = window.innerHeight * .98
    this.canvas.width = this.width 
    this.canvas.height = this.height 
    this.start()
  },

  start: function () {
    this.reset()

    this.interval = setInterval(()=>{  

      this.framesCounter++ 
      if(this.framesCounter > 1000) this.framesCounter = 0


      this.clear()
      this.drawAll()
      this.moveAll()
      this.generateObstacles()


      this.clearObstacles()
      this.isCollisionBullet()
      this.isCollisionPlayer()
                 
                     
    }, 1000/this.fps)
  },


  reset: function () {
    this.background = new Background (this.ctx, this.width, this.height)
    this.player = new Player(this.ctx, this.width, this.height, this.keys)
    //this.bubble = new Obstacle(this.ctx, this.width, this.height)
    this.obstacles = []
  },

  drawAll: function () {
    this.background.draw()
    this.player.draw()
    this.obstacles.forEach( obs => obs.draw())
  }, 



  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },



  generateObstacles: function() {
    if(this.framesCounter%300==0) {  
      console.log(this.obstacles)
      this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.player.posY0, this.player.height)) //pusheamos nuevos obstaculos
    }
  },


  clearObstacles: function() {        //funcion para limpiar obs
    this.obstacles.forEach( (obs, idx) => {
      if(obs.posY>this.height) {
        this.obstacles.splice(idx, 1)
        console.log('BORRAR')
      } 
    })
  },


  moveAll(){
    this.player.move()
    this.obstacles.forEach(obs => obs.move())
  },


  isCollisionBullet: function() {  
    // si alguna (.some) de estas bullets cumple las condiciones del if....
   // console.log(this.bubble.posX, bullet.posX, bullet.radius , this.bubble.width)
    this.player.bullets.some(bullet => {
      
      this.obstacles.some(obs => {
        
        if(obs.posX < bullet.posX + bullet.radius &&
          obs.posX + obs.width > bullet.posX &&
          obs.posY < bullet.posY + bullet.radius &&
          obs.height + obs.posY > bullet.posY){
          console.log('COLLISION')
            }
          })
        })
    },


    isCollisionPlayer: function() {  

      this.obstacles.some( obs => {
  
        if(this.player.posX<obs.posX + obs.width &&
           this.player.posX+this.player.width > obs.posX &&
           ) {
          console.log('COLISION CON MUÑECO')
        }
  
      })
  
    },

  


}

