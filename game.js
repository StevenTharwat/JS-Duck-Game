function getRandom(min, max) {
    if(min> max) return -1;
    // return Math.ceil( Math.random() * max)
    return Math.ceil( (Math.random() * (max-min))+min)
}

let levelH2;
let gun;
let target;
let scoreH2;
let duck;
let load;
let level = 1;
let score = 0;
let bullets = 5;
let HighScore = 0;
let isHunted = false;
let speed = 1500;
let screenHaveWidth = window.innerWidth/2;
let screenHeight = window.innerHeight;
const gameMusic = new Audio('sounds/game.mp3');
gameMusic.loop = true; 
gameMusic.volume = 0.5;
const gunMusic = new Audio('sounds/gun2.mp3');
const loadMusic = new Audio('sounds/load.mp3');


window.addEventListener("resize", function() {
    screenHeight = window.innerHeight;
    screenHaveWidth = window.innerWidth/2;
});


let x;
let y;
let deg;
let speedInterval ;

function setDuckInterval(speed) {
    speedInterval = window.setInterval(function (e) {
        duck.style.display = 'block';
        isHunted = false;
        duck.style.left = `${getRandom(duck.offsetWidth,screenHaveWidth*2)-duck.offsetWidth}px`;
        duck.style.top = `${getRandom(duck.offsetHeight,screenHeight)-duck.offsetHeight}px`;
        levelH2.innerText = level
        scoreH2.innerText = score
    },speed)
}

function changeSpeed(newSpeed) {
    clearInterval(speedInterval);
    setDuckInterval(parseInt(newSpeed));
    console.log(`changeSpeed from ${speed} to ${newSpeed}`);
}

window.addEventListener('load',function (e) {
    HighScore = parseInt(this.localStorage.getItem('HighScore'))
    if(isNaN(HighScore)) {
        HighScore = 0;
    }
    levelH2 = this.document.getElementsByClassName('level')[0];
    scoreH2 = this.document.getElementsByClassName('score')[0];
    bulletsH2 = this.document.getElementsByClassName('bullets')[0];
    HighScoreH2 = this.document.getElementsByClassName('HighScore')[0];
    HighScoreH2.innerText = HighScore;
    gun = this.document.getElementsByClassName('gun')[0];
    target = this.document.getElementsByClassName('target')[0];
    duck = this.document.getElementsByClassName('duck')[0];
    load = this.document.getElementsByClassName('load')[0];
    gun.style.left = screenHaveWidth-(gun.offsetWidth/2)+"px";

    window.addEventListener('mousemove', function(e){
        y = screenHeight - e.clientY;
        console.log(e.clientX+", "+e.clientY);
        x = e.clientX - screenHaveWidth;
        console.log();
        deg = Math.atan(x/y) * (180/Math.PI);
        // console.log("deg:"+deg);
        gun.style.rotate = deg+"deg";
        
        target.style.top = (e.clientY - (target.offsetHeight/2))+"px";
        target.style.left = (e.clientX - (target.offsetWidth/2))+"px";
    });

    duck.addEventListener('click',function(e){
        if(!isHunted && bullets>0){
            isHunted=true;
            score++;   
            if(score > HighScore){
                HighScore = score;
                localStorage.setItem('HighScore',HighScore);
                HighScoreH2.innerText = HighScore;

            } 
            gunMusic.pause();
            gunMusic.play();
            bullets--;
            bulletsH2.innerText = bullets;
            scoreH2.innerText = score;
            levelH2.innerText = level = parseInt(score/10)+1;
            duck.style.display = 'none';
            if(score % 10 == 0) {
                changeSpeed(speed-(level*100))
            };
        }
        gameMusic.play();
    })
    
    load.addEventListener('click',function(e){
        loadMusic.play()
        if(bullets < 5){
            bullets = 5;
            bulletsH2.innerText = bullets;
        }
    })

    setDuckInterval(speed);
});