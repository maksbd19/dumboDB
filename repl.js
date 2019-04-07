/**
 * Read-Evalute-Print Loop for the CLI
 */

const readline = require('readline');
const chalk = require('chalk');

const {
    printWelcomeNote,
    parseLine,
    prompt,
    unrecognized
} = require("./helpers/console");

const {
    processCommand
} = require("./helpers/command");

const CMD = require("./constants");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// printWelcomeNote();


rl.on('line', (line) => {

    const cmd = parseLine(line);

    if (!cmd || !cmd.command) {
        unrecognized(line);
        prompt();
    } else {
        processCommand(cmd, line, () => {
            prompt();
        });
    }
});