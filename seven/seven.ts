// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

type file = {
  name: string;
  size: number;
};

type directory = {
  name: string;
  content: {
    directories: Map<string, directory>,
    files: Map<string, file>,
  },
  size: number;
  parent: directory | null;
}

const getEmptyDirectory = (name: string, parent: directory | null): directory => {
  return {
    name: name,
    content: {
      directories: new Map(),
      files: new Map(),
    },
    size: 0,
    parent: parent
  }
}

const filesystem: directory = getEmptyDirectory('/', null);

// 1. Build the tree
// 2. Count sizes
// 3. Add the sizes

let currentDirectory: directory = filesystem;
let isLSing = false;

const createDirectoryHereIfDoesntExist = (name: string): void => {
  if (currentDirectory.content.directories.get(name) === undefined) {
    currentDirectory.content.directories.set(name, getEmptyDirectory(name, currentDirectory));
  }
}

const createFileHereIfDoesntExist = (name: string, size: number): void => {
  if (currentDirectory.content.files.get(name) === undefined) {
    currentDirectory.content.files.set(name, { name: name, size: size });
    currentDirectory.size += size;
  }
}

lines.forEach((line: string) => {
  const lineSplit = line.split(' ');

  if (lineSplit[0] === '$') {
    isLSing = false;

    // cd
    if (lineSplit[1] === 'cd') {
      const dirArg = lineSplit[2];
      switch(dirArg) {
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
  } else if (isLSing) {
    if (lineSplit[0] === 'dir') {
      createDirectoryHereIfDoesntExist(lineSplit[1]);
    } else {
      const fileSize = parseInt(lineSplit[0]);
      createFileHereIfDoesntExist(lineSplit[1], fileSize);
    }
  }
});

// File sizes are already included in directory size attributes.
// The only thing left is to add the descending directory sizes to them.
const setAndGetDirectorySize = (origin: directory): number => {
  let descendandDirectoriesSize = 0;

  origin.content.directories.forEach(d_dir => {
    descendandDirectoriesSize += setAndGetDirectorySize(d_dir);
  });

  origin.size += descendandDirectoriesSize;

  return origin.size;
}

setAndGetDirectorySize(filesystem);

let finalSum = 0
const THRESHOLD_SIZE = 30000000 - (70000000 - filesystem.size);
let currentMinimalEnoughSizeDirectory: directory = filesystem;

const findDirectoryToDelete = (origin: directory): void => {
  if (origin.size >= THRESHOLD_SIZE && origin.size < currentMinimalEnoughSizeDirectory.size) {
    finalSum += origin.size;
    currentMinimalEnoughSizeDirectory = origin;
  }

  origin.content.directories.forEach(d_dir => {
    findDirectoryToDelete(d_dir);
  });
}

console.log('----');
findDirectoryToDelete(filesystem);
console.log(currentMinimalEnoughSizeDirectory.name, currentMinimalEnoughSizeDirectory.size);
