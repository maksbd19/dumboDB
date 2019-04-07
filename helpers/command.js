const CMD = require("../constants").CMD;
const {
    unrecognized,
    byebye
} = require("./console");

/**
 * Process the command
 * 
 * @param {*} cmd 
 */
const processCommand = (cmd, line) => {

    switch (cmd.command) {
        case CMD.INVALID:
            unrecognized(line);
            break;
        case CMD.EXIT:
            byebye();
            process.exit(0);
            break;
        default:
            break;
    }
}

exports.processCommand = processCommand;