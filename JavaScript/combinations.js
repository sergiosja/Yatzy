/* Ones through sixes  -  Iterates die values and looks for specific die */
function singles(element) {
    for (let i = 0; i < dievalues.length; i++) {
        if (dievalues[i] == element) {
            totalsum += dievalues[i];
            bonus += dievalues[i];
        }
    }

    finished[0]++;
    disable(element-1);
}


/* Pairs  -  Always goes for three pairs, and then filters out based on the first parameter */
function pairs(nr, native) {
    let pairvalues = []
    pairvalues.push(pairsHelp(dievalues, 0, 0))
    pairvalues.push(pairsHelp(dievalues, pairvalues[0], 0))
    pairvalues.push(pairsHelp(dievalues, pairvalues[0], pairvalues[1]))
    pairvalues.sort((a, b) => b - a);

    if (native) {
        if (nr == 6 && pairvalues[0] != 0) {
            totalsum += pairvalues[0];
        }
        else if (nr == 7 && pairvalues[0] != 0 && pairvalues[1] != 0) {
            totalsum += pairvalues[0] + pairvalues[1];
        }
        else if (nr == 8 && pairvalues[0] != 0 && pairvalues[1] != 0 && pairvalues[2] != 0) {
            totalsum += pairvalues.reduce((a, b) => a + b, 0);
        }

        finished[1]++;
        disable(nr);
        return;
    }

    return pairvalues;
}


/* Helper function for pairs */
function pairsHelp(arr, ex1, ex2) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i] == arr[j] && (arr[i] * 2 != ex1) && (arr[i] * 2 != ex2)) {
                return arr[i] * 2;
            }
        }
    }

    return 0;
}


/* Kinds  -  Keeps a hashmap of values and their occurences */
function kinds(nr, native, tower) {
    let map = new Map();
    let tbr = [];

    for (let i = 0; i < dievalues.length; i++) {
        for (let j = i+1; j < dievalues.length; j++) {
            if (dievalues[i] == dievalues[j]) {
                map.set(dievalues[i], map.get(dievalues[i]) == undefined ? 1 : map.get(dievalues[i]) + 1);
            }
        }
    }

    if (native) {
        map.forEach((key, value) => {
            if (nr == 11 && key >= 10) {
                totalsum += value * 5
            }
            else if (nr == 10 && key >= 6) {
                totalsum += value * 4;
            }
            else if (nr == 9 && key >= 3) {
                totalsum += value * 3;
            }
        })

        finished[2]++;
        disable(nr);
        return;
    }

    if (tower) {
        map.forEach((key, value) => {
            if (key == 6) {
                tbr.push(value);
            }
        })
    } else {
        map.forEach((key, value) => {
            if (key >= 3) {
                tbr.push(value);
            }
        })
    }

    return tbr.length == 2 ? tbr.sort((a, b) => b - a) : tbr;
}


/* Straights  -  Checks if die contain all digits of a straight */
function straights(arr, nr) {
    for (let i = 0; i < arr.length; i++) {
        if (!dievalues.includes(arr[i])) {
            finished[3]++;
            disable(nr);
            return;
        }
    }

    totalsum += arr.reduce((a, b) => a + b, 0);
    finished[3]++;
    disable(nr);
}


/* Cottage  -  Combines the biggest 3kind with a pair */
function cottage() {
    let kind = kinds(0, false, false);
    let pair = pairs(0, false);

    if (kind.length > 0 && pair.length > 0) {
        totalsum += (kind[0] * 2) != pair[0] ? kind[0] * 3 + pair[0] : pair[1] != 0 ? kind[0] * 3 + pair[1] : 0;
    }

    finished[4]++;
    disable(15);
}


/* House  -  Combines two 3kinds */
function house() {
    let kind = kinds(0, false, false);
    totalsum += kind.length == 2 ? kind[0] * 3 + kind[1] * 3 : 0;

    finished[4]++;
    disable(16);
}


/* Tower  -  Combines a pair and a 4kind */
function tower() {
    let kind = kinds(0, false, true);
    let pair = pairs(0, false);

    if (pair[0] != 0 && pair[1] != 0 && kind.length > 0) {
        totalsum += (kind[0] * 2) != pair[0] ? kind[0] * 4 + pair[0] : kind[0] * 4 + pair[1];
    }

    finished[4]++;
    disable(17)
}


/* Chance  -  Simply adds sum of all die */
function chance() {
    totalsum += dievalues.reduce((a, b) => a + b, 0);
    finished[5]++;
    disable(18);
}


/* Yatzy  -  If all die show the same digit, award 100 + sum of die */
function yatzy() {
    if (dievalues[0] == 0) {
        finished[5]++;
        disable(19);
        return;
    }

    if (dievalues.every(val => val == dievalues[0] )) {
        totalsum += 100 + dievalues.reduce((a, b) => a + b, 0);
    }

    finished[5]++;
    disable(19);
}


/* Straight flush  -  If die show an ordered big straight, award the jackpot! */
function straightflush(arr) {
    if (JSON.stringify(dievalues) != JSON.stringify(arr)) {
        finished[5]++;
        disable(20);
        return;
    }

    totalsum += 150;
    finished[5]++;
    disable(20);
}