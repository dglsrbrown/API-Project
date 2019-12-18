const baseURL = "https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="
let url;

const searchTerm = document.getElementById("search");
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const output = document.getElementById("testOutput");

// let para = document.getElementById('test');

let list = document.getElementById('correctionsList');
let sugCorx = document.getElementById("suggested");


let errorsArray = [];
let innerArray = [];
let valueArray = [];
let value;
let counter =0;
let stringed;

let correctionsDisplay = document.getElementById('correctionsHeading');
let listDisplay = document.getElementById('listHeading');
let suggestionDisplay = document.getElementById('suggestionHeading');
let correct = document.getElementById('correct');
//event listeners

searchForm.addEventListener('submit', fetchResults);

// function to check for an empty object
function isEmpty(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key))// look this up!!!
            return false;
        }
        return true;
}



 function fetchResults(e){
     e.preventDefault();//prevents the default action of submition of a form. We want to gather not send data
    // console.log(e);
    console.log(`What you searched: ${searchTerm.value}`);//is the actual value in the searched field

    url = baseURL + searchTerm.value;
    //  console.log(url);


            fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
                    "x-rapidapi-key": "9084cf0286msh94202f2d7402cacp1843e7jsn7509e8233cfa"
                }
            })
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(function(json){
                console.log(json);
               displayResults(json); 
                
            })

            //CLEAR PREVIOUS RESULTS
            
        function displayResults(json){       

        let correctionsObject = json.corrections;

    

        while (list.firstChild) {//removes previous search firstChild - clears
            list.removeChild(list.firstChild); //1
            counter=0;
      
        }
        
        console.log(sugCorx.firstChild);
        while (sugCorx.firstChild){
            console.log("test1");
            sugCorx.removeChild(sugCorx.firstChild);
            console.log('test2');
        }
              
                
            //Start conditional to check if there are spelling mistakes
                


                if (isEmpty(correctionsObject)){// if object is empty do this
                    console.log("Spelling/s is/are accurate");
                    //if spelling is accurate do something
                    correct.style.display ="block";
                    correctionsDisplay.style.display ="none";
                    listDisplay.style.display ="none";
                    suggestionDisplay.style.display = "none";

                }
                else{
                    
                        if(correctionsDisplay.style.display ==="none"){
                            correctionsDisplay.style.display ="block";
                            listDisplay.style.display ="block";
                            suggestionDisplay.style.display = "block";
                            correct.style.display = "none";
                        }
                        else{
                            correctionsDisplay.style.display ="none";
                            listDisplay.style.display ="none";
                            suggestionDisplay.style.display = "none";

                        }
                    
                    //if there are spelling mistakes do something
                   
                    console.log("you have mistakes"); 

                }

                console.log(correctionsObject);
                console.log(Object.values(correctionsObject));
                
                valueArray = Object.values(correctionsObject);
                
                console.log(valueArray);
                 // gives the keys in an array
                
                // console.log(Object.keys(correctionsObject));
                 
                //LISTS THE SPELLIG ERRORS
                 for (let key in correctionsObject){ //get keys from object errors list
                     console.log(key);
                    //  para.innerHTML += key +" ";
                     errorsArray.push(key); //appends errorsArray with keys

                    //  document.body.appendChild(para);

                    let liNode = document.createElement('li');
                    let stringed =valueArray[counter].join(", ");
                    // let sep = stringed.split(',');
                    console.log(typeof(stringed));
                    
                    
                    let listWord = document.createTextNode(`${key}:   ${ stringed}`);
                    counter++;
                    document.getElementById('correctionsList').appendChild(liNode);
                    liNode.appendChild(listWord);

                    //errorsArray now has the user mistakes
                }

                if (isEmpty(correctionsObject)){// if object is empty do this
                    
                }
                else{
                    let suggestion = json.suggestion;
                    console.log(suggestion);
                    // let errors = errorsArray.join(" ");
                    let sugWords = document.createElement('p');
                    sugWords.innerText = suggestion;
                    // para.appendChild(sugWords);
                    sugCorx.appendChild(sugWords);
                }
                    

        }

 };