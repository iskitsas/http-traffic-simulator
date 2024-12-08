const fs = require('fs')
const corelibdependencies = require('../package.json')
const desktopappdependencies = require('./package.json')

const coreArray = Object.keys(corelibdependencies.dependencies)

coreArray.map(dep => {
    if (desktopappdependencies.dependencies[dep]) { }
    else {
        desktopappdependencies.dependencies[`${dep}`] = corelibdependencies.dependencies[dep];
    }
})

fs.writeFileSync('./package.json', JSON.stringify(desktopappdependencies, null, 2));