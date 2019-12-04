const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let arrayinput = input.split('\n');
let arrayinputDirections = arrayinput.map(str => str.split(','));

const closestIntersection = list => {
  let minDistance = 0;

  for (const item of list) {
    const distance = Math.abs(item[0]) + Math.abs(item[1]);

    if (minDistance === 0 || minDistance > distance) {
      minDistance = Math.abs(item[0]) + Math.abs(item[1]);
    }
  }

  return minDistance;
};

const calcIntersections = (listPosWire1, listPosWire2) => {
  const SetListPosWire2 = new Set();

  for (const point of listPosWire2) {
    SetListPosWire2.add(point.toString());
  }

  let listIntersections = listPosWire1.filter(point =>
    SetListPosWire2.has(point.toString())
  );

  return listIntersections;
};

const calcListPoints = (direction, number, lastPointAdded) => {
  let listPoints = [];
  let point = [lastPointAdded[0], lastPointAdded[1]];

  for (let index = 0; index < number; index++) {
    switch (direction) {
      case 'R':
        point[0] += 1;
        break;
      case 'L':
        point[0] -= 1;
        break;
      case 'U':
        point[1] += 1;
        break;
      case 'D':
        point[1] -= 1;
        break;

      default:
        break;
    }
    listPoints.push([point[0], point[1]]);
  }

  return listPoints;
};

const calcPosWire = wire => {
  let listPosWire = [[0, 0]];

  for (let index = 0; index < wire.length; index++) {
    const number = Number(wire[index].replace(wire[index][0], ''));
    const firstLetter = wire[index].charAt(0);

    let listPoints = calcListPoints(
      firstLetter,
      number,
      listPosWire[listPosWire.length - 1]
    );

    listPosWire = listPosWire.concat(listPoints);
  }

  listPosWire.shift();
  return listPosWire;
};

const calcMDistance = array => {
  const wire1 = array[0];
  const wire2 = array[1];

  const listPosWire1 = calcPosWire(wire1);
  const listPosWire2 = calcPosWire(wire2);

  const listIntersections = calcIntersections(listPosWire1, listPosWire2);

  return closestIntersection(listIntersections);
};

console.time('Time part1');
console.log(calcMDistance(arrayinputDirections));
console.timeEnd('Time part1');

//Part 2
const calcMinCombinedSteps = listCombinedSteps => {
  listCombinedSteps.sort((a, b) => a - b);
  return listCombinedSteps[0];
};

const calcSteps = (intersection, listPosWireStr) => {
  let steps = 1; //index of array starts at 0 so we need to add 1 to get the length

  steps += listPosWireStr.indexOf('[' + intersection.toString() + ']');

  return steps;
};

const calcListCombinedSteps = (
  listPosWire1,
  listPosWire2,
  listIntersections
) => {
  const list = [];
  const listPosWire1Str = listPosWire1.map(point => {
    return '[' + point.toString() + ']';
  });
  const listPosWire2Str = listPosWire2.map(point => {
    return '[' + point.toString() + ']';
  });

  for (const intersection of listIntersections) {
    const steps1 = calcSteps(intersection, listPosWire1Str);
    const steps2 = calcSteps(intersection, listPosWire2Str);
    const combinedSteps = steps1 + steps2;
    list.push(combinedSteps);
  }

  return list;
};

const fewestCombinedSteps = arrayWires => {
  const wire1 = arrayWires[0];
  const wire2 = arrayWires[1];

  const listPosWire1 = calcPosWire(wire1);
  const listPosWire2 = calcPosWire(wire2);
  const listIntersections = calcIntersections(listPosWire1, listPosWire2);

  const listCombinedSteps = calcListCombinedSteps(
    listPosWire1,
    listPosWire2,
    listIntersections
  );

  return calcMinCombinedSteps(listCombinedSteps);
};

console.time('Time part2');
console.log(fewestCombinedSteps(arrayinputDirections));
console.timeEnd('Time part2');