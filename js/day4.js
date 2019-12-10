const inputs = [273025, 767253];

const isValidPassword = input => {
  let result = false;
  const inputString = input.toString();
  const inputLength = inputString.length;
  // breaks input into an array of digits
  const inputAsArray = Array.from(inputString).map(Number);

  // It is a six-digit number.
  if (Number.isInteger(input) && inputLength === 6) {
    result = true;
  } else {
    return false;
  }

  // Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
  let lessThanRule = true;

  for (let k = 0; k < inputLength; k++) {
    const l = k + 1;

    if (inputAsArray[l] < inputAsArray[k]) {
      lessThanRule = false;
      break;
    }
  }

  if (lessThanRule) {
    result = true;
  } else {
    return false;
  }

  // the two adjacent matching digits are not part of a larger group of matching digits
  // but there is at least 2
  let notLargerGroup = false;

  for (let m = 0; m < inputLength; m++) {
    const match6 =
      inputAsArray[m] === inputAsArray[m + 1] &&
      inputAsArray[m] === inputAsArray[m + 2] &&
      inputAsArray[m] === inputAsArray[m + 3] &&
      inputAsArray[m] === inputAsArray[m + 4] &&
      inputAsArray[m] === inputAsArray[m + 5];

    const match5 =
      inputAsArray[m] === inputAsArray[m + 1] &&
      inputAsArray[m] === inputAsArray[m + 2] &&
      inputAsArray[m] === inputAsArray[m + 3] &&
      inputAsArray[m] === inputAsArray[m + 4];

    const match4 =
      inputAsArray[m] === inputAsArray[m + 1] &&
      inputAsArray[m] === inputAsArray[m + 2] &&
      inputAsArray[m] === inputAsArray[m + 3];

    const match3 =
      inputAsArray[m] === inputAsArray[m + 1] &&
      inputAsArray[m] === inputAsArray[m + 2];

    const match2 = inputAsArray[m] === inputAsArray[m + 1];

    // match six or five is a fail
    if (match6 || match5) {
      break;
    } else if (match4) {
      if (
        // MMMMXX
        (m === 0 && inputAsArray[4] === inputAsArray[5]) ||
        // XYMMMM
        (m === 2 && inputAsArray[0] === inputAsArray[1])
        // XMMMMX won't work
      ) {
        notLargerGroup = true;
        break;
      }
      // breaking here so match3 doesn't happen
      break;
    } else if (match3) {
      if (m === 0) {
        if (
          (inputAsArray[3] === inputAsArray[4] &&
            inputAsArray[4] !== inputAsArray[5]) ||
          (inputAsArray[4] === inputAsArray[5] &&
            inputAsArray[3] !== inputAsArray[4])
        ) {
          notLargerGroup = true;
          break;
        }
      } else if (m === 1 && inputAsArray[4] === inputAsArray[5]) {
        notLargerGroup = true;
        break;
      } else if (m === 2 && inputAsArray[0] === inputAsArray[1]) {
        notLargerGroup = true;
        break;
      } else if (m === 3) {
        if (
          (inputAsArray[0] === inputAsArray[1] &&
            inputAsArray[1] !== inputAsArray[2]) ||
          (inputAsArray[1] === inputAsArray[2] &&
            inputAsArray[0] !== inputAsArray[1])
        ) {
          notLargerGroup = true;
          break;
        }
      }
      break;
    } else if (match2) {
      notLargerGroup = true;
      break;
    }
  }

  if (notLargerGroup == true) {
    result = true;
  } else {
    return false;
  }

  return result;
};

const countResults = (lower, upper) => {
  let i = lower;
  let tally = 0;
  for (i; i <= upper; i++) {
    if (isValidPassword(i)) {
      tally++;
    }
  }
  console.log(`tally: ${tally}`);
  return tally;
};

// console.log(isValidPassword(112233));

document.querySelector("h2").innerHTML = countResults(273025, 767253);

// 598 is the right answer
