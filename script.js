/* ===================================================
   ELEMENT
=================================================== */

const screens = document.querySelectorAll(".screen");

const cover = document.getElementById("cover");
const pinPage = document.getElementById("pinPage");
const letterPage = document.getElementById("letterPage");
const questionPage = document.getElementById("questionPage");
const successPage = document.getElementById("successPage");
const datePage = document.getElementById("datePage");
const finishPage = document.getElementById("finishPage");

const playBtn = document.getElementById("playBtn");

const music = document.getElementById("bgMusic");

const dots = document.querySelectorAll("#pinDots span");

const numbers = document.querySelectorAll(".num");

const clearBtn = document.getElementById("clear");

const nextBtn = document.getElementById("nextBtn");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

const continueBtn = document.getElementById("continueBtn");

const submitBtn = document.getElementById("submitBtn");

const restartBtn = document.getElementById("restartBtn");

const textarea = document.getElementById("dateInput");

let pin = "";

const correctPin = "3107";

/* =========================================
   TYPEWRITER
========================================= */

const typing = document.querySelector(".typing");
const coverName = document.querySelector(".cover-name");

const text = `I made this website
just for u`;

let index = 0;

typing.textContent = "";

function typeWriter() {

    if (index < text.length) {

        typing.textContent += text.charAt(index);

        index++;

        setTimeout(typeWriter, 80);

    } else {

        setTimeout(() => {

            coverName.classList.add("show");

        }, 400);

    }

}

window.addEventListener("load", () => {

    typeWriter();

});

/* ===================================================
   CHANGE PAGE
=================================================== */

function showPage(page){

screens.forEach(screen=>{

screen.classList.remove("active");

});

page.classList.add("active");

}


/* ===================================================
   OPEN WEBSITE
=================================================== */

playBtn.addEventListener("click",()=>{

music.play();

showPage(pinPage);

});


/* ===================================================
   FLOATING HEART
=================================================== */

const heartContainer =
document.querySelector(".floating-hearts");

function createHeart(){

const heart =
document.createElement("span");

heart.innerHTML="🤍";

heart.style.left=
Math.random()*100+"vw";

heart.style.fontSize=
(14+Math.random()*18)+"px";

heart.style.animationDuration=
(6+Math.random()*5)+"s";

heartContainer.appendChild(heart);

setTimeout(()=>{

heart.remove();

},11000);

}

setInterval(createHeart,450);


/* ===================================================
   PIN INPUT
=================================================== */

numbers.forEach(button=>{

button.addEventListener("click",()=>{

if(pin.length>=4) return;

pin += button.innerText;

updateDots();

checkPin();

});

});


/* ===================================================
   UPDATE DOT
=================================================== */

function updateDots(){

dots.forEach((dot,index)=>{

if(index<pin.length){

dot.classList.add("active");

}else{

dot.classList.remove("active");

}

});

}


/* ===================================================
   CLEAR
=================================================== */

clearBtn.addEventListener("click",()=>{

pin="";

updateDots();

});


/* ===================================================
   CHECK PIN
=================================================== */

function checkPin(){

if(pin.length!==4) return;

if(pin===correctPin){

setTimeout(()=>{

showPage(letterPage);

},500);

}

}/* ===================================================
   PIN SALAH
=================================================== */

function wrongPin(){

    pinPage.classList.add("shake");

    if(navigator.vibrate){

        navigator.vibrate(300);

    }

    Swal.fire({

        icon:"error",

        title:"PIN Salah!",

        text:"Coba lagi ya 🤍",

        confirmButtonColor:"#ff5ea8",

        confirmButtonText:"OK"

    }).then(()=>{

        pin="";

        updateDots();

    });

    setTimeout(()=>{

        pinPage.classList.remove("shake");

    },500);

}


/* ===================================================
   CHECK PIN (REPLACE)
=================================================== */

function checkPin(){

    if(pin.length!==4) return;

    if(pin===correctPin){

        setTimeout(()=>{

            showPage(letterPage);

        },500);

    }else{

        wrongPin();

    }

}


/* ===================================================
   NEXT
=================================================== */

nextBtn.addEventListener("click",()=>{

    showPage(questionPage);

});


/* ===================================================
   NO BUTTON
=================================================== */

const positions = [
    { top: "15%", left: "10%" },
    { top: "15%", left: "65%" },
    { top: "40%", left: "20%" },
    { top: "40%", left: "65%" },
    { top: "65%", left: "10%" },
    { top: "65%", left: "65%" },
    { top: "80%", left: "35%" },
    { top: "25%", left: "40%" }
];

let currentPos = -1;

noBtn.style.position = "fixed";

function moveNoButton(){

    let next;

    do{
        next = Math.floor(Math.random() * positions.length);
    }while(next === currentPos);

    currentPos = next;

    noBtn.style.top = positions[currentPos].top;
    noBtn.style.left = positions[currentPos].left;
}

/* Desktop */
noBtn.addEventListener("mouseenter", moveNoButton);

/* Mobile */
noBtn.addEventListener("touchstart", (e)=>{
    e.preventDefault();
    moveNoButton();
});

/* ===================================================
   YES BUTTON
=================================================== */

yesBtn.addEventListener("click",()=>{

    yesBtn.classList.add("bounce");

    burstConfetti();

    setTimeout(()=>{

        showPage(successPage);

    },2200);

});


/* ===================================================
   CONFETTI FROM BUTTON
=================================================== */

function burstConfetti(){

    const rect=yesBtn.getBoundingClientRect();

    const x=(rect.left+rect.width/2)/window.innerWidth;

    const y=(rect.top+rect.height/2)/window.innerHeight;

    confetti({

        particleCount:150,

        spread:80,

        startVelocity:45,

        origin:{

            x:x,

            y:y

        }

    });

    }

/* ===================================================
   CONTINUE
=================================================== */

continueBtn.addEventListener("click",()=>{

    showPage(datePage);

});


/* ===================================================
   SUBMIT
=================================================== */

submitBtn.addEventListener("click",()=>{

    if(textarea.value.trim()===""){

        Swal.fire({

            icon:"warning",

            title:"Oops...",

            text:"Jawab dulu yaa 🤍",

            confirmButtonColor:"#ff5ea8"

        });

        return;

    }

    Swal.fire({

        icon:"success",

        title:"Berhasil!",

        html:`

        Jawaban kamu sudah dikirim 🤍
        <br><br>
        Jangan lupa screenshot
        terus kirim ke Ezra yaa.

        `,

        confirmButtonColor:"#ff5ea8",

        confirmButtonText:"Oke"

    }).then(()=>{

        showPage(finishPage);

    });

});


/* ===================================================
   FINISH
=================================================== */

restartBtn.addEventListener("click",()=>{

    location.reload();

});


/* ===================================================
   ENTER SUPPORT
=================================================== */

textarea.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && e.ctrlKey){

        submitBtn.click();

    }

});


/* ===================================================
   BUTTON RIPPLE
=================================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",()=>{

        button.style.transform="scale(.95)";

        setTimeout(()=>{

            button.style.transform="";

        },120);

    });

});


/* ===================================================
   AUTO SCROLL LETTER
=================================================== */

const letterText=document.querySelector(".letter-text");

if(letterText){

    let alreadyScroll=false;

    letterPage.addEventListener("click",()=>{

        if(alreadyScroll) return;

        alreadyScroll=true;

        letterText.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    });

}


/* ===================================================
   PREVENT DOUBLE TAP ZOOM
=================================================== */

let lastTouch=0;

document.addEventListener("touchend",(e)=>{

    const now=new Date().getTime();

    if(now-lastTouch<=300){

        e.preventDefault();

    }

    lastTouch=now;

},{passive:false});


/* ===================================================
   MUSIC LOOP SAFETY
=================================================== */

music.volume=0.8;

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        music.play().catch(()=>{});

    }

});


/* ===================================================
   END
=================================================== */

console.log("Website For Lia 🤍");

/* ===================================================
   START TYPEWRITER
=================================================== */

window.addEventListener("load",()=>{

    typeWriter();

});
