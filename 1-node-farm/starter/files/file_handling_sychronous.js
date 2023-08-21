const fs = require('fs');

//Reading file Synchronously (Blocking Code - Synchronous Code)
const textIn = fs.readFileSync('../txt/input.txt', 'utf-8');
console.log(textIn);

//Writing file Synchronously (Blocking Code - Synchronous Code)
const textOut = `The following information is about Avacado:  ${textIn}.`;
fs.writeFileSync('../txt/output.txt', textOut);
console.log("File has been successfully written😄!")