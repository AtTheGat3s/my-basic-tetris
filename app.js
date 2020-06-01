document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')   // talk to grid class
    let squares = Array.from(document.querySelectorAll('.grid div')) // collect all 200 divs in our grid class
    const ScoreDisplay = document.querySelector('#score') // talk to score ID
    const StartBtn = document.querySelector('#start-button') // talk to start-button ID
    const width = 10;

    console.log(squares)

    //The five Tetrominoes with their four rotations
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    
    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]
    
      const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

      let currentPosition = 4
      let currentRotation = 0

      //randomly select a Tetromino in its first rotation
      let random = Math.floor(Math.random() * theTetrominoes.length)
      let current = theTetrominoes[random][currentRotation]

      //draw the first rotation 
      function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
      }

      //undraw the tetromino
      function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
      }

      //make the tetromino move down every second
      timerId = setInterval(moveDown, 1000)

      //assign functions to keyCodes
      function control(e) {
          if(e.keyCode === 37) {
              moveLeft()
          } else if (e.keyCode === 38) {
            //rotate()
          } else if (e.keyCode === 39) {
            //moveRight()
          } else if (e.keyCode === 40) {
            //moveDown()
          }
      }
      document.addEventListener('keyup', control)

      function moveDown() {
          undraw()
          currentPosition += width
          draw()
          freeze()
      }

      function freeze() {
          if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            //start new Tetromino falling
            let random = Math.floor(Math.random() * theTetrominoes.length())
            let current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
          }
      }

      //move the tetromino left, unless it is at the edge or there is another tetromino
      function moveLeft() {
          undraw()
          const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

          if(!isAtLeftEdge) currentPosition -= 1

          if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
              currentPosition += 1
          }

          draw()
      }
    
})