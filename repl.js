/**
 * Read-Evalute-Print Loop for the CLI
 */

const readline = require('readline');
const chalk = require('chalk');

const {
    printWelcomeNote,
    parseLine,
    prompt
} = require("./helpers/console-helpers");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const log = console.log;

printWelcomeNote();


rl.on('line', (line) => {

    const cmd = parseLine(line);

    if (cmd.EXIT) {
        console.log(chalk.blue("bye bye..."));
        process.exit(0);
    } else {
        log(chalk.red(`Unrecognised command: ${line}`));
    }

    prompt();
});