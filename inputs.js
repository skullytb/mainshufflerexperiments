function createInputs(numberOfInputs) {
    numberOfInputs + 2;

    for (let i = 1; i <= numberOfInputs; i++) {

        let selectDiv = document.createElement('div'); // not this one

        let mainSelect = document.createElement('select');

        let newLabel = document.createElement('label'); // not this one

        let playerLabel = document.createElement('label'); // not this one
        let playerText = document.createElement('input');


        // testing
        mainSelect.classList.add('selectDiv_Class');
        playerText.classList.add('selectDiv_Class');

        newLabel.innerText = (` Player ${i}'s Main: `);
        mainSelect.id = (`Main ${i}`);

        mainSelect.name = ('Main');
        playerLabel.innerText = (`Player ${i}'s Name: `);

        // playerText, which is the input element, is required for the names
        playerText.setAttribute('required', '');


        playerText.type = ('text');
        playerText.id = (`player${i}`);


        selectDiv.className = ('inputs');

        selectDiv.appendChild(playerLabel);
        selectDiv.appendChild(playerText);
        selectDiv.appendChild(newLabel);
        selectDiv.appendChild(mainSelect);



        heroArray = getHeroArray();
        heroArray.forEach(heroOptions);

        function heroOptions(hero) {

            let heroElement = document.createElement('option');

            heroElement.value = hero;
            heroElement.innerText = hero;
            mainSelect.appendChild(heroElement);

        }
        // document.btn.appendChild(selectDiv);
        document.getElementById('inputContainer').appendChild(selectDiv);

    }
}

function getHeroArray() {
    let heroArray = ["Randomize", "Ana", "Ashe", "Baptiste", "Bastion", "Brigette", "Cassidy", "D.va", "Doomfist", "Echo", "Genji", "Hanzo", "Junker Queen -- OW2 Only", "Junkrat", "Lucio", "Mei", "Mercy", "Moira", "Orisa", "Pharah", "Reaper", "Reinhardt", "Roadhog", "Sigma", "Sojourn -- OW2 Only", "Soldier: 76", "Sombra", "Symmetra", "Torbjorn", "Tracer", "Widowmaker", "Winston", "Wrecking Ball", "Zarya", "Zenyatta"];
    return heroArray;
}
