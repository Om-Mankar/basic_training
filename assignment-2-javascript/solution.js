// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
    // Write your code here
    let firstMax = -1;
    let secondMax = -1;
    for (let i = 0; i < array.length; i++) {
      if (firstMax == -1 || firstMax <= array[i]) {
        secondMax = firstMax;
        firstMax = array[i];
      } else if (secondMax < array[i]) {
        secondMax = array[i];
      }
    }
    return secondMax;
  }
  
  // Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
  function calculateFrequency(string) {
    // Write your code here
    const arr = new Array(26);
    arr.fill(0);
    for (let i = 0; i < string.length; i++) {
      let index = string.charCodeAt(i) - 97;
      if (index >= 0 && index <= 25) {
        arr[index]++;
      }
    }
  
    // creating an empty object
    let obj = {};
    for (let i = 0; i < string.length; i++) {
      let index = string.charCodeAt(i) - 97;
      if (index >= 0 && index <= 25) {
        obj[string[i]] = arr[index];
      }
    }
    return obj;
  }
  
  // Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
  var output = {};
  function flattening(key, value) {
    if (!(typeof value == "object" || typeof value == "array")) {
      // console.log(typeof value);
      output[`${key}`] = value;
  
      return;
    }
    //if object OR array
    if (typeof value === "object") {
      for (const property in value) {
        newKey = key + `.${property}`;
        newVal = value[property];
        flattening(newKey, newVal);
      }
    }
  }
  function flatten(unflatObject) {
    // Write your code here
    for (const property in unflatObject) {
      flattening(property, unflatObject[property]);
    }
    return output;
  }
  
  // Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
  let output2 = {};
  function unflatten(flatObject) {
    // Write your code here
    for (const property in flatObject) {
      const myArray = property.split(".");
      let val = flatObject[property];
      let obj = output2;
      while (myArray.length > 1) {
        //when obj key is obj
        if (obj[myArray[0]] == undefined) {
          //here need to check whether obj or array depends on next aaray  elment
          if (isNaN(Number(myArray[1]))) {
            // value is stored in an Object
            obj[myArray[0]] = {};
          } else {
            // value is stored in an Array
            obj[myArray[0]] = [];
          }
        } else if (obj[myArray[0]] == {}) {
          //here need to check whether obj or array depends on next aaray  elment
          if (isNaN(Number(myArray[1]))) {
            // value is stored in an Object
            obj[myArray[0]].push({});
          } else {
            // value is stored in an Array
            obj[myArray[0]].push([]);
          }
        }
        obj = obj[myArray[0]];
        myArray.shift();
      }
      obj[myArray[0]] = val;
    }
    console.log(output2);
    return output2;
  }