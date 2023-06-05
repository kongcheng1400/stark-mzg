const color = {
    red: '\033[31m',
    green: '\033[32m',
    yellow: '\033[33m',
    blue: '\033[34m',
    end: '\033[0m',
    bold: '\033[1m'
}

function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function printHeader(headline) {
    str = "\n" + color.bold + color.red + headline + color.end;
    console.log(str)
}

function printRed(msg) {
    str = "*** " + color.red + msg + " ***" + color.end;
    console.log(str)
}

function printGreenBold(msg) {
    str = color.bold + color.green + msg + color.end;
    console.log(str)
}

function printGreen(msg) {
    str = color.green + msg + color.end;
    console.log(str)
}

const DEF_DELAY = 2000;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

module.exports = {randomMinMax, printHeader, printGreenBold, printGreen, sleep, printRed}