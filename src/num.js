#!/usr/bin/env node

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const max = 100;
const min = 0;
const randomNum = Math.round(Math.random() * (max - min) + min);

const massage = `Загадано число в диапазоне от ${min} до ${max}`;
console.log(massage);

const readl = readline.createInterface({ input, output });

function getNewInput() {
    readl.question("", function (answer) {
    answer = Number(answer);
    if (answer === randomNum) {
        const massage = `Отгадано число ${answer}`
        console.log(massage);
        return readl.close();
    } else {
      console.log(answer > randomNum ? "Меньше" : "Больше");
    }
    getNewInput();
  });
}

getNewInput();
