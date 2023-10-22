#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { stdin: input, stdout: output } = require("process");

const randomNum = Math.round(Math.random(0, 1));
const rl = readline.createInterface({ input, output });
const file = path.join(__dirname, "results.txt");

rl.question("Выбери 0 или 1? ", function (answer) {
  answer = Number(answer);
  if (answer === randomNum) {
    console.log(`Угадали! правильный ответ ${randomNum}`);
  } else {
    console.log(`Не угадали правильный ответ ${randomNum}`);
  }
  fs.appendFile(file, (answer === randomNum).toString() + "\n", (err) => {
    if (err) throw Error(err);
  });
  return rl.close();
});
