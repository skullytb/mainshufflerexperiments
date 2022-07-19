// START radio button evt listener
let radios = document.getElementsByName('players');
let inputsExist = false;
radios.forEach(function(element) {

    element.addEventListener("click", function(e) {
        let radioValue = radioBtnValue();
        console.log(radioValue);
        // createInputs(radioValue);
        console.log('clicked');
        e.preventDefault;
        if (inputsExist) {
            resetInputs();
            createInputs(radioValue);
            inputsExist = true;
        } else {
            createInputs(radioValue);
            inputsExist = true;
        }
    })
});
// END radio button evt listener

//reset Inputs leaves inputcontainer empty
function resetInputs() {

    document.getElementById('inputContainer').innerHTML = "";

}

//reset Outputs leaves resultsdiv empty
function resetOutputs() {
    document.getElementById('resultsDiv').innerHTML = "";
}


// function returns the value of checked radio button
function radioBtnValue() {
    let radios = document.getElementsByName('players');
    for (let radio of radios) {
        if (radio.checked) {

            return radio.value;

        }
    }
}


// trying to get resetbutton to work on the button ---- 
let RESET = document.getElementById('RESET');
if (RESET) { // checking if reset is null
    RESET.addEventListener("click", function(e) {

        e.preventDefault;
        console.log('clicked reset');

        document.getElementById('charswap').reset();
        resetOutputs();
    });
}


// START submit evt listener
const form = document.querySelector('#charswap'); // select the form ID from HTML
let numPlayers;
form.addEventListener("submit", function(e) {
    console.log('Submitted swap form!');
    e.preventDefault(); // stop page from being redirected
    // start with # of players, this info will be needed later
    numPlayers = radioBtnValue();
    resetOutputs();
    getPlayerInfo();

    // Shuffler does thing here
    Shuffler();

    // Swap character function called
    Swap();

    // Show results on the DOM
    Results();

});
// END submit evt listener







// next task: move on to names, mains, and the randomizer, remove all appendages when clicking submit again, make 'results' text be a part of form
class player {
    constructor(Name, Main, SwappedMain, SwappedWith) {
        this.Name = Name;
        this.Main = Main;
        this.SwappedMain = SwappedMain;
        this.SwappedWith = SwappedWith;
    }
}

let players = [];

function getPlayerInfo() {


    players.length = radioBtnValue(); // players array is giong to be the same length as our radio button value
    console.log(players.length);
    for (x = 0; x < players.length; x++) { // loop through array
        let tempName = document.getElementById(`player${x+1}`).value;
        let tempMain = document.getElementById(`Main ${x+1}`).value;
        let tempPlayer = new player(tempName, tempMain, '', '');

        players[x] = tempPlayer;


    }

}

function RandomNumber(max) {
    return Math.floor(Math.random() * max);

}

let ShuffleArray = []; // need access to this in Swap()

function Shuffler() {
    ShuffleArray = [];

    ShuffleArray.length = players.length;
    let tempRandom = RandomNumber(players.length); // without this, gives empty, have to fill the array first

    for (x = 0; x < ShuffleArray.length; x++) {


        while (ShuffleArray.indexOf(tempRandom) !== -1) { // if tempRandom is in array, and the first # is not 0

            tempRandom = RandomNumber(players.length); //roll dice with RandomNumber again

        }
        ShuffleArray[x] = tempRandom; //place the random number in array

    }
    console.log(ShuffleArray);

}

function Swap() {
    let tempChar;
    let heroArrayVar = getHeroArray();

    for (x = 0; x < players.length; x++) {
        if (players[x].Main == 'Randomize') {
            tempChar = heroArrayVar[(RandomNumber(heroArrayVar.length - 1)) + 1]; // the +1 shortens the range and shifts it over
            players[x].Main = tempChar; // calculates down to a single rand #, placing in shuffle arr
            console.log(tempChar);
        }
    }

    for (x = 0; x < players.length; x++) {

        players[x].SwappedMain = players[ShuffleArray[x]].Main; // grabbing the players box at x, Swapped Main of players box variable is accessed, set ShuffleArray at x = main
        players[x].SwappedWith = players[ShuffleArray[x]].Name;
    }

}


function Results() {
    let Results = document.getElementById('resultsDiv');


    // begin results to be changed

    const resultsTag = document.createElement('div');

    const numPlayersPg = document.createElement('div'); // **use as a ref, create div first
    const newImg = document.createElement('img');


    resultsTag.classList.add('resultsTag_Class');


    numPlayersPg.classList.add('numPlayersPg_Class'); // **add a class for the CSS



    numPlayersPg.innerHTML = numPlayers; //** set  innerHTML of that div to  numPlayers .. (numPlayers = radio.value)*/

    newImg.classList.add('poop');
    newImg.src = "https://raw.githubusercontent.com/RadiantCrow77/radiantcrow77.github.io/main/overpoo.png";



    let newline = document.createElement("br"); // this line is important for the following divs

    resultsTag.innerText = `Results Here:`;



    numPlayersPg.innerHTML = `<font size=5em>Congratulations! There are <b>${numPlayersPg.innerHTML}</b> players in your Overpoo team!!!</font>`; // Set numPlayerspginnerHTML to equal the entire string
    numPlayersPg.appendChild(newline.cloneNode());
    numPlayersPg.appendChild(newline.cloneNode());

    let tempdiv = document.createElement("div");
    tempdiv.className = "outputText"



    if (players.length == 2) {

        if (players[0].Main == players[0].SwappedMain) {

            tempdiv.innerText = ('No one swaps this time! Please shuffle again if you want.');
            numPlayersPg.appendChild(tempdiv.cloneNode(true));
            numPlayersPg.appendChild(newline.cloneNode());


        } else {

            tempdiv.innerHTML = `<b>${players[0].Name}</b> has swapped with <b>${players[1].Name}</b>. <b>${players[0].Name}</b> is now: <b>${players[1].Main}</b>! <b>${players[1].Name}</b> is now: <b>${players[0].Main}</b>!`;
            numPlayersPg.appendChild(tempdiv.cloneNode(true));
            numPlayersPg.appendChild(newline.cloneNode());
        }
    } else {

        for (x = 0; x < players.length; x++) {
            if (players[x].Main == players[x].SwappedMain) {


                tempdiv.innerHTML = `<b>${players[x].Name}</b> did not swap and remains as <b>${players[x].Main}</b>.`;
                numPlayersPg.appendChild(tempdiv.cloneNode(true));
                numPlayersPg.appendChild(newline.cloneNode());
                continue; // continue stops iteration of loop
            }

            tempdiv.innerHTML = `<b>${players[x].Name}</b> has swapped with <b>${players[x].SwappedWith}</b>. They are now <b>${players[x].SwappedMain}</b>!`;
            numPlayersPg.appendChild(tempdiv.cloneNode(true));
            numPlayersPg.appendChild(newline.cloneNode());



        }

    }

    // Append webpage
    numPlayersPg.appendChild(newImg); // put stuff inside of numPlayersPg first

    Results.appendChild(resultsTag);
    Results.appendChild(numPlayersPg); // append numPlayersPg to the page
}

// made scrollbar - 7/19
// hoverable buttons
// put vamp's IG and Twitter - 7/19
// https://twitter.com/Gamervamp2
// https://www.instagram.com/gamervamp12/
// some react to look nicer
// ongoing - make nicer as learning more
