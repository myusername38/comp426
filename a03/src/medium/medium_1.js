import {variance} from "./data/stats_helpers";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
console.log(getSum([3, 4, 5, 6]));
export function getSum(array) {
    let count = 0;

    array.forEach(element => {
        count += element;
    });
    return count;
}


/**
 * Calculates the mean of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * 
 */
let array = [3,2,5,6,2,7,4,2,7,5];
console.log(getMedian(array)); // 4.5
 
export function getMedian(array) {
    array.sort(function(a, b) { return a - b });
    if (array.length % 2 === 1) {
        return array[Math.floor(array.length / 2)];
    } else {
        const lower = array[Math.floor(array.length / 2)];
        const upper = array[Math.floor(array.length / 2) - 1];
        return (lower + upper) / 2;
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
console.log( getStatistics([3,2,4,5,5,5,2,6,7]));
export function getStatistics(array) {
    const length = array.length;
    const sum = getSum(array);
    const mean = getSum(array) / array.length;
    const median = getMedian(array);
    let variance = 0;
    array.map(n => variance += Math.pow((n - mean), 2));
    variance = variance / array.length;
    const standard_deviation = Math.sqrt(variance);
    let min = array[0];
    let max = array[0];
    array.map(n => {
        if (n < min){
            min = n;
        }
        if (n > max) {
            max = n;
        }
    });
    return {
        length, sum, mean, median, min, max, variance, standard_deviation
    };
}

