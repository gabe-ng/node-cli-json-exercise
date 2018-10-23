// Access Node File System
const fs = require("fs");

const readFile = (file) => {
    // Handle missing file
    if (!file) throw "Read file error: Missing file";

    // Return a promise to control for asynchronicity
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (!error) {
                // If no error, resolve promise while passing in parsed data
                resolve(JSON.parse(data));
            } else {
                // If error, reject promise and pass in the error
                reject("Error parsing file:", error);
            }
        });
    })
}

module.exports = readFile;