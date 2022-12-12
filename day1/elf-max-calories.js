import * as fs from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const elfArr = [];

const findMaxCals = async (url) => {
  let maxCalories = 0;
  let tmpSumCalories = 0;
  try {
    const file = await fs.open(path.resolve(__dirname, url));

    const data = await file.readFile("utf-8");
    const subArray = data.split(/\r?\n/);

    subArray.forEach((calories) => {
      if (calories === "") {
        if (maxCalories < tmpSumCalories) {
          maxCalories = tmpSumCalories;
        }
        elfArr.push(tmpSumCalories);
        tmpSumCalories = 0;
      } else {
        tmpSumCalories = parseInt(tmpSumCalories) + parseInt(calories);
      }
    });
  } catch (e) {
    console.log(e);
  }

  return maxCalories < tmpSumCalories ? tmpSumCalories : maxCalories;
};

const answer = await findMaxCals("./elf-calories-input");
console.log(answer);
elfArr.sort((a, b) => b - a)
const bigThree = elfArr.slice(0,3)

const initialValue = 0;
const sumWithInitial = bigThree.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

// console.log(bigThree[0] + bigThree[1] + bigThree[2])

console.log(sumWithInitial)


export default findMaxCals;
