const fs = require("fs");
const path = require("path");

const {
    CMD
} = require("../constants");

const _console = require("../helpers/console");

const database = {
    collection: null
};

const getBaseDir = () => path.join(__dirname, `../data/`);

const getCollectionPath = (name) => path.join(getBaseDir(), `${name}.dumbo`);

const getCollectionBaseContent = () => {

    const page = Buffer.alloc(16 * 1024, 0, 'hex'); //  16KB per page

    return page;
}

const getDate = (time) => {
    const date = new Date(time);

    if (isNaN(date.getTime())) {
        return "";
    }

    const y = date.getFullYear();
    const m = ("0" + (date.getMonth() + 1)).slice(-2);
    const d = ("0" + date.getDate()).slice(-2);
    const h = ("0" + date.getHours()).slice(-2);
    const i = ("0" + date.getMinutes()).slice(-2);
    const s = ("0" + date.getSeconds()).slice(-2);

    return `${y}-${m}-${d} ${h}:${i}:${s}`
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
        case CMD.STAT:
            getCollectionStat(callback);
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
            _console.success(`Collection ${collectionName} selected`);
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

    const stream = fs.createWriteStream(collectionFilePath);

    stream.write(data);
    stream.end();

    stream.on("finish", () => {
        _console.success(`Collection ${collectionName} created successfully.`);
        return callback();
    });
}

const getCollectionStat = (callback) => {

    const baseDir = getBaseDir();

    fs.readdir(baseDir, (err, files) => {

        if (err) {
            _console.yell(`Unable to prepare stat`);
        } else {
            if (files.length === 0) {
                _console.display("No collection found");
                return callback();
            } else {

                const stats = [];

                const getFileStat = (i, cb) => {
                    if (i < 0) {
                        return cb();
                    }

                    const fileName = files[i];
                    const file = path.join(baseDir, fileName);

                    fs.stat(file, (err, stat) => {
                        if (err) {
                            _console.error(err);
                        }
                        stats.push({
                            name: fileName,
                            stat: stat
                        });

                        return getFileStat(--i, cb);
                    });
                }

                getFileStat(files.length - 1, () => {

                    const head = [
                        'Name',
                        'Size',
                        'Last Modified'
                    ];

                    const size = [20, 10, 25];

                    const data = [];

                    for (let i = 0; i < stats.length; i++) {

                        data.push([
                            stats[i].name.slice(0, stats[i].name.length - 6),
                            stats[i].stat.size,
                            getDate(stats[i].stat.mtime),
                        ]);
                    }

                    _console.table(head, size, data);

                    return callback();
                });

            }
        }

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
        case 'STAT':
            command = CMD.STAT;
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