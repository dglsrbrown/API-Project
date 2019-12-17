
const baseURL = "https://montanaflynn-spellcheck.p.rapidapi.com/check/?text="
let url;

const searchTerm = document.getElementById("search");
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const output = document.getElementById("testOutput");

let para = document.createElement('p');


let errorsArray = [];
let innerArray = [];
let valueArray = [];
let value;
let counter =0;



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
                
                
                let correctionsObject = json.corrections;
                
            //Start conditional to check if there are spelling mistakes

                if (isEmpty(correctionsObject)){// if object is empty do this
                    console.log("Spelling/s is/are accurate");
                    //if spelling is accurate do something
                }
                else{
                    //if there are spelling mistakes do something
                    // let correctionsList = Object.keys(correctionsObject);
                    //1. identify spelling errors
                    console.log("you have mistakes"); 

                    //2. organize corrections list for each error

                    //3. 
                }

                console.log(correctionsObject);
                console.log(Object.values(correctionsObject));

                // innerArray = Object.values(correctionsObject[errorsArray[0]]);
                // console.log(innerArray);
                valueArray = Object.values(correctionsObject);
                valueArray.toString();
                console.log(valueArray);
                 // gives the keys in an array
                
                // console.log(Object.keys(correctionsObject));
                 
                //LISTS THE SPELLIG ERRORS
                 for (let key in correctionsObject){ //get keys from object errors list
                     console.log(key);
                     para.innerHTML += key +" ";
                     errorsArray.push(key); //appends errorsArray with keys

                     document.body.appendChild(para);

                    let liNode = document.createElement('li');
                    
                    let listWord = document.createTextNode(`${key}: ${valueArray[0]}`);
                    liNode.appendChild(listWord);
                    document.getElementById('correctionsList').appendChild(liNode);

                    //errorsArray now has the user mistakes
              
                }
                    // trying to seperate value arrays off of keys/object
                    
                

                    // for (key in correctionsObject){
                    //     if (correctionsObject.hasOwnProperty(key)){ //look this up!!!!
                    //         value = correctionsObject[key];
                    //         console.log(value);//this worked!!!
                    //         //perhaps run a funciton on each iteration which does what i need
                    //         para.innerHTML += value;
                    //         document.body.appendChild(para);
                    //         //do something with value
                    //     }
                    // }

                    function checkObj(pullarray) {
                        
                        console.log(correctionsObject[pullarray]);// why not dot notation???
                        // Your Code Here
                        value = correctionsObject[pullarray];
                        //         console.log(value);//this worked!!!
                        para.innerHTML += value +" ";
                        document.body.appendChild(para);


                    
                      }
               
                    //   innerArray = checkObj(errorsArray[0]);
                      for (index in errorsArray){
                          checkObj(errorsArray[index])
                      }
                           
                    // console.log(correctionsObject[errorsArray[0]]);
                

                        // for (let index in errorsArray){

                        //     console.log(correctionsObject[errorsArray[index]]);

                        // }
                    
                
               
                 console.log(errorsArray);
                 console.log(errorsArray.length);

                 
                 

            

                let suggestion = json.suggestion;
                console.log(suggestion);

                let original = json.original;
                console.log(original);

            })

.catch(err => {
	console.log(err);
})
 };