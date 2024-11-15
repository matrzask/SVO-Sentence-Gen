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

function generateNounPhrase(noun, adjective, article, plural) {
    return noun.word;
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
    let subjectAdjective = document.getElementById("subject-adjective").value;
    let subjectArticle = document.getElementById("subject-article").value;
    let isSubjectPlural = document.getElementById("subject-plural").checked;
    let subject = generateNounPhrase(subjectNoun, subjectAdjective, subjectArticle, isSubjectPlural);
    sentence = sentence.replace("{Subject}", subject);

    
    let objectNoun = nouns[document.getElementById("object-noun").value];
    if(!objectNoun) {
        alert("Please select a object noun.");
        return;
    }
    let objectAdjective = document.getElementById("object-adjective").value;
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

    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    document.getElementById("sentence").textContent = sentence;
}