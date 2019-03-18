const mf_js = require("../js/mf_js.js");
const { exec } = require('child_process');
const assert = require('assert');

let input = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
let output = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];

mf_js(3,5,2,2,input,output);

console.log(output);

const child = exec('./test', (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  let tmp = stdout.split(' ');
  tmp.pop();
  tmp = tmp.map(_ => parseFloat(_));

  assert.deepStrictEqual(tmp, output);
});
