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
const modal = document.querySelector("#modal");
const sumbutton = document.querySelector("#sumbutton");

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
    if (locked[index]) {
        locked[index] = false;
        die[index].classList.remove("locked");
    } else {
        locked[index] = true;
        die[index].classList.add("locked");
    }
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
            categories[i].disabled = true;
            categories[i].style.background = "#4b5320";
            categories[i].style.color = "#010103";
            finished[i] = 10;
            collapse(i);
        }
    }
}


/* Disables buttons */
function disable(e) {
    category[e].disabled = true;
    category[e].style.background = "#4b5320";
    category[e].style.color = "#010103";

    rolled = 0;
    remainingrolls += 3;
    dierollmsg.innerHTML = "Check! " + remainingrolls + " rolls left.";

    window.scroll({ top: 0, behavior: "smooth" });
    checkFinished();
    unlock();
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
    modal.style.display = "block";
    let timespent = calculateTime();

    if (bonus >= 84) {
        totalsum += 50;
    }

    document.querySelector("#modal-score").innerHTML = "You got a total score of " + totalsum + ".";
    document.querySelector("#modal-time").innerHTML = timespent;
}

/* Helper function to calculate game time */
function calculateTime() {
    let seconds = Math.round(performance.now() / 1000);
    let text = "You spent ";

    if (seconds > 60) {
        const minutes = Math.round(seconds / 60);
        if (minutes > 1) {
            text += minutes + " minutes and " + seconds % 60 + " seconds playing."
        } else {
            text += minutes + " minute and " + seconds % 60 + " seconds playing."
        }
    } else {
        text += seconds + " seconds playing."
    }

    return text;
}