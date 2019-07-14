//MINECRAFT: Creeper Sweeper (Minesweeper) - clear grid of dirt, but don't uncover
//a creeper!  Cells are divs manipulated with DOM, state is altered with array of
//state objects

const rows = 8;
const cols = 8;
let state = [];
const numberOfBombs = 10;
let bombsLeft;
let interval;
let clickTimer;
let mouseDown = false;
let sound = true;
let images = {
  nearby1: "url(scripts/minesweeper/images/1.png)",
  nearby2: "url(scripts/minesweeper/images/2.png)",
  nearby3: "url(scripts/minesweeper/images/3.png)",
  nearby4: "url(scripts/minesweeper/images/4.png)",
  nearby5: "url(scripts/minesweeper/images/5.png)",
  nearby6: "url(scripts/minesweeper/images/6.png)",
  nearby7: "url(scripts/minesweeper/images/7.png)",
  nearby8: "url(scripts/minesweeper/images/8.png)",
  nearby0: "url(scripts/minesweeper/images/dirt.png)",
  flag: "url(scripts/minesweeper/images/redstone.png)",
  unselected: "url(scripts/minesweeper/images/stone.png)",
  bomb: "url(scripts/minesweeper/images/creeper.png)",
  bombflag: "url(scripts/minesweeper/images/creeperflagged.png)",
  bombexplode: "url(scripts/minesweeper/images/creeperexplode.png)",
  break0: "url(scripts/minesweeper/images/stone0.png)",
  break1: "url(scripts/minesweeper/images/stone1.png)",
  break2: "url(scripts/minesweeper/images/stone2.png)",
  break3: "url(scripts/minesweeper/images/stone3.png)",
  break4: "url(scripts/minesweeper/images/stone4.png)",
  break5: "url(scripts/minesweeper/images/stone5.png)",
  break6: "url(scripts/minesweeper/images/stone6.png)",
  break7: "url(scripts/minesweeper/images/stone7.png)",
  break8: "url(scripts/minesweeper/images/stone8.png)",
  break9: "url(scripts/minesweeper/images/stone9.png)",
}

let sounds = {
  creepersound: "scripts/minesweeper/sounds/creeper.mp3",
  break1: "scripts/minesweeper/sounds/stone1.ogg",
  break2: "scripts/minesweeper/sounds/stone2.ogg",
  break3: "scripts/minesweeper/sounds/stone3.ogg",
  reveal: "scripts/minesweeper/sounds/stone4.ogg",
  flag: "scripts/minesweeper/sounds/wet_grass1.ogg"
}

let canvasReset = `<div id="gameoversplash">
</div>
<div id="gameover">
  <h1 id="winlose">Game Over!</h1>
  <h3 id="playagain">Play Again</h3>
</div>`;

var soundtoggle = document.getElementById("soundtoggle");
soundtoggle.addEventListener("click", event => {
  sound = !sound;
  console.log(sound);
  soundtoggle.innerHTML = `Sound: ${sound?"On":"Off"}`;
});

runGame()

function runGame() {
  createGUI();
  createState();
  setBombs();
  setNearby()
}

function newGame() {
  console.log("new game");
  var gameoverdiv = document.getElementById("gameover");
  var gameoversplash = document.getElementById("gameoversplash");
  gameoversplash.style.display = "none";
  gameoverdiv.style.display = "none";
  state = [];
  let canvas = document.getElementById("minesweeper-canvas");
  canvas.innerHTML=canvasReset;
  runGame();
}

function createGUI() {

  var canvas = document.getElementById("minesweeper-canvas");
  var bombsleftelement = document.getElementById("bombsleft");


  canvas.style.width = canvas.offsetWidth + "px";
  canvas.style.height = canvas.offsetWidth + "px";
  let canvasWidth = canvas.offsetWidth;
  let canvasHeight = canvas.offsetHeight;

  canvas.style.margin = "0";
  canvas.style.display = "grid";
  canvas.style.gridGap = "1px";

  bombsleft = numberOfBombs;
  bombsleftelement.innerHTML = `Creepers Left: ${bombsleft}`;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = document.createElement("div");
      canvas.appendChild(cell);


      cell.id = `x${i}y${j}`;
      cell.classList.add("cell");
      cell.style.background = images.unselected;

      cell.style.gridColumn = i + 1;
      cell.style.gridRow = j + 1;

    cell.addEventListener("touchstart", event => {
        blockBreak(cell.id);
      });
      cell.addEventListener("touchend", event => {
        stopBreak(cell.id);
      });
      cell.addEventListener("mousedown", event => {
        blockBreak(cell.id);
      });
      cell.addEventListener("mouseup", event => {
        stopBreak(cell.id);
      });
    }
  }
}

function createState() {

  for (let i = 0; i < cols; i++) {
    let row = [];
    state.push(row);
    for (let j = 0; j < rows; j++){
      row.push({breaks: 0,x: i, y: j, bomb: false, flag: false,
         revealed: false, nearby: 0, id: `x${i}y${j}`});

    }
  }
}

function setBombs() {

  let bombs = numberOfBombs;
  while(bombs > 0){
    let bombX = Math.floor(Math.random() * cols);
    let bombY = Math.floor(Math.random() * rows);
    if (!state[bombX][bombY].bomb) {
      state[bombX][bombY].bomb = true;
      bombs--;
    }
  }
}

function setNearby() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++){
      if (!state[i][j].bomb){
        let count = 0;
        if (i > 0 && state[i-1][j].bomb) count++;
        if (i > 0 && j > 0 && state[i-1][j-1].bomb) count++;
        if (j > 0 && state[i][j-1].bomb) count++;
        if (i < cols-1 && j > 0 && state[i+1][j-1].bomb) count++;
        if (i < cols - 1 && state[i+1][j].bomb) count++;
        if (i < cols - 1 && j < rows - 1 && state[i+1][j+1].bomb) count++;
        if (j < rows - 1 && state[i][j+1].bomb) count++;
        if (i > 0 && j < rows - 1 && state[i-1][j+1].bomb)count++;
        state[i][j].nearby = count;
      }
    }
  }

}

function blockBreak(id) {
  mouseDown = true;
  event.preventDefault();
  let cell = document.getElementById(id);
  let x = id.match(/[0-9]+/g)[0], y = id.match(/[0-9]+/g)[1];
  let cellstate = state[x][y];

  cellstate.breaks = 0;
  if (!cellstate.flag && !cellstate.revealed) {
    clickTimer = setTimeout(() => {
      interval = window.setInterval(() => {
        if(mouseDown) {
          cell.style.background = images[`break${cellstate.breaks}`];

          cellstate.breaks++;
        }
        if (cellstate.breaks > 9) {
          //reveal block, remove listeners
          window.clearInterval(interval);
          cell.removeEventListener("touchend", event => {
            stopBreak(cell.id);
          });
          cell.removeEventListener("mouseup", event => {
            stopBreak(cell.id);
          });
          reveal(x,y,false);
        }
      }, 75);

    },400);
    cellstate.breaks = 0;

  }
}

function stopBreak(id) {
  mouseDown = false;
  window.clearInterval(interval);
  clearTimeout(clickTimer);
  let x = id.match(/[0-9]+/g)[0], y = id.match(/[0-9]+/g)[1];

  let cell = document.getElementById(id);
  if (!state[x][y].revealed){
    if (state[x][y].breaks == 0) {
      flag(id);
    } else if (state[x][y].breaks > 0){
      window.clearInterval(interval);
      cell.style.background = images.unselected;
    }
  }
  state[x][y].breaks = 0;

}

function flag(id) {
  clearInterval(interval);
  let cell = document.getElementById(id);
  var bombsleftelement = document.getElementById("bombsleft");
  let x = id.match(/[0-9]+/g)[0], y = id.match(/[0-9]+/g)[1];
  state[x][y].breaks = 0;

  let flagsound = new Audio(sounds.flag);
  if(sound) flagsound.play();

  if (!state[x][y].revealed && !state[x][y].flag) {
    state[x][y].flag = true;
    cell.style.background = images.flag;
    bombsleft--;
    bombsleftelement.innerHTML = `Creepers Left: ${bombsleft}`;
  } else if (!state[x][y].revealed && state[x][y].flag) {
    state[x][y].flag = false;
    cell.style.background = images.unselected;
    bombsleft++;
    bombsleftelement.innerHTML = `Creepers Left: ${bombsleft}`;
  }

}

function reveal (x,y, gameover) {
  let cellstate = state[x][y];
  if (!cellstate.revealed) {
    let cell = document.getElementById(cellstate.id);
    cellstate.revealed = true;
    if (cellstate.bomb) {
      cell.style.background = images.bomb;
      if(!gameover) {
        gameOver(x,y);
      }
    }
    else if (cellstate.nearby > 0) {cell.style.background = images["nearby"+cellstate.nearby];}
    else if (cellstate.nearby == 0) {
      cell.style.background = images.nearby0;
      revealnearby(x,y);
    }
    checkWin();
  }
}

function bombFlag(state) {
  let x = state.x, y = state.y;
  let cell = document.getElementById(`x${x}y${y}`);
  cell.style.background = images.bombflag;
}

function revealnearby(x,y) {
  x = parseInt(x);
  y = parseInt(y);
  if (x > 0)reveal(x-1,y,false);
  if (x > 0 && y > 0) reveal(x-1,y-1,false);
  if (y > 0) reveal(x,y-1,false);
  if (x < cols - 1 && y > 0) reveal(x+1,y-1,false);
  if (x < cols - 1)reveal(parseInt(x)+1,y,false);
  if (x < cols - 1 && y < rows - 1) reveal(x+1,y+1,false);
  if (y < rows - 1) reveal(x,y+1,false);
  if (x > 0 && y < rows - 1) reveal(x-1,y+1,false);
}

function gameOver(x,y) {
  let opacity = 1.0;
  var canvas = document.getElementById("minesweeper-canvas");
  var gameoverdiv = document.getElementById("gameover");
  var gameoversplash = document.getElementById("gameoversplash");
  var playagain = document.getElementById("playagain");
  let cell = document.getElementById(`x${x}y${y}`);
  let toggle = false;
  let counter = 0;

  let creepersound = new Audio(sounds.creepersound);
  if (sound) creepersound.play();

  let countdown = setInterval(() => {
    if (!toggle){
      cell.style.background = images.bombexplode;
    } else {
      cell.style.background = images.bomb;
    }

    toggle = !toggle;
    counter++;
    if(counter >= 20){
      clearInterval(countdown);
    }
  },150)
  let countdowndelay = setTimeout(() => {
  gameoversplash.style.display = "block";
  gameoverdiv.style.display = "block";
  playagain.addEventListener("click", event => {
    newGame();
  })
  state.map(a => a.map(b => {
    if (b.bomb) reveal(b.x,b.y,true);
    if (b.bomb && b.flag) bombFlag(b);
  }));
  let timer = setTimeout(() => {
    let i = setInterval(() => {
      if (opacity > .5){
        gameoversplash.style.opacity = opacity - .05;
        opacity -= .01;
      }
    },100);
  },1000);
},3000);
}

function checkWin() {
  let notbombs = (rows * cols) - numberOfBombs;
  let counter = 0;
  for(let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (state[i][j].revealed) counter++;
    }
  }

  if (counter == notbombs) {
    win();
  }
}

function win() {
  let winlose = document.getElementById("winlose");
  winlose.innerHTML = "You Win!";
  gameOver();
}
