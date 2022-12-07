"use strict";
// npx tsc -w -p one.ts
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var getEmptyDirectory = function (name, parent) {
    return {
        name: name,
        content: {
            directories: new Map(),
            files: new Map()
        },
        size: 0,
        parent: parent
    };
};
var filesystem = getEmptyDirectory('/', null);
// 1. Build the tree
// 2. Count sizes
// 3. Add the sizes
var currentDirectory = filesystem;
var isLSing = false;
var createDirectoryHereIfDoesntExist = function (name) {
    if (currentDirectory.content.directories.get(name) === undefined) {
        currentDirectory.content.directories.set(name, getEmptyDirectory(name, currentDirectory));
    }
};
var createFileHereIfDoesntExist = function (name, size) {
    if (currentDirectory.content.files.get(name) === undefined) {
        currentDirectory.content.files.set(name, { name: name, size: size });
        currentDirectory.size += size;
    }
};
lines.forEach(function (line) {
    var lineSplit = line.split(' ');
    if (lineSplit[0] === '$') {
        isLSing = false;
        // cd
        if (lineSplit[1] === 'cd') {
            var dirArg = lineSplit[2];
            switch (dirArg) {
                case '/':
                    currentDirectory = filesystem;
                    break;
                case '..':
                    currentDirectory = currentDirectory.parent;
                    break;
                default:
                    createDirectoryHereIfDoesntExist(dirArg);
                    currentDirectory = currentDirectory.content.directories.get(dirArg);
            }
        }
        // ls
        if (lineSplit[1] === 'ls') {
            isLSing = true;
        }
    }
    else if (isLSing) {
        if (lineSplit[0] === 'dir') {
            createDirectoryHereIfDoesntExist(lineSplit[1]);
        }
        else {
            var fileSize = parseInt(lineSplit[0]);
            createFileHereIfDoesntExist(lineSplit[1], fileSize);
        }
    }
});
// File sizes are already included in directory size attributes.
// The only thing left is to add the descending directory sizes to them.
var setAndGetDirectorySize = function (origin) {
    var descendandDirectoriesSize = 0;
    origin.content.directories.forEach(function (d_dir) {
        descendandDirectoriesSize += setAndGetDirectorySize(d_dir);
    });
    origin.size += descendandDirectoriesSize;
    return origin.size;
};
setAndGetDirectorySize(filesystem);
var finalSum = 0;
var THRESHOLD_SIZE = 30000000 - (70000000 - filesystem.size);
var currentMinimalEnoughSizeDirectory = filesystem;
var findDirectoryToDelete = function (origin) {
    if (origin.size >= THRESHOLD_SIZE && origin.size < currentMinimalEnoughSizeDirectory.size) {
        finalSum += origin.size;
        currentMinimalEnoughSizeDirectory = origin;
    }
    origin.content.directories.forEach(function (d_dir) {
        findDirectoryToDelete(d_dir);
    });
};
console.log('----');
findDirectoryToDelete(filesystem);
console.log(currentMinimalEnoughSizeDirectory.name, currentMinimalEnoughSizeDirectory.size);
