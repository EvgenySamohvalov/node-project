#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option("year", {
    alias: "y",
    type: "boolean",
    description: "Вывод года",
  })
  .option("month", {
    alias: "m",
    type: "boolean",
    description: "Вывод месяца",
  })
  .option("date", {
    alias: "d",
    type: "boolean",
    description: "Вывод дня",
  }).argv;

const mode = argv._[0];
if (mode === "current") {
  const currentData = new Date();

  if (!argv.year && !argv.month && !argv.date) {
    console.log("current date: ", currentData.toISOString());
  } else {

    if (argv.year) {
        console.log("year: ", currentData.getFullYear());
    }

    if (argv.month) {
        console.log("month: ", currentData.getMonth() + 1);
    }

    if (argv.date) {
      console.log("day: ", currentData.getDate());
    }
  }
} else {
  let currentData = new Date();
  const add = argv._[1] * (mode === "add" ? 1 : -1);
  
  if (argv.date) {
    currentData = new Date(currentData.setDate(currentData.getDate() + add));
  } else if (argv.month) {
    currentData = new Date(currentData.setMonth(currentData.getMonth() + add));
  } else if (argv.year) {
    currentData = new Date(currentData.setFullYear(currentData.getFullYear() + add));
  }

  console.log("result: ", current);
}
