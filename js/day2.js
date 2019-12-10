const inputs = [
  1,
  12,
  2,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  9,
  19,
  1,
  13,
  19,
  23,
  2,
  23,
  9,
  27,
  1,
  6,
  27,
  31,
  2,
  10,
  31,
  35,
  1,
  6,
  35,
  39,
  2,
  9,
  39,
  43,
  1,
  5,
  43,
  47,
  2,
  47,
  13,
  51,
  2,
  51,
  10,
  55,
  1,
  55,
  5,
  59,
  1,
  59,
  9,
  63,
  1,
  63,
  9,
  67,
  2,
  6,
  67,
  71,
  1,
  5,
  71,
  75,
  1,
  75,
  6,
  79,
  1,
  6,
  79,
  83,
  1,
  83,
  9,
  87,
  2,
  87,
  10,
  91,
  2,
  91,
  10,
  95,
  1,
  95,
  5,
  99,
  1,
  99,
  13,
  103,
  2,
  103,
  9,
  107,
  1,
  6,
  107,
  111,
  1,
  111,
  5,
  115,
  1,
  115,
  2,
  119,
  1,
  5,
  119,
  0,
  99,
  2,
  0,
  14,
  0
];

const operation = num => {
  switch (num) {
    case 1:
      return `add`;
    case 2:
      return `multiply`;
    case 99:
      return `end`;
    default:
      return undefined;
  }
};

function intcodeOperation(intcode, inputs) {
  const op = operation(intcode[0]);
  const pos1 = intcode[1];
  const pos2 = intcode[2];
  const storePos = intcode[3];
  const num1 = inputs[pos1];
  const num2 = inputs[pos2];

  let result = 0;

  if (op === `add`) {
    result = num1 + num2;
  } else if (op === `multiply`) {
    result = num1 * num2;
  } else if (op === `end`) {
    return;
  } else {
    return;
  }

  return {
    result: result,
    storePos: storePos
  };
}

const isValidIntercode = chunk => {
  let result = false;

  if (chunk[0] === 1 || chunk[0] === 2) {
    result = true;
  }

  return result;
};

const intcodeAllTheThings = inputs => {
  const chunkLength = 4;

  let inputsClone = inputs.slice(0);

  const numberOfChunks = Math.floor(inputsClone.length / chunkLength);

  for (var i = 0; i <= numberOfChunks; i++) {
    const chunkIndex = i * chunkLength;
    const chunkToPass = inputsClone.slice(chunkIndex, chunkIndex + chunkLength);

    if (!isValidIntercode(chunkToPass)) {
      break;
    }

    const opResult = intcodeOperation(chunkToPass, inputsClone);

    if (opResult) {
      inputsClone[opResult.storePos] = opResult.result;
    }
  }

  return inputsClone[0];
};

const meetTarget = inputs => {
  const targetValue = 19690720;
  const inputsClone = inputs.slice(0);

  let noun = 0;

  for (noun; noun < 100; noun++) {
    let verb = 0;

    for (verb; verb < 100; verb++) {
      const inputsCloneInner = inputsClone.slice(0);

      inputsCloneInner[1] = noun;
      inputsCloneInner[2] = verb;

      const calculation = intcodeAllTheThings(inputsCloneInner);

      if (calculation === targetValue) {
        console.log(`${noun} ${verb}`);
        return 100 * noun + verb;
      }
    }
  }
};

meetTarget(inputs);

document.querySelector("h2").innerHTML = meetTarget(inputs);
