#!/usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";

const ask = await inquirer.prompt([
  {
    name: "minutes",
    type: "number",
    message: "Please enter minutes: ",
    filter: (input) => (isNaN(input) ? 0 : input),
    validate: (input) => {
      if (input < 0) {
        return "Minutes must be a positive number.";
      } else {
        return true;
      }
    },
  },
  {
    name: "seconds",
    type: "number",
    message: "Please enter seconds: ",
    validate: (input) => {
      if (isNaN(input)) {
        return "Seconds can't be NaN.";
      } else if (input > 60) {
        return "Seconds must be less than or equal to 60.";
      } else if (input < 0) {
        return "Seconds must be a positive number.";
      } else {
        return true;
      }
    },
  },
]);

console.log(chalk.bold("\nStarting Timer!\n"));

let { minutes, seconds } = ask;

function startTime(minutes: number, seconds: number) {
  const totalSeconds = minutes * 60 + seconds;

  const initialTime = new Date().setSeconds(
    new Date().getSeconds() + totalSeconds + 2
  );
  const intervalTime = new Date(initialTime);

  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);
    if (timeDiff <= 0) {
      console.log(chalk.gray("Timer has expired."));
      process.exit();
    }
    const minute = Math.floor(timeDiff / 60);
    const seconds = Math.floor(timeDiff % 60);
    if (timeDiff <= 10) {
      console.log(
        chalk.red(
          `${minute.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        )
      );
    } else {
      console.log(
        `${minute.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, 1000);
}

startTime(minutes, seconds);