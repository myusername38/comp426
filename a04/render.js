/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <Martin Smolka>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */


let heroData = heroicData;

export const renderHeroCard = function(hero) {
    console.log('render');
    //console.log(heroicData);
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return (`
    <div class="super-tile m-sm p-0">
        <div class="upper p-sm mt-0" style="background-color:${ hero.backgroundColor };">
            <img class="super-image" src="${ hero.img }">
            <h1 class="super-title" style="color: ${ hero.color };">${ hero.name }</h1>
            <p class="super-slogan" style="color: ${ hero.color };">"${ hero.subtitle }"</p>
        </div>
        <div class="super-info">
            <p class="super-persons"><span class="super-bold">Alter Ego: </span>${ hero.first } ${ hero.last }</p>
            <p class="super-persons"><span class="super-bold">First Appearance: </span>${ hero.firstSeen.getMonth() } / ${ hero.firstSeen.getFullYear() }</p>
            <p class="super-description">${ hero.description }</p>
        </div>
        <button class="edit" type="button" id="${ hero.name }">Edit</button>
    </div>
    `);
};

//<button class="edit" type="button" onclick = "editHero('${ hero.name }')">Edit</button>

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return (`
        <div class="column is-half mlr-auto">
            <div class="content">
                <div class="w-100 has-text-centered">
                    <img class="super-image has-text-centered" src="${ hero.img }">
                </div>
                <form id="super-form">
                    <div class="field">
                        <label class="label">Hero Name</label>
                        <div class="control">
                            <input class="input" type="text" value="${ hero.name }" name="name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                            <input class="input" type="text" value="${ hero.first }" name="first">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control">
                            <input class="input" type="text" value="${ hero.last }" name="last">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Subtitle</label>
                        <div class="control">
                            <input class="input" type="text" value="${ hero.subtitle }" name="subtitle">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">First Seen</label>
                        <div class="control">
                            <input type="date" value="${ hero.firstSeen.getFullYear() }-0${ hero.firstSeen.getMonth() }-01" name="firstSceen">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" name="description">${ hero.description }</textarea>
                        </div>
                    </div>
                        <button id="save" type="submit">Save</button>
                        <button id="cancel">Cancel</button>
                </form>
                <p id="hidden">${hero.id}</p>
            </div>
        </div>
    `);
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    let form = "";
    let heros = "";
    heroes.forEach(hero => {
        heros += renderHeroCard(hero);
    });
    $root.html(heros);
    // TODO: Generate the heroes using renderHeroCard()

    // TODO: Append the hero cards to the $root element

    // Pick a hero from the list at random
   // const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element
};

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */

$(function() {
    loadHeroesIntoDOM(heroData);
    $(document).on('submit', '#super-form', function(event){    
        event.preventDefault();
        const formData = $('#super-form').serializeArray();
        console.log('submitted');
        const superId = parseInt(document.getElementById('hidden').innerHTML);
        let newData = heroData.map( hero => {
            console.log(superId);
            //console.log(formData[0].value);
            if (hero.id === superId) {
                console.log('worked');
                return {
                    id: hero.id,
                    first: formData[1].value,
                    last: formData[2].value,
                    name: formData[0].value,
                    img: hero.img,
                    color: hero.color,
                    backgroundColor: hero.backgroundColor,
                    subtitle: formData[3].value,
                    description: formData[5].value,
                    firstSeen: hero.firstSeen,
                };
            }
            return hero;
        });
        heroData = newData;
        loadHeroesIntoDOM(heroData);
    });
    
    $(document).on('click', '.edit', function(event){    
        handleEditButtonPress(this);
    });
    //console.log(heroicData);
   //loadHeroesIntoDOM(heroData);
});

export function handleEditButtonPress(event) {
    const $root = $('#root');
    let hero = heroData.filter(h => h.name === event.id);
   $root.html(renderHeroEditForm(hero[0]));
}

