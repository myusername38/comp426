 import mpg_data from "./data/mpg_data";
import {getStatistics} from "./medium_1";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export function getAverageMPG() {
    let citySum = 0;
    let hwySum = 0;
    mpg_data.map(c => {
        citySum += c.city_mpg;
        hwySum += c.highway_mpg;
    });
    const city = citySum / mpg_data.length;
    const highway = hwySum / mpg_data.length;
    return { city, highway };
}
export function getRatioHybrids() {
    let hybrids = 0;
    mpg_data.forEach(c => {
        if(c.hybrid){
            hybrids++;
        }
    });
    return (hybrids / mpg_data.length);
}
console.log(getAverageMPG());
console.log(getRatioHybrids());
export const allCarStats = {
    avgMpg: getAverageMPG(),
    allYearStats: getStatistics(mpg_data.map(c => c.year)),
    ratioHybrids: getRatioHybrids(),
};



/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
console.log(getMakerHybrids());
export function getMakerHybrids() {
    let hybrids = []; 
    mpg_data.map(c => {
        let maker = hybrids.find(make => make['make'] === c.make); 
        if (maker && c.hybrid){
            maker.hybrids[maker.hybrids.length] = c.id;
        } else if (c.hybrid) {
            hybrids[hybrids.length] = { make: c.make, hybrids: [c.id] } ;
        }
    });
    hybrids.sort( function(a, b) { return b.hybrids.length - a.hybrids.length} )
    return hybrids;
}
console.log(getAvgMpgByYearAndHybrid());
export function getAvgMpgByYearAndHybrid() {
    let years = [];
    let output = {};
    mpg_data.forEach( c => {
        if (!years.filter(year => year === c.year)[0]) {
            years[years.length] = c.year;
        }
    });
    years.map( y => {
        let hybrids = mpg_data.filter(c => (c.year === y && c.hybrid));
        let nonHybrids = mpg_data.filter(c => (c.year === y && !c.hybrid));
        output[y] = {
            hybrid: getAverageMPGHelper(hybrids),
            notHybrid: getAverageMPGHelper(nonHybrids),
        }
    });
    return output;
}
export function getAverageMPGHelper(data) {
    let citySum = 0;
    let hwySum = 0;
    data.map(c => {
        citySum += c.city_mpg;
        hwySum += c.highway_mpg;
    });
    const city = citySum / data.length;
    const highway = hwySum / data.length;
    return { city, highway };
}
console.log(getAvgMpgByYearAndHybrid());

export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid()
};
