function difference(arr1, arr2) {
  const commonArr = arr1.concat(arr2);
  let bufObject = commonArr.reduce(function(accumulator, currentValue) {
    accumulator.hasOwnProperty(currentValue) ? accumulator[currentValue]++ : (accumulator[currentValue] = 1);
    return accumulator;
  }, {});
  let resultArr = Object.keys(bufObject)
    .filter(currentValue => bufObject[currentValue] === 1)
    .map(value => Number(value));
  console.log(resultArr);
}

// Expected result

// difference([2, 1], [2, 3, 4]);
// => [1, 3, 4]
