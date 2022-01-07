

var currentText

function printMe(){
    alert("hey there!");
}

var btn = document.createElement("button")
btn.innerHTML = "run program"
document.body.appendChild(btn)
btn.arguments = currentText
btn.onclick = splitInput


// var btn2 = document.createElement("button")
// btn2.innerHTML = "c"
// document.body.appendChild(btn2)
// btn.onclick = printMe

function configIO(){

}


var contents = null;
document.getElementById('file').onchange = function(){
    let reader = new FileReaderSync();
    let result_base64 = reader.readAsDataURL(this.files[0]); 
    console.log(result_base64)
    // var file = this.files[0];
    // var reader = new FileReader();
    // var contents
    // reader.onload = async function(progressEvent){
    //      storeText(this.result.toString())
    //      contents = this.result.toString()
    //     //  console.log(currentText)
    //     //  console.log(this.result.toString())
    //     // document.getElementById('output').textContent = this.result;
    // };
    // console.log(contents)
    // reader.readAsText(file)
    // var contents = reader.result
  };
//   console.log(currentText)

function storeText(string){
    currentText = string
    // console.log(currentText)
}

function splitInput(fileContents){
    console.log(fileContents)
    
    // console.log(fileContents)
    // fileContents = fileContents.separate(/[^A-Za-z]/).toString()
    
    words = tokenize(fileContents);

    // console.log(fileContents)
    // console.log(words[0])
    // console.log(words)
   

    // Map<String,Integer> wordMap = new HashMap<>();
    // Map<String,Integer> wordMapWithoutStop = new HashMap<>();
    // Map<String,Integer> newWords = new HashMap<>();
    // HashMap<Character,Integer> letterMap = new HashMap<>();
    
    var wordMap = new Map();
    // wordMap.set()
    

    // console.log(words)
    var wordMapWithoutStop = new Map();
    var uniqueWords = new Map();
    var totalUniqueWords=0;
    var totalTypes=0;
    var totalTokens = 0;
    var finishedBook = false;

    // readTextFile("stop-list.txt");
    var stopLines = readTextFile("stop-list.txt");
    // console.log(typeof(stopLines))
     stopLines = stopLines.split("\r\n");
   

    
    var dictionaryAsString = readTextFile("words.txt");
    allWordsInDictionary = dictionaryAsString.toLowerCase().split("\n");
    var dictionaryMap = new Map();
    for (i in allWordsInDictionary){
        dictionaryMap.set(allWordsInDictionary[i],1);
    }
    // console.log(dictionaryMap.has("number"))

   

    



  
    for (i in words){
        // console.log(words[i])
        if(wordMap.has(words[i])) {
            wordMap.set(words[i], (wordMap.get(words[i]))+1);
            if(!stopLines.includes(words[i]))
                wordMapWithoutStop.set(words[i], (wordMapWithoutStop.get(words[i]))+1);
            if(!dictionaryMap.has(words[i])&&((words[i].charAt(words[i].length-2)!='\'')&&(words[i].charAt(words[i].length-1))!='s'))
                uniqueWords.set(words[i], (uniqueWords.get(words[i]))+1);
        }
        //&&((words[i].charAt(words[i].length-2)!='\'')&&(words[i].charAt(words[i].length-1))!='s')
        else {
           wordMap.set(words[i],1);
           totalTypes++
            if(!stopLines.includes(words[i]))
                wordMapWithoutStop.set(words[i],1);
            if(!dictionaryMap.has(words[i])&&((words[i].charAt(words[i].length-2)!='\'')&&(words[i].charAt(words[i].length-1))!='s')) {
                totalUniqueWords++;
                uniqueWords.set(words[i],1);
            }
        }
        totalTokens++;
    }
    
    const wordMapSortedByValue = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));
    const uniqueWordMapSortedByValue = new Map([...uniqueWords.entries()].sort((a, b) => b[1] - a[1]));
    // for (i = 0;i < 10; i++){
    //     console.log(Array.from(wordMapSortedByValue.keys())[i])
    // }
    // console.log(wordMapSortedByValue)

    
    // for (let [key, value] of wordMap) {     // get data sorted
    //     console.log(key + ' ' + value);
    // }
    // wordMap[Symbol.iterator] = function* () {
    //     yield* [this.entries()].sort((a, b) => a[1] - b[1]);
    // }
    // // const wordMapSortedByValue = new Map([wordMap.entries()].sort((a, b) => b[1] - a[1]));
    // console.log(wordMap)
    // for (let [key, value] of wordMap) {     // get data sorted
    //     console.log(key + ' ' + value);
    // }
    // // console.log(wordMapSortedByValue);
    // // console.log(wordMap.get("harry"))
    // console.log(totalUniqueWords)
    // console.log(uniqueWordMapSortedByValue)
    // console.log(wordMap.get("malfoy'll"))
    // console.log(uniqueWordMapSortedByValue.get("malfoy'll"))



    console.log(typeof(uniqueWords.entries().values))
    console.log(uniqueWords.values())




    var xValues = Array.from(uniqueWordMapSortedByValue.keys())
    var yValues = Array.from(uniqueWordMapSortedByValue.values())
    
  
    console.log(yValues)
    
    var chart = new Chart("myChart", {
        
        type: "line",
        // title:{
        //     text: "test"
        // },
        // legendText: "Test",
        data: {
          labels: xValues,
          datasets: [{
            label: "Words Unique to the Text and Their Tokens",
            
            borderColor: "rgba(40,100,200,.8)",
            data: yValues
          }]
        },
        // legend:{

        // }
        // options: {
        //     legend: {
        //       display: true,
        //       position: 'bottom',
        //       labels: {
        //         fontColor: "#000080",
        //       }
        //     },
        //     scales: {
        //       yAxes: [{
        //         ticks: {
        //           beginAtZero: true
        //         }
        //       }]
        //     }
        // }
       
      });

    console.log(chart.legend)

}

function tokenize(fileContents) {
    let words = fileContents.replace("^+", "").toString();
    words = words.replace("+$", "").toString();
    words = words.toLowerCase().toString();
    words = words.split(/[^A-Za-z']/).filter(function(el) {return el.length != 0});
    return words;
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText = null;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                // alert(allText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}

    
    // rawFile.send(null);

  

    // fileContents = fileContents.replaceAll('','t');

    // console.log(fileContents)
    // var string = fileContents.toString();
    // console.log(string)
    // console.log(string.length)
    // var string2 = string.split(" ")
    // console.log(string2)
    // console.log(string2.length)
    // console.log(typeof(string2))
    // string2.toString().replace('t',)
    // replace('s','x');
    // console.log(string2)
    // for (i in string2){
    //     console.log(i)
    // }


