// --------------------------------------------------
// --------------------------------------------------

const instructionSet = {
  r: ["*", "+"],
  g: ["#", "@"],
  b: ["<", ">"],
};

//this table is a helper for executing the instructions
const instructionsTable = {
  "*": ["r", "0"],
  "+": ["r", "1"],
  "#": ["g", "0"],
  "@": ["g", "1"],
  "<": ["b", "0"],
  ">": ["b", "1"],
};

const applyRules = (baseColor, tempColor) => {
  // rules :

  // r + r = r (same for all colors)
  // r + g = b
  // r + b = g

  // g + r = b
  // g + b = r

  // b + r = g
  // b + g = r

  if (baseColor === tempColor) {
    return baseColor;
  } else if (baseColor === "r" && tempColor === "g") {
    return "b";
  } else if (baseColor === "r" && tempColor === "b") {
    return "g";
  } else if (baseColor === "g" && tempColor === "r") {
    return "b";
  } else if (baseColor === "g" && tempColor === "b") {
    return "r";
  } else if (baseColor === "b" && tempColor === "r") {
    return "g";
  } else if (baseColor === "b" && tempColor === "g") {
    return "r";
  }
};

// this array serves as the memory and the instructions of the program
// at the same time
let memoryArr = [];

//init memory size and instruction lenght
// memory size ---> w * h
// instruction lenght ---> memWidth
// const memWidth = 55;
// const memHeight = 45;
const memWidth = 50;
const memHeight = 20;

//fill array with random instructions from instructionSet
for (let y = 0; y < memHeight; y++) {
  let instructionString = "";
  for (let x = 0; x < memWidth; x++) {
    // arr[(Math.floor(Math.random() * arr.length))]
    let colors = Object.keys(instructionSet);
    let randColor = colors[Math.floor(Math.random() * colors.length)];
    let newInstruction =
      instructionSet[randColor][
        Math.floor(Math.random() * instructionSet[randColor].length)
      ];
    instructionString += newInstruction;
  }
  memoryArr.push(instructionString);
}

// --------------------------------------------------
// --------------------------------------------------

//helper function to replace a instruction from the memory
const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};

const executeInstruction = (currColSym, tempCellSym) => {
  //sum the values first
  let currColNum = parseInt(instructionsTable[currColSym][1]);
  let tempCellNum = parseInt(instructionsTable[tempCellSym][1]);
  let sumResult = currColNum + tempCellNum;

  //only binary for now, so reset to zero if is equal to 2
  if (sumResult === 2) {
    sumResult = 0;
  }

  //identify the cells values to apply rule
  let currColColor = instructionsTable[currColSym][0];
  let tempCellColor = instructionsTable[tempCellSym][0];
  let ruleResult = applyRules(currColColor, tempCellColor);

  let newInstruct = instructionSet[ruleResult][sumResult];
  return newInstruct;
};

const getNeighborSymbol = (pos, row, col) => {
  let tempCellSym = "";

  switch (pos) {
    //-----------------------------------------------------
    //-----------------------------------------------------
    // top row
    //top left
    case "t1":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row - 1][col - 1];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //top middle
    case "t2":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row - 1][col];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //top right
    case "t3":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row - 1][col + 1];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //-----------------------------------------------------
    //-----------------------------------------------------
    // middle row
    //middle left
    case "m1":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row][col - 1];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //middle middle is the current [row][col] symbol so i skip this case

    //middle right
    case "m3":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row][col + 1];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //-----------------------------------------------------
    //-----------------------------------------------------
    // bottom row
    //bottom left
    case "b1":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row + 1][col - 1];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //bottom middle
    case "b2":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row + 1][col];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    //bottom right
    case "b3":
      try {
        // get temp cell value (instruction symbol)
        tempCellSym = memoryArr[row + 1][col + 1];
        return tempCellSym;
      } catch (error) {
        return null;
      }

      break;

    default:
      break;
  }
};

const executeStep = (currColSym, neighborPos, row, col) => {
  //get neighbor Symbol
  let neighborSymbol = getNeighborSymbol(neighborPos, row, col);
  let colNum = 0;
  let rowNum = 0;

  if (neighborSymbol !== null && neighborSymbol !== undefined) {
    //execute instruction on neighbor cell (sum and apply rule)
    let newInstruction = executeInstruction(currColSym, neighborSymbol);

    //check index pos before replacing
    switch (neighborPos) {
      //top
      case "t1":
        rowNum = parseInt(row - 1);
        colNum = parseInt(col - 1);
        break;
      case "t2":
        rowNum = parseInt(row - 1);
        colNum = parseInt(col);
        break;
      case "t3":
        rowNum = parseInt(row - 1);
        colNum = parseInt(col + 1);
        break;

      //middle
      case "m1":
        rowNum = parseInt(row);
        colNum = parseInt(col - 1);
        break;

      case "m3":
        rowNum = parseInt(row);
        colNum = parseInt(col + 1);
        break;

      //bottom
      case "b1":
        rowNum = parseInt(row + 1);
        colNum = parseInt(col - 1);
        break;
      case "b2":
        rowNum = parseInt(row + 1);
        colNum = parseInt(col);
        break;
      case "b3":
        rowNum = parseInt(row + 1);
        colNum = parseInt(col + 1);
        break;

      default:
        break;
    }

    //replace neighbor cell symbol
    let tempRow = setCharAt(memoryArr[rowNum], colNum, newInstruction);
    if (memoryArr[rowNum] !== tempRow) {
      memoryArr[rowNum] = tempRow;
    }
  }
};

let rowCnt = 0;
let colCnt = 0;
//main function of the program
const mainLoop = () => {
  // loop the memory and execute the program
  //curr symbol is assumed to be the center of a 3x3 grid
  // * * *
  // * C *
  // * * *
  executeStep(memoryArr[rowCnt][colCnt], "t1", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "t2", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "t3", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "m1", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "m3", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "b1", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "b2", rowCnt, colCnt);
  executeStep(memoryArr[rowCnt][colCnt], "b3", rowCnt, colCnt);
  colCnt += 1;

  //reset col counter to the beggining of the string (or row)
  //and move to next row of array
  if (
    colCnt === memoryArr[rowCnt].length - 1 &&
    rowCnt < memoryArr.length - 1
  ) {
    colCnt = 0;
    rowCnt += 1;
  }

  //if the loop reaches the end, go back to [0][0] so it can start again
  if (
    rowCnt === memoryArr.length - 1 &&
    colCnt === memoryArr[rowCnt].length - 1
  ) {
    colCnt = 0;
    rowCnt = 0;
  }

  //see the program on the console
  console.clear();
  console.log(memoryArr);
};

// --------------------------------------------------
// --------------------------------------------------

// variable to store intervalID
let intervalId;

if (!intervalId) {
  intervalId = setInterval(mainLoop, 10);
}

// --------------------------------------------------
// --------------------------------------------------
//logic for keypress to stop program
var readline = require("readline");

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

//stop the program pressing q
process.stdin.on("keypress", (chunk, key) => {
  if (key && key.name == "q") {
    // stop the setInterval function
    clearInterval(intervalId);
    // release our intervalId from the variable
    intervalId = null;
    process.exit();
  }
  //   console.log({ key });
});

// --------------------------------------------------
// --------------------------------------------------
