//Alexander Swartz         last edited: 1/6/2022

var allText = null
var uniqueWordMapSortedByValue = null
var wordMapSortedByValue = null

document.getElementById('file').onchange = function onChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var allText = null
    reader.onload = function (file) {
        splitInput(this.result.toString())


    };
    reader.readAsText(file);
}

function storeText(string) {
    currentText = string
}

function splitInput(fileContents) {
    words = tokenize(fileContents);
    var wordMap = new Map();
    var wordMapWithoutStop = new Map();
    var uniqueWords = new Map();
    var totalUniqueWords = 0;
    var totalTypes = 0;
    var totalTokens = 0;
    var finishedBook = false;

    var stopLines = readTextFile("stop-list.txt");
    stopLines = stopLines.split("\r\n");
    var dictionaryAsString = readTextFile("words.txt");
    allWordsInDictionary = dictionaryAsString.toLowerCase().split("\n");
    var dictionaryMap = new Map();
    for (i in allWordsInDictionary) {
        dictionaryMap.set(allWordsInDictionary[i], 1);
    }

    for (i in words) {
        if (wordMap.has(words[i])) {
            wordMap.set(words[i], (wordMap.get(words[i])) + 1);
            if (!stopLines.includes(words[i]))
                wordMapWithoutStop.set(words[i], (wordMapWithoutStop.get(words[i])) + 1);
            if (!dictionaryMap.has(words[i]) && ((words[i].charAt(words[i].length - 2) != '\'') && (words[i].charAt(words[i].length - 1)) != 's'))
                uniqueWords.set(words[i], (uniqueWords.get(words[i])) + 1);
        }
        else {
            wordMap.set(words[i], 1);
            totalTypes++
            if (!stopLines.includes(words[i]))
                wordMapWithoutStop.set(words[i], 1);
            if (!dictionaryMap.has(words[i]) && ((words[i].charAt(words[i].length - 2) != '\'') && (words[i].charAt(words[i].length - 1)) != 's')) {
                totalUniqueWords++;
                uniqueWords.set(words[i], 1);
            }
        }
        totalTokens++;
    }

    wordMapSortedByValue = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));
    uniqueWordMapSortedByValue = new Map([...uniqueWords.entries()].sort((a, b) => b[1] - a[1]));
}

function drawZipfsGraphForUniqueWords() {
    var xValues = Array.from(uniqueWordMapSortedByValue.keys());
    var yValues = Array.from(uniqueWordMapSortedByValue.values());
    var chart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Tokens per unique word",

                borderColor: "rgba(40,100,200,.8)",
                data: yValues
            }]
        },
    });
}

function drawZipfsGraphForAllWords() {
    var xValues = Array.from(wordMapSortedByValue.keys());
    var yValues = Array.from(wordMapSortedByValue.values());
    var chart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Tokens per word",
                borderColor: "rgba(40,100,200,.8)",
                data: yValues
            }]
        },
    });
}

function tokenize(fileContents) {
    let words = fileContents.replace("^+", "").toString();
    words = words.replace("+$", "").toString();
    words = words.toLowerCase().toString();
    words = words.split(/[^A-Za-z']/).filter(function (el) { return el.length != 0 });
    return words;
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText = null;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText.toString();

            }
        }
    }
    rawFile.send(null);
    return allText;
}



