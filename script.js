nouns.forEach((noun, index) => {
    for(selectElement of document.getElementsByClassName("noun")) {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = noun.word;
        selectElement.appendChild(option);
    }
});

adjectives.forEach((adjective) => {
    for(selectElement of document.getElementsByClassName("adjective")) {
        let option = document.createElement("option");
        option.value = adjective;
        option.textContent = adjective;
        selectElement.appendChild(option);
    }
});
