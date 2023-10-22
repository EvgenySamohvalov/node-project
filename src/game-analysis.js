#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "results.txt");

if (!fs.existsSync(file)) {
  console.log("Вы не сыграли не одной игры!");
} else {
  const readerStream = fs.createReadStream(file);
  let data = "";
  readerStream
    .setEncoding("UTF8")
    .on("data", (chank) => {
      data += chank;
    })
    .on("end", () => {
      const parties = data.trim().split("\n");
      if (parties.length) {
        const quantity = parties.length;
        const quantityVickoris = parties.filter(
          (result) => result === "true"
        ).length;
        const ratio = `${quantityVickoris} / ${quantity - quantityVickoris}`;
        const prossentVickoris =
          Math.round((quantityVickoris / quantity) * 10000) / 100 + "%";
        const report = {
          "общее количество партий": quantity,
          "количество выигранных/проигранных партий": ratio,
          "процентное соотношение выигранных партий": prossentVickoris,
        };

        console.table(report);
      } else {
        console.log("Вы не сыграли не одной игры!");
      }
    });
}
