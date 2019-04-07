/**
 * Print welcome note in the cli
 */

const chalk = require("chalk");
const Table = require('cli-table2');

const {
    CMD
} = require("../constants");

const {
    parseCommand
} = require("./command");

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
        .map(i => i.trim());

    parts[0] = parts[0].toUpperCase();

    const command = parseCommand(parts);

    return command;
}

const prompt = () => process.stdout.write("dd > ");

const unrecognized = (line) => console.log(chalk.red(`Unrecognized command: ${line}`));

const byebye = () => console.log(chalk.blue("bye bye..."));
const yell = (statement) => console.log(chalk.magenta(statement));
const error = (...args) => console.log(chalk.red(args));
const success = (...args) => console.log(chalk.green(args));
const display = (data) => console.log(chalk.white(data));

const table = (head, colWidths, data) => {
    const table = new Table({
        head: head,
        colWidths: colWidths
    });

    for (let i = 0; i < data.length; i++) {
        table.push(data[i]);
    }

    display(table.toString());

}

exports.printWelcomeNote = printWelcomeNote
exports.parseLine = parseLine;
exports.prompt = prompt;
exports.unrecognized = unrecognized;
exports.byebye = byebye;
exports.yell = yell;
exports.error = error;
exports.success = success;
exports.display = display;
exports.table = table;