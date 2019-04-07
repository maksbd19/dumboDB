/**
 * Print welcome note in the cli
 */

const printWelcomeNote = () => {
    console.log("Welcome to dumbuDB cli.");
    console.log("");
    console.log("     _                 _          ____________ ");
    console.log("    | |               | |         |  _  \\ ___ \\");
    console.log("  __| |_   _ _ __ ___ | |__   ___ | | | | |_/ /");
    console.log(" / _` | | | | '_ ` _ \\| '_ \\ / _ \\| | | | ___ \\");
    console.log("| (_| | |_| | | | | | | |_) | (_) | |/ /| |_/ /");
    console.log(" \\__,_|\\__,_|_| |_| |_|_.__/ \\___/|___/ \\____/ ");
    console.log("");
    console.log("");
    dd();
}

/**
 * Parse line for valid commands
 * @param {*} line 
 */
const parseLine = (line) => {

    const EXIT = line === ".exit";

    return {
        EXIT: EXIT
    };
}

const prompt = () => process.stdout.write("dd > ");

exports.printWelcomeNote = printWelcomeNote
exports.parseLine = parseLine;
exports.dd = dd;