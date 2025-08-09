const spravneTlacitko = document.querySelector(".spravne");
const spatneTlacitko  = document.querySelector(".spatne");
const bankTlacitko    = document.querySelector(".bank-tlacitko");
const bank            = document.querySelector(".bank")
var cerveneTlacitko = document.querySelector("#a0")
const MAX = "100 000";

function konec(penize) {
        document.body.innerHTML = `<h1 style='display: flex; align-items: center; justify-content: center; font-size: 8rem;'>Vyhrál jsi ${penize} Kč!</h1>`;
}

var timeoutHandle;
function countdown(minutes, seconds) {
    function tick() {
        var counter = document.querySelector(".timer");
        counter.innerHTML = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--;
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                setTimeout(() => {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
            else {
                konec(bank.innerHTML);
            }
        }
    }
    tick();
}

countdown(3, 00);
var audio = new Audio("Nejslabší máte padáka.mp3");
audio.play();

var level = 0;
spravneTlacitko.addEventListener("click", () => {
    level++;
    cerveneTlacitko.style.backgroundColor = "blue";
    if (level > 8) {
        audio.currentTime = 181.35;
        konec(MAX);
    } else {
        cerveneTlacitko = document.querySelector(`#a${level}`)
        cerveneTlacitko.style.backgroundColor = "red";
    }
});

spatneTlacitko.addEventListener("click", () => {
    level = 0;
    cerveneTlacitko.style.backgroundColor = "blue";
    cerveneTlacitko = document.querySelector(`#a${level}`)
    cerveneTlacitko.style.backgroundColor = "red";
});

bankTlacitko.addEventListener("click", () => {
    if (level > 0) {
        const predchoziTlacitko = document.querySelector(`#a${level-1}`);
        bank.innerHTML = parseInt(bank.innerHTML) + parseInt(predchoziTlacitko.innerHTML) + " 000";
        level = 0;
        cerveneTlacitko.style.backgroundColor = "blue";
        cerveneTlacitko = document.querySelector(`#a${level}`)
        cerveneTlacitko.style.backgroundColor = "red";
    }

    if (parseInt(bank.innerHTML) >= 100) {
        audio.currentTime = 181.35;
        konec(MAX);
    }
});
