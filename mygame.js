var myGamePiece;
var myObstacles=[];
var myScore;
function startGame() {
    myGamePiece = new Component(30, 30, "red", 10, 120);
    myScore = new Component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.canvas.style.cursor = "none";
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.frameNo = 0;
      this.interval = setInterval(updateGameArea, 15);
    //   window.addEventListener('mousemove', function (e) {
    //     myGameArea.x = e.pageX;
    //     myGameArea.y = e.pageY;
    //   })
      window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
      })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      }
  }


function Component(width, height, color, x, y,type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX=0;
    this.speedY=0;
    this.update = function(){
    ctx = myGameArea.context;
    if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
        }else{
         ctx.fillStyle = color;
         ctx.fillRect(this.x, this.y, this.width, this.height,this.rdius);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.clearPos = function() {
        if(this.x < 0) {this.x = 1;}else if(this.x > 449){this.x = 448};
        if(this.y < 0) {this.y = 1;}else if(this.y > 239){this.y = 238};
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
  }

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new Component(10, height, "green", x, 0));
        myObstacles.push(new Component(10, x - height - gap, "green", x, height + gap));
        // x = myGameArea.canvas.width;
        // y = myGameArea.canvas.height - 200
        // myObstacles.push(new Component(10, 200, "green", x, y));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
        myObstacles[i].newPos();
    }
    // if (myGameArea.x && myGameArea.y) {
    //     myGamePiece.x = myGameArea.x;
    //     myGamePiece.y = myGameArea.y;
    //   }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    moveKey();
    // myGamePiece.clearPos();
    // myGamePiece.x += 1;
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function moveKey() {
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    if (!myGameArea.key) stopMove();
}
function stopMove() {myGamePiece.speedX=0;myGamePiece.speedY=0;}
function moveUp() {myGamePiece.speedY = -1;}
function moveDown() {myGamePiece.speedY =1;}
function moveLeft() {myGamePiece.speedX =-1;}
function moveRight() {myGamePiece.speedX =1;}
  