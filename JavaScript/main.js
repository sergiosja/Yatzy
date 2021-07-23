/* Dice relevant */
const diceroller = document.querySelector("#diceroller");
const die = document.getElementsByClassName("die");
const dievalues = [0, 0, 0, 0, 0, 0];
const locked = [false, false, false, false, false, false];

/* Categories relevant */
const categories = document.getElementsByClassName("categories");
const category = document.getElementsByClassName("category");
const finished = [0, 0, 0, 0, 0, 0];

/* Modal relevant */
const modal = document.querySelector("#modal")
const sumbutton = document.querySelector("#sumbutton")
const helpermodal = document.querySelector("#helper-modal")
const modalhelp = document.querySelector("#modal-helper-text")
const modalhelpoptions = ["These add the respective sum of all die showing the value 1, 2, 3, 4, 5 and 6. <br> <br> \
                          If you manage a combined score of 84 from these (4 of each), you will get an additional \
                          bonus of 50 points!",

                          "These add the respective sum of die showing one, two and three pairs.",

                          "These add the respective sum of die showing three, four and five kinds of the same value.",

                          "Small straight adds 15 points if your die include 1, 2, 3, 4 and 5. <br> \
                          Big straight adds 20 points if your die include 2, 3, 4, 5 and 6. <br> \
                          Full straight adds 21 points if your die include 1, 2, 3, 4, 5 and 6. <br> \
                          The combinations do not need to be ordered, and die showing [1, 2, 3, 4, 5] \
                          and [5, 3, 1, 4, 2] are equally valid 15 points.",

                          "Cottage adds the sum of a 'one pair' and a 'three of a kind'. <br> \
                          Villa adds the sum of two 'three of a kind's. <br> \
                          Tower adds the sum of a 'one pair' and a 'four of a kind'. <br> <br> \
                          It goes without saying that the combination values have to be different. The highest \
                          attainable value for a villa is 33 (6x3 + 5x3) rather than 36 (6x6).",

                          "Chance adds the sum of all die, a useful option if you cannot fulfill any other option. <br> \
                          Yatzy adds the sum of all die if they are similar, and throws a 100 point bonus on top of that. <br> \
                          Straight Flush is an ordered 'big straight' (1, 2, 3, 4, 5, 6). It gives a fixed 150 points."
                        ]

/* Total sum and bonus */
let totalsum = 0;
let bonus = 0;

/* Die rolls */
const dierollmsg = document.querySelector("#dieroll-msg");
let remainingrolls = 3;
let rolled = 0;


/* Roll dice */
function rolldice() {
    if (remainingrolls < 1) {
        dierollmsg.innerHTML = "No rolls left.";
        return;
    }

    rolled++;
    remainingrolls--;
    dierollmsg.innerHTML = remainingrolls == 1 ? "Rolled the dice, 1 roll left." :
                           remainingrolls == 0 ? "Rolled the dice, no rolls left." :
                           "Rolled the dice, " + remainingrolls + " rolls left.";

    for (let i = 0; i < 6; i++) {
        if (!locked[i]) {
            die[i].value = Math.ceil(Math.random()*6);
            die[i].innerHTML = die[i].value;
            dievalues[i] = die[i].value;
        }
    }
}


/* Lock die */
function lock(index) {
    locked[index] = locked[index] ? false : true
    die[index].classList.toggle("locked")
}


/* Unlocking die */
function unlock() {
    for (let i = 0; i < locked.length; i++) {
        die[i].innerHTML = 0;
        dievalues[i] = 0;

        if (locked[i]) {
            locked[i] = false;
            die[i].classList.remove("locked");
        }
    }
}


/* Check if a category is done */
function checkFinished() {
    for (let i = 0; i < finished.length; i++) {
        if (finished[i] == 6 || (i > 0 && finished[i] == 3)) {
            categories[i].disabled = true
            categories[i].style.background = "#553a41"
            categories[i].style.color = "#010103"
            finished[i] = 10
            collapse(i)
        }
    }
}


/* Disables buttons */
function disable(e) {
    category[e].disabled = true;
    category[e].style.background = "#553a41"
    category[e].style.color = "#010103"

    window.scroll({ top: 0, behavior: "smooth" })
    checkFinished()
    unlock()

    if (finished.reduce((a, b) => a + b, 0) == 60) {
        dierollmsg.innerHTML = "You have decided to end the game."
        gameover()
        return
    }

    rolled = 0
    remainingrolls += 3
    dierollmsg.innerHTML = "Check! " + remainingrolls + " rolls left."
}


/* Opens and closes categories */
function collapse(index) {
    categories[index].classList.toggle("active");
    const content = categories[index].nextElementSibling;

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }

    for (let i = 0; i < categories.length; i++) {
        if (i != index) {
            categories[i].nextElementSibling.style.maxHeight = null;
        }
    }
}


/* Opens modal and shows stats */
function gameover() {
    modal.style.display = "block"
    totalsum += bonus >= 84 ? 50 : 0
    totaltime = Math.round(performance.now() / 1000)

    document.querySelector("#modal-score").innerHTML = "You got a total score of " + totalsum + "."
    document.querySelector("#modal-time").innerHTML = calculateTime(totaltime)

    document.querySelector("#score").value = totalsum
    document.querySelector("#time").value = totaltime
}

/* Function to display help text for score options */
function helpmodal(nr) {
    helpermodal.style.display = "block"

    for (let i = 0; i < 6; i++) {
        if (nr == i) {
            modalhelp.innerHTML = modalhelpoptions[i]
        }
    }
}

/* Helper function to close modal */
window.onclick = e => {
    if (e.target == helpermodal) {
        helpermodal.style.display = "none"
    }
}


/* Helper function to calculate game time */
function calculateTime(seconds) {
    let text = "You spent "

    if (seconds > 60) {
        const minutes = Math.floor(seconds / 60)
        if (minutes > 1) {
            text += minutes + " minutes and " + seconds % 60 + " seconds playing."
        } else {
            text += minutes + " minute and " + seconds % 60 + " seconds playing."
        }
    } else {
        text += seconds + " seconds playing."
    }

    return text
}