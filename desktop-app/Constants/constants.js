// In case we need to provide a different name in package.json than Flexbench, eg flexbench-desktop,
// then in Mac OS, the installer will create a directory with name Flexbench instead of flexbench-desktop.
// One way to support this is:
// const appPath = process.platform === 'darwin' ? 'flexbench-desktop' : 'Flexbench';
// module.exports = { APP_NAME:appPath }
module.exports = {APP_NAME: "Flexbench"}
