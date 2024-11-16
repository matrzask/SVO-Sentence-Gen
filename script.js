nouns.forEach((noun, index) => {
    for(selectElement of document.getElementsByClassName("noun")) {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = noun.word;
        selectElement.appendChild(option);
    }
});

adjectives.forEach((adjective, index) => {
    for(selectElement of document.getElementsByClassName("adjective")) {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = adjective.word;
        selectElement.appendChild(option);
    }
});

verbs.forEach((verb, index) => {
    let selectElement = document.getElementById("verb-select");
    let option = document.createElement("option");
    option.value = index;
    option.textContent = verb.base;
    selectElement.appendChild(option);
});

tenses.forEach((tense, index) => {
    let selectElement = document.getElementById("tense");
    let option = document.createElement("option");
    option.value = index;
    option.textContent = tense.tense;
    selectElement.appendChild(option);
});

function updateArticles(target) {
    let article = document.getElementById(target+"-a");
    let plural = document.getElementById(target+"-plural");
    if(plural.checked) {
        article.textContent = "--";
    }
    else {
        article.textContent = "A/An";
    }
}

function generateNounPhrase(noun, adjective, article, plural) {
    let phrase = "";

    if(article !== "a") {
        phrase += article + " ";
    }
    else if(adjective && !plural) {
        phrase += adjective.article + " ";
    }
    else if(!plural) {
        if(noun.article) {
            phrase += noun.article + " ";
        }
        else {
            if(noun.word.charAt(0).match(/[aeiou]/i)) {
                phrase += "an ";
            }
            else {
                phrase += "a ";
            }
        }
    }

    if(adjective) {
        phrase += adjective.word + " ";
    }

    if(plural) {
        phrase += noun.plural ?? noun.word + "s";
    }
    else {
        phrase += noun.word
    }

    return phrase;
}

function generateSentence() {
    let tense = tenses[document.getElementById("tense").value];
    if(!tense) {
        alert("Please select a tense.");
        return;
    }

    let sentence = tense.template;
    let subjectNoun = nouns[document.getElementById("subject-noun").value];
    if(!subjectNoun) {
        alert("Please select a subject noun.");
        return;
    }
    let subjectAdjective = adjectives[document.getElementById("subject-adjective").value];
    let subjectArticle = document.getElementById("subject-article").value;
    let isSubjectPlural = document.getElementById("subject-plural").checked;
    let subject = generateNounPhrase(subjectNoun, subjectAdjective, subjectArticle, isSubjectPlural);
    sentence = sentence.replace("{Subject}", subject);

    
    let objectNoun = nouns[document.getElementById("object-noun").value];
    if(!objectNoun) {
        alert("Please select a object noun.");
        return;
    }
    let objectAdjective = adjectives[document.getElementById("object-adjective").value];
    let objectArticle = document.getElementById("object-article").value;
    let isObjectPlural = document.getElementById("object-plural").checked;
    let object = generateNounPhrase(objectNoun, objectAdjective, objectArticle, isObjectPlural);
    sentence = sentence.replace("{Object}", object);

    let verb = verbs[document.getElementById("verb-select").value];
    if(!verb) {
        alert("Please select a verb.");
        return;
    }
    sentence = sentence.replace("{Verb}", verb[tense.form]);

    let start = sentence.search("<");
    if(start >= 0) {
        let end = sentence.search(">");
        let divider = sentence.search("/");
        let word = "";
        if (isSubjectPlural) {
            word = sentence.slice(divider + 1, end);
        }
        else {
            word = sentence.slice(start + 1, divider);
        }
        sentence = sentence.replace(/<.*>/, word);
    }

    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    document.getElementById("sentence").textContent = sentence;
}

function getRandomOption(selectElement) {
    const options = selectElement.options;
    let randomIndex = "";
    do {
        randomIndex = Math.floor(Math.random() * options.length);
    } while (options[randomIndex].value === "");
    return options[randomIndex].value;
}

function randomizeSelections() {
    const subjectArticle = document.getElementById('subject-article');
    const subjectAdjective = document.getElementById('subject-adjective');
    const subjectNoun = document.getElementById('subject-noun');
    const subjectPlural = document.getElementById('subject-plural');
    const verbSelect = document.getElementById('verb-select');
    const tense = document.getElementById('tense');
    const objectArticle = document.getElementById('object-article');
    const objectAdjective = document.getElementById('object-adjective');
    const objectNoun = document.getElementById('object-noun');
    const objectPlural = document.getElementById('object-plural');

    subjectArticle.value = getRandomOption(subjectArticle);
    subjectAdjective.value = getRandomOption(subjectAdjective);
    subjectNoun.value = getRandomOption(subjectNoun);
    subjectPlural.checked = Math.random() < 0.5;
    verbSelect.value = getRandomOption(verbSelect);
    tense.value = getRandomOption(tense);
    objectArticle.value = getRandomOption(objectArticle);
    objectAdjective.value = getRandomOption(objectAdjective);
    objectNoun.value = getRandomOption(objectNoun);
    objectPlural.checked = Math.random() < 0.5;

    generateSentence();
    updateArticles("subject");
    updateArticles("object");
}