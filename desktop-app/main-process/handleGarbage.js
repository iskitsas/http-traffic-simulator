const fs = require('fs');
const { APP_NAME } = require('../Constants/constants');

const folder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + `/Library/Application Support/${APP_NAME}/Temp/` : process.env.HOME + `/.config/${APP_NAME}/Temp/`)

fs.readdir(folder, (err, files) => {
    if (err) throw err;
    for (const file of files) {
        console.log(file + ' : temporary file cleared');
        fs.unlinkSync(folder + file);
    }
});