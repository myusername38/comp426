/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */

/*
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    return (`
        <div class="super-tile m-sm p-0" id="${ hero.name.replace(/ /g,'-') }-info">
            <div class="upper p-sm mt-0" style="background-color:${ hero.backgroundColor };">
                <img class="super-image" src="${ hero.img }">
                <h1 class="super-title" style="color: ${ hero.color };">${ hero.name }</h1>
                <p class="super-slogan" style="color: ${ hero.color };">"${ hero.subtitle }"</p>
            </div>
            <div class="super-info">
                <p class="super-persons"><span class="super-bold">Alter Ego: </span>${ hero.first } ${ hero.last }</p>
                <p class="super-persons"><span class="super-bold">First Appearance: </span>${ hero.firstSeen.getMonth() + 1 } / ${ hero.firstSeen.getFullYear() }</p>
                <p class="super-description">${ hero.description }</p>
            </div>
            <button class="edit" type="button" id="${ hero.name }">Edit</button>
        </div>
    `);
    // TODO: Copy your code from a04 to render the hero card
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    return (`
        <div id="form-container">
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
                        <input class="input" type="text" value="${ hero.firstSeen }" name="firstSeen">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" name="description">${ hero.description }</textarea>
                    </div>
                </div>
                    <button id="save" type="submit">Save</button>
                    <button id="${ hero.name }" class="cancel">Cancel</button>
            </form>
            <p id="hidden">${ hero.id }</p>
        </div>

    `);
    // TODO: Copy your code from a04 to render the hero edit form
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    const $root = $('#root');
    if (!document.getElementById('super-form')) {
        const $heroCard = $(`#${ event.id.replace(/ /g,'-') }-info`);
        $heroCard.remove();
        //console.log(`${ event.id }-info`);
        let hero = heroicData.filter(h => h.name === event.id);
        $root.append(renderHeroEditForm(hero[0])); 
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    console.log(event.id);
    const $root = $('#root');

    let hero = heroicData.filter(h => h.name === event.id)[0];
    console.log(hero);
    $('#form-container').remove();
    //$root.remove('#super-form');
    $root.append(renderHeroCard(hero));
    
   
   
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    event.preventDefault();

    const formData = $('#super-form').serializeArray();
    console.log('submitted');
    const superId = parseInt(document.getElementById('hidden').innerHTML);
    const $root = $('#root');
    let date = new Date( formData[4].value);
    date = new Date(date.getFullYear(), date.getMonth());
    let submittedHero;
    
    heroicData.forEach( hero => {
        if (hero.id === superId) {
            hero.first = formData[1].value,
            hero.last = formData[2].value,
            hero.name = formData[0].value,
            hero.subtitle = formData[3].value;
            hero.description = formData[5].value;
            hero.firstSeen = date;
            submittedHero = hero;
        }
    });
    $('#form-container').remove();
    $root.append(renderHeroCard(submittedHero));

    //let hero = heroicData.filter(h => h.name = event.id)[0];

    //loadHeroesIntoDOM(heroicData);
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
   
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
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
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);

    $(document).on('click', '.cancel', function() {
        handleCancelButtonPress(this);
    });
    $(document).on('submit', '#super-form', function(event) {
        handleEditFormSubmit(event);
    });
    $(document).on('click', '.edit', function() { 
        handleEditButtonPress(this);
    });
});
