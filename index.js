#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const app = require("./src/server");
const rootFunction  = require('..');
const resolver = require('./src/resolver');

const argv = yargs(hideBin(process.argv)).argv;

const { functionList, PORT } = resolver(argv, rootFunction);

functionList.forEach(name => {

    app.all(`/${name}`, rootFunction[`${name}`]);

});

app.listen(PORT, ()=> {
    console.log("Serving function...")
    console.log(`Function: ${functionList}`)
    console.log(`URL: http://localhost:${PORT}/`)
})