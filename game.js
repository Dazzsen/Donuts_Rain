const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,

  insertCoin: undefined,
  fps: 60,
  obstacles: [],
  obstacles2: [],
  lifes: [],
  framesCounter: 0,
  score: undefined,  // aumenta score cada vez que rompe un donut
  

  keys : {
    //TOP_KEY: {key: 38, down : false},
    LEFT_KEY : {key: 37, down : false},
    RIGHT_KEY : {key: 39, down : false},
    SPACE: {key: 90, down : false},
  },



//////////////////////////////////////////////////////////////////////////////////////////////////////////


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

      document.getElementById("sim").play()
      this.clear()
      this.drawAll()
      this.moveAll()
      this.generateObstacles()


      this.clearObstaclesPlayer()
      this.clearObstaclesPlayer2()

      this.clearObstaclesBullet()
      this.clearObstaclesBullet2()
                 
                     
    }, 1000/this.fps)
  },




  reset: function () {
    this.background = new Background (this.ctx, this.width, this.height)
    this.player = new Player(this.ctx, this.width, this.height, this.keys)
    //this.bubble = new Obstacle(this.ctx, this.width, this.height)
    this.obstacles = []
    this.obstacles2 = []
    this.scoreboard = ScoreBoard
    this.scoreboard.init(this.ctx)
    this.isertCoin = InsertCoin
    this.score = 0
    this.lifes = []
    this.lifes.push(new Life(this.ctx, this.width, this.height, 50))
    this.lifes.push(new Life(this.ctx, this.width, this.height, 85))
    this.lifes.push(new Life(this.ctx, this.width, this.height, 120))
    this.lifes.push(new Life(this.ctx, this.width, this.height, 155))
    this.lifes.push(new Life(this.ctx, this.width, this.height, 190))
  },

  drawAll: function () {
    this.background.draw()
    this.obstacles.forEach( obs => obs.draw())
    this.obstacles2.forEach( obs2 => obs2.draw())
    this.drawLifes()
    this.player.draw()
    this.drawScore()
  }, 

  drawLifes: function(){
    this.lifes.forEach(life => life.draw())
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },



  generateObstacles: function() {
    if(this.framesCounter%300==0) {  
      //console.log(this.obstacles)
      this.obstacles.push(new Obstacle(this.ctx, this.canvas.width, this.canvas.height)) //pusheamos nuevos obstaculos
    }
  },



// BORRAR DONUTS QUE HAN TOCADO AL JUGADOR
  clearObstaclesPlayer: function() {      
    this.obstacles.forEach( (obs, idx) => {
      if(this.player.posX < obs.posX + obs.width &&
           this.player.posX + this.player.width > obs.posX &&
           this.player.posY < obs.posY + obs.height &&
           this.player.height + this.player.posY > obs.posY) {
            
        // BORRAR VIDA
        this.lifes.pop()
        this.obstacles.splice(idx, 1)
        document.getElementById("doh").play()
        //console.log('MUERTO GRANDE')

      } if (this.lifes.length <= 0){
      
        this.gameOver()
       ///////////////////////////////////////////7/////////////////////////////////////
      }
    })
  },


  clearObstaclesPlayer2: function() {      
    this.obstacles2.forEach( (obs, idx) => {
      if(this.player.posX < obs.posX + obs.width &&
           this.player.posX + this.player.width > obs.posX &&
           this.player.posY < obs.posY + obs.height &&
           this.player.height + this.player.posY > obs.posY) {


            this.lifes.pop()
            this.obstacles2.splice(idx, 1)
            document.getElementById("doh").play()
        //console.log('MUERTO PEQUEÑA')
      } if (this.lifes.length <= 0){
        //console.log('VACIO2')
        this.gameOver()
     
      }
    })
  },

   // borrar DONUTS GRANDES QUE HAN TOCADO LA BALA
    clearObstaclesBullet: function () {
    
        this.player.bullets.some((bullet, _idx) => {
      
          this.obstacles.some((obs, idx) => {
            
            if(obs.posX < bullet.posX + bullet.width &&
              obs.posX + obs.width > bullet.posX &&
              obs.posY < bullet.posY + bullet.height &&
              obs.height + obs.posY > bullet.posY){

                this.obstacles[idx]                      // el idx respresenta cada elemento del array
                let posX  = this.obstacles[idx].posX     //  ==>  //ESTO SERIA PARA DARLE LA POSICION DE LA BOLA GRANDE A LA PEQUEÑA
                let posY  =  this.obstacles[idx].posY    //
                
                this.obstacles.splice(idx, 1)
                this.player.bullets.splice(_idx, 1) 
                document.getElementById("eructo").play()
                //console.log('GRANDE')
                this.score += 15

                

                this.obstacles2.push(new Obstacle2(this.ctx, this.width, this.height, posX + 70, posY, 4))
                this.obstacles2.push(new Obstacle2(this.ctx, this.width, this.height, posX - 70, posY, -4))
                }
              })
            })
    },

    // borrar  DONUTS PEQUEÑOS QUE HAN TOCADO LA BALA
    clearObstaclesBullet2: function () {

        this.player.bullets.some((bullet, _idx) => {
      
          this.obstacles2.some((obs2, idx) => {
            
            if(obs2.posX < bullet.posX + bullet.width &&
              obs2.posX + obs2.width > bullet.posX &&
              obs2.posY < bullet.posY + bullet.height &&
              obs2.height + obs2.posY > bullet.posY){
              document.getElementById("bite").play()
              this.obstacles2.splice(idx, 1)
              this.player.bullets.splice(_idx, 1)
              this.score += 30
             
                }
              })
            })

    },



    


    // clearBullet: function () {
    //   this.player.bullets.forEach(()=>{
          
    //     this.obstacles.some(bullet => {
      
    //       this.player.bullets.some(obs => {
            
    //         if(obs.posX < bullet.posX + bullet.radius &&
    //           obs.posX + obs.width > bullet.posX &&
    //           obs.posY < bullet.posY + bullet.radius &&
    //           obs.height + obs.posY > bullet.posY){
    //             console.log('BORRA BALA')
    //             this.player.bullets.splice(idx, 1)
    //             }
    //           })
    //         })


    //   })

    // },


  


  moveAll(){
    this.player.move()
    this.player.moveP()
    this.obstacles.forEach(obs => obs.move())
    this.obstacles2.forEach(obs2 => obs2.move())
  },

  drawScore: function() {             //con esta funcion pintamos el marcador
    this.scoreboard.update(this.score)
  },
  
  gameOver: function() {              //Gameover detiene el juego.
    clearInterval(this.interval)
      this.ctx.font = "bold 150px chilanka"
      this.ctx.fillStyle = "yellow"
      this.ctx.textAlign = "center"
      this.ctx.fillText("INSERT COIN", window.innerWidth /2, (window.innerHeight/2) + 40)
      document.getElementById("sim").pause()
    }
      
  }


  // isCollisionBullet: function() {  
  //   // si alguna (.some) de estas bullets cumple las condiciones del if....
  //  // console.log(this.bubble.posX, bullet.posX, bullet.radius , this.bubble.width)
  //   this.player.bullets.some(bullet => {
      
  //     this.obstacles.some(obs => {
        
  //       if(obs.posX < bullet.posX + bullet.radius &&
  //         obs.posX + obs.width > bullet.posX &&
  //         obs.posY < bullet.posY + bullet.radius &&
  //         obs.height + obs.posY > bullet.posY){
  //         console.log('COLLISION')
  //           }
  //         })
  //       })
  //   },


    // isCollisionPlayer: function() {  

    //   this.obstacles.some( obs => {
  
    //     if(this.player.posX < obs.posX + obs.width &&
    //        this.player.posX + this.player.width > obs.posX &&
    //        this.player.posY < obs.posY + obs.height &&
    //        this.player.height + this.player.posY > obs.posY) {
    //       console.log('COLISION CON MUÑECO')
    //     }
  
    //   })
  
    // },


