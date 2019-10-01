import mpg_data from "./data/mpg_data";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    const output =  car_data.filter(c => (c.horsepower >= minHorsepower && c.torque >= minTorque));
    return output.sort((a, b) => { return b.horsepower - a.horsepower });
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
//onsole.log(searchMpg(mpg_data, 25, 34));
export function searchMpg(car_data, minCity, minHighway) {
    let cars =  car_data.filter(c => (c.city_mpg >= minCity && c.highway_mpg >= minHighway));
    cars = cars.sort((a, b) => { return b.highway_mpg - a.highway_mpg });
    return cars;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
console.log(searchName(mpg_data, 'honda'));
export function searchName(car_data, searchTerm) {
    return car_data.filter(c => (c.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order. 
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
//console.log(searchByYear(mpg_data, [2012, 2011, 2009]));
export function searchByYear(car_data, years) {
    let cars = car_data.filter(c => years.filter(y => y === c.year)[0]);
    cars = cars.sort(function(a, b) { return b.year - a.year });
    return cars;
}
