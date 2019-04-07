/**
 * Print welcome note in the cli
 */

const chalk = require("chalk");

const CMD = require("../constants").CMD;

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

    prompt();
}

/**
 * Parse line for valid commands
 * @param {*} line 
 */
const parseLine = (line) => {

    const parts = line
        .split(" ")
        .map(i => i.trim().toUpperCase());
    let command;

    if (parts.length > 0 && parts[0].indexOf(".") === 0) {
        command = parseMetaCommand(parts);
    } else if (parts.length > 0) {
        command = parseQuery(line);
    } else {
        command = {
            command: CMD.INVALID
        }
    }

    return command;
}

const parseMetaCommand = (parts) => {
    const commandPart = parts[0].substr(1, parts[0].length);
    let command;

    switch (commandPart) {
        case 'EXIT':
            command = CMD.EXIT;
            break;
    };

    const cmd = {
        command: command,
        args: []
    };

    return cmd;
}

const parseQuery = (cmd) => {

}

const prompt = () => process.stdout.write("dd > ");

const unrecognized = (line) => console.log(chalk.red(`Unrecognized command: ${line}`));

const byebye = () => console.log(chalk.blue("bye bye..."));

exports.printWelcomeNote = printWelcomeNote
exports.parseLine = parseLine;
exports.prompt = prompt;
exports.unrecognized = unrecognized;
exports.byebye = byebye;