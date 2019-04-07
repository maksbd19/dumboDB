const fs = require("fs");
const path = require("path");

const {
    CMD
} = require("../constants");

const _console = require("../helpers/console");

const database = {
    collection: null
};

const getCollectionPath = (name) => {
    const base = path.join(__dirname, `../data/`);
    return path.join(base, `${name}.dumbo`);
}

const getCollectionBaseContent = () => {
    return null;
}

/**
 * Process the command
 * 
 * @param {*} cmd 
 */
const processCommand = (cmd, line, callback) => {

    switch (cmd.command) {
        case CMD.INVALID:
            unrecognized(line);
            callback();
            break;
        case CMD.EXIT:
            _console.byebye();
            process.exit(0);
            break;
        case CMD.USE:
            selectCollection(cmd.args, callback);
            break;
        case CMD.CREATE:
            createResource(cmd.args, callback);
            break;
        default:
            console.log(cmd);
            break;
    }
}

const selectCollection = (args, callback) => {
    if (args.length === 0) {
        _console.yell("No collection name is provided");
        return callback();
    }

    const collectionName = args[0];
    const collectionPath = getCollectionPath(collectionName);

    fs.stat(collectionPath, (err, stat) => {
        if (err) {
            _console.yell(`Unable to load collection ${collectionName}`);
            _console.yell(`You can create a new collection using command: CREATE COLLECITON ${collectionName}`);
        } else {
            _console.success(`Collection ${collectionName} created successfully`);
        }
        return callback();
    });
}

const createResource = (args, callback) => {
    if (args.length === 0) {
        _console.yell("Invalid command");
        return callback();
    }

    switch (args[0].toUpperCase()) {
        case "COLLECTION":
            createCollection([...args.splice(1, args.length - 1)], callback);
            break;
        default:
            _console.yell(`Unrecognized resource: ${args[0]}`);
            break;
    }
}

const createCollection = (args, callback) => {
    const collectionName = args[0];

    const collectionFilePath = getCollectionPath(collectionName);
    const data = getCollectionBaseContent();

    fs.writeFile(collectionFilePath, data, (err) => {
        if (err) {
            _console.yell("unable to create collection");
            _console.error(err);
        } else {
            _console.success(`Collection ${collectionName} created successfully.`);
        }

        return callback();
    });


}

const parseCommand = (parts) => {

    let command;

    if (parts.length > 0 && parts[0].indexOf(".") === 0) {
        command = parseMetaCommand(parts);
    } else if (parts.length > 0) {
        command = prepareStatement(parts);
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

const prepareStatement = (parts) => {

    const commandPart = parts[0];
    let command;

    switch (commandPart) {

        case 'USE':
            command = CMD.USE;
            break;
        case 'CREATE':
            command = CMD.CREATE;
            break;
        case 'DROP':
            command = CMD.DROP;
            break;
        case 'ALL':
            command = CMD.ALL;
            break;
        case 'GET':
            command = CMD.GET;
            break;
        case 'SET':
            command = CMD.SET;
            break;
        case 'POP':
            command = CMD.POP;
            break;
        case 'REMOVE':
            command = CMD.REMOVE;
            break;
    }

    const cmd = {
        command: command,
        args: parts.slice(1, parts.length)
    };

    return cmd;
}

exports.processCommand = processCommand;
exports.parseCommand = parseCommand;