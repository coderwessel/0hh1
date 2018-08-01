//misc/RowColGame.js

const RowColGame = {
    // constructor() {}
  
    copyGameData(gameData){ 
      const newBoard = [...gameData.board]
      const newLocked = [...gameData.locked]
      const newGameData = { 
            board: newBoard,
            locked: newLocked
        }
      return newGameData
    },

    createGame(rows,cols,numPieces,numLocked){
        let arr = []
        for(let i=0;i < rows;i++)
            for(let j=0;j < cols;j++)
            arr.push([i,j])
        arr.sort((a,b) => (0.5 - Math.random()))
        arr.sort((a,b) => (0.5 - Math.random()))
        const newLocked = []
        for(let i=0;i<numLocked;i++)newLocked.push(arr.pop())
     
        let newBoard=[]
        for(let i=0;i<rows;i++) newBoard.push([])
        
        //create valid board
        //top rows
        for(let i=0;i < numPieces;i++)
            for(let j=0;j < numPieces ;j++){
                newBoard[i].push(1)
                newBoard[i].push(2)
              }
        //bottom rows
        for(let i=numPieces;i < rows;i++)
          for(let j=0;j < numPieces ;j++){
              newBoard[i].push(2)
              newBoard[i].push(1)
            }
        
        //hussle the board        
        for(let a=0;a<4;a++)
          {
            //permute random row  
          let rnd=Math.floor(Math.random()*rows)
          let temp = newBoard[0]
          newBoard[0] = newBoard[rnd]
          newBoard[rnd] = temp 
            //permute random column
          rnd=Math.floor(Math.random()*cols)
          for(let i=0;i<rows;i++){
            let temp=newBoard[i][0]
            newBoard[i][0]=newBoard[i][rnd]
            newBoard[i][rnd]=temp
          }
        }

        return this.resetBoard({
                board: newBoard,
                locked: newLocked
            })
    },
    
    doMove(gameData , r , c){
      //alert(`here I would maybe update ${r},${c} in game ${this.props.match.params.id}`)
      const numPieces = 3
      const newGameData = this.copyGameData(gameData)
      if (newGameData.locked.some( (a) => a[0]===r && a[1]===c )) return newGameData
      else {
        newGameData.board[r][c] += 1
        if (newGameData.board[r][c] >= numPieces) newGameData.board[r][c]=0
        return newGameData
      }
    },
  
    resetBoard(gameData) {
      const numRows=gameData.board.length
      const numCols=gameData.board[0].length
      
      const newGameData = this.copyGameData(gameData)
      for(let r=0;r<numRows;r++){
        for(let c=0;c<numCols;c++){ 
          if (!newGameData.locked.some( (a) => a[0]===r && a[1]===c ))newGameData.board[r][c]=0
        }
      }
      return newGameData
    },
  
    calculateGameLogic(gameData){
      const numRows = gameData.board.length
      const numCols = gameData.board[0].length
      const maxDuplicatesPerCol = 3 
      const maxDuplicatesPerRow = 3
      const numPieces = 3
      let complete=0
      let numErrors=0
      let validRows=[]
      let validCols=[]
      for (let i=0;i<numPieces;i++){
          validRows.push([])
          validCols.push([])
        }
  
      for (let i=0;i<numPieces;i++)
        for (let r=0;r<numRows;r++)
          validRows[i][r]=true
      
      for (let i=0;i<numPieces;i++)
        for (let c=0;c<numCols;c++)
          validCols[i][c]=true
      
      for(let piece=1;piece<numPieces;piece++){
        for(let row=0;row<numRows;row++){
          validRows[piece][row] = 
              gameData.board[row].filter(val=>val===piece).length <= maxDuplicatesPerRow    
        }
      }
        //tranpose the board to check for invalid columns
      const transboard = gameData.board[0].map((col1, i) => gameData.board.map(row1 => row1[i]));
      // console.log(transboard)
      for(let piece=1;piece<numPieces;piece++){
        for(let col=0;col<numCols;col++){
          validCols[piece][col] = 
              transboard[col].filter(val=>val===piece).length <= maxDuplicatesPerCol    
        }
      } 
    
      for (let i=0;i<numRows;i++) complete += gameData.board[i].filter(cell=>cell!=0).length
      complete = Math.floor((complete/36)*100)
  
      for (let i=0;i<numPieces;i++) numErrors += validRows[i].filter(valid=>!valid).length
      for (let i=0;i<numPieces;i++) numErrors += validCols[i].filter(valid=>!valid).length
      
          // if(complete===100 && numErrors===0)this.props.finishGame()
      const newGameLogic = {validRows:validRows,
                            validCols: validCols,
                          complete: complete,
                        numErrors: numErrors }
      return newGameLogic
    }
  }
  
  export default RowColGame