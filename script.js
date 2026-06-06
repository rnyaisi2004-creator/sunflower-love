/* 🌻 PASSWORD */

let currentPassword = "";

/* 🌻 ELEMENTOS */

const dots =
document.querySelectorAll(".dot");

const passwordScreen =
document.getElementById("password-screen");

const transitionScreen =
document.getElementById("transition-screen");

const letterScreen =
document.getElementById("letter-screen");

const galleryScreen =
document.getElementById("gallery-screen");

/* 🌸 MOBILE */

const isMobile =
window.innerWidth < 768;

/* 🌸 CONFIG */

const FLOWER_COUNT =
isMobile ? 85 : 170;

const CELL_SIZE =
isMobile ? 150 : 190;

/* 🌻 ESCRIBIR */

function pressKey(number){

    if(currentPassword.length >= 4){
        return;
    }

    currentPassword += number;

    updateDots();
}

/* 🌻 BORRAR */

function deleteKey(){

    currentPassword =
    currentPassword.slice(0,-1);

    updateDots();
}

/* 🌻 DOTS */

function updateDots(){

    dots.forEach((dot,index)=>{

        if(index < currentPassword.length){

            dot.classList.add("filled");

        }else{

            dot.classList.remove("filled");
        }
    });
}

/* 🌻 ENVIAR */

function submitPassword(){

    if(currentPassword === "1511"){

        startFlowerTransition();

    }else{

        gsap.fromTo(
            ".password-container",

            {
                x:-10
            },

            {
                x:10,
                duration:0.08,
                repeat:5,
                yoyo:true
            }
        );

        currentPassword = "";

        updateDots();
    }
}

/* 🌸 CREAR FLORES */

function createFlowers(){

    transitionScreen.innerHTML = "";

    const flowers = [];

    for(let i = 0; i < FLOWER_COUNT; i++){

        const flower =
        document.createElement("img");

        const randomFlower =
        Math.floor(Math.random() * 11) + 1;

        flower.src =
        `flower${randomFlower}.png`;

        flower.classList.add("flying-flower");

        /* 🌻 tamaños */

        const size =
        isMobile
        ? gsap.utils.random(170,240)
        : gsap.utils.random(300,420);

        flower.style.width =
        `${size}px`;

        const side =
        Math.floor(Math.random() * 2);

        let startX;
        let startY;

        /* 🌻 lados */

        if(side === 0){

            startX = -500;

            startY =
            Math.random() * window.innerHeight;

        }else{

            startX =
            window.innerWidth + 500;

            startY =
            Math.random() * window.innerHeight;
        }

        gsap.set(flower,{

            x:startX,

            y:startY,

            rotation:
            gsap.utils.random(-180,180)
        });

        transitionScreen.appendChild(flower);

        flowers.push(flower);
    }

    return flowers;
}

/* 🌸 GRID */

function generateFlowerGrid(){

    const points = [];

    const cols =
    Math.ceil(window.innerWidth / CELL_SIZE) + 4;

    const rows =
    Math.ceil(window.innerHeight / CELL_SIZE) + 2;

    for(let row = 0; row < rows; row++){

        for(let col = -2; col < cols; col++){

            const offset =
            row % 2 === 0
            ? 0
            : CELL_SIZE / 2;

            points.push({

                x:
                col * CELL_SIZE + offset,

                y:
                row * CELL_SIZE - 100
            });
        }
    }

    gsap.utils.shuffle(points);

    return points;
}

/* 🌸 PRIMERA TRANSICIÓN */

function startFlowerTransition(){

    transitionScreen.style.display =
    "block";

    const flowers =
    createFlowers();

    const destinations =
    generateFlowerGrid();

    flowers.forEach((flower,index)=>{

        const target =
        destinations[index % destinations.length];

        gsap.to(flower,{

            x:target.x,

            y:target.y,

            rotation:
            `+=${gsap.utils.random(-360,360)}`,

            duration:
            gsap.utils.random(3.2,4.8),

            ease:"power3.inOut",

            stagger:0.002
        });
    });

    /* 🌸 mural completo */

    setTimeout(()=>{

        passwordScreen.style.display =
        "none";

        letterScreen.style.display =
        "flex";

        /* 🌸 reveal */

        setTimeout(()=>{

            gsap.to(".flying-flower",{

                y:
                window.innerHeight + 500,

                rotation:
                `+=${gsap.utils.random(-120,120)}`,

                duration:3.5,

                stagger:0.003,

                ease:"power3.in"

            });

            setTimeout(()=>{

                transitionScreen.style.display =
                "none";

            },3500);

        },500);

    },5200);
}

/* 💌 ABRIR CARTA */

function openLetter(){

    const letter =
    document.getElementById("letter");

    /* 🌻 abrir carta */

    letter.src =
    "letter-open.png";

    gsap.to(letter,{

        scale:1.08,

        duration:0.5,

        ease:"power2.out"
    });

    /* 🌸 FLORES OTRA VEZ */

    setTimeout(()=>{

        transitionScreen.style.display =
        "block";

        const flowers =
        createFlowers();

        const destinations =
        generateFlowerGrid();

        flowers.forEach((flower,index)=>{

            const target =
            destinations[index % destinations.length];

            gsap.to(flower,{

                x:target.x,

                y:target.y,

                rotation:
                `+=${gsap.utils.random(-360,360)}`,

                duration:
                gsap.utils.random(3.2,4.8),

                ease:"power3.inOut",

                stagger:0.002
            });
        });

        /* 🌸 mural completo */

        setTimeout(()=>{

            letterScreen.style.display =
            "none";

            galleryScreen.style.display =
            "flex";

            /* 🌸 reveal collage */

            setTimeout(()=>{

                gsap.to(".flying-flower",{

                    y:
                    window.innerHeight + 500,

                    rotation:
                    `+=${gsap.utils.random(-120,120)}`,

                    duration:3.5,

                    stagger:0.003,

                    ease:"power3.in"

                });

                setTimeout(()=>{

                    transitionScreen.style.display =
                    "none";

                },3500);

            },500);

        },5200);

    },900);
}

/* 🌻 MÚSICA */

function toggleMusic(){

    const music =
    document.getElementById("music");

    /* 🌻 segundo exacto */

    if(music.currentTime < 1){

        music.currentTime = 36;
    }

    if(music.paused){

        music.play();

    }else{

        music.pause();
    }
}
