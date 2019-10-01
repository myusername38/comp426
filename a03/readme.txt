/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return `${a} + ${b} = ${a+b}`
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let output = new Array(endNumber - startNumber + 1);

    let i = startNumber;

    for( i ; i <= endNumber; i++ ){
        console.log(i);
        //output[i - startNumber] = i;
    }
   //return output;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let heighest = numbers[0];
    let smallest = numbers[0];
    numbers.forEach(function(element){
        console.log(element);
    });
        /*
        if(element > heighest){
            hieghest = element;
        }
        else if (element < smallest) {
            smallest = element
        }
        
    });
    console.log({ min: smallest, max: heightest });
    return { min: smallest, max: heightest };
    */
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let elements = {}

    array.forEach(function(element) {
        console.log(element);
        /*
        if(element in elements){
            elements.element = elements.element + 1;
        }
        else{
            elements.push({element: 1});
        }
        */
    });
    console.log(elements);
    return elements;
}
